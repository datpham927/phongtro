<?php
namespace App\Service\Services;

use App\Http\Resources\UserResource;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Service\Interfaces\UserServiceInterface;
use App\Util;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class UserService implements UserServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Tìm người dùng và lưu vào cache
    public function findUser($user_id)
    { 
        $cacheKey = "user:" . $user_id;
        $user = Cache::remember($cacheKey, 3600*24, function () use ($user_id) {
               return $this->userRepository->findById($user_id);
          });
        return new UserResource($user);
    }

    // Cập nhật thông tin người dùng
    public function updateProfile($request)
    {
        $payload = $request->all();
        $user_id = $request['user_id'];
        unset($payload['user_id']);
        // Cập nhật cơ sở dữ liệu
        $user = $this->userRepository->findByIdAndUpdate($user_id, $payload);
        // Cập nhật cache sau khi người dùng được cập nhật
        $cacheKey = "user:" . $user_id;
        Cache::put($cacheKey, $user, 3600*24);
        return new UserResource($user);
    }

    // Thêm người dùng
    public function addUser($request)
    {
        $payload = $request->all();
        unset($payload['user_id']);
        $payload['id'] = Util::uuid();
        $payload['password'] = bcrypt($payload['password']);
        // Tạo người dùng mới
        $user = $this->userRepository->create($payload);
        // Lưu vào cache
        $cacheKey = "user:" . $user->id;
        Cache::put($cacheKey, $user, 3600*24);
        return new UserResource($user);
    }

    // Cập nhật thông tin người dùng
    public function updateUser($request, $uid)
    {
        $payload = $request->all();
        unset($payload['user_id']);
        // Cập nhật cơ sở dữ liệu
        $user = $this->userRepository->findByIdAndUpdate($uid, $payload);
        // Cập nhật cache sau khi người dùng được cập nhật
        $cacheKey = "user:" . $uid;
        Cache::put($cacheKey, $user, 3600*24);
        return new UserResource($user);
    }

    // Tìm tất cả người dùng
    public function findAllUser($payload)
    {
        $limit = $payload['limit'];
        $page = $payload['page']; 
        return $this->userRepository->findAll($limit, null, $page);
    }

    // Xóa người dùng
    public function findDeleteUser($uid)
    {
        $this->userRepository->findByIdAndDelete($uid);
        // Xóa cache của người dùng
        $cacheKey = "user:" . $uid;
        Cache::forget($cacheKey);
    }
}
