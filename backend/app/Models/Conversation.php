<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];
    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id');
    }
    public function userConversations()
    {
        return $this->hasMany(UserConversation::class);
    }
    public function otherUser($currentUserId)
    {
        return User::where('id', '!=', $currentUserId)->first();
    }
    
}
