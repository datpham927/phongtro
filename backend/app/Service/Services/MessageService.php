<?php
namespace App\Service\Services;

use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Service\Interfaces\ConversationServiceInterface;
use App\Service\Interfaces\MessageServiceInterface;
use App\Util;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use PHPUnit\Event\Code\Throwable;

class MessageService  implements MessageServiceInterface
{
  public function findAllMessages($conversation_id, $user_id) {
    // Tìm conversation
    $conversation = Conversation::find($conversation_id);
    // Kiểm tra nếu không tìm thấy conversation
    if (!$conversation) {
        return  throw new Exception("Conversation not found",404);
    }
    // Lấy các tin nhắn theo conversation, sắp xếp theo created_at
    $messages = $conversation->messages()->orderBy('created_at')->get();
    // Cập nhật tin nhắn chưa đọc của người gửi khác thành đã đọc
    $conversation->messages()
        ->where('sender_id', '!=', $user_id)
        ->where('is_read', false)
        ->update(['is_read' => true]);
    // Trả về tin nhắn đã sắp xếp, không cần gọi lại get() một lần nữa
    return MessageResource::collection($messages);
}
    public function  sendMessage( $request,$conversation_id){
      $validator = Validator::make($request->all(), [ 'message' => 'required|string',]);
    // Nếu xác thực thất bại, ném ra ngoại lệ
    if ($validator->fails()) { throw new ValidationException($validator); }
          $text= $request["message"];
          $sender_id= $request["user_id"];
          $message = Message::create([
            "id"=>Util::uuid(),
            "sender_id" => $sender_id,
            "conversation_id" => $conversation_id,
            "message" => $text,
            ]);
          return  $message;
    }
}