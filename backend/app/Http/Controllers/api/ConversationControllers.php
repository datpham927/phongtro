<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\ConversationServiceInterface;
use Illuminate\Http\Request;

class ConversationControllers extends Controller
{
    private  $conversationService;
    public function __construct(ConversationServiceInterface $conversationService)
    {
        $this->conversationService = $conversationService;  
    }
    public function create(Request $request)
    {
        try {
            $response= $this->conversationService->create($request);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Create error",$th);
        }
    }

    public function getAll(Request $request)
    {
        try { 
            $response= $this->conversationService->finAll( $request['user_id']);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Create error",$th);
        }
    }
}
