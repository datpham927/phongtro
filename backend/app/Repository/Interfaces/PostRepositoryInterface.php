<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface PostRepositoryInterface extends BaseRepositoryInterface
{ 

    public function findByIdAndGetDetail($pid);
}
