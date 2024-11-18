<?php

namespace App\Service\Services;

use App\Mail\AuthMail;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Service\Interfaces\AuthServiceInterface;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PHPUnit\Event\Code\Throwable;
class AuthService implements AuthServiceInterface
{
    protected $userRepository;
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function register($request)
    {
        $requestData = $request->all();
        // Tạo UUID cho người dùng mới
        $requestData['id'] = (string) Str::uuid();
        // Xác thực dữ liệu đăng ký
        $validator = Validator::make($requestData, [
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'type' => 'required',
            'password' => 'required|string|min:6',
            'confirm_password' => 'required|same:password',
        ]);
        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) { throw new ValidationException($validator);  }
        // Băm mật khẩu trước khi lưu trữ vào cơ sở dữ liệu
        $requestData['password'] = Hash::make($requestData['password']);
        // xóa trường confirm_password
        unset($requestData['confirm_password']);
        $user = $this->userRepository->create($requestData);
        // tạo token
        $tokens= $this->createTokenPairs($user);
        $accessToken=$tokens["access_token"];  
        $refreshToken=$tokens["refresh_token"];
         
         
        // Trả về thông tin người dùng và token
        return $this->buildAuthResponse($user,$accessToken,$refreshToken);
    }
    // Phương thức để đăng nhập người dùng
    public function login($request)
    {
        // Lấy thông tin đăng nhập từ request
        $credentials = $request->only('email', 'password');
        // Xác thực thông tin đăng nhập
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) { throw new ValidationException($validator);}
        // Thực hiện đăng nhập 
        if (!Auth::attempt($credentials)) { throw new Exception('Email hoặc mật khẩu không chính xác', 403) ;} 
        $user=Auth::user(); 
        // tạo token
        $tokens= $this->createTokenPairs($user);
        $accessToken=$tokens["access_token"];  
        $refreshToken=$tokens["refresh_token"]; 
        
        // Trả về thông tin người dùng và token
        return $this->buildAuthResponse($user,$accessToken,$refreshToken);
    }
    // Phương thức để đăng xuất người dùng
    public function logout($request) {
    // Lấy token từ header Authorization
        $token = $request->bearerToken();
        if (!$token) Throw new Exception('Token not provided',404); 
        Cookie::queue(Cookie::forget('refresh_token'));
}
    // Phương thức để làm mới token
    public function refreshToken($request)
    {
        $requestToken = $request->cookie('refresh_token') ;
        $decodedToken = JWT::decode($requestToken, new Key(config('jwt.refresh_token_secret'), 'HS256'));
        // Retrieve the user associated with the refresh token
        $userDb = $this->userRepository->findById($decodedToken->user_id);
        if (!$userDb) { throw new Exception('User Not Found', 404); }
          // tạo token
          $tokens= $this->createTokenPairs($userDb);
          $accessToken=$tokens["access_token"];  
          $refreshToken=$tokens["refresh_token"];
        // Build and return the authentication response 
        return $this->buildAuthResponse($userDb, $accessToken,$refreshToken);
    }
    // Phương thức xây dựng phản hồi chứa thông tin người dùng và token
    private function buildAuthResponse($user, $access_token,$refreshToken) {
        $exp_rToken = 60 * 24 * 60; // 60 ngày tính theo phút (60 phút * 24 giờ * 60 ngày)
        $cookie = Cookie::make('refresh_token', $refreshToken, $exp_rToken, null, null, true, true, false, 'Lax');
        return [
            'user_id' => $user->id,
            'authorization' => [
                'access_token' => $access_token, 
                'token_type' => 'bearer',
            ],
            'cookie'=>$cookie
        ];
    }
      public function resetPasswordPost($request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);
        if ($validator->fails()) { throw new ValidationException($validator);  }    
        $email = request()->input('email');
        $user =$this->userRepository->findUserByEmail($email);
        if (!$user) throw  new Exception("User not exits!",203) ;
            $data["token"] = Str::random(40);
            $data["expire"] =now()->addMinutes(5);
            $user->update([ 'password_reset_token' => $data["token"]  ,
               "password_token_expires"=> $data["expire"]
             ]);
            Mail::to($email)->cc(env("MAIL_SENDER"))->send(new AuthMail($data));
    } 
    
    public function changePasswordPost($request, $token) {
        $user = $this->userRepository->findUserByToken($token);
        if (!$user) {
            return false;
        }
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $user->update([
            'password' => Hash::make($request->input('password')),
            'password_reset_token' => null,
            "password_token_expires"=> null,
        ]);
        return true;
    }

    private function createTokenPairs($user) {
        // Lấy thông tin secret từ file cấu hình
        $accessTokenSecret = config('jwt.access_token_secret');
        $refreshTokenSecret = config('jwt.refresh_token_secret');
        // Kiểm tra nếu không lấy được secret
        if (!$accessTokenSecret || !$refreshTokenSecret) {
            throw new Exception('JWT secret keys are not properly configured.');
        }
        // Tạo access token với thời gian hết hạn là 10 ngày
        $accessToken = JWT::encode([
            'user_id' => $user->id,
            'email' => $user->email,
            'exp' => time() +  60 * 24 * 60*10// 10 ngày
        ], $accessTokenSecret, 'HS256');
        $exp_rToken = time() + 60 * 24 * 60 * 60; // 60 ngày
        $refreshToken = JWT::encode([
            'user_id' => $user->id,
            'email' => $user->email,
            'exp' => $exp_rToken
        ], $refreshTokenSecret, 'HS256');
        // Trả về mảng chứa access token và refresh token
        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ];
    }
    
}