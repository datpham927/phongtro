<?php

namespace App\Service\Interfaces;

interface AddressServiceInterface
{

    public function findAllDistrict($city_slug);
    public function findAllWard($city_slug,$district_slug);
    public function findAllDistrictBelongCategory($category_slug,$city_slug);
    public function findAllWardBelongCategory($category_slug,$city_slug,$district_slug);
    public function findNameWard($ward_slug);
    public function  findCities ();
    public function  findDistricts($city_slug);

    public function  findWards ($district_slug);
}
