<?php

namespace App\Services\Interfaces;

interface AuthServiceInterface
{
    public function register($request);
    public function login($request);
    public function  logout();
    public function refreshToken();
    public function resetPasswordPost($request);
}
