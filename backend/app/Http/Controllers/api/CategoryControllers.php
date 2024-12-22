<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\CategoryServiceInterface;
use Illuminate\Http\Request;
use Predis\Response\Status;

class CategoryControllers extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private  $categoryService;
    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;  
    }
    public function getAll(Request $request )
    { 
        
        try {
            $response= $this->categoryService->findAll($request);
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    } 
    public function getCategory(Request $request ,$id)
    { 
        try {
            $response= $this->categoryService->findCategory($id);
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    } 
    
     
    public function create(Request $request)
    {
        try {
            $response= $this->categoryService->create( $request);
            return ResponseHelper::success($response,"Create successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    }
 
         public function update(Request $request, string $cid)
    {
        try {
            $response= $this->categoryService->update($request,$cid);
            return ResponseHelper::success($response,"Update successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Update error",$th);
        }
    }
    public function destroy(string $cid)
    {
        try {
            $this->categoryService->destroy($cid);
            return ResponseHelper::success(null,"Destroy successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Destroy error",$th);
        }
    } 

    // ----------------------

      
    
   
}
