<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_address extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];
    use HasFactory;

    public function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }
}
