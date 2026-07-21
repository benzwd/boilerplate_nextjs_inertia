<?php

namespace App\Infrastructure\Http\Controllers;

use App\Domain\User\Enums\UserRole;
use App\Infrastructure\Http\Requests\FormUserRequest;
use App\Infrastructure\Http\Resources\UserResource;
use App\Infrastructure\Persistence\Eloquent\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $query = User::query()
            ->orderFromRequest($request);
        $search = $request->q;

        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        return Inertia::render('user/index', [
            'q' => $search,
            'collection' => UserResource::collection($query->paginate(10)->withQueryString()),
            'roles' => UserRole::getOptions(),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => __('User deleted.')]);
    }

    public function edit(User $user)
    {
        return Inertia::render('user/form', [
            'user' => new UserResource($user),
            'roles' => UserRole::getOptions(),
            'isEditing' => $user->exists,
        ]);
    }

    public function update(FormUserRequest $request, User $user)
    {
        $this->authorize('update', $user);
        $user->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('User updated.')]);

        return to_route('users.index');
    }

    public function create()
    {
        $user = new User;

        return $this->edit($user);
    }

    public function store(FormUserRequest $request)
    {
        User::create($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => __('User created.')]);

        return to_route('users.index');

    }
}
