<?php
namespace App\Service\Services;

use App\Http\Resources\UserResource;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Service\Interfaces\UserServiceInterface;

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

 
}