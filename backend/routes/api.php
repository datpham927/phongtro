<?php

use App\Http\Controllers\api\AuthControllers;
use App\Http\Controllers\api\CategoryControllers;
use App\Http\Controllers\api\AddressControllers;
use App\Http\Controllers\api\PostControllers;
use App\Http\Controllers\CrawlerControllers;
use App\Http\Middleware\Login;
use Illuminate\Support\Facades\Route;

Route::post('/crawler', [CrawlerControllers::class, 'crawler'])->name('crawler.index');
  
// Nhóm các route liên quan đến người dùng
Route::middleware(Login::class)->post('v1/user/logout', [AuthControllers::class, 'logout']);

Route::prefix('v1/user')->group(function () {
    Route::post('/register', [AuthControllers::class, 'register']) ;
    Route::post('/login', [AuthControllers::class, 'login']) ;
    Route::post('/refresh_token', [AuthControllers::class, 'refreshToken']) ;
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
    Route::get('/all', [PostControllers::class, 'getAll']) ;
    Route::post('/add', [PostControllers::class, 'create']) ;
    Route::post('/{pid}/update', [PostControllers::class, 'update']) ;
    Route::get('/{pid}/detail', [PostControllers::class, 'getDetailPost']) ;
    Route::delete('/{pid}/delete', [PostControllers::class, 'destroy']) ;
    Route::get('/search', [PostControllers::class, 'searchPost']) ;
});

Route::prefix('v1/address')->group(function () {
    Route::get('/{city_lug}/all_district_by_city', [AddressControllers::class, 'getAllDistrict']) ;
    Route::get('/{district_lug}/all_ward_by_district', [AddressControllers::class, 'getAllWard']) ;
});