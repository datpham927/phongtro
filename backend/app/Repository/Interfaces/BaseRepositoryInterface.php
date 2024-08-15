<?php

namespace App\Repository\Interfaces;


interface BaseRepositoryInterface
{
    function findAll($limit=5, $sort, $page=1,array $filter=null, $select=null);
    function create(array $data);
    function findByIdAndUpdate($id, array $data, $options = []);
    function findById($id,$option = null);
    function findByIdAndDelete($id);
}