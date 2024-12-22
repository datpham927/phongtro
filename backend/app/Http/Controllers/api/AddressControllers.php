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
                  return ResponseHelper::success($response, "Thành công", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Đã xảy ra lỗi", $th);
              }
      }
      public function getAllWard($city_slug,$district_slug,){
            try {
                  $response = $this->AddressService->findAllWard($city_slug,$district_slug);
                  return ResponseHelper::success($response, "Thành công", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Đã xảy ra lỗi", $th);
              }
      }
      public function getAllDistrictBelongCategory($category_slug,$city_slug){
        try {
              $response = $this->AddressService->findAllDistrictBelongCategory($category_slug,$city_slug);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
  }
  public function getAllWardBelongCategory($category_slug,$city_slug,$district_slug){
        try {
              $response = $this->AddressService->findAllWardBelongCategory($category_slug,$city_slug,$district_slug);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
  }


      public function getAddress($ward_slug){
        try {
              $response = $this->AddressService->findNameWard($ward_slug);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
      }

      public function getCities(){
        try {
              $response = $this->AddressService->findCities();
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
      }
      public function getDistricts($city_slug){
        try {
              $response = $this->AddressService->findDistricts($city_slug);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
      }
      public function getWards($district_slug){
        try {
              $response = $this->AddressService->findWards($district_slug);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
      }
}
