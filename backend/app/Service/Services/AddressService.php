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
    public function findAllWard($district_slug){
        return $this->addressRepository->findWardByDistrictSlug($district_slug);

    }
}