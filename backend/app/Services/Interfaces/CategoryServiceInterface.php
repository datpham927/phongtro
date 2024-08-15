<?php

namespace App\Services\Interfaces;

interface CategoryServiceInterface
{

    public function getAll($request);
    public function create($request);
   

    public function update($request, $id);
    public function destroy($id);

}
