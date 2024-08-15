<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use CategoryService;
use Illuminate\Http\Request;

class CategoryControllers extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private  $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;  
    }
    public function getAll(Request $request )
    { 
        try {
            $response= $this->categoryService->getAll($request);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Error",$th);
        }
    } 
    public function create(Request $request)
    {
        try {
            $response= $this->categoryService->create( $request);
            return ResponseHelper::success($response,"Create successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Create error",$th);
        }
    }
 
         public function update(Request $request, string $id)
    {
        try {
            $response= $this->categoryService->update($request,$id);
            return ResponseHelper::success($response,"Update successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Update error",$th);
        }
    }
    public function destroy(string $id)
    {
        try {
            $this->categoryService->destroy($id);
            return ResponseHelper::success(null,"Destroy successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Destroy error",$th);
        }
    }
    
   
}
