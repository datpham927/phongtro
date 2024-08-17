<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_price extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];
    use HasFactory;
}
