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
    public function findAll( $sort = 'asc', array $filters = null)
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
    $data = $query->join('post_types', 'posts.post_type_id', '=', 'post_types.id')
             ->select('posts.*', 'post_types.priority')
             ->orderBy('post_types.priority', 'asc')
             ->orderBy('posts.updated_at', $sort === 'ctime' ? 'desc' : 'asc')
             ->paginate(10);
    return [ 
            'totalPage' =>  ceil($data->total()/10),
            'currentPage' =>$data->currentPage(),
            'totalPosts' =>  $data->total(),
            'posts' =>PostResource::collection($data->items())   
    ];
}
public function findAllForShop($shopId)
{
    $data = $this->post->where("user_id",$shopId)
            ->orderBy('posts.updated_at',  'desc' )
            ->paginate(10);
    
    return [ 
        'totalPage' =>  ceil($data->total()/10),
        'currentPage' =>$data->currentPage(),
        'totalPosts' =>  $data->total(),
        'posts' => PostResource::collection($data->items()),  
    ];
}
public function findNewPosts()
{
    $posts = $this->post ->orderByDesc('created_at') ->paginate(10); 
    return [ 'posts' => PostResource::collection($posts)];
}

public function findLocationPosts( $city_slug,   $district_slug)
{
    // Truy vấn bài viết dựa trên city_slug và district_slug
    $posts = $this->post
        ->with('address') // Eager load quan hệ address
        ->whereHas('address', function ($query) use ($city_slug, $district_slug) {
            $query->where('city_slug', $city_slug)
                  ->where('district_slug', $district_slug);
        })
        ->orderByDesc('created_at') // Sắp xếp theo thời gian mới nhất
        ->paginate(10); // Áp dụng phân trang 10 bài viết mỗi trang

    // Trả về kết quả với Resource
    return PostResource::collection($posts) ;
}



    public function findAllPostExpiredForShop( $shopId)
    {
        // Truy vấn lấy các bài viết hết hạn
        $data = $this->post::where('user_id', $shopId)
            ->where('expire_at', '<', now())
            ->orderBy('updated_at', "desc")
            ->paginate(10);
        return [
            'totalPage' =>  ceil($data->total()/10),
            'currentPage' =>$data->currentPage(),
            'totalPosts' =>  $data->total(),
            'posts' => PostResource::collection($data->items())   
        ];
    }
    

    public function findRelatedPostByAddress($addressId, )
    {
        $relatedPost = Post::where(['address_id' => $addressId, 'is_approved' => true])
            ->join('post_types', 'posts.post_type_id', '=', 'post_types.id')
            ->select('posts.*', 'post_types.priority')
            ->orderBy('post_types.priority', 'asc')
            ->orderBy('posts.updated_at',  'desc'  )
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
public function findAllUnapprovedPosts(){
     // Truy vấn lấy các bài viết hết hạn 
     $data = $this->post::where('is_approved',false)
     ->orderBy('posts.updated_at', "desc")
     ->paginate(10); 
 return [
    'totalPage' =>  ceil($data->total()/10),
    'currentPage' =>$data->currentPage(),
    'totalPosts' =>  $data->total(),
    'posts' => PostResource::collection($data->items()) 
 ];
}
  public function findByIdAndApprovePost($pid){
            $post=$this->findById($pid);
            if(! $post)throw new Exception("Post does not exist!",404);
            $post->update(["is_approved"=>true]);
            return $post;
        }
}