<?php
namespace App\Service\Services;

use App\Models\Post_address;
use App\Models\Post_area;
use App\Models\Post_attribute;
use App\Models\Post_image;
use App\Models\Post_price;
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
        $validatedData = $request->validated();
        $address = $validatedData["address"];
        if (empty($address)) {
            throw new Exception("Please enter complete information!", 400);
        }
        $addressId = $this->getOrCreateAddressId($address);
        $dataPost = $this->preparePostData($validatedData, $addressId);
        $dataPost ["id"] = Util::uuid();
        $post = $this->postRepository->create($dataPost);
        $postId = $post["id"];
        $this->validateAndCreatePostDetails($validatedData, $postId);
        $this->clearCache();
        return $post;
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
            "user_id" => $validatedData["user_id"],
            'address_id' => $addressId,
            "slug" => Util::slug($validatedData["title"]),
            "title" => $validatedData["title"],
            "thumb" => $validatedData["thumb"],
            "description" => $validatedData["description"],
            "category_id" => $validatedData["category_id"],
            "expire_at" => $validatedData["expire_at"]
        ];
    }

    private function validateAndCreatePostDetails($validatedData, $postId)
    {
        if (empty($validatedData["images"]) || empty($validatedData["area"]) ||
            empty($validatedData["price"]) || empty($validatedData["attribute"])) {
            throw new Exception("Please enter complete information!", 400);
        }
        $this->createPostImage($validatedData["images"], $postId);
        $this->createPostAttribute($validatedData["attribute"], $postId);
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

    private function createPostAttribute($attribute, $postId)
    {
        $attribute["post_id"] = $postId;
        $attribute["id"] = Util::uuid();
        Post_attribute::create($attribute);
    }

    private function clearCache()
    {
        Cache::forget("posts:shop:*");
        Cache::forget("posts:related:*");
        Cache::forget("posts:detail*");
    }
}
