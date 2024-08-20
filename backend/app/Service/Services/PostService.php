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

class PostService implements PostServiceInterface
{
    protected $postRepository;
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function findAll($request){
            $limit=$request['limit'];
            $page=$request['page'];
            $sort=$request['sort'];
            $filter=[];
            if($request['category_id']){
                $filter ["category_id"]=$request['category_id'];
            }
            $select=null;
         return $this->postRepository->findAll($limit, $sort, $page,$filter, $select);
    }
    public function create($request){
        $validatedData = $request->validated();

         $dataPost=[
            "id"=>Util::uuid(),
            "slug"=>Util::slug($validatedData[ "title"] ),
            "title"=>  $validatedData[ "title"],
            "thumb"=>  $validatedData["thumb"],
            "description"=>  $validatedData["description"],
            "category_id"=>  $validatedData["category_id"]   
         ];
         $post= $this->postRepository->create($dataPost);
         $postId=$post["id"];
         $images=$validatedData["images"];
         $area=$validatedData["area"];
         $price=$validatedData["price"];
         $attribute=$validatedData["attribute"];
         $address=$validatedData["address"];
         if(empty($images)||empty($area)||empty($price)||empty($address)||empty($attribute))
           {Throw new Exception("Please enter complete information!",400);}
           $this->createPostImage($images,$postId);
           $this->createPostAttribute($attribute,$postId);
           $this->createPostPrice($price,$postId);
           $this->createPostArea($area,$postId); 
           $this->createAddress($address,$postId); 
           return $post;
    }
    // -------------------
    public function update($request, $id)
{ 
    $validatedData = $request->all(); 
    $post = $this->postRepository->findById($id);
    if (!$post) {  throw new Exception("Post does not exist!", 404);}
    $dataPost = [
        "slug" => Util::slug($validatedData["title"]),
        "title" => $validatedData["title"],
        "thumb" => $validatedData["thumb"],
        "description" => $validatedData["description"],
        "category_id" => $validatedData["category_id"]
    ];
    $this->postRepository->findByIdAndUpdate($id, $dataPost);
    if (!empty($validatedData["images"])) {
        Post_image::where('post_id', $id)->delete();
        $this->createPostImage($validatedData["images"], $id);
    }
    if (!empty($validatedData["area"])) {
        Post_area::where('post_id', $id)->delete();
        $this->createPostArea($validatedData["area"], $id);
    }
    if (!empty($validatedData["price"])) {
        Post_price::where('post_id', $id)->delete();
        $this->createPostPrice($validatedData["price"], $id);
    }
    if (!empty($validatedData["attribute"])) {
        Post_attribute::where('post_id', $id)->update($validatedData["attribute"]);
    }
    if (!empty($validatedData["address"])) {
        Post_address::where('post_id', $id)->delete();
        $this->createAddress($validatedData["address"], $id);
    }
    return $post;
    }
    public function destroy($id){
         // Có định nghĩa khóa ngoại nên các table kia sẽ tự động xóa
        //  $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
         $this->postRepository->findByIdAndDelete($id);
    }

    public function findDetailPost($pid){
          return $this->postRepository->findPostDetailById ($pid);
    } 

     // ----------------- 

     public function createPostImage($images,$pid){
        foreach($images as $img){
            Post_image::create([
                "id"=>Util::uuid(),
                 "post_id"=>$pid,
                 "url"=>$img
            ]);
          }
    }
    public function createPostArea($area,$pid){
        $area["post_id"]=$pid;
        $area["id"]=Util::uuid();
        Post_area::create($area);
 }
    public function createPostPrice($price,$pid){
        $price["post_id"]=$pid;
        $price["id"]=Util::uuid();;
        Post_price::create($price);
    }
    public function createPostAttribute($attribute,$pid){
        $attribute["post_id"]=$pid;
        $attribute["id"]=Util::uuid();
        Post_attribute::create($attribute);
    }
    public function createAddress($address,$pid){
        $address["post_id"]=$pid;
        $address["id"]=Util::uuid();
        $address["city_slug"]= Util::slug($address[ "city_name"] );
        $address["district_slug"]= Util::slug($address[ "district_name"] );
        $address["ward_slug"]= Util::slug($address[ "ward_name"] );
        Post_address::create($address);
    }
}