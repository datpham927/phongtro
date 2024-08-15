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
            $table->uuid('id')->primary(); // UUID làm khóa chính
            $table->uuid('post_id');
            $table->string('city_name');
            $table->string('district_name');
            $table->string('ward_name');
            $table->string('city_code');
            $table->string('district_code');
            $table->string('ward_code');
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
