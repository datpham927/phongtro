<?php

namespace App\Service\Services;

use App\Mail\AuthMail;
use App\Models\RefreshToken;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Service\Interfaces\AuthServiceInterface;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;
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
        // create accessToken
         $accessToken = JWT::encode([
            'user_id' => $user->id,
            'email' => $user->email,
            'exp' => time() + 60
         ], env('JWT_SECRET_ACCESS_TOKEN'), 'HS256');
        // create refreshToken
        $refreshToken = JWT::encode([
            'user_id' =>$user->id,
            'email' => $user->email,
        ], env('JWT_SECRET_REFRESH_TOKEN'), 'HS256');
        // thêm vào database
        RefreshToken::create([
            'user_id' => $user->id,
            'refresh_token' => $refreshToken
        ]);
        // Trả về thông tin người dùng và token
        return $this->buildAuthResponse($user, $accessToken, $refreshToken);
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
        if (!Auth::attempt($credentials)) { throw new Exception('Invalid email or password', 403) ;} 
        $refreshTokenDb = RefreshToken::where('user_id', Auth::user()->id)->first();
        if ($refreshTokenDb) throw new Exception('You are logged in', 202); 
        $accessToken = JWT::encode([
            'user_id' => Auth::user()->id,
            'email' => Auth::user()->email,
            'exp' =>  time() + 60 *60*24*10
        ],env('JWT_SECRET_ACCESS_TOKEN'), 'HS256');

        $refreshToken = JWT::encode([
            'user_id' => Auth::user()->id,
            'email' => Auth::user()->email,
        ], env('JWT_SECRET_REFRESH_TOKEN'), 'HS256');
         // thêm vào database
        RefreshToken::create([
            'user_id' => Auth::user()->id,
            'refresh_token' => $refreshToken
        ]);

        return $this->buildAuthResponse(Auth::user(), $accessToken, $refreshToken);
    }
    // Phương thức để đăng xuất người dùng
    public function logout($request) {
    // Lấy token từ header Authorization
    $token = $request->bearerToken();
    if (!$token) Throw new Exception('Token not provided',404); 
    $decodedToken = JWT::decode($token, new Key(env('JWT_SECRET_ACCESS_TOKEN'), 'HS256'));
    // Tìm refresh token liên quan đến user_id
    $refreshToken = RefreshToken::where('user_id', $decodedToken->user_id)->first();
    if ($refreshToken)  $refreshToken->delete();
   
}
    // Phương thức để làm mới token
    public function refreshToken($request)
    {
        $requestToken = $request->input('refresh_token');
        
        // Retrieve the refresh token from the database
        $refreshTokenDB = RefreshToken::where('refresh_token', $requestToken)->first();
    
        if (!$refreshTokenDB) {
            throw new Exception('Refresh Token Not Found', 401);
        }
    
        // Retrieve the user associated with the refresh token
        $userDb = $this->userRepository->findById($refreshTokenDB->user_id);
        
        if (!$userDb) {
            throw new Exception('User Not Found', 404);
        }
    
        // Generate a new access token
        $accessToken = JWT::encode([
            'user_id' => $userDb->id,
            'email' => $userDb->email,
            'exp' => time() + 60 * 60 * 24 * 10 // Token valid for 10 days
        ], env('JWT_SECRET_ACCESS_TOKEN'), 'HS256');
    
        // Generate a new refresh token
        $refreshToken = JWT::encode([
            'user_id' => $userDb->id,
            'email' => $userDb->email
        ], env('JWT_SECRET_REFRESH_TOKEN'), 'HS256');
    
        // Update the refresh token in the database
        $refreshTokenDB->update(['refresh_token' => $refreshToken]);
    
        // Build and return the authentication response
        return $this->buildAuthResponse($userDb, $accessToken, $refreshToken);
    }
    // Phương thức xây dựng phản hồi chứa thông tin người dùng và token
    private function buildAuthResponse($user, $access_token,$refresh_token) {
        return [
            'user_id' => $user->id,
            'authorization' => [
                'access_token' => $access_token,
                'refresh_token' => $refresh_token,
                'token_type' => 'bearer',
            ]
        ];
    }
      public function resetPasswordPost($request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);
        if ($validator->fails()) { throw new ValidationException($validator);  }    
        $email = request()->input('email');
        $user =$this->userRepository->findUserByEmail($email);
        if ($user) {
            $data["token"] = Str::random(40);
            $data["expire"] =now()->addMinutes(5);
            $user->update([ 'password_reset_token' => $data["token"]  ,
               "password_token_expires"=> $data["expire"]
         ]);
            Mail::to($email)->cc(env("MAIL_SENDER"))->send(new AuthMail($data));
           return true;
        }
        return  false;
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
}