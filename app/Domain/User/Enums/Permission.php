<?php

namespace App\Domain\User\Enums;

enum Permission: string
{
    case ManageUsers = 'manage_users';
    case ViewLogs = 'view_logs';
    case ConfigureSettings = 'configure_settings';
    case PublishArticles = 'publish_articles';
    case ManageArticles = 'manage_articles';
    case ManageProperties = 'manage_properties';
    case ManageScrapping = 'manage_scrapping';
}
