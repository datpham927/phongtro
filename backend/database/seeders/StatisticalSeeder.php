<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatisticalSeeder extends Seeder
{
    public function run()
    {
        // Thêm nhiều dữ liệu vào bảng `statisticals`
        DB::table('statisticals')->insert([
            [
                'total_transactions' => 100,
                'total_revenue' => 5000000.00,
                'transaction_day' => '2024-12-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 120,
                'total_revenue' => 6000000.00,
                'transaction_day' => '2024-12-16',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 150,
                'total_revenue' => 7500000.00,
                'transaction_day' => '2024-12-17',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 180,
                'total_revenue' => 9000000.00,
                'transaction_day' => '2024-12-18',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 200,
                'total_revenue' => 10000000.00,
                'transaction_day' => '2024-12-19',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 250,
                'total_revenue' => 12500000.00,
                'transaction_day' => '2024-12-20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 300,
                'total_revenue' => 15000000.00,
                'transaction_day' => '2024-12-21',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 350,
                'total_revenue' => 17500000.00,
                'transaction_day' => '2024-12-22',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 400,
                'total_revenue' => 20000000.00,
                'transaction_day' => '2024-12-23',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'total_transactions' => 450,
                'total_revenue' => 22500000.00,
                'transaction_day' => '2024-12-24',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
