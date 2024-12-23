<?php

namespace App\Service\Interfaces;

interface PostServiceInterface
{

    public function findAll($request);
    public function findAllForShop($request);
    public function findAllPostExpiredForShop($request);
    public function create($request);
    public function findDetailPost($pid);
    public function update($request, $id);
    public function destroy($id); 
    public function findRelatedPost ($addressId);
    public function  findAllUnapprovedPosts($request);
    public function  findApprovePost($pid); 
}
