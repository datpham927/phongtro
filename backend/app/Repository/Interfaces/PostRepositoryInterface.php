<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface PostRepositoryInterface extends BaseRepositoryInterface
{ 
    public function findPostDetailById ($pid);
    public function findRelatedPostByAddress($addressId); 
    public function findAllPostExpiredForShop($shopId); 
    public function findAllUnapprovedPosts(); 
    public function findByIdAndApprovePost($pid);
    public function findAllForShop($shopId);
    public function  findNewPosts();
    public function  findLocationPosts($city_slug,$district_slug);
}
