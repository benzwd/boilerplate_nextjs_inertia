<?php

use App\Infrastructure\Persistence\Eloquent\Models\User;

it('agent can\'t access to users list', function () {
    $agent = User::factory()->create(['role' => 'agent']);

    $this->actingAs($agent)
        ->get('/users')
        ->assertForbidden();
});

it('admin can access to users list', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->get('/users')
        ->assertOk();
});
