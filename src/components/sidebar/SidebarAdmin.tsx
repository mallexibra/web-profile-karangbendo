import Image from 'next/image';
import LogoBanyuwangi from '../../assets/logo-banyuwangi.png';
import { cn } from '@/utils/classname';

export default function SidebarAdmin() {
  return (
    <nav className="min-w-max min-h-screen bg-white border-custom border-r-2">
      <div className="p-5 flex justify-center gap-2 border-custom border-b-2">
        <Image src={LogoBanyuwangi} width={52} alt="Logo Banyuwangi" />
        <p className="font-bold text-lg">
          DESA <br /> KARANGBENDO
        </p>
      </div>
      <ul className="py-5 pl-5 space-y-3">
        <li
          className={cn(
            'text-primary font-semibold w-full',
            'border-r-2 py-2 border-primary',
          )}
        >
          Dashboard
        </li>
        <li
          className={cn(
            'font-semibold w-full',
            // 'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Profile Desa
        </li>
        <li
          className={cn(
            'font-semibold w-full',
            // 'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Informasi Desa
        </li>
        <li
          className={cn(
            'font-semibold w-full',
            // 'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Transparansi
        </li>
        <li
          className={cn(
            'font-semibold w-full',
            // 'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Produk Hukum
        </li>
        <li
          className={cn(
            'font-semibold w-full',
            // 'text-primary border-r-2 py-2 border-primary',
          )}
        >
          Produk UMKM
        </li>
      </ul>
    </nav>
  );
}
