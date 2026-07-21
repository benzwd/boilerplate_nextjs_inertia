import { Form, Head } from '@inertiajs/react'
import { SaveIcon } from 'lucide-react';
import { TopActions } from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import SelectWithItems from '@/components/ui/select-with-items';
import type {
    SelectOption,
} from '@/components/ui/select-with-items';
import users from '@/routes/users';
import type { User } from '@/types';

type Props = {
    user: User;
    roles: SelectOption[];
    isEditing: boolean;
}

export default function form({user, roles, isEditing}: Props) {
    const action = isEditing ? users.update.form({ user: user.id }) : users.store.form();

    return (
        <>
            <Head title="form" />
            <Form {...action} className="space-y-4">
                {({ errors, processing }) => (
                    <>
                        <FormField
                            htmlFor="name"
                            label="Name"
                            error={errors['name']}
                        >
                            <Input
                                id="name"
                                name="name"
                                defaultValue={user.name}
                                aria-invalid={!!errors['name']}
                            />
                        </FormField>
                        <FormField
                            htmlFor="role"
                            label="Role"
                            error={errors['role']}
                        >
                            <SelectWithItems items={roles} id="role" name="role" aria-invalid={!!errors['role']} defaultValue={user.role} />
                        </FormField>
                        <TopActions>
                            <Button disabled={processing}>
                                <SaveIcon /> Save
                            </Button>
                        </TopActions>
                    </>
                )}
            </Form>
        </>
    );
}

form.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index().url,
        },
        {
            title: props.isEditing ? 'Edit user' : 'Create user',
            href: props.isEditing ? users.edit.url : users.create.url,
        },
    ],
});
