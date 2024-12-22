<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface UserRepositoryInterface extends BaseRepositoryInterface
{
      public function findUserByEmail($email);
      public function findUserByToken($token);
      public function  findByIdAndDeposit($uid,$amount);
}
