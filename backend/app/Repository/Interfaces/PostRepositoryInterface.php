<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface PostRepositoryInterface extends BaseRepositoryInterface
{ 
    public function findPostDetailById ($pid);
    public function findRelatedPostByAddress($addressId); 
    public function findAllPostExpiredForShop($limit, $sort, $page, $shopId); 
    public function findAllUnapprovedPosts($limit,$sort, $page); 
    public function findByIdAndApprovePost($pid);
}
