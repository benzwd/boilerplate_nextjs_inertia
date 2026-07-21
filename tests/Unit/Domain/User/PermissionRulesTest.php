<?php

use App\Domain\User\Enums\Permission;
use App\Domain\User\Enums\UserRole;
use App\Domain\User\Rules\PermissionRules;

it('give all permissions to developer', function () {
    foreach (Permission::cases() as $permission) {
        expect(PermissionRules::roleHasPermission(UserRole::DEVELOPER, $permission))
            ->toBeTrue();
    }
});

it('agent can only manage properties', function () {
    expect(PermissionRules::roleHasPermission(UserRole::AGENT, Permission::ManageProperties))
        ->toBeTrue();
});

it('editor can only publish articles', function () {
    expect(PermissionRules::roleHasPermission(UserRole::EDITOR, Permission::PublishArticles))
        ->toBeTrue();
});

it('editor can not manage articles', function () {
    expect(PermissionRules::roleHasPermission(UserRole::EDITOR, Permission::ManageArticles))
        ->toBeFalse();
});
