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
                  return ResponseHelper::success($response, "Successfully", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Error", $th);
              }
      }
      public function getAllUser(Request $request){
        try {
              $payload=$request->all();
              $adminId= $payload['user_id'];
              unset($payload['user_id']);
              $response = $this->userService->findAllUser($payload, $adminId);
              return ResponseHelper::success($response, "Successfully", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Error", $th);
          }
    }

      public function updateProfile(Request $request ){
        try {
              $response = $this->userService->updateProfile($request );
              return ResponseHelper::success($response, "Successfully", 200);
          }  catch (\Throwable $th) {
              return ResponseHelper::error("Error", $th);
          }
    }

        public function addUser(Request $request  ){
            try {
                $response = $this->userService->addUser($request);
                return ResponseHelper::success($response, "Successfully", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Error", $th);
            }
            }
        public function updateUser(Request $request,$uid ){
            try {
                $response = $this->userService->updateUser($request,$uid );
                return ResponseHelper::success($response, "Successfully", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Error", $th);
            }
        }


        public function deleteUser($uid ){
            try {
                  $this->userService->findDeleteUser($uid);
                return ResponseHelper::success(null, "Successfully", 200);
            }  catch (\Throwable $th) {
                return ResponseHelper::error("Error", $th);
            }
        }
}
