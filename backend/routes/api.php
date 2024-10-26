<?php

use App\Http\Controllers\api\AuthControllers;
use App\Http\Controllers\api\CategoryControllers;
use App\Http\Controllers\api\AddressControllers;
use App\Http\Controllers\api\ConversationControllers;
use App\Http\Controllers\api\MessageController;
use App\Http\Controllers\api\PostControllers;
use App\Http\Controllers\api\UserControllers;
use App\Http\Controllers\CrawlerControllers;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\Login;
use Illuminate\Support\Facades\Route;

// Route cho crawler
Route::post('/crawler', [CrawlerControllers::class, 'crawler'])->name('crawler.index');

// Nhóm các route liên quan đến xác thực người dùng
Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [AuthControllers::class, 'register']);
    Route::post('/login', [AuthControllers::class, 'login']);
    Route::post('/refresh_token', [AuthControllers::class, 'refreshToken']);
    Route::post('/reset_password', [AuthControllers::class, 'resetPasswordPost']);
    Route::put('/{token}/change_password', [AuthControllers::class, 'changePasswordPost']);

    // Logout yêu cầu đăng nhập
    Route::middleware(Login::class)->post('/logout', [AuthControllers::class, 'logout']);
});

// Nhóm các route liên quan đến người dùng, yêu cầu đăng nhập
Route::middleware(Login::class)->prefix('v1/user')->group(function () {
    Route::get('/{uid}/detail', [UserControllers::class, 'getUser']);
    Route::put('/profile', [UserControllers::class, 'updateProfile']);
    // Chỉ admin mới có quyền truy cập các route sau
    Route::middleware(IsAdmin::class)->group(function () {
        Route::post('/add', [UserControllers::class, 'addUser']);
        Route::delete('/{uid}/delete', [UserControllers::class, 'deleteUser']);
        Route::get('/all-user', [UserControllers::class, 'getAllUser']);
        Route::put('/{uid}/update', [UserControllers::class, 'updateUser']);
    });
});
// Nhóm các route liên quan đến danh mục (category)
Route::prefix('v1/category')->group(function () {
    Route::get('/all', [CategoryControllers::class, 'getAll']);
    // Chỉ admin mới có quyền thêm, cập nhật, xóa danh mục
    Route::middleware([Login::class, IsAdmin::class])->group(function () {
        Route::post('/add', [CategoryControllers::class, 'create']);
        Route::put('/{cid}/update', [CategoryControllers::class, 'update']);
        Route::delete('/{cid}/destroy', [CategoryControllers::class, 'destroy']);
        Route::get('/{cid}/get', [CategoryControllers::class, 'getCategory']);
    });
});

// Nhóm các route liên quan đến bài viết (post)
Route::prefix('v1/post')->group(function () {
    Route::get('/all', [PostControllers::class, 'getAll']);
    Route::get('/{pid}/detail', [PostControllers::class, 'getDetailPost']);
    Route::get('/{address_id}/related-post', [PostControllers::class, 'getRelatedPost']);
    // Các route yêu cầu đăng nhập
    Route::middleware(Login::class)->group(function () {
        Route::delete('/{pid}/delete', [PostControllers::class, 'destroy']);
        Route::post('/add', [PostControllers::class, 'create']);
        Route::put('/{pid}/update', [PostControllers::class, 'update']);
        Route::get('/shop', [PostControllers::class, 'getAllForShop']);
        Route::get('/expired', [PostControllers::class, 'getAllPostExpiredForShop']);
        // Các route yêu cầu quyền admin
        Route::middleware(IsAdmin::class)->group(function () {
            Route::get('/unapproved', [PostControllers::class, 'getAllUnapprovedPosts']);
            Route::post('/{pid}/is-approved', [PostControllers::class, 'ApprovePost']);
        });
    });
});

// Nhóm các route liên quan đến địa chỉ (address)
Route::prefix('v1/address')->group(function () {
    Route::get('/{city_slug}/all_district_by_city', [AddressControllers::class, 'getAllDistrict']);
    Route::get('/{city_slug}/{district_slug}/all_ward_by_district', [AddressControllers::class, 'getAllWard']);
    Route::get('/{category_slug}/{city_slug}/all_district_by_city', [AddressControllers::class, 'getAllDistrictBelongCategory']);
    Route::get('/{category_slug}/{city_slug}/{district_slug}/all_ward_by_district', [AddressControllers::class, 'getAllWardBelongCategory']);
    Route::get('/{ward_slug}/get-address', [AddressControllers::class, 'getAddress']);
    Route::get('/get-city', [AddressControllers::class, 'getCities']);
    Route::get('/{city_slug}/get-district', [AddressControllers::class, 'getDistricts']);
    Route::get('/{district_slug}/get-ward', [AddressControllers::class, 'getWards']);
});
Route::middleware(Login::class)->prefix('v1/conversation')->group(function () {
    Route::post('/add', [ConversationControllers::class, 'create']);
    Route::get('/all', [ConversationControllers::class, 'getAll']);
});
Route::middleware(Login::class)->prefix('v1/message')->group(function () {
    Route::post('/{conversation_id}/add', [MessageController::class, 'sendMessage']);
    Route::get('/{conversation_id}/all', [MessageController::class, 'getAllMessage']);
});

 