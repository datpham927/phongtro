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
    public function toArray(Request $request): array
    {
        $userOne= $this->userOne;
        $userTwo= $this->userTwo;
        return [
              "id"=>$this->id,
              'userOne'=>[
                'id'=>$userOne->id,
                'avatar'=>$userOne->avatar,
                'name'=>$userOne->name,
              ],
              'userTwo'=>[
                'id'=>$userTwo->id,
                'avatar'=>$userTwo->avatar,
                'name'=>$userTwo->name,
              ],
              'totalUnreadMessages' => $this->total_unread_messages,
              "updated_at"=>$this->updated_at,
        ];
    }
}
