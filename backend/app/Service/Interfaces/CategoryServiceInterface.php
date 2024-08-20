<?php

namespace App\Service\Interfaces;

interface CategoryServiceInterface
{

    public function findAll($request);
    public function create($request);
    public function update($request, $id);
    public function destroy($id);

}
