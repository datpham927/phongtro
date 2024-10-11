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
        Schema::create('conversations', function (Blueprint $table) {
            // Tạo cột id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
            $table->uuid("id")->primary();
            // Tạo các cột user_one_id và user_two_id kiểu BIGINT UNSIGNED
            $table->uuid('user_one_id');
            $table->uuid('user_two_id');
            // Tạo cột timestamps (created_at, updated_at)
            $table->timestamps();
            // Khóa ngoại tới bảng users cho user_one_id
            $table->foreign('user_one_id')->references('id')->on('users')->onDelete('cascade');
            // Khóa ngoại tới bảng users cho user_two_id
            $table->foreign('user_two_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
