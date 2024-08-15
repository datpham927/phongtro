<?php

namespace App\Repository\Repositories;

use App\Models\Category;
use App\Repository\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }
    public function findAll($limit=5, $sort, $page,array $filter=null, $select=null)
    {
        $skip = ($page - 1) * $limit;
        $sortby = $sort === "ctime" ? 'desc' : 'asc'; // Sắp xếp theo cột thời gian
        $query = $this->category::where($filter)
            ->orderBy('id', $sortby) // Sắp xếp theo ID (hoặc cột khác nếu cần)
            ->skip($skip)
            ->take($limit);

        // Xử lý select nếu cần
        if ($select) {
            $query->select($select);
        }
        return $query->get(); // Lấy kết quả
    }
    public function create( $data)
    {
        return $this->category->create($data);
    }
    public function findByIdAndUpdate($id,  $data, $options = [])
    {
        $category = $this->category->findOrFail($id);
        $category->update($data);
        return $category;
    }
    public function findById($id, $options = null)
    {
        return $this->category->find($id);
    }  
    public function findByIdAndDelete($id)
    {
        $category = $this->category->findOrFail($id);
        $category->delete();
        return $category;
    } 
    
}