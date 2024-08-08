<?php

namespace App\Repository\Interfaces;


interface BaseRepositoryInterface
{
    function getAll();
    function create(array $data);
    function findByIdAndUpdate($id, array $data, $options = []);
    function findById($id,$option = null);
    function findByIdAndDelete($id);
}