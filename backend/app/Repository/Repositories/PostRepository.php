<?php

namespace App\Repository\Repositories;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Repository\Interfaces\PostRepositoryInterface;
use Exception;

class PostRepository implements PostRepositoryInterface
{
    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }
    public function findAll($limit = 5, $sort = 'asc', $page = 1, array $filter = null, $select = null)
{
    $skip = ($page - 1) * $limit;
    $sortby = $sort === "ctime" ? 'desc' : 'asc'; // Sorting by creation time in descending order if 'ctime' is specified, otherwise ascending.
    // Start the query
    $query = $this->post::query(); // Using query() for more flexibility
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
        return $this->post->create($data);
    }
    public function findByIdAndUpdate($id,  $data, $options = [])
    {
        $post=$this->findById($id);
        if(! $post)throw new Exception("Post does not exist!",404);
        $post->update($data);
        return $post;
    }
    public function findById($id, $options = null)
    {
        return $this->post->find($id);
    }  
    public function findByIdAndDelete($id)
    {
        $post=$this->findById($id);
        if(!$post) throw new Exception("Post does not exist!",404);
        $post->delete();
        return $post;
    } 
    
    public function findByIdAndGetDetail($pid)
{
    // Tìm bài post trước để kiểm tra sự tồn tại
    $post = $this->post->find($pid);
    // Nếu bài post không tồn tại, ném ra một ngoại lệ
    if (!$post) {  throw new \Exception("Post does not exist!", 404); }
    // Eager load các mối quan hệ cần thiết
    $post = $this->post->with([
        'address',      // Quan hệ với bảng 'post_addresses'
        'area',        // Quan hệ với bảng 'post_areas'
        'price',       // Quan hệ với bảng 'post_prices'
        'attribute',   // Quan hệ với bảng 'post_attributes'
        'images',       // Quan hệ với bảng 'post_images'
        'category'      // Quan hệ với bảng 'categories'
    ])->find($pid);
    // Trả về resource mới với bài post đã load các mối quan hệ
    return new PostResource($post);
}

}