<?php

namespace App\Helpers;

use Exception;

class ResponseHelper
{
    public static function success($data, $message = 'Operation successful', $status = 200)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    public static function error($message = 'An error occurred', Exception $e,$status = 500)
    {
        return response()->json([
            'status' => $e->getCode() ? $e->getCode() : $status,
            'message' => $message,
            'errors' => $e->getMessage(),
        ], $e->getCode() ? $e->getCode() : $status);
    }
}
