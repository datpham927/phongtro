<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;  
use App\Service\Interfaces\AuthServiceInterface;
use Illuminate\Http\Request;
use Throwable; 
class AuthControllers extends Controller
{
    protected $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService; 
     // "auth:api": yêu cầu người dùng phải được xác thực thông qua guard api. 
     // Người dùng cần có token hợp lệ để truy cập các phương thức được bảo vệ bởi middleware này.
     // Áp dụng: Middleware này áp dụng cho tất cả các phương thức trong controller,
     // "['except' => ['register','login']":  ngoại trừ các phương thức user và logout.
        // $this->middleware('auth:api', ['except' => ['register','login','resetPasswordPost','changePasswordPost']]);
    }
    public function register(Request $request){
        try {
            $response = $this->authService->register($request); 
            return ResponseHelper::success($response,'User created successfully');
        } catch (Throwable $th) { //catch error
            return ResponseHelper::error('An error occurred while creating the user.',$th,203);
        }
    }
 
    public function login(Request $request) {
         try {
            $response = $this->authService->login($request); 
            return ResponseHelper::success($response,'Login successfully');
         } catch (Throwable $th) {
            return ResponseHelper::error('An error occurred while login the user.',$th);
         }
    }
    public function logout(Request $request) { 
        try {
            $this->authService->logout($request);
            return  ResponseHelper::success(null,'Logged out',200);
           } catch (Throwable $th) {
            return  ResponseHelper::error('Error logout', $th);
           }
    } 
    public function refreshToken(Request $request) { 
        try {
            $response = $this->authService->refreshToken($request); 
            return ResponseHelper::success($response,'Successfully');
        } catch (Throwable $th) {
            return  ResponseHelper::error('Error', $th);
        }
    }
    protected function resetPasswordPost(Request $request) {
         try {
              $this->authService->resetPasswordPost($request);
                return ResponseHelper::success(null,'Email sent successfully');
         } catch (Throwable $th) {
            return ResponseHelper::error('Email sent error',$th);
         }
    }

 
    protected function changePasswordPost(Request $request, $token) {
        try {
            $response = $this->authService->changePasswordPost($request, $token);
            if ($response) {
                return ResponseHelper::success(null, 'Password changed successfully');
            }
            return ResponseHelper::error('Password change failed', null, 400);
        } catch (Throwable $th) {
            return ResponseHelper::error('An unexpected error occurred', $th);
        }
    }
    
}