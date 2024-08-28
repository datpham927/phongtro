<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];
    use HasFactory;

    public function address()
    {
        return $this->hasOne(Post_address::class, 'post_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    public function area()
    {
        return $this->hasOne(Post_area::class, 'post_id', 'id');
    }

    public function price()
    {
        return $this->hasOne(Post_price::class, 'post_id', 'id');
    }

    public function attribute()
    {
        return $this->hasOne(Post_attribute::class, 'post_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(Post_image::class, 'post_id', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
