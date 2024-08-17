<?php

namespace App\Providers;

use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Repository\Interfaces\PostRepositoryInterface;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Repository\Repositories\CategoryRepository;
use App\Repository\Repositories\PostRepository;
use App\Repository\Repositories\UserRepository;
use App\Services\AuthService;
use App\Services\CategoryService;
use App\Services\Interfaces\AuthServiceInterface;
use App\Services\Interfaces\CategoryServiceInterface;
use App\Services\Interfaces\PostServiceInterface;
use App\Services\PostService;
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
        // ----------  service --------
        $this->app->bind(AuthServiceInterface::class,AuthService::class);
        $this->app->bind(CategoryServiceInterface::class,CategoryService::class);
        $this->app->bind(PostServiceInterface::class,PostService::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
