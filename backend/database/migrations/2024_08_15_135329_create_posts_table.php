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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID as primary key
            $table->uuid('user_id');
            $table->string('title');
            $table->string('thumb')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->string('address_detail')->nullable();
            $table->string('target')->nullable()->default('Tất cả');
            $table->uuid('address_id')->nullable(); // Change this from text to uuid
            $table->uuid('category_id');
            $table->uuid('post_type_id');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('address_id')->references('id')
            ->on('post_addresses');
            $table->foreign('post_type_id')->references('id')
            ->on('post_types');
            $table->string('expire_at')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
