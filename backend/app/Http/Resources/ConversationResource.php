<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource  extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected $currentUserId;
     public function __construct($resource, $currentUserId)
     {
         parent::__construct($resource);
         $this->currentUserId = $currentUserId;
     }
    public function toArray(Request $request): array
    {
        $user= $this->otherUser(   $this->currentUserId);
        return [
              "id"=>$this->id,
              'receiver'=>[
                'id'=>$user->id,
                'avatar'=>$user->avatar,
                'name'=>$user->name,
              ],
              'totalUnreadMessages' => $this->total_unread_messages,
              "updated_at"=>$this->updated_at,
        ];
    }
}
