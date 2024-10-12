"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { DocumentationActivities } from "@/types/DocumentationActivities";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Documentation() {
    const [documentations, setDocumentation] = useState<DocumentationActivities[]>([])

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/documentation-activities')).data;
            setDocumentation(response.data)
        } catch (error: any) {
            console.log(`Error fetch data documentation activities: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div data-aos="fade-down" id="dokumentasikegiatan">
            <ContainerClient classNames="pt-24">
                <h2 className="title">Dokumentasi Kegiatan</h2>
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start flex-wrap gap-3 mt-5">
                    {documentations.length > 0 ? documentations.map((item: DocumentationActivities, i: number) => (
                        <div key={i} className="relative w-max bg-primary rounded-md overflow-hidden">
                            <Image key={i} width={500} height={500} className="rounded-md max-w-64 object-cover h-full" src={`/assets/documentation-activities/${item.image}`} alt={item.name} />
                            <div className="px-3 pb-3 pt-5 bg-gradient-to-b from-transparent to-primary absolute w-full flex flex-col justify-end top-12 bottom-0">
                                <p className="font-semibold text-white">{item.name}</p>
                            </div>
                        </div>
                    )) : (<p>Data dokumentasi kegiatan sedang kosong!</p>)}
                </div>
            </ContainerClient>
        </div >
    )
}
