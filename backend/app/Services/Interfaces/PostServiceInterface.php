<?php

namespace App\Services\Interfaces;

interface PostServiceInterface
{

    public function getAll($request);
    public function create($request);
    public function getDetailPost($pid);
    public function update($request, $id);
    public function destroy($id);

    

}
