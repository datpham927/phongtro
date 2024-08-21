<?php

namespace App\Repository\Repositories;

use App\Http\Resources\PostDetailResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Repository\Interfaces\PostRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

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
    return PostResource::collection($query->get());   // Return the result set or null if no results found
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
    
    public function findPostDetailById ($pid)
{
    // Tìm bài post trước để kiểm tra sự tồn tại
    $post = $this->post->find($pid);
    // Nếu bài post không tồn tại, ném ra một ngoại lệ
    if (!$post) {  throw new \Exception("Post does not exist!", 404); }
    // Eager load các mối quan hệ cần thiết
    $post = $this->post->with([
        'address',      // Quan hệ với bảng 'post_address'
        'area',        // Quan hệ với bảng 'post_areas'
        'price',       // Quan hệ với bảng 'post_prices'
        'attribute',   // Quan hệ với bảng 'post_attributes'
        'images',       // Quan hệ với bảng 'post_images'
        'category'      // Quan hệ với bảng 'categories'
    ])->find($pid);
    // Trả về resource mới với bài post đã load các mối quan hệ
    return new PostDetailResource($post);
}
public function search($limit = 5, $sort = 'asc', $page = 1, array $filters = []) {
    // Khởi tạo query builder
    $query = $this->post->newQuery();

    // Áp dụng bộ lọc theo category_id nếu có
    if (!empty($filters['category_id'])) {
        $query->where('category_id', $filters['category_id']);
    }
    // Áp dụng bộ lọc theo city_slug, district_slug, ward_slug nếu có
    if (!empty($filters['city_slug']) && !empty($filters['district_slug']) && !empty($filters['ward_slug'])) {
        $query->whereHas('address', function($query) use ($filters) {
                $query->where('city_slug', $filters['city_slug'])
                ->where('district_slug', $filters['district_slug'])
                ->where('ward_slug', $filters['ward_slug']);
        });
    }
    // Áp dụng bộ lọc theo khoảng giá nếu có
    if (!empty($filters['price_from']) && !empty($filters['price_to'])) {
        $query->whereHas('price', function($query) use ($filters) {
            $query->whereBetween('order', [$filters['price_from'], $filters['price_to']]);
        });
    }
    // Áp dụng bộ lọc theo khoảng diện tích nếu có
    if (!empty($filters['area_from']) && !empty($filters['area_to'])) {
        $query->whereHas('area', function($query) use ($filters) {
            $query->whereBetween('order', [$filters['area_from'], $filters['area_to']]);
        });
    }
    // Áp dụng sắp xếp
    $sortby = $sort === 'ctime' ? 'desc' : 'asc';
    $query->orderBy('posts.created_at', $sortby);
    // Áp dụng phân trang
    $skip = ($page - 1) * $limit;
    if ($limit > 0) { $query->skip($skip)->take($limit); }
    // Thực thi truy vấn và trả về kết quả dưới dạng resource
    return PostResource::collection($query->get());
}

}