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
        Schema::create('statisticals', function (Blueprint $table) {
            $table->increments('id'); // Khóa chính
            $table->integer('total_transactions')->default(0); // Tổng giao dịch
            $table->decimal('total_revenue', 15)->default(0); // Tổng doanh thu
            $table->string('transaction_day'); // Ngày giao dịch
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statisticals');
    }
};
