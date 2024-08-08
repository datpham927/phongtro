<?php

use App\Http\Controllers\AuthControllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/user/register', [ AuthControllers::class, 'register' ]);
Route::post('/user/login', [ AuthControllers::class, 'login' ]);
Route::get('/user/logout', [ AuthControllers::class, 'logout' ]);
Route::get('/user/refresh_token', [ AuthControllers::class, 'refreshToken' ]);