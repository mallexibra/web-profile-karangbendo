"use client"
import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";
import Spinner from "@/components/loading/Spinner";
import { Product } from "@/types/Product";
import axiosInstance from "@/utils/axiosInstance";
import { formatRupiah } from "@/utils/format";
import { IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Produk() {
    const params = useParams();
    const [product, setProduct] = useState<Partial<Product>>({})
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get(`/products/${params.id}`)).data;
            setProduct(response.data);
        } catch (error: any) {
            console.log(`Error fetch data product: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const createWhatsAppLink = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const formattedPhone = cleanPhone.startsWith('62') ? cleanPhone : `62${cleanPhone}`;
        return `https://wa.me/${formattedPhone}`;
    };

    const defaultMessage = `Halo, saya tertarik dengan produk ${product.name || 'Anda'}. Bisakah Anda memberikan informasi lebih lanjut?`;

    const whatsappLink = createWhatsAppLink(product.shop?.phone || '') +
        `?text=${encodeURIComponent(defaultMessage)}`;

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return <Spinner/>;
    }

    if (!product || !product.name) {
        return <ContainerClient>
            <p className="font-semibold text-xl mt-4">Produk tidak ditemukan.</p>
        </ContainerClient>;
    }

    return (
        <ContainerClient>
            <div className="flex gap-5">
                <section className="w-1/2">
                    <img src={`/assets/products/${product.image}`} className="rounded-md" alt={product.name} />
                </section>
                <section className="w-1/2 space-y-2">
                    <p className="font-bold text-2xl">{product.name}</p>
                    <p className="text-rose-500 font-semibold text-lg">{formatRupiah(product.price!)}</p>
                    <div className="flex justify-start items-center gap-3">
                        <IconMapPin className="text-rose-500" />
                        <p className="font-semibold text-lg">{product.shop?.location!}</p>
                    </div>
                    <p>{product.description}</p>
                    <Link href={whatsappLink} target="_blank" className="px-4 py-2 text-base w-max bg-primary text-white hover:bg-primary/80 flex items-center justify-center font-medium rounded-md mt-5 gap-3">
                        <IconBrandWhatsapp color="white" />
                        <p>Hubungi Penjual</p>
                    </Link>
                </section>
            </div>
        </ContainerClient>

    )
}
