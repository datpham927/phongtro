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
        Schema::create('post_types', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Auto-incrementing primary key
            $table->string('name'); // For the name field
            $table->text('description'); // For the description field
            $table->integer('priority'); // For the priority field, assuming it's an integer
            $table->integer('expiration_time') ;
            $table->integer('price' ); 
            $table->timestamps(); // Created at & Updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_types');
    }
};
