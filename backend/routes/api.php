<?php

use App\Http\Controllers\api\AuthControllers;
use App\Http\Controllers\api\CategoryControllers;
use App\Http\Controllers\api\PostControllers;
use Illuminate\Support\Facades\Route;

  
// Nhóm các route liên quan đến người dùng
Route::prefix('v1/user')->group(function () {
    Route::post('/register', [AuthControllers::class, 'register']) ;
    Route::post('/login', [AuthControllers::class, 'login']) ;
    Route::get('/logout', [AuthControllers::class, 'logout'])  ;
    Route::get('/refresh_token', [AuthControllers::class, 'refreshToken']) ;
    Route::post('/reset_password', [AuthControllers::class, 'resetPasswordPost']) ;
    Route::post('/{token}/change_password', [AuthControllers::class, 'changePasswordPost']);
});

// Nhóm các route liên quan đến danh mục
Route::prefix('v1/category')->group(function () {
    Route::get('/all', [CategoryControllers::class, 'getAll']) ;
    Route::post('/add', [CategoryControllers::class, 'create']) ;
    Route::post('/{cid}/update', [CategoryControllers::class, 'update']) ;
    Route::delete('/{cid}/destroy', [CategoryControllers::class, 'destroy']) ;
});

Route::prefix('v1/post')->group(function () {
    // Route::get('/all', [PostControllers::class, 'getAll']) ;
    Route::post('/add', [PostControllers::class, 'create']) ;
    Route::post('/{pid}/update', [PostControllers::class, 'update']) ;
    Route::delete('/{pid}/destroy', [PostControllers::class, 'destroy']) ;
    Route::get('/{pid}/detail', [PostControllers::class, 'getDetailPost']) ;
});