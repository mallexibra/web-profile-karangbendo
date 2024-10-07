import NextAuth, { DefaultUser } from 'next-auth';
import { Shop } from './Shop';
import { Product } from './Product';

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string;
        name: string;
        email: string;
        role?: string;
        phone?: string;
        position?: string;
        shop?: (Shop & { owner?: User | null; product?: Product[] | null })[] | null;
    }

    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name: string;
        email: string;
        role?: string;
        phone?: string;
        position?: string;
        shop?: (Shop & { owner?: User | null; product?: Product[] | null })[] | null;
    }
}
