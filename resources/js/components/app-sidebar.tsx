import { Link } from '@inertiajs/react';
import {
    BriefcaseIcon,
    BugIcon,
    Building2Icon,
    BuildingIcon,
    CalendarCogIcon,
    ChartAreaIcon,
    CogIcon,
    HomeIcon,
    InboxIcon,
    LayoutGrid,
    MailIcon,
    MapIcon,
    NewspaperIcon,
    RssIcon,
    TagsIcon,
    UsersIcon,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavSection } from '@/components/nav-section';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import users from '@/routes/users';
import type { NavItem, NavSection as NavSectionType } from '@/types';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const mainSectionNav: NavSectionType = {
        label: 'General',
        entries: [
            {
                kind: 'item',
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
            {
                kind: 'group',
                title: 'Settings',
                icon: CogIcon,
                items: [
                    {
                        title: 'Company',
                        href: '',
                        icon: BuildingIcon,
                        permission: 'configure_settings',
                    },
                    {
                        title: 'Users',
                        href: users.index(),
                        icon: UsersIcon,
                        permission: 'manage_users',
                    },
                    {
                        title: 'Social Media',
                        href: '',
                        icon: ChartAreaIcon,
                        permission: 'configure_settings',
                    },
                    {
                        title: 'Analytics & SEO',
                        href: '',
                        icon: ChartAreaIcon,
                        permission: 'configure_settings',
                    },
                    {
                        title: 'Tokens',
                        href: '',
                        icon: ChartAreaIcon,
                        permission: 'configure_settings',
                    },
                ],
            },
        ],
    };

    const contentSectionNav: NavSectionType = {
        label: 'Content',
        entries: [
            {
                kind: 'group',
                title: 'Blog',
                icon: RssIcon,
                items: [
                    {
                        title: 'Articles',
                        href: '',
                        icon: NewspaperIcon,
                        permission: 'manage_articles',
                    },
                    {
                        title: 'Categories',
                        href: '',
                        icon: TagsIcon,
                        permission: 'manage_articles',
                    },
                ],
            },
            {
                kind: 'group',
                title: 'Estate',
                icon: Building2Icon,
                items: [
                    {
                        title: 'Districts',
                        href: '',
                        icon: MapIcon,
                        permission: 'manage_properties',
                    },
                    {
                        title: 'Properties',
                        href: '',
                        icon: HomeIcon,
                        permission: 'manage_properties',
                    },
                ],
            },
            {
                kind: 'item',
                title: 'Careers',
                href: '',
                icon: BriefcaseIcon,
            },
        ],
    };

    const visitorsSectionNav: NavSectionType = {
        label: 'Visitors',
        entries: [
            {
                kind: 'item',
                title: 'Inquiries',
                href: '',
                icon: InboxIcon,
                badge: "4",
                permission: 'configure_settings',
            },
            {
                kind: 'item',
                title: 'Newsletter',
                href: '',
                icon: MailIcon,
                permission: 'configure_settings',
            },
        ],
    };

    const logsSectionNav: NavSectionType = {
        label: "Logs",
        entries: [
            {
                kind: "item",
                title: "Website",
                href: '',
                icon: BugIcon,
                permission: 'view_logs',
            },
            {
                kind: "item",
                title: "Scraping",
                href: '',
                icon: CalendarCogIcon,
                permission: 'view_logs',
            }
        ]
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavSection section={mainSectionNav} />
                <NavSection section={contentSectionNav} />
                <NavSection section={visitorsSectionNav} />
                <NavSection section={logsSectionNav} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
