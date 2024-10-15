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
        Schema::create('post_prices', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID làm khóa chính
            $table->uuid('post_id');
            $table->double('order')->default(0); //1
            $table->string('value'); // 1triệu
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_prices');
    }
};
