<?php

namespace App\Providers;

use App\Repository\Interfaces\AddressRepositoryInterface;
use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Repository\Interfaces\PostRepositoryInterface;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Repository\Repositories\CategoryRepository;
use App\Repository\Repositories\AddressRepository;
use App\Repository\Repositories\PostRepository;
use App\Repository\Repositories\UserRepository;
use App\Service\Interfaces\AuthServiceInterface;
use App\Service\Interfaces\CategoryServiceInterface;
use App\Service\Interfaces\AddressServiceInterface;
use App\Service\Interfaces\PostServiceInterface;
use App\Service\Services\AddressService;
use App\Service\Services\PostService;
use App\Service\Services\AuthService;
use App\Service\Services\CategoryService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class,UserRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class,CategoryRepository::class);
        $this->app->bind(PostRepositoryInterface::class,PostRepository::class);
        $this->app->bind(AddressRepositoryInterface::class,AddressRepository::class);
        // ----------  service --------
        $this->app->bind(AuthServiceInterface::class,AuthService::class);
        $this->app->bind(CategoryServiceInterface::class,CategoryService::class);
        $this->app->bind(PostServiceInterface::class,PostService::class);
        $this->app->bind(AddressServiceInterface::class,AddressService::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
