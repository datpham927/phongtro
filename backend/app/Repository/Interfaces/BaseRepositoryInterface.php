<?php

namespace App\Repository\Interfaces;


interface BaseRepositoryInterface
{
    function findAll($limit=5, $sort, $page=1,array $filters=null);
    function create( $data);
    function findByIdAndUpdate($id,  $data);
    function findById($id,$option = null);
    function findByIdAndDelete($id);
}