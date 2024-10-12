import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from "@tabler/icons-react";
import Link from "next/link";
import ContainerClient from "../containers/ContainerClient";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return <footer className="font-medium p-3 bg-primary text-white text-sm">
        <ContainerClient>
            <div className="flex flex-col md:flex-row items-start justify-between py-5 gap-3">
                <div>
                    <h6 className="text-2xl font-extrabold">Desa <br className="md:block hidden" /> Karangbendo</h6>
                </div>
                <div>
                    <p className="font-bold text-lg">Lokasi</p>
                    <p>Desa Karangbendo, Rogojampi, Banyuwangi, Jawa Timur</p>
                </div>
                <div>
                    <p className="font-bold text-lg">Kontak</p>
                    <p>Telepon: (0333) 123456</p>
                    <p>Email: desa.karangbendo@example.com</p>
                </div>
                <div>
                    <p className="font-bold text-lg">Sosial Media</p>
                    <div className="flex items-center gap-3 my-2">
                        <Link href={"#"}>
                            <IconBrandInstagram className="text-white w-10 h-10" />
                        </Link>
                        <Link href={"#"}>
                            <IconBrandTiktok className="text-white w-10 h-10" />
                        </Link>
                        <Link href={"#"}>
                            <IconBrandYoutube className="text-white w-10 h-10" />
                        </Link>
                    </div>
                </div>
            </div>
        </ContainerClient>
        <hr className="opacity-30" />
        <p className="text-center p-3">&copy; {currentYear} Desa Karangbendo. All rights reserved.</p>
    </footer>
}
