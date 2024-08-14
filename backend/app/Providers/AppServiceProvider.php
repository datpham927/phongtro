<?php

namespace App\Providers;

use App\Repository\Interfaces\UserRepositoryInterface;
use App\Repository\Repositories\UserRepository;
use App\Services\AuthService;
use App\Services\Interfaces\AuthServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class,UserRepository::class);

        // ----------  service --------
        $this->app->bind(AuthServiceInterface::class,AuthService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
