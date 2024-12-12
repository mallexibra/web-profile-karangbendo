import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import ClientUmkmLayout from './_section/ClientUmkmLayout';
import NextTopLoader from 'nextjs-toploader';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Desa Karangbendo | UMKM',
  description:
    'Website Profil Desa Karangbendo adalah platform digital untuk memperkenalkan Desa Karangbendo kepada masyarakat luas, menghubungkan informasi desa, produk UMKM, dan layanan pengelolaan oleh pemerintah desa. Melalui website ini, masyarakat dapat melihat profil desa, informasi transparansi keuangan, produk hukum, dan produk UMKM setempat, serta memiliki akses untuk menyampaikan pengaduan. Tiga role pengguna tersedia: masyarakat, admin desa, dan UMKM, yang masing-masing memiliki akses berbeda untuk menavigasi dan mengelola konten. Promosi dan transparansi desa Karangbendo kini lebih mudah dan interaktif.',
  keywords:
    'Desa Karangbendo, profil desa, website desa, promosi desa, UMKM Karangbendo, transparansi desa, informasi desa, produk hukum desa, pengaduan masyarakat, admin desa, toko UMKM, produk UMKM, pemerintah desa Karangbendo, promosi UMKM, manajemen desa',
  openGraph: {
    siteName: 'Desa Karangbendo | Web Profile',
    url: 'https://desakarangbendo.id/',
    type: 'website',
    images: [
      {
        url: 'https://desakarangbendo.id/logo.png',
      },
    ],
  },
  metadataBase: new URL('https://desakarangbendo.id/'),
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

const ClientComponent = dynamic(
  () => import('../admin/_section/CheckSession'),
  {
    ssr: false,
  },
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ClientUmkmLayout>
        <body>
          <NextTopLoader />
          <ClientComponent />
          {children}
        </body>
      </ClientUmkmLayout>
    </html>
  );
}
