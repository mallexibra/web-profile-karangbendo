import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import ClientUmkmLayout from './_section/ClientUmkmLayout';

export const metadata: Metadata = {
    title: 'Karangbendo | UMKM',
    description: 'Desa karangbendo - UMKM',
    keywords:
        "",
    openGraph: {
        siteName: "Desa Karangbendo | Web Profile",
        url: "https://www.karangbendo.com/",
        type: "website",
        images: [
            {
                url: "https://www.karangbendo.com/logo.png",
            },
        ],
    },
    metadataBase: new URL("https://www.karangbendo.com/"),
    other: {
        "X-UA-Compatible": "IE=edge",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <ClientUmkmLayout>
                <body>{children}</body>
            </ClientUmkmLayout>
        </html>
    );
}
