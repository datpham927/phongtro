<?php

use App\Http\Controllers\api\AuthControllers;
use App\Http\Controllers\api\CategoryControllers;
use App\Http\Controllers\api\AddressControllers;
use App\Http\Controllers\api\PostControllers;
use App\Http\Controllers\api\UserControllers;
use App\Http\Controllers\CrawlerControllers;
use App\Http\Middleware\Login;
use Illuminate\Support\Facades\Route;

Route::post('/crawler', [CrawlerControllers::class, 'crawler'])->name('crawler.index');
  
// Nhóm các route liên quan đến người dùng
Route::middleware(Login::class)->post('v1/auth/logout', [AuthControllers::class, 'logout']);

Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [AuthControllers::class, 'register']) ;
    Route::post('/login', [AuthControllers::class, 'login']) ;
    Route::post('/refresh_token', [AuthControllers::class, 'refreshToken']) ;
    Route::post('/reset_password', [AuthControllers::class, 'resetPasswordPost']) ;
    Route::put('/{token}/change_password', [AuthControllers::class, 'changePasswordPost']);
});
Route::middleware(Login::class)->prefix('v1/user')->group(function () {
    Route::get('/detail', [UserControllers::class, 'getUser']) ;
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
    Route::get('/{address_id}/related-post', [PostControllers::class, 'getRelatedPost']) ;
});

Route::prefix('v1/address')->group(function () {
    Route::get('/{city_lug}/all_district_by_city', [AddressControllers::class, 'getAllDistrict']) ;
    Route::get('/{city_lug}/{district_lug}/all_ward_by_district', [AddressControllers::class, 'getAllWard']) ;
    Route::get('/{category_lug}/{city_lug}/all_district_by_city', [AddressControllers::class, 'getAllDistrictBelongCategory']) ;
    Route::get('/{category_lug}/{city_lug}/{district_lug}/all_ward_by_district', [AddressControllers::class, 'getAllWardBelongCategory']) ;
    Route::get('/{ward_slug}/get-address', [AddressControllers::class, 'getAddress']) ;
});