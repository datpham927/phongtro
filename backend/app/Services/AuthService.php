<?php

namespace App\Services;

use App\Mail\AuthMail;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\AuthServiceInterface;
use App\Util;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
        // Tạo người dùng mới thông qua repository
        unset($requestData['confirm_password']);
        $user = $this->userRepository->create($requestData);
        // Tạo token cho người dùng mới
         $token = Auth::login($user);
        // Trả về thông tin người dùng và token
        return $this->buildAuthResponse($user, $token);
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
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        // Thực hiện đăng nhập và lấy token
        if (!$token = Auth::attempt($credentials)) {
            throw new Exception('Invalid email or password', 403);
        } 
        // Trả về thông tin người dùng và token
        return $this->buildAuthResponse(Auth::user(), $token);
    }
    // Phương thức để đăng xuất người dùng
    public function logout()
    {
        // Các access_token sau khi làm mới hoặc đăng xuất 
        // sẽ được thêm vào danh sách đen để tránh việc sử dụng 
        $token = Auth::getToken();
        // Đưa token vào danh sách đen (blacklist) để không thể sử dụng lại
        $this->blacklistToken($token);
        // Đăng xuất người dùng
        Auth::logout();
    }
    // Phương thức để làm mới token
    public function refreshToken()
    { 
        $token = Auth::getToken();
        // Kiểm tra xem access_token có bị đưa vào danh sách đen không (đã đăng xuất)
        if ($this->isTokenBlacklisted($token)) {
            throw new Exception('Token is blacklisted', 403);
        }
        // Lấy thông tin người dùng hiện tại
        $user = Auth::user();
        // Làm mới token
        $newToken = Auth::refresh();
        // Các access_token sau khi làm mới hoặc đăng xuất 
        // sẽ được thêm vào danh sách đen để tránh việc sử dụng 
        // Đưa token cũ vào danh sách đen
        $this->blacklistToken($token);
        // Trả về thông tin người dùng và token mới
        return $this->buildAuthResponse($user, $newToken);
    }
    // Phương thức xây dựng phản hồi chứa thông tin người dùng và token
    private function buildAuthResponse($user, $token)
    {
        return [
            'user_id' => $user->id,
            'authorization' => [
                'access_token' => $token,
                'token_type' => 'bearer',
            ]
        ];
    }
    // Phương thức đưa token vào danh sách đen
    private function blacklistToken($token)
    {
         // Đưa token vào danh sách đen với thời gian sống bằng thời gian sống của token (TTL)
        Cache::put('access_token-blacklist:' . $token, true, Auth::factory()->getTTL() * 60);
    }
    // Phương thức kiểm tra xem token có nằm trong danh sách đen không
    private function isTokenBlacklisted($token)
    {
        return Cache::has('access_token-blacklist:' . $token);
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