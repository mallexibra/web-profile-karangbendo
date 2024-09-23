"use client"
import { IconLogout } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';

export default function HeaderAdmin() {
    const { data: session } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/auth/login' });
    };
    return (
        <header className="py-3 px-6 bg-white flex justify-between border-custom border-b-2">
            <h2 className="font-bold">Halo, {session && session.user?.name}</h2>
            <div onClick={() => handleLogout()} className="flex cursor-pointer justify-end items-center gap-2">
                <IconLogout color="#449E85" size={24} />
                <p className="font-semibold text-primary">Logout</p>
            </div>
        </header>
    );
}
