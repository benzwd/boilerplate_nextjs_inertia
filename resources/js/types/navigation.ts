import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { Permission } from '@/types/auth';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    badge?: string;
    permission?: Permission;
};

export type NavGroup = {
    title: string;
    icon?: LucideIcon | null;
    items: NavItem[];
    permission?: Permission;
}

type NavEntry = ({ kind: 'item' } & NavItem) | ({ kind: 'group' } & NavGroup);

export type NavSection = {
    label: string;
    entries: NavEntry[];
};
