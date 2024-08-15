<?php

namespace App\Repository\Repositories;

use App\Models\User;
use App\Repository\Interfaces\UserRepositoryInterface;
use Exception;

class UserRepository implements UserRepositoryInterface
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

  
    function findAll($limit=5, $sort, $page=1,array $filter=null, $select=null)
    {
    
    }

    public function create( $data)
    {
        return $this->user->create($data);
    }

    public function findByIdAndUpdate($id,  $data, $options = [])
    {
        $user=$this->findById($id);
        if(! $user)throw new Exception("User does not exist!",404);
        $user->update($data);
        return $user;
    }

    public function findById($id, $options = null)
    {
        return $this->user->find($id);
    }
    public function findUserByEmail($email)
    {
        return $this->user::where('email', $email)->first();
    }
    
    public function findByIdAndDelete($id)
    {
        $user=$this->findById($id);
        if(! $user)throw new Exception("User does not exist!",404);
        $user->delete();
        return $user;
    }
    public function findUserByToken($token) {
        $user = $this->user
            ->where('password_reset_token', $token)
            ->whereDate('password_token_expires', '>=', now())
            ->first();
        return $user;
    }
    
}
