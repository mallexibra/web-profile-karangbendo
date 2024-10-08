import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Desa Karangbendo | Profile Desa',
    description: 'Web Profile - Desa Karangbendo',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
