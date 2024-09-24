<?php
namespace App\Service\Services;

use App\Http\Resources\UserResource;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Service\Interfaces\UserServiceInterface;
use App\Util;
use Illuminate\Support\Str;

class UserService implements UserServiceInterface
{
    protected $userRepository;
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function findUser($user_id){ 
         $user=$this->userRepository->findById($user_id);
         return new UserResource( $user);
    }

    public function updateProfile($request){
        $payload=$request->all();
        $user_id=$request['user_id'];
        unset( $payload['user_id']);
        $user=$this->userRepository->findByIdAndUpdate($user_id,  $payload);
        return new UserResource( $user);
    }

    public function addUser($request){
        $payload=$request->all();
        unset($payload['user_id']);
        $payload['id'] = Util::uuid();
        $payload['password']    = bcrypt( $payload['password']);
        $user=$this->userRepository->create( $payload);
        return new UserResource( $user);
    }
    public function updateUser($request,$uid){
        $payload=$request->all();
        unset( $payload['user_id']);
        $user=$this->userRepository->findByIdAndUpdate($uid,  $payload);
        return new UserResource( $user);
    }
    public function findAllUser($payload, $adminId){
        $limit=$payload['limit'];
        $page=$payload['page'];
        $filter['admin_id']=$adminId;
       return $this->userRepository->findAll($limit,null,$page, $filter);
    }

    public function findDeleteUser($uid){
        $this->userRepository->findByIdAndDelete($uid);
    }
}