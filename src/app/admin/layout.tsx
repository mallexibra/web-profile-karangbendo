import './globals.css';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import ClientAdminLayout from './_section/ClientAdminLayout';

export const metadata: Metadata = {
    title: 'Karangbendo | Admin',
    description: 'Desa karangbendo - Admin',
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

const ClientComponent = dynamic(() => import('./_section/CheckSession'), { ssr: false });

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <ClientAdminLayout>
                <body>
                    <ClientComponent />
                    {children}</body>
            </ClientAdminLayout>
        </html>
    );
}
