"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { VillageProfile } from "@/types/VillageProfile";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InformationVillage() {
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

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/village-profiles');
            const { resident, children, mature, old, ...responseData } = response.data.data[0];
            const childrenPersen = (children / resident) * 100;
            const maturePersen = (mature / resident) * 100;
            const oldPersen = (old / resident) * 100;
            console.log({ children: childrenPersen, mature: maturePersen, old: oldPersen, resident, ...responseData });
            setProfile({ children: childrenPersen, mature: maturePersen, old: oldPersen, resident, ...responseData });
        } catch (error: any) {
            console.log(`Error fetch profile: ${error}`)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <>
            <div>
                <div id="visimisi" className="pt-14">
                    <ContainerClient classNames="flex justify-start gap-2 pt-16">
                        <div className="w-1/3">
                            <h2 className="title">Visi</h2>
                            <p>&quot;{profile.visi}&quot;</p>
                        </div>
                        <div>
                            <h2 className="title">Misi</h2>
                            <ol className="list-decimal pl-5">
                                {profile.misi.split('\r\n').map((misi: string, i: number) => (
                                    <li key={i}>{misi}</li>
                                ))}
                            </ol>
                        </div>
                    </ContainerClient>
                </div>
                <div id="demografidesa">
                    <ContainerClient classNames="pt-24">
                        <h2 className="title text-center mb-7">Demografi Desa</h2>
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{profile.resident} <span className="text-sm font-normal">Jiwa</span></p>
                                <p className="font-bold text-primary">Penduduk</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{profile.children} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Anak-anak</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{profile.mature} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Dewasa</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{profile.old} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Lanjut Usia</p>
                            </div>
                        </div>
                    </ContainerClient>
                </div>
            </div>
            <div id="aparaturdesa">
                <ContainerClient classNames="pt-24">
                    <h2 className="title text-center mb-7">Aparatur Desa</h2>
                    <Image src={`/assets/village-profile/${profile.image}`} className="rounded-md w-2/3 mx-auto" alt="Struktur Aparatur Desa" />
                </ContainerClient>
            </div>
        </>
    )
}
