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
                <div id="visimisi" className="md:pt-14 pt-12">
                    <ContainerClient classNames="flex md:flex-row flex-col justify-start gap-2 pt-16">
                        <div data-aos="fade-right" className="md:w-1/3 w-full">
                            <h2 className="title text-center md:text-start">Visi</h2>
                            <p className="md:text-start text-center">&quot;{profile.visi}&quot;</p>
                        </div>
                        <div data-aos="fade-left">
                            <h2 className="title text-center md:text-start">Misi</h2>
                            <ol className="list-decimal md:pl-5 px-6">
                                {profile.misi.split('\r\n').map((misi: string, i: number) => (
                                    <li key={i}>{misi}</li>
                                ))}
                            </ol>
                        </div>
                    </ContainerClient>
                </div>
                <div data-aos="fade-down" id="demografidesa">
                    <ContainerClient classNames="pt-24">
                        <h2 className="title text-center mb-7">Demografi Desa</h2>
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{profile.resident} <span className="text-sm font-normal">Jiwa</span></p>
                                <p className="font-bold text-primary">Penduduk</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{Math.round(Number(profile.children))} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Anak-anak</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{Math.round(Number(profile.mature))} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Dewasa</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl text-primary font-bold">{Math.round(Number(profile.old))} <span className="text-sm font-normal">%</span></p>
                                <p className="font-bold text-primary">Lanjut Usia</p>
                            </div>
                        </div>
                    </ContainerClient>
                </div>
            </div>
            <div id="aparaturdesa">
                <ContainerClient classNames="pt-24">
                    <h2 data-aos="fade-down" className="title text-center mb-7">Aparatur Desa</h2>
                    <Image data-aos="fade-down" src={profile.image} width={1200} height={500} className="rounded-md w-2/3 mx-auto" alt="Struktur Aparatur Desa" />
                </ContainerClient>
            </div>
        </>
    )
}
