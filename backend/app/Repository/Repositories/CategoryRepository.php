<?php

namespace App\Repository\Repositories;

use App\Models\Category;
use App\Repository\Interfaces\CategoryRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $category;
    public function __construct(Category $category)
    {
        $this->category = $category;
    }
    public function findAll($limit = 5, $sort = 'asc', $page = 1, array $filters = null, $select = null)
    {
        $skip = ($page - 1) * $limit;
        $sortby = $sort === "ctime" ? 'desc' : 'asc'; // Sắp xếp theo thời gian tạo theo thứ tự giảm dần nếu 'ctime' được chỉ định, ngược lại là tăng dần.
    
        // Bắt đầu truy vấn
        $query = $this->category->select('categories.id', DB::raw('count(p.id) as post_quantity'))
            ->leftJoin('posts as p', 'p.category_id', '=', 'categories.id')
            ->groupBy('categories.id'
            
            ); // Thêm các trường cần thiết vào đây
    
        // Áp dụng bộ lọc nếu có bộ lọc được cung cấp
        if ($filters) {  
            $query->where($filters);  
        }
    
        $totalCategories = (clone $query)->count(); 
        
        // Áp dụng sắp xếp
        $query->orderBy('categories.created_at', $sortby); // Chú ý rằng bạn nên chỉ định bảng ở đây để tránh nhầm lẫn
    
        // Áp dụng phân trang (skip và limit)
        if ($limit > 0) {  
            $query->skip($skip)->take($limit); 
        }
        
        // Áp dụng chọn cột nếu được chỉ định
        if ($select) { 
            $query->select($select);
        }
    
        // Thực thi truy vấn và trả về kết quả
        $totalPage = $limit > 0 ? ceil($totalCategories / $limit) : 1; 
        return [
            'totalPage' => intval($totalPage),
            'currentPage' => intval($page),
            'totalCategories' => intval($totalCategories),
            'categories' => $query->get() ?: null,
        ];  
    }
    

    
    public function create( $data)
    {
        return $this->category->create($data);
    }
    public function findByIdAndUpdate($id,  $data)
    {
        $category=$this->findById($id);
        if(!$category)throw new Exception("Category does not exist!",404);
        $category->update($data);
        return $category;
    }
    public function findById($id, $options = null)
    {
        return $this->category->find($id);
    }  
    public function findByIdAndDelete($id)
    {
        $category=$this->findById($id);
        if(!$category) throw new Exception("Category does not exist!",404);
        $category->delete();
        return $category;
    } 
    
}