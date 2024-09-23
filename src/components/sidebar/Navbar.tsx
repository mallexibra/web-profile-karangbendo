"use client"

import Image from 'next/image';
import ContainerClient from '../containers/ContainerClient';
import logo from '../../assets/logo-banyuwangi.png';
import { IconChevronDown, IconUser } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/classname';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isNavHovered, setIsNavHovered] = useState(false);
    const pathname = usePathname()
    const path = ["/informasi-desa", "/transparansi", "/produk-hukum", "/produk-umkm"]

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = !path.includes(pathname) ? window.innerHeight : headerRef.current?.offsetHeight || 200;
            if (window.scrollY > headerHeight - 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [headerRef]);
    return (
        <nav className={cn("py-3 text-white hover:bg-primary border-b border-white/20 fixed z-50 left-0 top-0 right-0 transition-colors duration-300", {
            'bg-primary': pathname === "/auth/login" || isScrolled,
            'bg-white/10 backdrop-blur': !isScrolled
        })} onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}>
            <ContainerClient classNames="flex justify-between items-center gap-3">
                <Link href={"/"} className="flex justify-start items-center gap-2">
                    <Image src={logo} className="w-10" alt="Logo Kabupaten Banyuwangi" />
                    <h1 className="text-lg font-extrabold">
                        Desa <br className={cn(pathname == "/auth/login" && "hidden")} /> Karangbendo
                    </h1>
                </Link>
                <div className="flex justify-center items-center gap-3">
                    <div className="relative group flex justify-center items-center cursor-pointer gap-2">
                        <Link href='/' className={cn(pathname == "/" && 'font-semibold')}>Profile Desa</Link>
                        <IconChevronDown className="w-4" />
                        <ul className="absolute top-4 w-max left-0 hidden group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href='/#kegiatanmasyarakat'>Kegiatan Masyarakat</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/#sejarahdesa"}>Sejarah Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/#visimisi"}>Visi dan Misi</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/#demografidesa"}>Demografi Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/#aparaturdesa"}>Aparatur Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/#lokasidesa"}>Lokasi Desa</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="relative group flex justify-center items-center cursor-pointer gap-2">
                        <Link href={"/informasi-desa"} className={cn(pathname == "/informasi-desa" && 'font-semibold')}>Informasi Desa</Link>
                        <IconChevronDown className="w-4" />
                        <ul className="absolute top-4 w-max left-0 hidden group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/informasi-desa#potensidesa"}>Potensi Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/informasi-desa#kelembagaan"}>Kelembagaan</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/informasi-desa#infrastrukturdesa"}>Infrastruktur Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/informasi-desa#pengaduanmasyarakat"}>Pengaduan Masyarakat</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="relative group flex justify-center items-center cursor-pointer gap-2">
                        <Link href={"/transparansi"} className={cn(pathname == "/transparansi" && 'font-semibold')}>Transparansi</Link>
                        <IconChevronDown className="w-4" />
                        <ul className="absolute top-4 w-max left-0 hidden group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/transparansi#pendanaan"}>Pendanaan</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/transparansi#dokumentasikegiatan"}>Dokumentasi Kegiatan</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/transparansi#renacanakerjadananggaran"}>Rencana Kerja dan Anggaran</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="relative group flex justify-center items-center cursor-pointer gap-2">
                        <Link href={"/produk-hukum"} className={cn(pathname == "/produk-hukum" && 'font-semibold')}>Produk Hukum</Link>
                        <IconChevronDown className="w-4" />
                        <ul className="absolute top-4 w-max left-0 hidden group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/produk-hukum#peraturandesa"}>Peraturan Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/produk-hukum#peraturankepaladesa"}>Peraturan Kepala Desa</Link>
                            </li>
                            <li className="py-1 px-2 hover:bg-gray-100">
                                <Link href={"/produk-hukum#keputusankepaladesa"}>Keputusan Kepala Desa</Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="/produk-umkm" className={cn(pathname.startsWith("/produk-umkm") && 'font-semibold')}>Produk UMKM</Link>
                </div>
                <div className={cn(pathname == "/auth/login" && "hidden")}>
                    <button className={`flex justify-center items-center gap-3 px-4 py-2 text-base font-medium rounded-md ${isNavHovered
                        ? "bg-white text-primary hover:bg-white/80"
                        : isScrolled
                            ? "bg-white text-primary hover:bg-white/80"
                            : "bg-primary text-white hover:bg-primary/80"
                        }`}
                        type="button"
                    >
                        <IconUser className={isNavHovered || isScrolled ? "text-primary" : "text-white"} fontWeight={'bold'} />
                        <p className="font-semibold">Login Admin</p>
                    </button>
                </div>
            </ContainerClient>
        </nav>
    );
}
