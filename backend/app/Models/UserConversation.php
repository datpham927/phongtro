<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserConversation extends Model
{
    protected $keyType = 'string';
    protected $guarded = [];
    use HasFactory;
}
