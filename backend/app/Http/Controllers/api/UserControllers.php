<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\UserServiceInterface;
use Illuminate\Http\Request;

class UserControllers extends Controller
{
    private  $userService;
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;  
    }  
      public function getUser($uid){
            try {
                  $response = $this->userService->findUser($uid);
                  return ResponseHelper::success($response, "Thành công", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Đã xảy ra lỗi", $th);
              }
      }
      public function getAllUser(Request $request){
        try {
              $payload=$request->all();
              $response = $this->userService->findAllUser($payload);
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
    }

      public function updateProfile(Request $request ){
        try {
              $response = $this->userService->updateProfile($request );
              return ResponseHelper::success($response, "Thành công", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Đã xảy ra lỗi", $th);
          }
    }

        public function addUser(Request $request  ){
            try {
                $response = $this->userService->addUser($request);
                return ResponseHelper::success($response, "Thành công", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Đã xảy ra lỗi", $th);
            }
            }
        public function updateUser(Request $request,$uid ){
            try {
                $response = $this->userService->updateUser($request,$uid );
                return ResponseHelper::success($response, "Thành công", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Đã xảy ra lỗi", $th);
            }
        }


        public function deleteUser($uid ){
            try {
                  $this->userService->findDeleteUser($uid);
                return ResponseHelper::success(null, "Thành công", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Đã xảy ra lỗi", $th);
            }
        }

        public function deposit(Request $request){
            try {
                $data= $this->userService->findUserAndDeposit($request['user_id'],$request['amount']);
                return ResponseHelper::success($data , "Thành công", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Đã xảy ra lỗi", $th);
            }
        }


}
