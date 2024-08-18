<?php

namespace App;

use Carbon\Carbon;
use DateTime; 
use Illuminate\Support\Str;

class Util {
    
    public static function slug($value) {
        return (string) Str::of($value)->slug('-');
    }
    public static function uuid() {
        return (string) Str::uuid();
    }
    public static function extractNumber($input)
    {
        preg_match('/(\d+)(?=\D)/', $input, $matches);
        // Lấy số từ kết quả
        $number = $matches[0] ?? null;
        return $number; 
    }
    public static function getRandomDateFromNow() {
        // Ngày hiện tại
        $now = Carbon::now();
        // Ngày tối đa có thể tạo ra (sau $days ngày từ bây giờ)
        $endDate = $now->copy()->addDays(90);
        // Ngày bắt đầu để tạo ngày ngẫu nhiên (ngày hiện tại cộng thêm 30 ngày)
        $startDate = $now->copy()->addDays(30);
        // Tạo một ngày ngẫu nhiên trong khoảng từ $startDate đến $endDate
        $randomTimestamp = mt_rand($startDate->timestamp, $endDate->timestamp);
        $randomDate = Carbon::createFromTimestamp($randomTimestamp);
        return $randomDate->toDateString();
    }
    // self::staticMethod() được sử dụng để gọi phương thức 
    // tĩnh staticMethod từ bên trong lớp MyClass mà không 
    // cần tạo một đối tượng của lớp.
    public static function formatDateStr($value, $type = null) {
        switch ($type) {
            case 'time':
                return self::getTime($value)->format('H:i:s');
            case 'date':
                return self::getDate($value)->format('Y-m-d');
            default:
                return self::getDateTime($value)->format('H:i:s Y-m-d');
        }
    }
    
    private static function getTime($value) {
        return new DateTime($value);
    }

    private static function getDate($value) {
        return new DateTime($value);
    }

    private static function getDateTime($value) {
        return new DateTime($value);
    }

   

   
}
