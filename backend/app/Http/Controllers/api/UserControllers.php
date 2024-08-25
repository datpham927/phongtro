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

      public function getUser(Request $request){
            try {
                  $response = $this->userService->findUser($request->user_id);
                  return ResponseHelper::success($response, "Successfully", 200);
              }  catch (\Throwable $th) {
                  return ResponseHelper::error("Error", $th);
              }
      }
}
