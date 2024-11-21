<?php

namespace App\Service\Services;

use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Service\Interfaces\CategoryServiceInterface;
use App\Util;
use Illuminate\Support\Facades\Redis; // Thêm Redis Facade
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class CategoryService implements CategoryServiceInterface
{
    protected $categoryRepository;
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function findAll($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort'];
        $filter = [];
        $cacheKey = "categories:" . $limit . ":" . $page . ":" . $sort; // Xây dựng key cho cache
        // Kiểm tra xem dữ liệu có trong Redis không
        $cachedData = Redis::get($cacheKey);
        if ($cachedData) {
            // Nếu có cache, trả về dữ liệu đã giải mã
            return json_decode($cachedData, true);
        }
        // Nếu không có cache, lấy từ repository
        $categories = $this->categoryRepository->findAll($limit, $sort, $page, $filter);
        // Lưu vào Redis với thời gian hết hạn 1 ngày (3600 * 24 giây)
        Redis::setex($cacheKey, 3600 * 24, json_encode($categories));
        return $categories;
    }
    public function create($request)
    {
        $requestData = $request->all();
        $requestData['id'] = Util::uuid();
        $requestData['slug'] = Util::slug($request->input('name'));

        $validator = Validator::make($requestData, [
            'name' => 'required|string|max:255|unique:categories',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
        ]);

        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Tạo danh mục mới
        $category = $this->categoryRepository->create($requestData);

        // Xóa cache để làm mới danh sách
        Redis::del("categories:*"); // Xóa cache của danh sách categories

        return $category;
    }

    public function update($request, $id)
    {
        $requestData = $request->all();
        $requestData['slug'] = Util::slug($request->input('name'));

        $validator = Validator::make($requestData, [
            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('categories')->ignore($id),
            ],
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
        ]);

        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Cập nhật danh mục
        $category = $this->categoryRepository->findByIdAndUpdate($id, $requestData);

        // Xóa cache danh sách để làm mới
        Redis::del("categories:*"); // Xóa cache của danh sách categories

        return $category;
    }

    public function destroy($id)
    {
        // Xóa danh mục
        $this->categoryRepository->findByIdAndDelete($id);

        // Xóa cache của danh sách categories
        Redis::del("categories:*");
    }

    public function findCategory($id)
    {
        return $this->categoryRepository->findById($id);
    }
}
