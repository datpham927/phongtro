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
            $table->uuid('id')->primary(); // UUID làm khóa chính
            $table->uuid('post_id');
            $table->string('target');  
            $table->string('type');   
            $table->date('expire');  
            $table->string('rental_area');  
            $table->timestamps();
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
