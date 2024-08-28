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
 
}