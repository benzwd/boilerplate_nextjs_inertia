import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { NavCollapsible } from '@/components/nav-collapsible';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavSection } from '@/types';

export function NavSection({ section }: { section: NavSection }) {
    const { isCurrentUrl } = useCurrentUrl();
    const { auth } = usePage().props as {
        auth: { permissions: Record<string, boolean> };
    };

    const visibleEntries = section.entries.filter((entry) => {
        if (entry.kind === 'group') {
            return entry.items.some(
                (item) => !item.permission || auth.permissions[item.permission],
            );
        }

        return !entry.permission || auth.permissions[entry.permission];
    });

    if (visibleEntries.length === 0) {
        return null;
    }

    return (
        <SidebarGroup className="px-2 py-0">
            <Collapsible defaultOpen={true} className="group/collapsible">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center">
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <ChevronRight size={12} className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenu>
                        {visibleEntries.map((entry) => {
                            if (entry.kind === 'group') {
                                return (
                                    <NavCollapsible
                                        group={entry}
                                        key={entry.title}
                                    />
                                );
                            }

                            return (
                                <SidebarMenuItem key={entry.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl(entry.href)}
                                        tooltip={{ children: entry.title }}
                                    >
                                        <Link href={entry.href} prefetch>
                                            {entry.icon && <entry.icon />}
                                            <span>{entry.title}</span>
                                            {entry.badge && (
                                                <span className="ml-auto shrink-0 rounded bg-secondary px-1.5 py-1 text-[10px] leading-none font-semibold text-secondary-foreground">
                                                    {entry.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </CollapsibleContent>
            </Collapsible>
        </SidebarGroup>
    );
}
