'use client';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { VillageProfile } from '@/types/VillageProfile';
import axiosInstance from '@/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconPlus, IconSquareRoundedXFilled } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function ProfileDesa() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [dataImage, setDataImage] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    const villageProfileSchema = yup.object().shape({
        visi: yup.string().required('Visi wajib diisi'),
        misi: yup.string().required('Misi wajib diisi'),
        resident: yup
            .number()
            .positive('Jumlah Penduduk harus bilangan positif')
            .required('Jumlah Penduduk wajib diisi')
            .transform((_, val) => (val !== '' ? Number(val) : null)),
        children: yup
            .number()
            .positive('Jumlah Anak-anak harus bilangan positif')
            .required('Jumlah Anak-anak wajib diisi')
            .transform((_: any, val: any) => (val !== '' ? Number(val) : null)),
        mature: yup
            .number()
            .positive('Jumlah Dewasa harus bilangan positif')
            .required('Jumlah Dewasa wajib diisi')
            .transform((_, val) => (val !== '' ? Number(val) : null)),
        old: yup
            .number()
            .positive('Jumlah Lanjut Usia harus bilangan positif')
            .required('Jumlah Lanjut Usia wajib diisi')
            .transform((_, val) => (val !== '' ? Number(val) : null)),
        image: yup
            .mixed<File>()
            .test(
                'fileRequired',
                'Struktur Aparatur Desa wajib diisi',
                function (value) {
                    console.log(!dataImage, !!value, !id);
                    const isDataImageValid = !dataImage;
                    const isValueValid = value instanceof FileList;
                    const isIdValid = !!id;
                    console.log(isDataImageValid , isValueValid , isIdValid)
                    return isDataImageValid || isValueValid || isIdValid;
                },
            )
            .test('fileSize', 'Ukuran file maksimal 2MB', function (value) {
                if (value) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return false;
            })
            .test(
                'fileFormat',
                'Format file tidak valid, hanya jpg, jpeg, dan png yang diperbolehkan',
                function (value) {
                    if (value) {
                        return SUPPORTED_FORMATS.includes(value.type);
                    }
                    return false;
                },
            ),
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(villageProfileSchema),
        context: { isEdit: !!id }
    });

    type FormFields = Pick<
        VillageProfile,
        'visi' | 'misi' | 'resident' | 'children' | 'mature' | 'old' | 'image'
    >;

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/village-profiles');
            const data: VillageProfile[] = response.data.data;

            const sortedData = data.sort((a, b) => a.id - b.id);

            const firstData = sortedData[0];

            Object.entries(firstData).forEach(([key, value]) => {
                if (key === 'id') {
                    setId(value);
                }

                if (key === 'image') {
                    setDataImage(value);
                } else {
                    setValue(key as keyof FormFields, value);
                }
            });
        } catch (error) {
            console.log(`Error fetching data profile desa: ${error}`);
        }
    };

    const submitData = async (data: any) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let value = data[key];
                    if (key === 'image' && !selectedImage && dataImage) {
                        value = null;
                    }
                    formData.append(key, value);
                }
            }
            let response;
            if (id) {
                response = await axiosInstance.patch(`/village-profiles/${id}`, formData);
            } else {
                response = await axiosInstance.post('/village-profiles', formData);
            }
            if (response.status) {
                close();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: `Sukses ${id ? 'edit' : 'tambah'} data profile desa`,
                });
                fetchData();
            } else {
                close();
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: response.data.message[0] || 'Terjadi kesalahan.',
                });
            }
        } catch (error) { }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setValue('image', file);
        } else {
            console.log('No file selected or fileList is empty');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'image') {
                console.log('Image changed:', value.image);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <Card>
            <form action="" onSubmit={handleSubmit(submitData)} method="post">
                <div className="flex gap-5">
                    <section className="flex flex-col gap-3 w-1/2">
                        <LabelForm label="Visi Desa">
                            <InputForm
                                {...register('visi')}
                                type="text"
                                label="Visi Desa"
                                name="visi"
                                placeholder="Masukkan visi desa"
                            />
                            {errors.visi && (
                                <p className="text-red-500 text-sm">{errors.visi.message}</p>
                            )}
                        </LabelForm>
                        <LabelForm label="Misi Desa">
                            <textarea
                                {...register('misi')}
                                placeholder="Masukkan misi desa"
                                rows={3}
                                className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                            />
                            {errors.misi && (
                                <p className="text-red-500 text-sm">{errors.misi.message}</p>
                            )}
                        </LabelForm>
                        <LabelForm label="Struktur Aparatur Desa">
                            {selectedImage || dataImage ? (
                                <div className="relative">
                                    <Image
                                        src={selectedImage || dataImage!}
                                        width={500} height={500}
                                        alt="Struktur Aparatur Desa"
                                        className="rounded-md w-full object-cover"
                                    />
                                    <IconSquareRoundedXFilled
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setDataImage(null);
                                        }}
                                        className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                                    />
                                </div>
                            ) : (
                                <InputForm
                                    {...register('image')}
                                    type="file"
                                    label="Struktur Aparatur Desa"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            )}
                        </LabelForm>
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image.message}</p>
                        )}
                    </section>
                    <section className="flex flex-col gap-3 w-1/2">
                        <LabelForm label="Jumlah Penduduk">
                            <InputForm
                                {...register('resident')}
                                type="number"
                                label="Jumlah Penduduk"
                                name="resident"
                                placeholder="Masukkan jumlah penduduk"
                            />
                            {errors.resident && (
                                <p className="text-red-500 text-sm">
                                    {errors.resident.message}
                                </p>
                            )}
                        </LabelForm>
                        <LabelForm label="Jumlah Anak-anak">
                            <InputForm
                                {...register('children')}
                                type="number"
                                label="Jumlah Anak-anak"
                                name="children"
                                placeholder="Masukkan jumlah anak-anak"
                            />
                            {errors.children && (
                                <p className="text-red-500 text-sm">
                                    {errors.children.message}
                                </p>
                            )}
                        </LabelForm>
                        <LabelForm label="Jumlah Dewasa">
                            <InputForm
                                {...register('mature')}
                                type="number"
                                label="Jumlah Dewasa"
                                name="mature"
                                placeholder="Masukkan jumlah dewasa"
                            />
                            {errors.mature && (
                                <p className="text-red-500 text-sm">{errors.mature.message}</p>
                            )}
                        </LabelForm>
                        <LabelForm label="Jumlah Lanjut Usia">
                            <InputForm
                                {...register('old')}
                                type="number"
                                label="Jumlah Lanjut Usia"
                                name="old"
                                placeholder="Masukkan jumlah lanjut usia"
                            />
                            {errors.old && (
                                <p className="text-red-500 text-sm">{errors.old.message}</p>
                            )}
                        </LabelForm>
                    </section>
                </div>
                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
                    >
                        <IconPlus color="#fff" size={18} />
                        <p>{id ? 'Edit' : 'Tambah'} Data</p>
                    </button>
                </div>
            </form>
        </Card>
    );
}
