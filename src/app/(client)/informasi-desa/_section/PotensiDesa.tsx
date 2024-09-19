"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { villagePotential } from "@/types/VillagePotential";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const PotensiDesa = () => {
    const [potential, setPotential] = useState<villagePotential[]>([])

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/village-potential')).data
            setPotential(response.data);
        } catch (error: any) {
            console.log(`Error fetch data village potential: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ContainerClient>
            <div>
                <h2 className="title">Potensi Desa</h2>
                <p>Desa Karangbendo memiliki potensi alam yang melimpah, termasuk lahan pertanian yang subur, hutan bambu, dan sungai yang kaya akan ikan.</p>
                <div className="mt-5 flex flex-wrap justify-start gap-5">
                    {potential.length >= 1 ? potential.map((item: villagePotential, i: number) => (<div key={i} className="space-y-2">
                        <img src={`/assets/village-potential/${item.image}`} alt={item.name}/>
                        <p className="text-center font-semibold">{item.name}</p>
                    </div>)) : (<p>Data potensi desa sedang kosong!</p>)}
                </div>
            </div>
        </ContainerClient>
    )
}

export default PotensiDesa;
