"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { CommunityActivities } from "@/types/CommunityActivities";
import axiosInstance from "@/utils/axiosInstance";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CommunityActivity() {
    const [data, setData] = useState<CommunityActivities[]>([])
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/community-activities');
            setData(response.data.data);
        } catch (error: any) {
            console.log(`Error fetch data: ${error}`)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div id="kegiatanmasyarakat">
            <ContainerClient classNames="md:pt-24 pt-12">
                <h1 className="title">Kegiatan Masyarakat</h1>
                <p>Kegiatan rutin masyarakat meliputi arisan, gotong royong membersihkan lingkungan, kegiatan keagamaan, dan festival budaya tahunan.</p>
                <div className="mt-5 flex gap-2">
                    {data.length <= 0 ? <p>Data kegiatan masyarakat sedang kosong!</p> : data.map((item: CommunityActivities, i: number) => (
                        <div key={i} className="max-w-72 rounded-md overflow-hidden border border-custom">
                            <Image src={`/assets/community-activities/${item.image}`} width={500} height={500} className="w-full" alt={item.name} />
                            <div className="p-3">
                                <p className="font-bold text-primary">{item.name}</p>
                                <p className="font-medium text-xs opacity-50 my-1">{formatDate(item.time)}</p>
                                <p className="text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ContainerClient>
        </div>
    )
}
