import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavGroup } from '@/types';

type Props = {
    group: NavGroup;
}

export function NavCollapsible({group}: Props) {
    const { isCurrentUrl } = useCurrentUrl();
    const { auth } = usePage().props as {
        auth: { permissions: Record<string, boolean> };
    };

    const isGroupAction = (): boolean => {
        return group.items.some((item) => isCurrentUrl(item.href));
    }

    const visibleItems = group.items.filter(
        (item) => !item.permission || auth.permissions[item.permission],
    );

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                defaultOpen={isGroupAction()}
                className="group/collapsible"
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={group.title}>
                        {group.icon && <group.icon />}
                        <span>{group.title}</span>
                        <ChevronRight
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {visibleItems.map(item => (
                            <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild isActive={isCurrentUrl(item.href)}>
                                    <Link href={item.href} className="flex items-center">
                                        <span className="truncate">{item.title}</span>
                                        {item.badge && <span className="ml-auto shrink-0 rounded bg-indigo-500/10 px-1 py-0.5 text-[9px] leading-none font-semibold text-indigo-500">{item.badge}</span>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}
