<?php

namespace App\Service\Services;

use App\Repository\Interfaces\PostTypeRepositoryInterface;
use App\Service\Interfaces\PostTypeServiceInterface;
use Illuminate\Support\Facades\Redis; // Sử dụng Redis Facade
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PostTypeService implements PostTypeServiceInterface
{
    protected $postTypeRepository;

    public function __construct(PostTypeRepositoryInterface $postTypeRepository)
    {
        $this->postTypeRepository = $postTypeRepository;
    }

    public function findAll($request)
    {
        // Kiểm tra xem có cache Redis hay không
        $cacheKey = "post-types";
        $cachedData = Redis::get($cacheKey);
        if ($cachedData) {
            // Nếu có dữ liệu cache, trả về dữ liệu đó (giải mã JSON)
            return json_decode($cachedData, true);
        }
        // Nếu không có cache, truy vấn từ repository
        $postTypes = $this->postTypeRepository->findAll();
        // Lưu dữ liệu vào Redis với thời gian hết hạn 1 ngày (3600 * 24 giây)
        Redis::setex($cacheKey, 3600 * 24, json_encode($postTypes));
        return $postTypes;
    }
    public function update($request, $ptid)
    {
        $requestData = $request->all();

        // Validate dữ liệu đầu vào
        $validator = Validator::make($requestData, [
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|max:999999', // Giá trị phải là số
            'expiration_time' => 'required|numeric|min:1', // Giá trị phải là số và lớn hơn hoặc bằng 1
        ]);

        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Cập nhật danh mục và lưu vào cache
        $postType = $this->postTypeRepository->findByIdAndUpdate($ptid, $requestData);

        // Xóa cache cũ trong Redis để làm mới danh sách
        Redis::del("post-types");

        return $postType;
    }
}
