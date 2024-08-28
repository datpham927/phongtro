<?php

namespace Database\Seeders;

use App\Util;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id'=>"1f2efcd2-d886-4643-a9e5-f1beb8df0c21",
                'name' => 'Diễm Chiêu', 
                'phone' => '0328430561',
                'zalo' => '0328430561',
                'email' => 'diemchieu1@gmail.com',
                'password' => bcrypt('11111111'),
                'type' => 'lease',
            ],
            [
                'id'=>"78733a14-7b26-4da0-83c5-77f4032ecfab",
                'name' => 'Đạt Phạm',
                'phone' => '0328430561',
                'zalo' => '0328430561',
                'email' => 'datp1907@gmail.com', // Đảm bảo email là duy nhất
                'password' => bcrypt('11111111'),
                'type' => 'lease',
            ],
            [
                'id'=>"cf7066ea-3425-43bd-acb0-5ce512a7998e",
                'name' => 'Uyển Nhi',
                'phone' => '0328430561',
                'zalo' => '0328430561',
                'email' => 'datp927@gmail.com', // Đảm bảo email là duy nhất
                'password' => bcrypt('11111111'),
                'type' => 'lease',
            ],
            [
                'id'=>"f2728809-6b77-47c6-8a59-c6497717995a",
                'name' => 'Minh Hiệp',
                'phone' => '0328430561',
                'zalo' => '0328430561',
                'email' => 'dpshopvn@gmail.com', // Đảm bảo email là duy nhất
                'password' => bcrypt('11111111'),
                'type' => 'admin',
            ],[
                'id'=>"88d13437-a0a8-4a46-8060-7cc4f9f9787d",
                'name' => 'admin',
                'phone' => '0328430561',
                'zalo' => '0328430561',
                'email' => 'admin@gmail.com', // Đảm bảo email là duy nhất
                'password' => bcrypt('11111111'),
                'type' => 'admin',
            ],
            // Thêm các bản ghi khác nếu cần
        ]);
    }
}
