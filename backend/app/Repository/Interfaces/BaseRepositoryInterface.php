<?php

namespace App\Repository\Interfaces;


interface BaseRepositoryInterface
{
    function findAll($sort=null,array $filters=null);
    function create( $data);
    function findByIdAndUpdate($id,  $data);
    function findById($id );
    function findByIdAndDelete($id);
}