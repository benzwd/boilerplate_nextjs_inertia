export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    permissions: Record<string, boolean>;
};

export type Permission =
    | 'manage_users'
    | 'view_logs'
    | 'configure_settings'
    | 'publish_articles'
    | 'manage_articles'
    | 'manage_properties'
    | 'manage_scrapping';

/* @chisel-passkeys */
export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};
/* @end-chisel-passkeys */
