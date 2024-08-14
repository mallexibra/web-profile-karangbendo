'use client';

import Image from 'next/image';
import LogoBanyuwangi from '../../assets/logo-banyuwangi.png';
import { cn } from '@/utils/classname';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarAdmin() {
  const pathname = usePathname();
  const path = pathname.split('/')[2];

  return (
    <nav className="min-w-max min-h-screen bg-white border-custom border-r-2">
      <div className="p-5 flex justify-center gap-2 border-custom border-b-2">
        <Image src={LogoBanyuwangi} width={52} alt="Logo Banyuwangi" />
        <p className="font-bold text-lg">
          DESA <br /> KARANGBENDO
        </p>
      </div>
      <div className="py-5 pl-5 space-y-5">
        <Link
          href={'/admin'}
          className={cn(
            'text-primary block outline-none font-semibold w-full',
            path == null && 'border-r-2 py-2 border-primary',
          )}
        >
          Dashboard
        </Link>
        <Link
          href={'/admin/profile-desa'}
          className={cn(
            'font-semibold block outline-none w-full',
            path == 'profile-desa' &&
              'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Profile Desa {path}
        </Link>
        <Link
          href={'/admin/informasi-desa'}
          className={cn(
            'font-semibold block outline-none w-full',
            path == 'informasi-desa' &&
              'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Informasi Desa
        </Link>
        <Link
          href={'/admin/transparansi'}
          className={cn(
            'font-semibold block outline-none w-full',
            path == 'transparansi' &&
              'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Transparansi
        </Link>
        <Link
          href={'/admin/produk-hukum'}
          className={cn(
            'font-semibold block outline-none w-full',
            path == 'produk-hukum' &&
              'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Produk Hukum
        </Link>
        <Link
          href={'/admin/produk-umkm'}
          className={cn(
            'font-semibold block outline-none w-full',
            path == 'produk-umkm' &&
              'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Produk UMKM
        </Link>
      </div>
    </nav>
  );
}
