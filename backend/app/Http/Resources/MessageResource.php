<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sender_id'           => $this->sender_id,
            'conversation_id'     => $this->conversation_id,
            'message'             => $this->message,
            'is_read'             => $this->is_read,
            'created_at'          => $this->is_read,
        ];
    }
}
