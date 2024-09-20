"use client"
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { Product } from '@/types/Product';
import { Shop } from '@/types/Shop';
import { User } from '@/types/User';
import axiosInstance from '@/utils/axiosInstance';
import { formatRupiah } from '@/utils/format';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconPlus, IconCircleXFilled, IconSquareRoundedXFilled } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from "yup"

export default function Toko() {
    const [id, setId] = useState<number | null>(2);
    const [umkm, setUmkm] = useState<Shop>({
        id: 0,
        name: '',
        description: '',
        identity: '',
        owner: {} as User,
        userId: '',
        location: '',
        status: false,
        phone: '',
        product: []
    });
    const [dataProduk, setDataProduk] = useState<string | null>(null);
    const [selectedProduk, setSelectedProduk] = useState<string | null>(null);
    const [idProduk, setIdProduk] = useState<number | null>(null);
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [typeProduct, setTypeProduct] = useState<string>('add');
    const [dataImage, setDataImage] = useState<string | null>(null);

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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
            .integer('Price must be an integer')
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

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/shops/${id}`);
            setUmkm(response.data.data);
        } catch (error: any) {

        }
    }

    const modalProdukClick = () => {
        const modal = document.getElementById(
            `modal_${typeProduct}5`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const closeModal: any = () => {
        const modal = document.getElementById(
            `modal_${typeProduct}5`,
        ) as HTMLDialogElement;
        if (modal) {
            modal.close();
            resetProduk();
            setIsModalProductOpen(false);
            setTypeProduct('add');
            setSelectedProduk(null);
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

    const handleDeleteProduct = async (id: number) => {
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

    useEffect(() => {
        if (isModalProductOpen) modalProdukClick();
    }, [isModalProductOpen]);

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Card>
            <div className="flex justify-between items-center mb-3">
                <p className="font-bold">{umkm.name}</p>
                <button
                onClick={() => {
                    setValueProduk('shopId', umkm.id);
                    setIsModalProductOpen(true);
                }}
                    type="button"
                    className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
                >
                    <IconPlus color="#fff" size={18} />
                    <p>Tambah Produk</p>
                </button>
            </div>
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
                                    disabled={typeProduct == 'view'}
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
                                    disabled={typeProduct == 'view'}
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
                                    disabled={typeProduct == 'view'}
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
                                            alt="Gambar Produk"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <InputForm
                                            disabled={typeProduct === 'view'}
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

                                <Button type="submit" color="primary" size="base">
                                    Save
                                </Button>
                        </form>
                    </div>
                </dialog>
            <div className="flex gap-3 flex-wrap">
                {umkm.product.length <= 0 ? (
                    <p className="font-medium mt-3">Produk sedang kosong!</p>
                ) : (
                    <div className="flex gap-3 flex-wrap mt-3">
                        {umkm.product.map((product: Product, i: number) => (
                            <div key={i} className="border border-custom bg-white flex flex-col justify-between rounded-md max-w-80 p-3">
                                <Image
                                    src={`/assets/products/${product.image}`}
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
                                    <Button onClick={() => {
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
            </div>
        </Card>
    );
}
