<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\PostTypeServiceInterface;
use Illuminate\Http\Request;

class PostTypeController extends Controller
{
    private  $postTypeService;
    public function __construct(PostTypeServiceInterface $postTypeService)
    {
        $this->postTypeService = $postTypeService;  
    }
    public function getAll(Request $request )
    { 
        
        try {
            $response= $this->postTypeService->findAll($request);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Error",$th);
        }
    } 
         public function update(Request $request, string $ptid)
    {
        try {
            $response= $this->postTypeService->update($request,$ptid);
            return ResponseHelper::success($response,"Update successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Update error",$th);
        }
    }
}