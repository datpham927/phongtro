<?php

namespace App\Service\Interfaces;

interface AddressServiceInterface
{

    public function findAllDistrict($city_slug);
    public function findAllWard($district_slug);
}
