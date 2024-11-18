<?php
namespace App\Service\Services;
use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Service\Interfaces\CategoryServiceInterface;
use App\Util;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
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
        // $cacheKey = "categories:{$limit}:{$page}:{$sort}";
        // return Cache::remember($cacheKey, 3600*24*24, function () use ($limit, $sort, $page, $filter) {
            return $this->categoryRepository->findAll($limit, $sort, $page, $filter);
        // });
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
        // Tạo danh mục và lưu vào cache
        $category = $this->categoryRepository->create($requestData);
        Cache::forget("categories:*");
        return $category;
    }

    public function update($request, $id)
    {
        $requestData = $request->all();
        $requestData['slug'] = Util::slug($request->input('name'));
        $validator = Validator::make($requestData, [
            'name' => [ 'required', 'string',  'max:255',
                // Kiểm tra tính duy nhất của 'name', bỏ qua ID của category hiện tại
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
        // Cập nhật danh mục và lưu vào cache
        $category = $this->categoryRepository->findByIdAndUpdate($id, $requestData);
        // Xóa cache danh sách để làm mới
        Cache::forget("categories:*");
        return $category;
    }

    public function destroy($id)
    {
        $this->categoryRepository->findByIdAndDelete($id);
        // Xóa cache danh sách để làm mới
        Cache::forget("categories:*"); // Xóa tất cả cache danh sách
    }

    public function findCategory($id)
    {
        return $this->categoryRepository->findById($id);
    }
}