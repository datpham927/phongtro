<?php

namespace App\Service\Interfaces;

interface AuthServiceInterface
{
    public function register($request);
    public function login($request);
    public function  logout($request);
    public function refreshToken($request);
    public function resetPasswordPost($request);
    public function changePasswordPost($request, $token) ;
}
