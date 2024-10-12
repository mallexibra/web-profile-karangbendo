"use client"
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import axiosInstance from '@/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from "yup";

export default function SettingToko() {
    const {data: session} = useSession();
    const shopId = session?.user?.shop?.[0]?.id ?? null;
    const umkmSchema = yup.object({
        name: yup.string().required('Nama wajib diisi'),
        description: yup.string().required('Deskripsi wajib diisi'),
        location: yup.string().required('Lokasi wajib diisi'),
        phone: yup.string().required('Nomor Telpon wajib diisi')
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(umkmSchema)
    })

    const fetchData = async () => {
        try {
            const response = session && (await axiosInstance.get(`/shops/${shopId}`)).data.data;
            setValue('name', response.name);
            setValue('phone', response.phone);
            setValue('location', response.location);
            setValue('description', response.description);
        } catch (error: any) {
            console.log(`Error: ${error.message}`)
        }
    }

    const updateUmkm = async (data: any)=>{
        try {
            const formData = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let value = data[key];
                    formData.append(key, value);
                }
            }

            const response = await axiosInstance.patch(`/shops/${shopId}`, formData);

            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: `Sukses ${shopId ? 'update' : 'tambah'} data umkm desa`,
                });
                fetchData();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: response.data.message[0] || 'Terjadi kesalahan.',
                });
            }
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
            console.log(`Error edit umkm`);
        }
    }

    useEffect(() => {
        fetchData()
    })
    return (
        <Card>
            <form onSubmit={handleSubmit(updateUmkm)} className="flex gap-3" method="post">
                <section className="w-full">
                    <LabelForm label="Nama UMKM">
                        <InputForm
                            {...register('name')}
                            label="Nama UMKM"
                            name="name"
                            type="text"
                            placeholder="Masukkan nama UMKM"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </LabelForm>
                    <LabelForm label="Alamat">
                        <InputForm
                            {...register('location')}
                            label="Alamat"
                            name="location"
                            type="text"
                            placeholder="Masukkan alamat UMKM"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm">
                                {errors.location.message}
                            </p>
                        )}
                    </LabelForm>
                    <LabelForm label="Nomor HP/WA">
                        <InputForm
                            {...register('phone')}
                            label="Nomor HP/WA"
                            name="phone"
                            type="text"
                            placeholder="Masukkan nomor HP/WA"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                    </LabelForm>
                </section>
                <section className="w-full">
                    <LabelForm label="Deskripsi UMKM">
                        <textarea
                            {...register('description')}
                            name="description"
                            placeholder="Masukkan deskripsi UMKM"
                            rows={10}
                            className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </LabelForm>
                    <div className="flex justify-end mt-5">
                        <Button type='submit' color="primary" size="sm">
                            Simpan
                        </Button>
                    </div>
                </section>
            </form>
        </Card>
    );
}
