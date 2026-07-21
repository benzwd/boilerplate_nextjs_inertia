import { Form, Head, Link } from '@inertiajs/react';
import { MoreHorizontalIcon, UserPlusIcon } from 'lucide-react';
import { CollectionPagination } from '@/components/collection-pagination';
import { SortableTableHead } from '@/components/sortable-table-head';
import { TopActions } from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import type { SelectOption } from '@/components/ui/select-with-items';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getOptionLabel } from '@/lib/utils';
import users from '@/routes/users';
import type { PaginatedCollection, User } from '@/types';

type Props = {
    collection: PaginatedCollection<User>;
    q: string | null;
    roles: SelectOption[];
}

export default function index({collection, q, roles}: Props) {
    return (
        <>
            <Head title="Users" />
            <TopActions>
                <Form
                    {...users.index.form()}
                    className="flex items-center gap-1"
                >
                    <Input
                        autoFocus
                        name="q"
                        placeholder="Search"
                        defaultValue={q ?? ''}
                    />
                    <Button>Search</Button>
                </Form>
            </TopActions>
            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead field="id">ID</SortableTableHead>
                            <SortableTableHead field="name">
                                Name
                            </SortableTableHead>
                            <SortableTableHead field="email">
                                Email
                            </SortableTableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Button
                                    asChild
                                    className="w-full"
                                    variant="ghost"
                                >
                                    <Link href={users.create()}>
                                        <UserPlusIcon /> Create new user
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        {collection.data.map((item: User) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell className="font-medium">
                                    <Link
                                        href={users.edit({ user: item.id })}
                                        className="hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    {getOptionLabel(item.role, roles)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontalIcon />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={users.edit({
                                                        user: item.id,
                                                    })}
                                                >
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                asChild
                                            >
                                                <Link
                                                    href={users.destroy({
                                                        user: item.id,
                                                    })}
                                                    onBefore={() =>
                                                        confirm(
                                                            'Do you really want to delete?',
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <CollectionPagination collection={collection} />
            </div>
        </>
    );
}

index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index().url,
        },
    ],
};
