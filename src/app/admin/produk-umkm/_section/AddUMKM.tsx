'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import { Product } from '@/types/Product';
import { Shop } from '@/types/Shop';
import { User } from '@/types/User';
import axiosInstance from '@/utils/axiosInstance';
import { formatRupiah } from '@/utils/format';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    IconCircleXFilled,
    IconEye,
    IconEyeOff,
    IconPencil,
    IconPlus,
    IconSquareRoundedXFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function AddUMKM() {
    const [umkm, setUmkm] = useState<Shop[]>([]);
    const [type, setType] = useState<string>('add');
    const [typeProduct, setTypeProduct] = useState<string>('add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [idProduk, setIdProduk] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [selectedProduk, setSelectedProduk] = useState<string | null>(null);
    const [dataImage, setDataImage] = useState<string | null>(null);
    const [dataProduk, setDataProduk] = useState<string | null>(null);
    const [optionUser, setOptionUser] = useState<any>([]);

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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

    const productSchema = yup.object({
        image: yup
            .mixed<File>()
            .nullable()
            .test('fileSize', 'Ukuran file maksimal 2MB', function (value: any) {
                if (value) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return true;
            })
            .test('fileFormat', 'Format file tidak valid, hanya JPG, PNG, dan GIF yang diperbolehkan', function (value: any) {
                if (value) {
                    return SUPPORTED_FORMATS.includes(value.type);
                }
                return true;
            }),
        name: yup.string().required('Name is required and must be a string'),
        description: yup.string().required('Description is required and must be a string'),
        price: yup
            .number()
            .required('Price is required and must be a number')
            .positive('Price must be a positive number')
            .integer('Price must be an integer'),
        shopId: yup.number().nullable()
    });

    const {
        register: registerUmkm,
        handleSubmit: handleSubmitUmkm,
        reset: resetUmkm,
        setValue: setValueUmkm,
        formState: { errors: errorsUmkm },
    } = useForm({
        resolver: yupResolver(umkmSchema),
    });

    const {
        register: registerProduk,
        handleSubmit: handleSubmitProduk,
        reset: resetProduk,
        setValue: setValueProduk,
        formState: { errors: errorsProduk },
    } = useForm({
        resolver: yupResolver(productSchema),
    });

    const modalClick = () => {
        const modal = document.getElementById(
            `modal_${type}4`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const modalProdukClick = () => {
        const modal = document.getElementById(
            `modal_${typeProduct}5`,
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
            resetUmkm();
            setIsModalOpen(false);
            setType('add');
            setSelectedFile(null);
        }
    };

    const closeModal: any = () => {
        const modal = document.getElementById(
            `modal_${type}5`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.close();
            resetProduk();
            setIsModalProductOpen(false);
            setTypeProduct('add');
            setSelectedProduk(null);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/shops');
            let dataTemporary: Shop[] = response.data.data;
            // const data = dataTemporary.filter((user: User) => user.role == 'admin');
            dataTemporary = dataTemporary.sort((a, b) => a.id - b.id);

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
                response = await axiosInstance.patch(`/shops/${id}`, formData);
            }

            if (response.status) {
                close();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: `Sukses ${id ? 'edit' : 'tambah'} data umkm desa`,
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
    };

    const handleAddProduct = async (data: any) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let value = data[key];
                    if (key === 'image' && !selectedProduk && dataImage) {
                        value = null;
                    }
                    formData.append(key, value);
                }
            }

            let response;
            if (!idProduk) {
                response = await axiosInstance.post('/products', formData);
            } else {
                response = await axiosInstance.patch(`/products/${idProduk}`, formData);
            }

            if (response.status) {
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: `Sukses ${id ? 'edit' : 'tambah'} produk`,
                });
                fetchData();
            } else {
                closeModal();
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: response.data.message[0] || 'Terjadi kesalahan.',
                });
            }
        } catch (error: any) {
            closeModal();

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
            console.log(`Error create data produk: ${error}`);
        }
    };

    const handleDeleteProduct= async (id: number)=>{
        try {
            const response = await axiosInstance.delete(`/products/${id}`);

            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses delete produk',
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
            console.log(`Error delete data produk`);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedFile(URL.createObjectURL(file));
            setValueUmkm('identity', file);
        } else {
            console.log('No file selected or fileList is empty');
        }
    };

    const handleImageProduk = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            setSelectedProduk(URL.createObjectURL(file));
            setValueProduk('image', file);
        } else {
            console.log('No file selected or fileList is empty');
        }
    };

    const getUser = async () => {
        const response = await axiosInstance.get('/users');
        const data: User[] = response.data.data;
        const option = data.filter((user: User)=> user.role == "umkm").map((user: User) => {
            return { label: user.name, value: user.id };
        });
        setOptionUser(option);
    };

    type FormFields = Pick<
        Shop,
        'name' | 'phone' | 'description' | 'location' | 'userId' | 'identity'
    >;

    const handleEdit = (data: FormFields) => {
        Object.entries(data).forEach(([key, value]) => {
            if (key == 'identity') {
                setValueUmkm('identity', null);
            } else {
                setValueUmkm(key as keyof FormFields, value);
            }
        });
    };

    type FormProduct = Pick<
        Product,
        'name' | 'price' | 'description' | 'image'
    >;

    const handleEditProduct = (data: FormProduct) => {
        Object.entries(data).forEach(([key, value]) => {
            if (key == 'image') {
                setValueProduk('image', null);
            } else {
                setValueProduk(key as keyof FormProduct, value);
            }
        });
    };

    const changeStatus = async (id: number, data: boolean) => {
        try {
            const formData = new FormData();
            formData.append('status', `${data}`);
            let response = await axiosInstance.patch(`/shops/${id}`, formData);

            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses update status umkm desa',
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
            console.log(`Error update status umkm desa: ${error}`);
        }
    };

    useEffect(() => {
        if (isModalOpen) modalClick();
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalProductOpen) modalProdukClick();
    }, [isModalProductOpen]);

    useEffect(() => {
        getUser();
        fetchData();
    }, []);
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
                                : type == 'editumkm'
                                    ? 'Edit'
                                    : 'Tambah'}{' '}
                            UMKM Desa
                        </h3>

                        <form
                            method="post"
                            onSubmit={handleSubmitUmkm(handleAddUMKM)}
                            className="mt-3 flex flex-col gap-2"
                        >
                            <LabelForm label="Nama UMKM">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...registerUmkm('name')}
                                    type="text"
                                    label="Nama UMKM"
                                    name="name"
                                    placeholder="Input nama UMKM"
                                />
                                {errorsUmkm.name && (
                                    <p className="text-red-500 text-sm">{errorsUmkm.name.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Pemilik Usaha">
                                <SelectForm
                                    {...registerUmkm('userId')}
                                    label="Pemilik Usaha"
                                    name="userId"
                                    data={optionUser}
                                />
                                {errorsUmkm.userId && (
                                    <p className="text-red-500 text-sm">
                                        {errorsUmkm.userId.message}
                                    </p>
                                )}
                            </LabelForm>

                            <LabelForm label="Nomor Telpon">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...registerUmkm('phone')}
                                    type="text"
                                    label="Nomor Telpon"
                                    name="phone"
                                    placeholder="Input nomor telpon"
                                />
                                {errorsUmkm.phone && (
                                    <p className="text-red-500 text-sm">{errorsUmkm.phone.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Lokasi">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...registerUmkm('location')}
                                    type="text"
                                    label="Lokasi"
                                    name="location"
                                    placeholder="Input lokasi UMKM"
                                />
                                {errorsUmkm.location && (
                                    <p className="text-red-500 text-sm">
                                        {errorsUmkm.location.message}
                                    </p>
                                )}
                            </LabelForm>

                            <LabelForm label="Deskripsi">
                                <textarea
                                    disabled={type == 'view'}
                                    {...registerUmkm('description')}
                                    placeholder="Masukkan deskripsi UMKM"
                                    rows={3}
                                    className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                                />
                                {errorsUmkm.description && (
                                    <p className="text-red-500 text-sm">
                                        {errorsUmkm.description.message}
                                    </p>
                                )}
                            </LabelForm>

                            <div className="relative">
                                <LabelForm label="Identitas UMKM">
                                    {selectedFile || dataImage ? (
                                        <Image
                                            src={
                                                selectedFile || `/assets/shops_identity/${dataImage}`
                                            }
                                            width={210}
                                            height={210}
                                            alt="Struktur Aparatur Desa"
                                            className="rounded-md w-full object-cover"
                                        />
                                    ) : (
                                        <InputForm
                                            disabled={type === 'view'}
                                            {...registerUmkm('identity')}
                                            accept=".png,.jpg,.jpeg"
                                            type="file"
                                            label="Identitas UMKM"
                                            name="identity"
                                            placeholder="Input file peraturan"
                                            onChange={handleFileChange}
                                        />
                                    )}
                                    {errorsUmkm.identity && (
                                        <p className="text-red-500 text-sm">
                                            {errorsUmkm.identity.message}
                                        </p>
                                    )}
                                </LabelForm>

                                {selectedFile || dataImage ? (
                                    <IconSquareRoundedXFilled
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setDataImage(null);
                                        }}
                                        className="text-red-600 absolute top-4 -right-2 cursor-pointer"
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
                <dialog id={`modal_${typeProduct}5`} className="modal">
                    <div className="modal-box">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">
                            {typeProduct == 'view'
                                ? 'Detail'
                                : typeProduct == 'edit'
                                    ? 'Edit'
                                    : 'Tambah'}{' '}
                            Produk
                        </h3>

                        <form
                            method="post"
                            onSubmit={handleSubmitProduk(handleAddProduct)}
                            className="mt-3 flex flex-col gap-2"
                        >
                            <LabelForm label="Nama Produk">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...registerProduk('name')}
                                    type="text"
                                    label="Nama Produk"
                                    name="name"
                                    placeholder="Input nama produk"
                                />
                                {errorsProduk.name && (
                                    <p className="text-red-500 text-sm">{errorsProduk.name.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Harga">
                                <InputForm
                                    disabled={type == 'view'}
                                    {...registerProduk('price')}
                                    type="number"
                                    label="Harga"
                                    name="price"
                                    placeholder="Input harga produk"
                                />
                                {errorsProduk.price && (
                                    <p className="text-red-500 text-sm">{errorsProduk.price.message}</p>
                                )}
                            </LabelForm>

                            <LabelForm label="Deskripsi">
                                <textarea
                                    disabled={type == 'view'}
                                    {...registerProduk('description')}
                                    placeholder="Masukkan deskripsi produk"
                                    rows={3}
                                    className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                                />
                                {errorsProduk.description && (
                                    <p className="text-red-500 text-sm">
                                        {errorsProduk.description.message}
                                    </p>
                                )}
                            </LabelForm>

                            <div className="relative">
                                <LabelForm label="Gambar Produk">
                                    {selectedProduk || dataProduk ? (
                                        <Image
                                            src={
                                                selectedProduk || `/assets/products/${dataProduk}`
                                            }
                                            fill
                                            alt="Gambar Produk"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <InputForm
                                            disabled={type === 'view'}
                                            {...registerProduk('image')}
                                            accept=".png,.jpg,.jpeg"
                                            type="file"
                                            label="Gambar Produk"
                                            name="image"
                                            placeholder="Input gambar produk"
                                            onChange={handleImageProduk}
                                        />
                                    )}
                                    {errorsProduk.image && (
                                        <p className="text-red-500 text-sm">
                                            {errorsProduk.image.message}
                                        </p>
                                    )}
                                </LabelForm>

                                {selectedProduk || dataProduk ? (
                                    <IconSquareRoundedXFilled
                                        onClick={() => {
                                            setSelectedProduk(null);
                                            setDataProduk(null);
                                        }}
                                        className="text-red-600 absolute top-4 -right-2 cursor-pointer"
                                    />
                                ) : null}
                            </div>

                            {typeProduct != 'view' && (
                                <Button type="submit" color="primary" size="base">
                                    Save
                                </Button>
                            )}
                        </form>
                    </div>
                </dialog>
            </Card>
            {umkm.length <= 0 ? (
                <Card>
                    <p className="font-semibold">Data umkm sedang kosong!</p>
                </Card>
            ) : (
                umkm.map((item: Shop, i: number) => (
                    <Card key={i}>
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-bold">{item.name}</p>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => {
                                        setType('editumkm');
                                        handleEdit(item);
                                        setId(item.id);
                                        setIsModalOpen(true);
                                        setDataImage(item.identity);
                                    }}
                                    color="warning"
                                    className="flex items-center gap-2"
                                >
                                    <IconPencil color="#fff" size={18} />
                                    <p>Edit</p>
                                </Button>
                                {item.status ? (
                                    <Button
                                        onClick={() => changeStatus(item.id, false)}
                                        color="danger"
                                        className="flex items-center gap-2"
                                    >
                                        <IconEyeOff color="#fff" size={18} />
                                        <p>Non-aktif</p>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => changeStatus(item.id, true)}
                                        color="primary"
                                        className="flex items-center gap-2"
                                    >
                                        <IconEye color="#fff" size={18} />
                                        <p>Aktif</p>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setValueProduk('shopId', item.id);
                                setIsModalProductOpen(true);
                            }}
                            type="button"
                            className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
                        >
                            <IconPlus color="#fff" size={18} />
                            <p>Tambah Produk</p>
                        </button>
                        {item.product.length <= 0 ? (
                            <p className="font-medium mt-3">Produk sedang kosong!</p>
                        ) : (
                            <div className="flex gap-3 flex-wrap mt-3">
                                {item.product.map((product: Product) => (
                                    <div key={i} className="border border-custom bg-white flex flex-col justify-between rounded-md max-w-80 p-3">
                                        <Image
                                            src={`/assets/products/${product.image}`}
                                            fill
                                            className="w-full rounded-md bg-cover max-h-[512px]"
                                            alt="Produk UMKM"
                                        />
                                        <p className="font-bold mt-3 text-lg">{product.name}</p>
                                        <p className="font-semibold my-1 text-danger">
                                            {formatRupiah(product.price)}
                                        </p>
                                        <p className="text-xs font-semibold">Deskripsi</p>
                                        <p className="text-xs">{product.description}</p>
                                        <div className="flex gap-3 mt-auto pt-3">
                                            <Button onClick={() => {
                                                setIdProduk(product.id);
                                                setTypeProduct('edit');
                                                handleEditProduct(product)
                                                setDataProduk(product.image)
                                                setIsModalProductOpen(true);
                                            }} color="warning" size="sm" className="w-full">
                                                Edit
                                            </Button>
                                            <Button onClick={()=>{
                                                    Swal.fire({
                                                        title: 'Apakah anda yakin akan menghapus data ini?',
                                                        showDenyButton: true,
                                                        confirmButtonText: 'Yakin',
                                                        denyButtonText: 'Tidak yakin',
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            handleDeleteProduct(product.id)
                                                        }
                                                    });
                                                }} color="danger" size="sm" className="w-full">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                ))
            )}
        </div>
    );
}
