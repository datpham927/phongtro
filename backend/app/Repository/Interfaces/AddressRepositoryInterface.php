<?php

namespace App\Repository\Interfaces;
interface AddressRepositoryInterface  
{ 
    public function findDistrictByCitySlug($city_slug);
    public function findWardByCityAndDistrictSlug($city_slug,$district_slug);
    public function findDistrictBelongCategoryByCitySlug($category_slug,$city_slug);
    public function findWardBelongCategoryByCityAndDistrictSlug($category_slug,$city_slug,$district_slug);
    public function  findNameWardByWardSlug($ward_slug);

}
