<?php

namespace App\Services;

use App\Repository\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\AuthServiceInterface;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use PhpParser\ErrorHandler\Throwing;

class AuthService implements AuthServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function register($request)
    {
        // Generate UUID and merge it into the request data
        $requestData = $request->all();
        $requestData['id'] = (string) Str::uuid();
        // Validate the request data
        $validator = Validator::make($requestData, [
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'confirm_password' => 'required|same:password',
        ]);
        if ($validator->fails()) { throw new ValidationException($validator); }
        // Create the user
        $user = $this->userRepository->create($requestData);
        // Generate token for the user
        $token = Auth::login($user);
        // Token expiration time in seconds
        $expiresIn = Auth::factory()->getTTL() * 60;
        // Return the response
        return [ 
            'user' => $user,
            'authorization' => [
                'access_token' => $token,
                'type' => 'bearer',
                'expires_in' => $expiresIn, // Expiration time in seconds
            ]
        ];
    }
    public function login($request)
    {
        if (!$token = auth()->attempt (['email' => $request->email, 'password' => $request->password ])) {
            return throw new Exception('Password or email not successfully',203);
        }
        $expiresIn = Auth::factory()->getTTL() * 60;
        return [
            'user' =>Auth::user(),
            'authorization' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => $expiresIn,
            ]
        ];
    }

    public function logout()
    {
        Auth::logout();
    }
}
