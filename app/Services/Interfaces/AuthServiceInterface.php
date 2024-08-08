<?php

namespace App\Services\Interfaces;

interface AuthServiceInterface
{
    public function register($request);
    public function login($request);
}
