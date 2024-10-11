<?php
namespace App\Service\Services;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use App\Service\Interfaces\ConversationServiceInterface;
use App\Util;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ConversationService  implements ConversationServiceInterface
{
    public function create($request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
            'receiver_id' => 'required|string',
        ]);
        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $sender_id=$request['user_id'];
        $receiver_id=$request['receiver_id'];
        // Tìm cuộc hội thoại giữa sender và receiver, không cần lồng nhiều điều kiện
        $conversations = Conversation::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where([
                ['user_one_id', '=', $sender_id],
                ['user_two_id', '=', $receiver_id]
            ])->orWhere([
                ['user_one_id', '=', $receiver_id],
                ['user_two_id', '=', $sender_id]
            ]);
        })->first();
        
        if (!$conversations) {
            $conversations = Conversation::create([
                "id"=>Util::uuid(),
                'user_one_id' =>$sender_id,
                'user_two_id' => $receiver_id,
            ]);
        }
        return $conversations;
    }
    public function finAll($user_id)
    {
        // Sử dụng withCount để đếm số tin nhắn chưa đọc thay vì join
        $conversations = Conversation::where('user_one_id', $user_id)
            ->orWhere('user_two_id', $user_id)
            ->withCount([
                'messages as total_unread_messages' => function ($query) use ($user_id) {
                    $query->where('sender_id', '!=', $user_id)  // Exclude messages sent by the current user
                          ->where('is_read', false);  // Only count unread messages
                }
            ])
            ->get();
    
        return ConversationResource::collection($conversations);
    }

}