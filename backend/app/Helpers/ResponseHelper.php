<?php

namespace App\Helpers;

use Exception;
use Illuminate\Support\Facades\Cookie;
use Throwable;

class ResponseHelper
{
    public static function success($data, $message = 'Operation successful', $status = 200)
    {
        $response = [  'status' => true, 'message' => $message];
        if (!is_null($data)) { $response['data'] = $data; } 
       // Tạo cookie với các tham số đúng
        return response()->json($response,  $status);
    }

    public static function successWithCookie($data, $message = 'Operation successful',$cookie, $status = 200)
    {
        $response = [  'status' => true, 'message' => $message];
        if (!is_null($data)) { $response['data'] = $data; } 
       // Tạo cookie với các tham số đúng
        return response()->json($response,  $status)->withCookie($cookie);
    }



    public static function error($message = 'An error occurred', Throwable $e = null, int $status = 500) {
        $validStatusCodes = range(100, 599);
        $statusCode = $status;
        if ($e !== null && $e instanceof Throwable) {
            $exceptionCode = $e->getCode();
            if (in_array($exceptionCode, $validStatusCodes)) {
                $statusCode = $exceptionCode;
            } else {$statusCode = 500;  }
        }
        $errors = null;
        if ($e !== null && $e->getMessage()) { $errors = $e->getMessage();}
        $response = ['status' => false,'message' => $message,];
        if ($errors) {$response['errors'] = $errors;}
        return response()->json($response, $statusCode);
    }
    
    
    
    

}
