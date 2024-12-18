<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostType extends Model
{
    protected $keyType = 'string';
    protected $fillable = ['description','price', 'expiration_time'];
    use HasFactory;
}
