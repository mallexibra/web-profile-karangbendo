'use client';

import Image from 'next/image';
import LogoBanyuwangi from '../../assets/logo-banyuwangi.png';
import { cn } from '@/utils/classname';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SidebarAdmin() {
    const pathname = usePathname();
    const path = pathname.split('/')[2];
    const path_one = pathname.split('/')[1];

    const { data: session } = useSession();

    return (
        <nav className="min-w-max min-h-screen bg-white border-custom border-r-2">
            <div className="p-5 flex justify-center gap-2 border-custom border-b-2">
                <Image src={LogoBanyuwangi} width={52} height={52} alt="Logo Banyuwangi" />
                <p className="font-bold text-lg">
                    DESA <br /> KARANGBENDO
                </p>
            </div>
            <div className="py-5 pl-5 space-y-2">
                {session && session.user?.role != "umkm" && <>
                    <Link
                        href={'/admin'}
                        className={cn(
                            'block py-2 outline-none font-semibold w-full',
                            path_one == 'admin' &&
                            path == null &&
                            'text-primary border-r-2 border-primary',
                        )}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={'/admin/profile-desa'}
                        className={cn(
                            'font-semibold block py-2 outline-none w-full',
                            path == 'profile-desa' && 'text-primary border-r-2 border-primary',
                        )}
                    >
                        Profile Desa
                    </Link>
                    <Link
                        href={'/admin/informasi-desa'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path == 'informasi-desa' &&
                            'text-primary border-r-2 border-primary',
                        )}
                    >
                        Informasi Desa
                    </Link>
                    <Link
                        href={'/admin/transparansi'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path == 'transparansi' && 'text-primary border-r-2 border-primary',
                        )}
                    >
                        Transparansi
                    </Link>
                    <Link
                        href={'/admin/produk-hukum'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path == 'produk-hukum' && 'text-primary border-r-2 border-primary',
                        )}
                    >
                        Produk Hukum
                    </Link>
                    <Link
                        href={'/admin/produk-umkm'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path == 'produk-umkm' && 'text-primary border-r-2 border-primary',
                        )}
                    >
                        Produk UMKM
                    </Link>
                </>}
                {session && session.user?.role == "umkm" && (<>
                    <Link
                        href={'/umkm'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path_one == 'umkm' &&
                            path == null &&
                            'text-primary border-r-2 border-primary',
                        )}
                    >
                        Toko Saya
                    </Link>
                    <Link
                        href={'/umkm/toko'}
                        className={cn(
                            'font-semibold block  py-2 outline-none w-full',
                            path == 'toko' && 'text-primary border-r-2 border-primary',
                        )}
                    >
                        Produk Saya
                    </Link>
                </>)}
            </div>
        </nav>
    );
}
