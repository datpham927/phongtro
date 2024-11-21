<?php

namespace App\Service\Interfaces;

interface PostTypeServiceInterface
{
    public function findAll($request);
    public function update($request, $id);
}
