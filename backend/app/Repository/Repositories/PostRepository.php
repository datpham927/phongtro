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

    public function __construct(Post $post) {
        $this->post = $post;
    }
    public function findAll($limit = 5, $sort = 'asc', $page = 1, array $filters = null)
{
    // Khởi tạo query builder với join bảng post_type
    $query = $this->post->newQuery();
    // Áp dụng bộ lọc theo category_slug nếu có
    if (!empty($filters['category_slug'])) {
        $query->whereHas('category', function($query) use ($filters) {
            $query->where('slug', $filters['category_slug']);
        });
        unset($filters['category_slug']);
    }
    // Áp dụng bộ lọc theo city_slug, district_slug, ward_slug nếu có
    if (!empty($filters['city_slug']) || !empty($filters['district_slug']) || !empty($filters['ward_slug'])) {
        $query->whereHas('address', function($query) use ($filters) {
            // Kiểm tra city_slug và áp dụng điều kiện
            if (!empty($filters['city_slug'])) {
                $query->where('city_slug', $filters['city_slug']);
            }
            // Kiểm tra district_slug và áp dụng điều kiện
            if (!empty($filters['district_slug'])) {
                $query->where('district_slug', $filters['district_slug']);
            }
            // Kiểm tra ward_slug và áp dụng điều kiện
            if (!empty($filters['ward_slug'])) {
                $query->where('ward_slug', $filters['ward_slug']);
            }
        });
        unset($filters['city_slug'],$filters['ward_slug'],$filters['district_slug']);
    } 
    // Áp dụng bộ lọc theo khoảng giá nếu có
    if (!empty($filters['price_from']) || !empty($filters['price_to'])) {
        $query->whereHas('price', function($query) use ($filters) {
            $query->whereBetween('number', [$filters['price_from'], $filters['price_to']]);
        });
        unset($filters['price_from'],$filters['price_to']);
    } 
    // Áp dụng bộ lọc theo khoảng diện tích nếu có
    if (!empty($filters['area_from'])  ||  !empty($filters['area_to'])) { 
        $query->whereHas('area', function($query) use ($filters) {
            $query->whereBetween('number', [$filters['area_from'], $filters['area_to']]);
        });
        unset($filters['area_from'],$filters['area_to']);

    }
    $query->where($filters);
    // Tính tổng sản phẩm trước khi phân trang
    $totalProducts = $query->clone()->count(); // Sử dụng clone tránh lặp lại truy vấn
    $totalPage = ceil($totalProducts / $limit);
    $query = $query->join('post_types', 'posts.post_type_id', '=', 'post_types.id')
             ->select('posts.*', 'post_types.priority')
             ->orderBy('post_types.priority', 'asc')
             ->orderBy('posts.created_at', $sort === 'ctime' ? 'desc' : 'asc');
    // Áp dụng phân trang
    $skip = ($page - 1) * $limit;
    $query->skip($skip)->take($limit);

    // Trả về kết quả
    return [
        'totalPage' => $totalPage,
        'currentPage' => intval($page),
        'totalPosts' => $totalProducts,
        'posts' => PostResource::collection($query->get()),
    ];
}

    public function findAllPostExpiredForShop($limit, $sort, $page, $shopId)
    {
        // Truy vấn lấy các bài viết hết hạn
        $expiredPostsQuery = $this->post::where('user_id', $shopId)
            ->where('expire_at', '<', now());
        // Lấy tổng số bài viết hết hạn (clone query để không ảnh hưởng đến pagination)
        $totalPosts = (clone $expiredPostsQuery)->count();
        // Tính tổng số trang
        $totalPage = $limit > 0 ? ceil($totalPosts / $limit) : 1;
        // Áp dụng sắp xếp, skip và take (limit)
        $expiredPostsQuery->orderBy('expire_at', $sort);
        // Xử lý phân trang
        $skip = ($page - 1) * $limit;
        if ($limit > 0) {
            $expiredPostsQuery->skip($skip)->take($limit);
        }
        // Lấy kết quả
        $posts = $expiredPostsQuery->get();
        return [
            'totalPage' => intval($totalPage),
            'currentPage' => intval($page),
            'totalPosts' => intval($totalPosts),
            'posts' => PostResource::collection($posts), // Assuming PostResource is used for formatting
        ];
    }
    

    public function findRelatedPostByAddress($addressId, $sort = 'ctime')
    {
        $relatedPost = Post::where(['address_id' => $addressId, 'is_approved' => true])
            ->join('post_types', 'posts.post_type_id', '=', 'post_types.id')
            ->select('posts.*', 'post_types.priority')
            ->orderBy('post_types.priority', 'asc')
            ->orderBy('posts.created_at', $sort === 'ctime' ? 'desc' : 'asc')
            ->limit(10)
            ->get();
        return PostResource::collection($relatedPost);
    }
    
    public function create( $data)
    {
        return $this->post->create($data);
    }
    public function findByIdAndUpdate($id,  $data)
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
        'images',       // Quan hệ với bảng 'post_images'
        'category'      // Quan hệ với bảng 'categories'
    ])->find($pid);
    // Trả về resource mới với bài post đã load các mối quan hệ
    return new PostDetailResource($post);
} 
public function findAllUnapprovedPosts($limit,$sort, $page){
     // Truy vấn lấy các bài viết hết hạn
     $expiredPostsQuery = $this->post::where('is_approved',false); 
    // Lấy tổng số bài viết hết hạn (clone query để không ảnh hưởng đến pagination)
    $sortby = $sort === 'ctime' ? 'desc' : 'asc';
    $expiredPostsQuery->orderBy('posts.created_at', $sortby);
    $totalPosts = (clone $expiredPostsQuery)->count();
    // Tính tổng số trang
    $totalPage = $limit > 0 ? ceil($totalPosts / $limit) : 1;  
    $skip = ($page - 1) * $limit;
    if ($limit > 0) {$expiredPostsQuery->skip($skip)->take($limit);}
    // Lấy kết quả
    $posts = $expiredPostsQuery->get();
 return [
     'totalPage' => intval($totalPage),
     'currentPage' => intval($page),
     'totalPosts' => intval($totalPosts),
     'posts' => PostResource::collection($posts), // Assuming PostResource is used for formatting
 ];
}
        public function findByIdAndApprovePost($pid){
            $post=$this->findById($pid);
            if(! $post)throw new Exception("Post does not exist!",404);
            $post->update(["is_approved"=>true]);
            return $post;
        }
}