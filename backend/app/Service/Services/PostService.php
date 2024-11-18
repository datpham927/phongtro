<?php
namespace App\Service\Services;

use App\Models\Invoice;
use App\Models\Post_address;
use App\Models\Post_area;
use App\Models\Post_image;
use App\Models\Post_price;
use App\Models\PostType; 
use App\Models\User;
use App\Repository\Interfaces\PostRepositoryInterface;
use App\Service\Interfaces\PostServiceInterface;
use App\Util;
use Exception;
use Illuminate\Support\Facades\Cache;

class PostService implements PostServiceInterface
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function findAll($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort'];
        unset($request['limit'], $request['page'], $request['sort']);
        $filters = $request->all();
        return $this->postRepository->findAll($limit, $sort, $page, $filters);
    }

    public function findAllForShop($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort'];
        unset($request['limit'], $request['page'], $request['sort']);
        $filters = $request->all();
        $filters['user_id'] = $request['user_id'];
        return $this->postRepository->findAll($limit, $sort, $page, $filters);
    }

    public function findAllPostExpiredForShop($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = 'desc';
        $shopId = $request['user_id'];
        return $this->postRepository->findAllPostExpiredForShop($limit, $sort, $page, $shopId);
    }
    public function findRelatedPost($addressId)
    {
        return $this->postRepository->findRelatedPostByAddress($addressId);
    }
    public function create($request)
{
    // Lấy dữ liệu đã được validate
    $validatedData = $request->validated();
    // Kiểm tra và lấy loại bài đăng
    $postType = PostType::find($validatedData['post_type_id']);
    if (!$postType) { throw new Exception("Invalid post type", 400); }
    // Kiểm tra số dư tài khoản người dùng có đủ để thanh toán
    $user = User::find($validatedData['user_id']); 
    if (!$user ||  $user->account_balance < $postType->price) {
        throw new Exception("Insufficient account balance", 400);
    }
    // tạo hóa đơn và trừ tiền
    if($postType->price>0){
        $this->processPostPayment($user, $postType);
    }
    // đăng bài
    $addressId = $this->getOrCreateAddressId($validatedData['address']);
    // Chuẩn bị dữ liệu bài đăng
    $dataPost = $this->preparePostData($validatedData, $addressId);
    // Tạo bài đăng
    $post = $this->postRepository->create($dataPost);
    // Tạo chi tiết bài đăng
    $this->createPostDetails($validatedData, $post['id']);
    // Xóa cache liên quan 
    $this->clearCache();
    return $post;
}
protected function processPostPayment($user, $postType)
{
    $invoiceData = [
        'id' => Util::uuid(),
        'transaction_type' => 'withdraw',
        'user_id' => $user->id,
        'amount' => $postType->price,
        'description' => "Phí đăng bài " . $postType->name,
    ];

    $invoice = Invoice::create($invoiceData);
    if ($invoice) {
        $user->account_balance -= $postType->price;
        $user->save(); // Lưu lại thay đổi số dư
    }
}

  public function update($request, $id)
{
    $validatedData = $request->all();
    // Kiểm tra thông tin địa chỉ
    $address = $validatedData["address"]  ;
    if (!$address) {
        throw new Exception("Please enter complete information!", 400);
    }
    $post = $this->postRepository->findById($id);
    if (!$post) {
        throw new Exception("Post does not exist!", 404);
    }
    // Lấy hoặc tạo ID địa chỉ
    $addressId = $this->getOrCreateAddressId($address);
    // Chuẩn bị dữ liệu cập nhật bài viết
    $dataPost = $this->preparePostData($validatedData,  $addressId );
    // Cập nhật bài viết và chi tiết bài viết
    $updatedPost = $this->postRepository->findByIdAndUpdate($id, $dataPost);
    $this->updatePostDetails($validatedData, $updatedPost);
    // Xóa cache sau khi cập nhật
    Cache::forget("posts:detail:{$id}");
    $this->clearCache();
    return $updatedPost;
}
    public function destroy($id)
    {
        $this->postRepository->findByIdAndDelete($id);
        Cache::forget("posts:detail:{$id}");
        $this->clearCache();
    }
    public function findDetailPost($pid)
    {
        $cacheKey = "posts:detail:{$pid}";
        return Cache::remember($cacheKey, 3600*24, function () use ($pid) {
            return $this->postRepository->findPostDetailById($pid);
        });
    }

    public function findAllUnapprovedPosts($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort'];
        return $this->postRepository->findAllUnapprovedPosts($limit, $sort, $page);
    }

    public function findApprovePost($pid)
    {
        return $this->postRepository->findByIdAndApprovePost($pid);
    }

    private function getOrCreateAddressId($address)
    {
        $foundAddress = Post_address::where([
            "city_name" => $address["city_name"],
            "district_name" => $address["district_name"],
            "ward_name" => $address["ward_name"]
        ])->first(); 
        if ($foundAddress) {
            return $foundAddress->id;
        }
        $address["id"] = Util::uuid();
        $address["city_slug"] = Util::slug($address["city_name"]);
        $address["district_slug"] = Util::slug($address["district_name"]);
        $address["ward_slug"] = Util::slug($address["ward_name"]);
        return Post_address::create($address)->id;
    }

    private function preparePostData($validatedData, $addressId)
    { 
        return [
            'id'  => Util::uuid(),
            "user_id" => $validatedData["user_id"],
            'address_id' => $addressId,
            "slug" => Util::slug($validatedData["title"]),
            "title" => $validatedData["title"],
            "thumb" => $validatedData["thumb"],
            "description" => $validatedData["description"],
            "category_id" => $validatedData["category_id"],
            "expire_at" => $validatedData["expire_at"],
            "address_detail" => $validatedData["address_detail"],
            "map" => $validatedData["map"],
            "post_type_id" => $validatedData["post_type_id"],
            "target" => $validatedData["target"] 
        ];
    }

    private function createPostDetails($validatedData, $postId)
    {
        $this->createPostImage($validatedData["images"], $postId);
        $this->createPostPrice($validatedData["price"], $postId);
        $this->createPostArea($validatedData["area"], $postId);
    }

    private function updatePostDetails($validatedData,$post)
    {
         if (!empty($validatedData["images"])) {
            $post->images()->delete();
            $this->createPostImage($validatedData["images"], $post->id);
        }
        if (!empty($validatedData["area"])) { $post->area()->update($validatedData["area"]); }
        if (!empty($validatedData["price"])) {$post->price()->update($validatedData["price"]);}
        if (!empty($validatedData["attribute"])) {$post->attribute()->update($validatedData["attribute"]);} 
    } 

    private function createPostImage($images, $postId)
    {
        foreach ($images as $img) {
            Post_image::create([
                "id" => Util::uuid(),
                "post_id" => $postId,
                "url" => $img
            ]);
        }
    }

    private function createPostArea($area, $postId)
    {
        $area["post_id"] = $postId;
        $area["id"] = Util::uuid();
        Post_area::create($area);
    }

    private function createPostPrice($price, $postId)
    {
        $price["post_id"] = $postId;
        $price["id"] = Util::uuid();
        Post_price::create($price);
    }

    private function clearCache()
    {
        Cache::forget("posts:shop:*");
        Cache::forget("posts:related:*");
        Cache::forget("posts:detail*");
    }
}
