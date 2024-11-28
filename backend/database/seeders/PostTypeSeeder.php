<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // [93748deuy37rrgg6f4t46,jdshffefeygfye64343,vhdufhdue87548,sdfer8549598fjf485,fhdfhueheffueuughyr8]
        DB::table('post_types')->insert([
            [
                'id' => 'tinvipnoibat',
                'name' => 'Tin VIP Nổi Bật',
                'description' => 'TIÊU ĐỀ IN HOA MÀU ĐỎ, gắn biểu tượng 5 ngôi sao màu vàng và hiển thị to và nhiều hình hơn các tin khác. Nằm trên tất cả các tin khác, được hưởng nhiều ưu tiên và hiệu quả giao dịch cao nhất. Đồng thời xuất hiện đầu tiên ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó
Tin đăng VIP hiển thị ngay, không cần chờ.',
                'priority' => 1,
                'price' => 500000,
                "expiration_time"=>24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'tinvip1',
                'name' => 'Tin VIP 1',
                'description' => 'TIÊU ĐỀ IN HOA MÀU HỒNG, gắn biểu tượng 4 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1 và trên các tin khác.
                Tin đăng VIP hiển thị ngay, không cần chờ.',
                'priority' => 2,
                'price' => 400000,
                "expiration_time"=>20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'tinvip2',
                'name' => 'Tin VIP 2',
                'description' => 'TIÊU ĐỀ IN HOA MÀU CAM, gắn biểu tượng 3 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin VIP 2 và trên các tin khác.
                Tin đăng VIP hiển thị ngay, không cần chờ.',
                'priority' => 3,
                "expiration_time"=>16,
                'price' => 300000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'sdfer8549598fjf485',
                'name' => 'Tin VIP 3',
                'description' => 'TIÊU ĐỀ IN HOA MÀU XANH, gắn biểu tượng 2 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin VIP 2, Tin VIP 3 và trên các tin khác.
                Tin đăng VIP hiển thị ngay, không cần chờ.',
                'priority' =>4,
                "expiration_time"=>10,

                'price' => 200000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'fhdfhueheffueuughyr8',
                'name' => 'Tin miễn phí',
                'description' => 'Tiêu đề màu mặc định, viết thường. Hiển thị sau các tin VIP.
                Tin đăng sẽ phải chờ phê duyệt trước khi hiển thị.',
                'priority' => 5,
                "expiration_time"=>4,
                'price' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
