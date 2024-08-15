<?php

namespace App\Repository\Repositories;

use App\Models\Category;
use App\Repository\Interfaces\CategoryRepositoryInterface;
use Exception;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }
    public function findAll($limit = 5, $sort = 'asc', $page = 1, array $filter = null, $select = null)
{
    $skip = ($page - 1) * $limit;
    $sortby = $sort === "ctime" ? 'desc' : 'asc'; // Sorting by creation time in descending order if 'ctime' is specified, otherwise ascending.
    // Start the query
    $query = $this->category::query(); // Using query() for more flexibility
    // Apply filtering if any filters are provided
    if ($filter) {  $query->where($filter);  }
    // Apply sorting
    $query->orderBy('created_at', $sortby);
    // Apply pagination (skip and limit)
    if ($limit > 0) {  $query->skip($skip)->take($limit); }
    // Apply select columns if specified
    if ($select) { $query->select($select);}
    // Execute the query and return the results
    return $query->get() ?: null; // Return the result set or null if no results found
}

    
    public function create( $data)
    {
        return $this->category->create($data);
    }
    public function findByIdAndUpdate($id,  $data, $options = [])
    {
        $category=$this->findById($id);
        if(! $category)throw new Exception("Category does not exist!",404);
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