<?php

namespace App\Service\Interfaces;

interface UserServiceInterface
{
    public function findUser($user_id);
    public function updateProfile($request);
    public function updateUser($request,$uid);
    public function addUser($request);
    public function findAllUser($payload, $adminId);
    public function findDeleteUser($uid);
}
