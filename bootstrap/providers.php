<?php

use App\Infrastructure\Auth\PermissionGateServiceProvider;
use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    PermissionGateServiceProvider::class,
];
