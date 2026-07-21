<?php

namespace App\Infrastructure\Persistence\Eloquent\Concerns\Traits;

use App\Infrastructure\Persistence\Eloquent\Concerns\Attributes\Sortable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

trait HasSortable
{
    protected array $sortable = [];

    protected function initializeHasSortable(): void
    {
        $reflection = new \ReflectionClass($this);
        $attributes = $reflection->getAttributes(Sortable::class);

        if (! empty($attributes)) {
            $this->sortable = $attributes[0]->newInstance()->columns;
        }
    }

    #[Scope]
    protected function orderFromRequest(Builder $builder, Request $request): void
    {
        if (empty($this->sortable ?? [])) {
            return;
        }
        $validated = $request->validate([
            'dir' => ['nullable', Rule::in(['asc', 'desc'])],
            'sort' => ['nullable', Rule::in($this->sortable)],
        ]);

        if (! ($validated['sort'] ?? null)) {
            $builder->orderByDesc('created_at');

            return;
        }

        $builder->orderBy($validated['sort'], $validated['dir'] ?? 'desc');
    }
}
