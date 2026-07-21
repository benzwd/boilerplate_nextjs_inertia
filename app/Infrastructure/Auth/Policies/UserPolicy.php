<?php

namespace App\Infrastructure\Auth\Policies;

use App\Domain\User\Enums\Permission;
use App\Domain\User\Enums\UserRole;
use App\Domain\User\Rules\PermissionRules;
use App\Infrastructure\Persistence\Eloquent\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function update(User $user, User $model): Response|bool
    {
        if ($user->role === UserRole::ADMIN && $model->role === UserRole::DEVELOPER) {
            return Response::deny(__('You cannot modify a Developer account.'));
        }

        return PermissionRules::roleHasPermission($user->role, Permission::ManageUsers);
    }
}
