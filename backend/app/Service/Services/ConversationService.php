<?php
namespace App\Service\Services;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation; 
use App\Models\UserConversation;
use App\Service\Interfaces\ConversationServiceInterface;
use App\Util; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ConversationService  implements ConversationServiceInterface
{
    public function create($request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
            'receiver_id' => 'required|string',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $sender_id = $request->input('user_id');
        $receiver_id = $request->input('receiver_id');
        // Kiểm tra xem cuộc hội thoại đã tồn tại giữa hai người dùng chưa
        $conversation = Conversation::whereHas('userConversations', function ($query) use ($sender_id, $receiver_id) {
            $query->select('conversation_id')
                  ->whereIn('user_id', [$sender_id, $receiver_id])
                  ->groupBy('conversation_id')
                  ->havingRaw('COUNT(DISTINCT user_id) = 2');
        })->first();
        // SELECT c.*
        // FROM conversations c
        // JOIN user_conversations uc ON c.id = uc.conversation_id
        // WHERE uc.user_id IN (:sender_id, :receiver_id)
        // GROUP BY uc.conversation_id
        // HAVING COUNT(DISTINCT uc.user_id) = 2
        // LIMIT 1;
        // Nếu chưa có, tạo một cuộc hội thoại mới
        // if (!$conversation) {
        //     $conversation = Conversation::create([
        //         'id' => Util::uuid(),
        //     ]);
        //     if($conversation){
        //    // Thêm người dùng vào bảng user_conversations
        //     UserConversation::insert([
        //         [  'id' => Util::uuid(),'conversation_id' => $conversation->id, 'user_id' => $sender_id],
        //         [  'id' => Util::uuid(),'conversation_id' => $conversation->id, 'user_id' => $receiver_id],
        //     ]);
        //     }
        // }
         return $conversation;
    }

    public function findAll($user_id)
    {
        // Lấy danh sách các cuộc hội thoại mà người dùng tham gia
        $conversations = Conversation::join('user_conversations as uc', 'uc.conversation_id', '=', 'conversations.id')
            ->where('conversations.id', '083f8c8b-ff21-41bc-9ff6-f6f72d12ee7d')
            ->where('uc.user_id', '!=', 'cf7066ea-3425-43bd-acb0-5ce512a7998e')
            ->select('conversations.id', 'uc.user_id') // Lấy tất cả cột từ bảng conversations và user_id từ user_conversations
            ->withCount([
                    'messages as total_unread_messages' => function ($query) use ($user_id) {
                        $query->where('user_id', '!=', $user_id)
                              ->where('is_read', false);
                    }
                ])
            ->get();
        return ConversationResource::collection($conversations);
    }
}