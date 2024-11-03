"use client"

import Image from 'next/image';
import ContainerClient from '../containers/ContainerClient';
import logo from '../../assets/logo-banyuwangi.png';
import { IconChevronDown, IconMenu, IconMenu2, IconUser, IconX } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/classname';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isNavHovered, setIsNavHovered] = useState(false);
    const pathname = usePathname();
    const path = ["/informasi-desa", "/transparansi", "/produk-hukum", "/produk-umkm"];
    const [isOpen, setIsOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = !path.includes(pathname) ? window.innerHeight : headerRef.current?.offsetHeight || 200;
            if (window.scrollY > headerHeight - 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [headerRef, pathname]);

    return (
        <nav className={cn("py-3 text-white hover:bg-primary border-b border-white/20 fixed z-50 left-0 top-0 right-0 transition-colors duration-300", {
            'bg-primary': pathname === "/auth/login" || isScrolled,
            'bg-primary md:bg-white/10 backdrop-blur': !isScrolled
        })} onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}>
            <ContainerClient classNames="flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="flex w-full md:hidden justify-between items-center">
                    <Link href={"/"} className="flex justify-start items-center gap-2">
                        <Image src={logo} className="w-10" alt="Logo Kabupaten Banyuwangi" />
                        <h1 className="text-lg font-extrabold">
                            Desa <br className={cn(pathname == "/auth/login" && "hidden")} /> Karangbendo
                        </h1>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className={`flex items-center justify-center p-2 rounded transition-transform duration-300 ${!isOpen ? 'rotate-90' : ''}`}
                    >
                        {isOpen ? (
                            <IconMenu className="text-white w-6 h-6" />
                        ) : (
                            <IconX className="text-white w-6 h-6" />
                        )}
                    </button>
                </div>
                <div className={cn('flex md:hidden flex-col gap-2 mt-3 mb-3', { hidden: isOpen })}>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className={cn('relative group flex justify-center items-center cursor-pointer gap-2', { hidden: isOpen && windowWidth < 768 })}>
                            <Link href='/' className={cn(pathname == "/" && 'font-semibold')}>Profile Desa</Link>
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <Link href={"/informasi-desa"} className={cn(pathname == "/informasi-desa" && 'font-semibold', { hidden: isOpen && windowWidth < 768 })}>Informasi Desa</Link>
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <Link href={"/transparansi"} className={cn(pathname == "/transparansi" && 'font-semibold', { hidden: isOpen && windowWidth < 768 })}>Transparansi</Link>
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <Link href={"/produk-hukum"} className={cn(pathname == "/produk-hukum" && 'font-semibold', { hidden: isOpen && windowWidth < 768 })}>Produk Hukum</Link>
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                        <Link href="/produk-umkm" className={cn(pathname.startsWith("/produk-umkm") && 'font-semibold', { hidden: isOpen && windowWidth < 768 })}>Produk UMKM</Link>
                    </div>
                    <div className={cn(pathname == "/auth/login" && "hidden", { hidden: isOpen && windowWidth < 768 })}>
                        <Link href={"/auth/login"} className={`flex justify-center items-center gap-3 px-4 py-2 md:text-base text-sm font-medium rounded-md ${isNavHovered
                            ? "bg-white text-primary hover:bg-white/80"
                            : isScrolled
                                ? "bg-white md:bg-white text-primary hover:bg-white/80"
                                : "bg-primary text-white hover:bg-primary/80"}`}>
                            <IconUser className='w-5' /> Login
                        </Link>
                    </div>
                </div>

                <div className='md:flex text-sm items-center w-full justify-between gap-3 hidden'>
                <Link href={"/"} className="flex justify-start items-center gap-2">
                        <Image src={logo} className="w-10" alt="Logo Kabupaten Banyuwangi" />
                        <h1 className="text-lg font-extrabold">
                            Desa <br className={cn(pathname == "/auth/login" && "hidden")} /> Karangbendo
                        </h1>
                    </Link>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                        <div className={cn('relative group flex justify-center items-center cursor-pointer gap-2')}>
                            <Link href='/' className={cn(pathname == "/" && 'font-semibold')}>Profile Desa</Link>
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                            <IconChevronDown className="w-4 hidden md:block" />
                            <ul className="absolute top-4 w-max left-0 hidden md:group-hover:block bg-primary backdrop-blur shadow-lg mt-2 p-2 rounded-md">
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
                        <Link href={"/auth/login"} className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isNavHovered
                            ? "bg-white text-primary hover:bg-white/80"
                            : isScrolled
                                ? "bg-white text-primary hover:bg-white/80"
                                : "bg-primary text-white hover:bg-primary/80"}`}>
                            <IconUser className='w-6' /> Login
                        </Link>
                    </div>
                </div>

            </ContainerClient>
        </nav>
    );
}
