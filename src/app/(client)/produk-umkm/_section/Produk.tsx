"use client"
import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";
import { Product } from "@/types/Product";
import axiosInstance from "@/utils/axiosInstance";
import { formatRupiah } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Produk() {
    const [products, setProducts] = useState<Product[]>([])

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/products')).data
            setProducts(response.data)
        } catch (error: any) {
            console.log(`Error fetch data products: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ContainerClient classNames="min-h-screen">
            <h2 className="title">Pilih berbagai produk yang dihasilkan oleh UMKM Desa Karangbendo.</h2>
            <p>Pilih berbagai produk yang dihasilkan oleh UMKM Desa Karangbendo.</p>
            <div className="mt-5 flex flex-wrap gap-3 items-start">
                {products.length > 0 ? products.map((item: Product, i: number) => (
                    <div key={i} className="max-w-72 flex flex-col h-full rounded-md p-3 border border-black/20">
                        <div className="flex-grow">
                            <Image src={`/assets/products/${item.image}`} className="rounded-md mb-3" alt={item.name} />
                            <p className="font-bold text-xl">{item.name}</p>
                            <p className="font-semibold text-rose-500">{formatRupiah(item.price)}</p>
                            <p className="font-semibold">Deskripsi</p>
                            <p className="text-sm mb-3">{item.description}</p></div>
                        <Link href={`/produk-umkm/${item.id}`} className="bg-primary text-white hover:bg-primary/80 px-4 py-2 block w-full text-center mt-auto font-medium rounded-md">Detail Produk</Link>
                    </div>
                )) : (<p>Data produk sedang kosong!</p>)}
            </div>
        </ContainerClient>
    )
}
