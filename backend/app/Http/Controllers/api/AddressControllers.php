<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\AddressServiceInterface;
use Illuminate\Http\Request;

class AddressControllers extends Controller
{

      private  $AddressService;
    public function __construct(AddressServiceInterface $AddressService)
    {
        $this->AddressService = $AddressService;  
    }  

      public function getAllDistrict($city_slug){
            try {
                  $response = $this->AddressService->findAllDistrict($city_slug);
                  return ResponseHelper::success($response, "Successfully", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Error", $th);
              }
      }
      public function getAllWard($district_slug){
            try {
                  $response = $this->AddressService->findAllWard($district_slug);
                  return ResponseHelper::success($response, "Successfully", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Error", $th);
              }
      }
}
