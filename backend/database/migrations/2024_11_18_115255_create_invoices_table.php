<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();// Khóa chính
            $table->enum('transaction_type', ['deposit', 'withdraw']) ;
            $table->uuid('user_id') ;
            $table->decimal('amount', 15, 2) ;
            $table->text('description')->nullable() ;
            // Khóa ngoại
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps(); // Tự động thêm created_at và updated_at
   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
