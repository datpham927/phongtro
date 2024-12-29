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
    public function findAllForShop($shopId,$limit = 5, $sort = 'asc', $page = 1);
    public function  findNewPosts();
    public function  findLocationPosts($city_slug,$district_slug);
}
