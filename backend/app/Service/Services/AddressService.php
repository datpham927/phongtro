<?php
namespace App\Service\Services;

use App\Repository\Interfaces\AddressRepositoryInterface;
use App\Service\Interfaces\AddressServiceInterface;

class AddressService implements AddressServiceInterface
{
    protected $addressRepository;
    public function __construct(AddressRepositoryInterface $addressRepository)
    {
        $this->addressRepository = $addressRepository;
    }
    public function findAllDistrict($city_slug){
          return $this->addressRepository->findDistrictByCitySlug($city_slug);
    }
    public function findAllWard($city_slug,$district_slug){
        return $this->addressRepository->findWardByCityAndDistrictSlug($city_slug,$district_slug);

    }

    public function findAllDistrictBelongCategory($category_slug,$city_slug){
        return $this->addressRepository->findDistrictBelongCategoryByCitySlug($category_slug,$city_slug);
  }
  public function findAllWardBelongCategory($category_slug,$city_slug,$district_slug){
      return $this->addressRepository->findWardBelongCategoryByCityAndDistrictSlug($category_slug,$city_slug,$district_slug);

  }

    public function findNameWard($ward_slug){
        return $this->addressRepository->findNameWardByWardSlug($ward_slug);
    }
}