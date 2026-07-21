<?php

namespace App\Domain\User\Rules;

use App\Domain\User\Enums\Permission;
use App\Domain\User\Enums\UserRole;

final class PermissionRules
{
    private const array MATRIX = [
        UserRole::DEVELOPER->value => [
            Permission::ManageUsers, Permission::ViewLogs, Permission::ConfigureSettings, Permission::ManageArticles, Permission::PublishArticles, Permission::ManageProperties, Permission::ManageScrapping,
        ],
        UserRole::ADMIN->value => [
            Permission::ManageUsers, Permission::ConfigureSettings, Permission::ManageArticles, Permission::ManageProperties, Permission::ManageScrapping,
        ],
        UserRole::AGENT->value => [Permission::ManageProperties],
        UserRole::EDITOR->value => [Permission::PublishArticles],
    ];

    public static function roleHasPermission(UserRole $role, Permission $permission): bool
    {
        return in_array($permission, self::MATRIX[$role->value] ?? [], true);
    }
}
