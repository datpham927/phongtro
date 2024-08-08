<?php

namespace App\Helpers;
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

    public static function error($message = 'An error occurred', $status = 500, $errors = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
