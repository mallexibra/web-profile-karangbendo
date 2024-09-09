"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { VillageProfile } from "@/types/VillageProfile";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function InformationVillage(){
    const [profile, setProfile] = useState<VillageProfile>({
        id: 0,
        visi: '',
        misi: '',
        image: '',
        resident: BigInt(0),
        children: BigInt(0),
        mature: BigInt(0),
        old: BigInt(0),
    });

    const fetchProfile = async()=>{
        try {
            const response = await axiosInstance.get('/village-profiles');
            setProfile(response.data.data);
        } catch (error: any) {
            console.log(`Error fetch profile: ${error}`)
        }
    }

    useEffect(()=>{
        fetchProfile()
    },[])
    return(
        <>
        <div id="visimisi">
            <ContainerClient classNames="flex gap-2">
                <div>
                    <h2 className="title">Visi</h2>
                    <p>"{profile.visi}"</p>
                </div>
                <div>
                    <h2 className="title">Misi</h2>
                    <ul>
                        {profile.misi}
                    </ul>
                </div>
            </ContainerClient>
        </div>
        </>
    )
}
