"use client"
import Button from "@/components/button/Button";
import Card from "@/components/cards/Card";
import ContainerClient from "@/components/containers/ContainerClient";
import { InputForm } from "@/components/forms/InputForm";
import LabelForm from "@/components/forms/LabelForm";
import { SelectForm } from "@/components/forms/SelectForm";
import { optionAduan } from "@/utils/option";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function PengaduanMasyarakat() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedImage(URL.createObjectURL(file));
        } else {
            console.log('No file selected or fileList is empty');
        }
    };
    return (
        <ContainerClient>
            <div id="pengaduanmasyarakat" className="flex gap-5 mt-5 pt-10 pb-20">
                <section className="w-1/2">
                    <h2 className="title">Pengaduan Masyarakat</h2>
                    <p>Masyarakat Desa Karangbendo dapat menyampaikan keluhan, saran, atau masukan mengenai pelayanan dan kondisi desa melalui form pengaduan yang disediakan. Setiap pengaduan akan ditindaklanjuti oleh aparatur desa dengan cepat dan transparan.</p>
                    <p className="font-semibold mt-3">Alamat</p>
                    <p>Desa Karangbendo, Rogojampi, Banyuwangi, Jawa Timur</p>
                    <p className="font-semibold mt-3">Telepon</p>
                    <p>(0333) 123456</p>
                    <p className="font-semibold mt-3">Email</p>
                    <p>desa.karangbendo@example.com</p>
                </section>
                <section className="w-1/2">
                    <Card classNames="w-full">
                        <form
                            method="post"
                            className="mt-3 flex flex-col gap-2"
                        >
                            <LabelForm label="Nama">
                                <InputForm
                                    type="text"
                                    label="Nama"
                                    name="name"
                                    placeholder="Input nama kamu"
                                />
                            </LabelForm>
                            <LabelForm label="Nomor Telepon">
                                <InputForm
                                    type="text"
                                    label="Nomor Telepon"
                                    name="telp"
                                    placeholder="Input nomor telepon kamu"
                                />
                            </LabelForm>
                            <LabelForm label="Jenis Pengaduan">
                                <SelectForm
                                    label="Jenis Pengaduan"
                                    name="aduan"
                                    data={optionAduan}
                                />
                            </LabelForm>
                            <LabelForm label="Bukti Pendukung">
                                {selectedImage ? (
                                    <div className="relative">
                                        <img
                                            src={selectedImage}
                                            alt="Struktur Aparatur Desa"
                                            className="rounded-md"
                                        />
                                        <IconSquareRoundedXFilled
                                            onClick={() => {
                                                setSelectedImage(null);
                                            }}
                                            className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                                        />
                                    </div>
                                ) : (
                                    <InputForm
                                        type="file"
                                        label="Bukti Pendukung"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                )}
                            </LabelForm>
                            <Button type="submit" color="primary" size="base">
                                Save
                            </Button>
                        </form>
                    </Card>
                </section>
            </div>
        </ContainerClient>
    )
}
