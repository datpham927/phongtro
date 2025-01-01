<?php

namespace App\Service\Services;

use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Service\Interfaces\CategoryServiceInterface;
use App\Util;
use Illuminate\Support\Facades\Redis;
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
        $categories = $this->categoryRepository->findAll(); 
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
        return $category;
    }

    public function destroy($id)
    {
        // Xóa danh mục
        $this->categoryRepository->findByIdAndDelete($id);  
    }

    public function findCategory($id)
    {
        return $this->categoryRepository->findById($id);
    }
}
