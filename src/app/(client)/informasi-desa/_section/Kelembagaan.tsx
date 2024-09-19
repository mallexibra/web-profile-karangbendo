"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { VillageInstitution } from "@/types/VillageInstitution";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function Kelembagaan() {
    const [institutions, setInstitutions] = useState<VillageInstitution[]>([])

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/village-institutions')).data
            setInstitutions(response.data);
        } catch (error: any) {
            console.log(`Error fetch data village institutions: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ContainerClient>
            <div id="kelembagaan" className="pt-24">
                <h2 className="title">Kelembagaan</h2>
                <p>Desa ini memiliki beberapa kelembagaan aktif seperti kelompok tani, karang taruna, dan koperasi desa yang berperan dalam pemberdayaan masyarakat.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                    {institutions.length > 0 ? institutions.map((item: VillageInstitution, i: number) => (
                        <div key={i} className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                            <p>{item.name}</p>
                        </div>
                    )) : (<p>Data lembaga desa sedang kosong!</p>)}
                </div>
            </div>
        </ContainerClient >
    )
}
