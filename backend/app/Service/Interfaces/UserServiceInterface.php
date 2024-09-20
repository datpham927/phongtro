<?php

namespace App\Service\Interfaces;

interface UserServiceInterface
{
    public function findUser($user_id);
    public function updateProfile($request);
     
}
