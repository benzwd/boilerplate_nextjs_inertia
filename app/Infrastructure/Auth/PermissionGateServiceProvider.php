<?php

namespace App\Infrastructure\Auth;

use App\Domain\User\Enums\Permission;
use App\Domain\User\Rules\PermissionRules;
use App\Infrastructure\Auth\Policies\UserPolicy;
use App\Infrastructure\Persistence\Eloquent\Models\User;
use Gate;
use Illuminate\Support\ServiceProvider;

class PermissionGateServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        foreach (Permission::cases() as $permission) {
            Gate::define($permission->value, function ($user) use ($permission) {
                return PermissionRules::roleHasPermission($user->role, $permission);
            });
        }
        Gate::policy(User::class, UserPolicy::class);
    }
}
