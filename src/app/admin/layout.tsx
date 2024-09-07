import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

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

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
