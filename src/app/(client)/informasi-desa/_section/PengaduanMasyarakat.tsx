"use client"
import Button from "@/components/button/Button";
import Card from "@/components/cards/Card";
import ContainerClient from "@/components/containers/ContainerClient";
import { InputForm } from "@/components/forms/InputForm";
import LabelForm from "@/components/forms/LabelForm";
import { SelectForm } from "@/components/forms/SelectForm";
import axiosInstance from "@/utils/axiosInstance";
import { optionAduan } from "@/utils/option";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from 'yup';

export default function PengaduanMasyarakat() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    const complaintSchema = yup.object({
        name: yup.string().required('Nama wajib diisi'),
        complaint: yup.mixed<'fasilitas_umum'>().oneOf(['fasilitas_umum'], 'Invalid complaint type').required("Jenis aduan wajib diisi"),
        email: yup.string().email('Invalid email format').nullable(),
        phone: yup.string().nullable(),
        image: yup
            .mixed<File>()
            .required()
            .test('fileSize', 'Ukuran file maksimal 2MB', function (value: any) {
                if (value) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return true;
            })
            .test(
                'fileFormat',
                'Format file tidak valid, hanya jpg, jpeg, dan png yang diperbolehkan',
                function (value: any) {
                    if (value) {
                        return SUPPORTED_FORMATS.includes(value.type);
                    }
                    return true;
                },
            ),
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(complaintSchema),
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setValue('image', file)
        } else {
            console.log('No file selected or fileList is empty');
        }
    };

    const handleAddComplaint = async (data: any) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let value = data[key];
                    formData.append(key, value);
                }
            }
            let response = await axiosInstance.post(
                '/public-complaints',
                formData,
            );

            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses Mengirimkan Aduan Anda!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: response.data.message[0] || 'Terjadi kesalahan.',
                });
            }
            reset()
            setSelectedImage(null)
        } catch (error: any) {

            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: error.response.data.message || 'Terjadi kesalahan.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan tak terduga.',
                });
            }
            console.log(`Error create data public complaints: ${error}`);
        }
    };
    return (
        <ContainerClient>
            <div id="pengaduanmasyarakat" className="flex gap-5 pt-24 pb-20">
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
                            onSubmit={handleSubmit(handleAddComplaint)}
                            className="mt-3 flex flex-col gap-2"
                        >
                            <LabelForm label="Nama">
                                <InputForm
                                    {...register('name')}
                                    type="text"
                                    label="Nama"
                                    name="name"
                                    placeholder="Input nama kamu"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </LabelForm>
                            <LabelForm label="Nomor Telepon">
                                <InputForm
                                    {...register('phone')}
                                    type="text"
                                    label="Nomor Telepon"
                                    name="phone"
                                    placeholder="Input nomor telepon kamu"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </LabelForm>
                            <LabelForm label="Jenis Pengaduan">
                                <SelectForm
                                    {...register('complaint')}
                                    label="Jenis Pengaduan"
                                    name="complaint"
                                    data={optionAduan}
                                />
                                {errors.complaint && (
                                    <p className="text-red-500 text-sm">{errors.complaint.message}</p>
                                )}
                            </LabelForm>
                            <LabelForm label="Bukti Pendukung">
                                {selectedImage ? (
                                    <div className="relative">
                                        <Image
                                            src={selectedImage}
                                            fill
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
                                {errors.image && (
                                    <p className="text-red-500 text-sm">{errors.image.message}</p>
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
