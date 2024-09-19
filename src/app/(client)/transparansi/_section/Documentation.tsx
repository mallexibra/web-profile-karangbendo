"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { DocumentationActivities } from "@/types/DocumentationActivities";
import axiosInstance from "@/utils/axiosInstance";
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
        <div id="dokumentasikegiatan">
            <ContainerClient classNames="pt-24">
                <h2 className="title">Dokumentasi Kegiatan</h2>
                <div className="flex flex-wrap gap-3 mt-5">
                    {documentations.length > 0 ? documentations.map((item: DocumentationActivities, i: number) => (
                        <img key={i} className="rounded-md max-w-64 object-cover h-full" src={`/assets/documentation-activities/${item.image}`} alt={item.name} />
                    )) : (<p>Data dokumentasi kegiatan sedang kosong!</p>)}
                </div>
            </ContainerClient>
        </div >
    )
}
