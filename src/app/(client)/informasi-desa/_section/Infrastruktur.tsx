"use client"

import ContainerClient from "@/components/containers/ContainerClient";
import { VillageInfrastruktur } from "@/types/VillageInfrastruktur";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Infrastruktur() {
    const [infrastruktur, setInfrastruktur] = useState<VillageInfrastruktur[]>([])

    const fetchData = async ()=>{
        try {
            const response = await (await axiosInstance.get('/village-infrastruktur')).data
            setInfrastruktur(response.data);
        } catch (error: any) {
            console.log(`Error fetch data: ${error.message}`)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])
    return (
        <ContainerClient>
            <div id="infrastrukturdesa" className="pt-24">
                <h2 className="title">Infrastruktur Desa</h2>
                <p>Desa Karangbendo memiliki infrastruktur yang memadai, termasuk jalan aspal, sekolah dasar, puskesmas, dan balai desa yang digunakan untuk berbagai kegiatan masyarakat.</p>
                <div className="flex flex-wrap gap-3 mt-5">
                    {infrastruktur.map((item: VillageInfrastruktur, i: number)=>(
                    <div key={i} className="relative w-72 bg-primary rounded-md overflow-hidden">
                        <Image src={`/assets/village-infrastruktur/${item.image}`} className="w-full h-full object-cover" alt={item.name} />
                        <div className="px-3 pb-3 pt-5 bg-gradient-to-b from-transparent to-primary absolute w-full flex flex-col justify-end top-12 bottom-0">
                            <p className="font-semibold text-white">{item.name}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </ContainerClient>
    )
}
