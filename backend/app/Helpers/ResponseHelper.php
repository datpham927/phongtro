<?php

namespace App\Helpers;

use Exception;
use Throwable;

class ResponseHelper
{
    public static function success($data, $message = 'Operation successful', $status = 200)
    {
        $response = [  'status' => $status, 'message' => $message];
        if (!is_null($data)) { $response['data'] = $data; }
        return response()->json($response, 200);
    }

    public static function error($message = 'An error occurred', Throwable $e = null, $status = 500){
        $statusCode = $status;
        $errors = null;
        if ($e) { $errors = $e->getMessage(); $statusCode = $e->getCode()?$e->getCode() : $status; }
        $response = [ 'status' => $statusCode, 'message' => $message];
        if ($errors) {$response['errors'] = $errors;};
        return response()->json($response, $status);
    }
    
    

}