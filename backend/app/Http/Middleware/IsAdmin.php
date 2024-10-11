<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Nếu bạn đã xác thực người dùng, có thể lấy user từ request thay vì thủ công
        $userId = $request->user_id;
        // Tìm người dùng với ID từ request
        $findUser = User::find($userId);
        // Kiểm tra xem người dùng có tồn tại không
        if (!$findUser || $findUser->type !== 'admin') {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized: User is not admin'
            ], 401);
        }
        unset($request['user_id']);
        // Nếu người dùng là admin, tiếp tục xử lý request
        return $next($request);
    }
}
