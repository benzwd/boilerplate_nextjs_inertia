<?php

namespace App\Domain\User\Enums;

enum UserRole: string
{
    case DEVELOPER = 'developer';
    case ADMIN = 'admin';
    case AGENT = 'agent';
    case EDITOR = 'editor';

    public function label(): string
    {
        return match ($this) {
            self::DEVELOPER => 'Developer',
            self::ADMIN => 'Administrator',
            self::AGENT => 'Agent',
            self::EDITOR => 'Editor',
        };
    }

    public static function getOptions(): array
    {
        return array_map(fn (self $role) => [
            'value' => $role->value,
            'label' => $role->label(),
        ], self::cases());
    }
}
