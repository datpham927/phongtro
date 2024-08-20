<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Service\Interfaces\PostServiceInterface;
use Illuminate\Http\Request;

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
            return ResponseHelper::success($response, "Successfully", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Error", $th);
        }
    }
    public function create(StorePostRequest $request) {
        try {
            $response = $this->postService->create($request);
            return ResponseHelper::success($response, "Create successfully", 200);
        }  catch (\Throwable $th) {
            return ResponseHelper::error("Create error", $th);
        }
    }
    public function update(Request $request,$pid) {
        try {
            $response = $this->postService->update($request,$pid);
            return ResponseHelper::success($response, "Update successfully", 200);
        }  catch (\Throwable $th) {
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
            return ResponseHelper::error("Create error", $th);
        }
    }
    //  ----------------------
}