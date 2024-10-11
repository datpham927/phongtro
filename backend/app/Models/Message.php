<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];
    use HasFactory;

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    } 
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
