"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { VillageApparatus } from "@/types/VillageApparatus";
import axiosInstance from "@/utils/axiosInstance";
import { formatText } from "@/utils/format";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VillageApparatur() {
    const [apparatus, setApparatus] = useState<VillageApparatus[]>([])
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/village-apparatus');
            console.log(response.data.data);
            setApparatus(response.data.data)
        } catch (error: any) {
            console.log(`Error fetch data: ${error}`)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <ContainerClient classNames="mt-8">
            <div className="flex gap-3 justify-center flex-wrap">
                {apparatus.length > 0 ? (
                    apparatus.map((item: VillageApparatus, i: number) => {
                        return (
                            <div
                                key={i}
                                className="border border-custom flex gap-3 items-center w-max p-2 rounded-md"
                            >
                                <Image
                                    src={`/assets/village-apparatus/${item.profile}`}
                                     fill
                                    className="w-12 h-12 rounded-md object-cover"
                                    alt="Profile Aparatur Desa"
                                />
                                <div className="text-sm mr-3">
                                    <p className="font-semibold">{item.name}</p>
                                    <p>{formatText(item.position)}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center font-medium">Data apparatur desa kosong!</p>
                )}
            </div>
        </ContainerClient>
    )
}
