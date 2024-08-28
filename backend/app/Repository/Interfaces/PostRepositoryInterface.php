<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface PostRepositoryInterface extends BaseRepositoryInterface
{ 
    public function findPostDetailById ($pid);
    public function search($limit = 5, $sort = 'asc', $page = 1, array $filters = []);
}
