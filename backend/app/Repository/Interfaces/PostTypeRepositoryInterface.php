<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface PostTypeRepositoryInterface {
    public function findAll();
    public function findByIdAndUpdate($id,  $data);
    public function  findById($id);

}
