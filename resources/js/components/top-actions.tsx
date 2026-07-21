import type { PropsWithChildren } from 'react';

export function TopActions(props: PropsWithChildren) {
    return <div
        className="absolute right-4 top-3 lg:right-6 flex justify-end gap-2 items-center"
        {...props} />
}
