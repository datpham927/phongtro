<?php

namespace App\Helpers;

use Exception;
use Illuminate\Support\Facades\Cookie;
use Throwable;
use Carbon\Carbon;
class MyHelper {
   static function handleFilterByDate($dateFilter) {
        $today = Carbon::now();
        // Initialize default date range
        $fromDate = $today->copy()->startOfMonth();
        $toDate = $today->copy()->endOfMonth();
        // Check for the date filter in the request
        if ($dateFilter) { 
            switch ($dateFilter) {
                case '7ngay':
                    $fromDate = $today->copy()->subDays(7)->startOfDay();
                    $toDate = $today->copy()->endOfDay();
                    break;
                case 'thangtruoc':
                    $fromDate = $today->copy()->subMonth()->startOfMonth();
                    $toDate = $today->copy()->subMonth()->endOfMonth();
                    break;
                case 'thangnay':
                    $fromDate = $today->copy()->startOfMonth();
                    $toDate = $today->copy()->endOfMonth();
                    break;
                case '365ngayqua':
                    $fromDate = $today->copy()->subDays(365)->startOfDay();
                    $toDate = $today->copy()->endOfDay();
                    break;
                default:
                    $fromDate = $today->copy()->startOfMonth();
                    $toDate = $today->copy()->endOfMonth();
                    break;
            }
        } 
        return [
           "fromDate"=> $fromDate,
            "toDate"=>$toDate,
        ];
    }
}
?>