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

//auth:api yêu cầu người dùng phải được xác thực thông qua guard api. 
// Người dùng cần có token hợp lệ để truy cập các phương thức được bảo vệ bởi middleware này.
// Áp dụng: Middleware này áp dụng cho tất cả các phương thức trong controller,
//  ngoại trừ các phương thức user và logout.
        $this->middleware('auth:api', ['except' => ['register','login']]);
    }
    public function register(Request $request){
        try {
            $response = $this->authService->register($request);
            return ResponseHelper::success($response);
        } catch (ValidationException $e) { // catch ngoại lệ validation
            return ResponseHelper::error('Validation error', 422, $e->getMessage());
        } catch (\Exception $e) { //catch error
            return ResponseHelper::error('An error occurred while creating the user.', 500, $e->getMessage());
        }
    }
   

    protected function credentials($req)
    {        
        return ['email' => $req->email, 'password' => $req->password ];
    }

    // protected function login(Request $req)
    // {
    //     if (!$token = auth()->attempt($this->credentials($req))) {
    //         return response()->json(['message' => 'Invalid credentials'], 400);
    //     }
    //     return response()->json([
    //         'status' => 'success',
    //         'user' => $this->getUser(),
    //         'authorization' => [
    //             'access_token' => $token,
    //             'token_type' => 'bearer',
    //         ]
    //     ]);
    // }
     
    protected function getUser()
    {
        $user = Auth::user();
        return [
            "user"=> $user 
        ];
    }

    // protected function logout()
    // {
    //     Auth::logout();
    //     return response()->json(['message' => 'Logged out']);
    // }

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