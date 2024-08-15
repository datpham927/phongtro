<?php

use App\Http\Controllers\Api\CategoryControllers;
use App\Http\Controllers\AuthControllers;
use Illuminate\Support\Facades\Route;

  
// Nhóm các route liên quan đến người dùng
Route::prefix('v1/user')->group(function () {
    Route::post('/register', [AuthControllers::class, 'register'])->name('user.register');
    Route::post('/login', [AuthControllers::class, 'login'])->name('user.login');
    Route::get('/logout', [AuthControllers::class, 'logout'])->name('user.logout');
    Route::get('/refresh_token', [AuthControllers::class, 'refreshToken'])->name('user.refresh_token');
    Route::post('/reset_password', [AuthControllers::class, 'resetPasswordPost'])->name('user.reset_password');
    Route::post('/{token}/change_password', [AuthControllers::class, 'changePasswordPost'])->name('user.change_password');
});

// Nhóm các route liên quan đến danh mục
Route::prefix('v1/category')->group(function () {
    Route::post('/all', [CategoryControllers::class, 'getAll'])->name('category.getAll');
    Route::post('/add', [CategoryControllers::class, 'create'])->name('category.create');
    Route::post('/update', [CategoryControllers::class, 'update'])->name('category.update');
    Route::delete('/destroy', [CategoryControllers::class, 'destroy'])->name('category.destroy');
});
