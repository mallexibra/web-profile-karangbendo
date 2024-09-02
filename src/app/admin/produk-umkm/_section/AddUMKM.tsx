'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import { Shop } from '@/types/Shop';
import axiosInstance from '@/utils/axiosInstance';
import { formatRupiah } from '@/utils/format';
import { optionUser } from '@/utils/option';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    IconCircleXFilled,
    IconEyeOff,
    IconFile,
    IconPlus,
    IconSquareRoundedXFilled,
} from '@tabler/icons-react';
import { register } from 'module';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from "yup"

export default function AddUMKM() {
    const [umkm, setUmkm] = useState<Shop[]>([]);
    const [type, setType] = useState<string>('add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [dataImage, setDataImage] = useState<string | null>(null)

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
        'image/jpg', 'image/jpeg', 'image/png'
    ];

    const umkmSchema = yup.object({
        name: yup.string().required('Nama wajib diisi'),
        userId: yup.string().required('Pemilik Usaha wajib diisi'),
        description: yup.string().required('Deskripsi wajib diisi'),
        location: yup.string().required('Lokasi wajib diisi'),
        phone: yup.string().required('Nomor Telpon wajib diisi'),
        identity: yup
            .mixed<File>()
            .nullable()
            .test('fileSize', 'Ukuran file maksimal 2MB', function (value: any) {
                if (value) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return true;
            })
            .test(
                'fileFormat',
                'Format file tidak valid, hanya word dan pdf yang diperbolehkan',
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
        resolver: yupResolver(umkmSchema),
    });

    const modalClick = () => {
        const modal = document.getElementById(
            `modal_${type}4`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const close: any = () => {
        const modal = document.getElementById(
            `modal_${type}4`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.close();
            reset()
            setIsModalOpen(false);
            setType('add');
            setSelectedFile(null)
        }
    };


    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/shops');
            const dataTemporary: Shop[] = response.data.data;
            // const data = dataTemporary.filter((user: User) => user.role == 'admin');

            setUmkm(dataTemporary);
        } catch (error) {
            console.log(`Error fetching data umkm desa: ${error}`);
        }
    };

    const handleAddUMKM = async (data: any) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let value = data[key];
                    if (key === 'identity' && !selectedFile && dataImage) {
                        value = null;
                    }
                    formData.append(key, value);
                }
            }
            let response;
            if (!id) {
                response = await axiosInstance.post('/shops', formData);
            } else {
                response = await axiosInstance.patch(
                    `/shops/${id}`,
                    formData,
                );
            }

            if (response.status) {
                close();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses tambah data umkm desa',
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
        } catch (error: any) {
            close();

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
            console.log(`Error create data umkm desa: ${error}`);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedFile(URL.createObjectURL(file));
            setValue('identity', file);
        } else {
            console.log('No file selected or fileList is empty');
        }
    };

    useEffect(() => {
        if (isModalOpen) modalClick();
    }, [isModalOpen]);
    return (
        <div className="space-y-3">
            <Card>
                <div className="flex justify-between items-center">
                    <p className="font-bold">UMKM Desa</p>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        type="button"
                        className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
                    >
                        <IconPlus color="#fff" size={18} />
                        <p>Tambah UMKM</p>
                    </button>
                </div>
                <dialog id={`modal_${type}4`} className="modal">
                    <div className="modal-box">
                        <button
                            type="button"
                            onClick={close}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">
                            {type == 'view'
                                ? 'Detail'
                                : type.split('_')[0] == 'edit'
                                    ? 'Edit'
                                    : 'Tambah'}{' '}
                            Peraturan Desa
                        </h3>

                        <form
                            method="post"
                            onSubmit={handleSubmit(handleAddUMKM)}
                            className="mt-3 flex flex-col gap-2"
                        >
                            <LabelForm label="Nama UMKM">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...register('name')}
                                    type="text"
                                    label="Nama UMKM"
                                    name="name"
                                    placeholder="Input nama UMKM"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Pemilik Usaha">
                                <SelectForm
                                    {...register('userId')}
                                    label="Pemilik Usaha"
                                    name="userId"
                                    data={optionUser}
                                />
                                {errors.userId && (
                                    <p className="text-red-500 text-sm">{errors.userId.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Nomor Telpon">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...register('phone')}
                                    type="text"
                                    label="Nomor Telpon"
                                    name="phone"
                                    placeholder="Input nomor telpon"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Lokasi">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...register('location')}
                                    type="text"
                                    label="Lokasi"
                                    name="location"
                                    placeholder="Input lokasi UMKM"
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm">{errors.location.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Deskripsi">
                                <textarea
                                    disabled={type == 'view'}
                                    {...register('description')}
                                    placeholder="Masukkan deskripsi UMKM"
                                    rows={3}
                                    className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm">
                                        {errors.description.message}
                                    </p>
                                )}
                            </LabelForm>

                            <div className="relative">
                                <LabelForm label="Identitas UMKM">
                                    {selectedFile || dataImage ? (
                                        <img
                                            src={selectedFile || `/assets/village-apparatus/${dataImage}`}
                                            alt="Struktur Aparatur Desa"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <InputForm
                                            disabled={type === 'view'}
                                            {...register('identity')}
                                            accept=".png,.jpg,.jpeg"
                                            type="file"
                                            label="Identitas UMKM"
                                            name="identity"
                                            placeholder="Input file peraturan"
                                            onChange={handleFileChange}
                                        />
                                    )}
                                    {errors.identity && (
                                        <p className="text-red-500 text-sm">{errors.identity.message}</p>
                                    )}
                                </LabelForm>

                                {selectedFile || dataImage ? (
                                    <IconSquareRoundedXFilled
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setDataImage(null);
                                        }}
                                        className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                                    />
                                ) : null}
                            </div>

                            {type != 'view' && (
                                <Button type="submit" color="primary" size="base">
                                    Save
                                </Button>
                            )}
                        </form>
                    </div>
                </dialog>
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-3">
                    <p className="font-bold">Karangbendo Kreatif</p>
                    <button
                        type="button"
                        className="w-max px-3 py-2 bg-danger rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
                    >
                        <IconEyeOff color="#fff" size={18} />
                        {/* <IconEye color="#fff" size={18} /> */}
                        <p>Non-aktif</p>
                    </button>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <div className="relative border border-custom bg-white rounded-md max-w-80 p-3">
                        <img
                            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="w-full rounded-md bg-cover max-h-[512px]"
                            alt="Produk UMKM"
                        />
                        <span className="inline-block absolute -top-2 -right-2 cursor-pointer bg-white w-max rounded-full">
                            <IconCircleXFilled className="text-rose-600" />
                        </span>
                        <p className="font-bold mt-3 text-lg">Kopi Robusta</p>
                        <p className="font-semibold my-1 text-danger">
                            {formatRupiah(120000)}
                        </p>
                        <p className="text-xs font-semibold">Deskripsi</p>
                        <p className="text-xs">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
                            animi officiis illum, consequatur id ipsam minus ratione ut
                            exercitationem voluptate.
                        </p>
                        <div className="flex gap-3 mt-3">
                            <Button color="warning" size="sm" className="w-full">
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="w-full">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
