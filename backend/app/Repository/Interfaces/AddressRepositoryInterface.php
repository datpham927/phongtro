<?php

namespace App\Repository\Interfaces;
interface AddressRepositoryInterface  
{ 
    public function findDistrictByCitySlug($city_slug);
    public function findWardByDistrictSlug($district_slug);
}
