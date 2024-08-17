<?php

namespace App;

use DateTime; 
use Illuminate\Support\Str;

class Util {
    
    public static function slug($value) {
        return (string) Str::of($value)->slug('-');
    }
    public static function uuid() {
        return (string) Str::uuid();
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
