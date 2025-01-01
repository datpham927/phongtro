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
    public function findAll($sort = 'asc',   array $filters = null)
    { 
        $sortby = $sort === "ctime" ? 'desc' : 'asc';
        $query = $this->category->select(
            'categories.id',
            'categories.title',
            'categories.name',
            'categories.sub_title',
            'categories.created_at',
            'categories.slug',
            DB::raw('(SELECT COUNT(*) FROM posts WHERE posts.category_id = categories.id) as post_quantity')
        )
        ->orderBy('categories.created_at', $sortby)
        ->distinct();
        if ($filters) {  
            $query->where($filters)  ;  
        } 
        $data= $query->paginate(5);
        return [
            'totalPage' =>  ceil($data->total()/5),
            'currentPage' =>$data->currentPage(),
            'totalCategories' =>  $data->total(),
            'categories' => $data->items()  
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