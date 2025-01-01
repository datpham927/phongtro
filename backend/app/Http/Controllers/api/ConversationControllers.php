<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\ConversationServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConversationControllers extends Controller
{
    private  $conversationService;
    public function __construct(ConversationServiceInterface $conversationService)
    {
        $this->conversationService = $conversationService;  
    }
    public function create(Request $request)
    {
        DB::beginTransaction();
        try { 
            $response= $this->conversationService->create($request);
            DB::commit();
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            DB::rollback();
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    }

    public function getAll(Request $request)
    {
        try { 
            $response= $this->conversationService->findAll( $request['user_id']);
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    }
}
