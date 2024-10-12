"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { LegalProduct } from "@/types/LegalProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function PeraturanDesa() {
    const [legal, setLegal] = useState<LegalProduct[]>([])

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/legal-product')).data
            setLegal(response.data)
        } catch (error: any) {
            console.log(`Error fetch data legal product: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div data-aos="fade-down" id="peraturandesa">
            <ContainerClient>
                <h2 className="title">Peraturan Desa</h2>
                <p>Peraturan Desa adalah peraturan yang ditetapkan oleh Kepala Desa setelah mendapat persetujuan dari Badan Permusyawaratan Desa (BPD). Peraturan ini mengatur berbagai aspek kehidupan masyarakat desa, seperti tata ruang, lingkungan hidup, dan kegiatan ekonomi.</p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-primary">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-primary text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NO
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    JUDUL PERATURAN
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NOMOR
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DESKRIPSI
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DOWNLOAD
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {legal.filter((item: LegalProduct) => item.type! == "village_regulation").length > 0 ? legal.filter((item: LegalProduct) => item.type! == "village_regulation").map((item: LegalProduct, i: number) => (
                                <tr key={i} className="bg-white  hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`/assets/legal/${item.file}`} className="font-medium rounded-md px-2 py-1 text-sm bg-primary text-white hover:bg-primary/80" download={`${item.title}.${item.file.split('.').pop()}`}>Download</a>
                                    </td>
                                </tr>
                            )) : (<tr>
                                <td colSpan={5} className="px-6 py-4 text-center font-medium">Data peraturan desa sedang kosong!</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </ContainerClient>
        </div>
    )
}
