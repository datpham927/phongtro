<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_attributes', function (Blueprint $table) {
            // UUID làm khóa chính
            $table->uuid('id')->primary();
            // Khóa ngoại UUID cho bảng 'posts'
            $table->uuid('post_id');
            // Các trường khác
            $table->string('target');
            $table->string('type_post');
            // Thời gian tạo và cập nhật
            $table->timestamps();
            // Định nghĩa khóa ngoại
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade') ->onUpdate('cascade') ;
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_attributes');
    }
};
