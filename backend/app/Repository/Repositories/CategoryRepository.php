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
    $sortby = $sort === "ctime" ? 'desc' : 'asc'; // Sorting by creation time in descending order if 'ctime' is specified, otherwise ascending.
    // Start the query
    $query = $this->category->select('categories.*', DB::raw('count(p.id) as post_quantity'))
    ->leftJoin('posts as p', 'p.category_id', '=', 'categories.id')
    ->groupBy('categories.id');
    // Apply filtersing if any filters are provided
    if ($filters) {  $query->where($filters);  }
     $totalCategories=(clone  $query)->count(); 
    // Apply sorting
    $query->orderBy('created_at', $sortby);
    // Apply pagination (skip and limit)
    if ($limit > 0) {  $query->skip($skip)->take($limit); }
    // Apply select columns if specified
    if ($select) { $query->select($select);}
    // Execute the query and return the results
    $totalPage= $limit > 0 ? ceil($totalCategories/$limit) : 1; 
    return [
        'totalPage' => intval($totalPage),
        'currentPage' => intval($page),
        'totalCategories' => intval($totalCategories),
        'categories' => $query->get() ?: null, // Assuming PostResource is used for formatting
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