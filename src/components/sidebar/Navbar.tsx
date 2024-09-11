import Image from 'next/image';
import ContainerClient from '../containers/ContainerClient';
import logo from '../../assets/logo-banyuwangi.png';
import Button from '../button/Button';
import { IconChevronDown, IconUser } from '@tabler/icons-react';

export default function Navbar() {
  return (
    <nav className="py-3 text-white bg-white/10 backdrop-blur border-b border-white/20 fixed z-50 left-0 top-0 right-0">
      <ContainerClient classNames="flex justify-between items-center gap-3">
        <div className="flex justify-start items-center gap-2">
          <Image src={logo} className="w-10" alt="Logo Kabupaten Banyuwangi" />
          <h1 className="text-lg font-extrabold">
            Desa <br /> Karangbendo
          </h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="relative group flex justify-center items-center cursor-pointer gap-2">
            <p>Profile Desa</p>
            <IconChevronDown className="w-4" />
            <ul className="absolute top-5 w-max left-0 hidden group-hover:block bg-white/20 backdrop-blur shadow-lg mt-2 p-2 rounded-md">
              <li className="py-1 px-2 hover:bg-gray-100">
                <a href='#kegiatanmasyarakat'>Kegiatan Masyarakat</a>
              </li>
              <li className="py-1 px-2 hover:bg-gray-100">Sejarah Desa</li>
              <li className="py-1 px-2 hover:bg-gray-100">Visi dan Misi</li>
              <li className="py-1 px-2 hover:bg-gray-100">Demografi Desa</li>
              <li className="py-1 px-2 hover:bg-gray-100">Aparatur Desa</li>
              <li className="py-1 px-2 hover:bg-gray-100">Lokasi Desa</li>
            </ul>
          </div>
          <div className="relative group flex justify-center items-center cursor-pointer gap-2">
            <p>Informasi Desa</p>
            <IconChevronDown className="w-4" />
            <ul className="absolute top-5 w-max left-0 hidden group-hover:block bg-white/20 backdrop-blur shadow-lg mt-2 p-2 rounded-md">
              <li className="py-1 px-2 hover:bg-gray-100">Potensi Desa</li>
              <li className="py-1 px-2 hover:bg-gray-100">Kelembagaan</li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Infrastruktur Desa
              </li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Pengaduan Masyarakat
              </li>
            </ul>
          </div>
          <div className="relative group flex justify-center items-center cursor-pointer gap-2">
            <p>Transparansi</p>
            <IconChevronDown className="w-4" />
            <ul className="absolute top-5 w-max left-0 hidden group-hover:block bg-white/20 backdrop-blur shadow-lg mt-2 p-2 rounded-md">
              <li className="py-1 px-2 hover:bg-gray-100">Pendanaan</li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Dokumentasi Kegiatan
              </li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Rencana Kerja dan Anggaran
              </li>
            </ul>
          </div>
          <div className="relative group flex justify-center items-center cursor-pointer gap-2">
            <p>Produk Hukum</p>
            <IconChevronDown className="w-4" />
            <ul className="absolute top-5 w-max left-0 hidden group-hover:block bg-white/20 backdrop-blur shadow-lg mt-2 p-2 rounded-md">
              <li className="py-1 px-2 hover:bg-gray-100">Peraturan Desa</li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Peraturan Kepala Desa
              </li>
              <li className="py-1 px-2 hover:bg-gray-100">
                Keputusan Kepala Desa
              </li>
            </ul>
          </div>
          <p>Produk UMKM</p>
        </div>
        <div>
          <Button
            className="flex justify-center items-center gap-3"
            type="button"
            size="base"
          >
            <IconUser className="text-white" fontWeight={'bold'} />
            <p className="font-semibold">Login Admin</p>
          </Button>
        </div>
      </ContainerClient>
    </nav>
  );
}
