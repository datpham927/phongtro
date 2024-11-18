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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID làm khóa chính
            $table->string('name');
            $table->decimal('account_balance', 15, 2)->default(0);
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->string('zalo')->nullable(); // Cho phép giá trị NULL
            $table->string('facebook')->nullable(); // Cho phép giá trị NULL
            $table->string('password');
            $table->string('password_reset_token')->nullable();
            $table->date('password_token_expires')->nullable();
            $table->string('avatar')->nullable(); // Cho phép giá trị NULL
            $table->enum('type', ['admin', 'hire', 'lease']); // Enum với các giá trị hợp lệ
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
