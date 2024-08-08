<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService; 
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class AuthControllers extends Controller
{
    protected $redirectTo = '/home';
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService; 
// "auth:api": yêu cầu người dùng phải được xác thực thông qua guard api. 
// Người dùng cần có token hợp lệ để truy cập các phương thức được bảo vệ bởi middleware này.
// Áp dụng: Middleware này áp dụng cho tất cả các phương thức trong controller,
//  " ['except' => ['register','login']":  ngoại trừ các phương thức user và logout.
        $this->middleware('auth:api', ['except' => ['register','login']]);
    }
    public function register(Request $request){
        try {
            $response = $this->authService->register($request);
            return ResponseHelper::success($response,'User created successfully');
        } catch (\Exception $e) { //catch error
            return ResponseHelper::error('An error occurred while creating the user.',$e,203);
        }
    }
 
    public function login(Request $request) {
         try {
            $response = $this->authService->login($request);
            return ResponseHelper::success($response,'User login successfully');
         } catch (\Throwable $th) {
            return ResponseHelper::error('An error occurred while login the user.',$th);
         }
    }
    public function logout() { 
        try {
            $this->authService->logout();
            return  ResponseHelper::success(null,'Logged out',200);
           } catch (\Throwable $th) {
            return  ResponseHelper::error('Error logout', $th);
           }
    } 
    public function refreshToken() { 
        try {
            $response = $this->authService->refreshToken();
            return  ResponseHelper::success($response,'Refresh token successfully',200);
        } catch (\Throwable $th) {
            return  ResponseHelper::error('Error logout', $th);
        }
    }

    // protected function resetPasswordPost() {
    //     $email = request()->input('email');
    //     $user = User::query()
    //         ->select('User.id')
    //         ->where('User.email', $email)
    //         ->first();
    //     if ($user) {
    //         $token = Str::random(40);
    //         $user->update([ 'password_reset_token' => $token ]);
    //         Util::sentMail('RESET', $email, $token);
    //     }
    //     else {
    //         abort(404);
    //     }
    // }

    // protected function changePassword($token) {
    //     $user = User::query()
    //         ->select('User.id')
    //         ->where('User.password_reset_token', $token)
    //         ->first();
    //     if ($user) {
    //     }
    //     else {
    //         abort(404);
    //     }
    // }

    // protected function changePasswordPost($token) {
    //     $user = User::query()
    //         ->select('User.id')
    //         ->where('User.password_reset_token', $token)
    //         ->first();
    //     if ($user) {
    //         $user->update([
    //             'password' => Hash::make(request()->input('password')),
    //             'password_reset_token' => null,
    //         ]);
    //     }
    //     else {
    //         abort(404);
    //     }
    // }
}