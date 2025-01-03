<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Service\Interfaces\PostServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostControllers extends Controller
{
    private  $postService;
    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;  
    }  

    public function getAll(Request $request) {
        try {
            $response = $this->postService->findAll($request);
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function getAllUnapprovedPosts(Request $request) {
        try {
            $posts = $this->postService->findAllUnapprovedPosts($request);
            return ResponseHelper::success($posts, "Posts retrieved successfully", 200);
        } catch (\Throwable $e) {
            return ResponseHelper::error("Failed to retrieve posts", $e);
        }
    } 
    public function getAllForShop(Request $request) {
        try {
            $response = $this->postService->findAllForShop($request);
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function getAllPostExpiredForShop(Request $request) {
        try {
            $response = $this->postService->findAllPostExpiredForShop($request);
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function getRelatedPost( $address_id) {
        try {
            $response = $this->postService->findRelatedPost($address_id);
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function getNewPosts() {
        try {
            $response = $this->postService->findNewPosts();
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function getLocationPosts($city_slug,$district_slug) {
        try {
            $response = $this->postService->findLocationPosts($city_slug,$district_slug);
            return ResponseHelper::success($response, "Thành công", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function create(StorePostRequest $request) {
        DB::beginTransaction();
        try {
            $response = $this->postService->create($request);
            DB::commit();
            return ResponseHelper::success($response, "Create successfully", 200);
        }  catch (\Throwable $th) {
            DB::rollback();
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function update(Request $request,$pid) {
        DB::beginTransaction();
        try {
            $response = $this->postService->update($request,$pid);
            DB::commit();
            return ResponseHelper::success($response, "Update successfully", 200);
        }  catch (\Throwable $th) {
            DB::rollback();
            return ResponseHelper::error("Update error", $th);
        }
    }
    public function destroy($pid) {
        try {
            $response = $this->postService->destroy($pid);
            return ResponseHelper::success($response, "Delete successfully", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Delete error", $th);
        }
    }
    public function getDetailPost($pid) {
        try {
            $response = $this->postService->findDetailPost($pid);
            return ResponseHelper::success($response, "Create successfully", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
    public function ApprovePost($pid) {
        try {
            $response = $this->postService->findApprovePost($pid);
            return ResponseHelper::success($response, "Create successfully", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi", $th);
        }
    }
 
    //  ----------------------
}