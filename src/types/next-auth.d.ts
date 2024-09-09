import NextAuth from 'next-auth';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role?: string;
            phone?: string;
            position?: string;
        };
    }

    interface User extends DefaultUser {
        id: string;
        name: string;
        email: string;
        role?: string;
        phone?: string;
        position?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name: string;
        email: string;
        role?: string; // Sesuaikan dengan kebutuhan
        phone?: string;
        position?: string;
    }
}
