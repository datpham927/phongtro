<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Service\Interfaces\MessageServiceInterface;
use Illuminate\Http\Request;

class MessageController extends Controller
{
   private  $messageService;
   public function __construct(MessageServiceInterface $messageService)
   {
       $this->messageService = $messageService;  
   }
   // Hiển thị tin nhắn trong cuộc hội thoại
   public function getAllMessage(Request $request,$conversation_id)
   {
      try { 
         $response= $this->messageService->findAllMessages( $conversation_id,$request->user_id);
         return ResponseHelper::success($response,"successfully",200);
     } catch (\Throwable $th) {
         return ResponseHelper::error("error",$th);
     } 
      }
   // Gửi tin nhắn trong cuộc hội thoại
   public function sendMessage(Request $request,$conversation_id)
   { 
      try {   
         $response= $this->messageService->sendMessage( $request,$conversation_id);
         return ResponseHelper::success($response,"successfully",200);
     } catch (\Throwable $th) {
         return ResponseHelper::error("error",$th);
     } 
   }
}
