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
        Schema::create('post_addresses', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID as primary key
            $table->string('city_name');
            $table->string('district_name');
            $table->string('ward_name');
            $table->string('city_slug');
            $table->string('district_slug');
            $table->string('ward_slug');
            $table->string('address_detail');
            $table->text('map');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_addresses');
    }
};
