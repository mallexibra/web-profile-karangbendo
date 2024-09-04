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
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileProduct, setSelectedFileProduct] = useState<string | null>(null);
  const [dataImage, setDataImage] = useState<string | null>(null);
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
      .required('Image is required')
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
    shopId: yup
      .number()
      .required('Shop ID is required and must be a number')
      .integer('Shop ID must be an integer'),
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
      reset();
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
      reset();
      setIsModalProductOpen(false);
      setTypeProduct('add');
      setSelectedFileProduct(null);
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

  const getUser = async () => {
    const response = await axiosInstance.get('/users');
    const data: User[] = response.data.data;
    const option = data.map((user: User) => {
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
        setValue('identity', null);
      } else {
        setValue(key as keyof FormFields, value);
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
                  <p className="text-red-500 text-sm">
                    {errors.userId.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
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
                      src={
                        selectedFile || `/assets/shops_identity/${dataImage}`
                      }
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
                    <p className="text-red-500 text-sm">
                      {errors.identity.message}
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
      </Card>
      {umkm.length <= 0 ? (
        <Card>
          <p className="font-semibold">Data umkm sedang kosong!</p>
        </Card>
      ) : (
        umkm.map((item: Shop) => (
          <Card>
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
                  <div className="relative border border-custom bg-white rounded-md max-w-80 p-3">
                    <img
                      src={`/assets/products/${product.image}`}
                      className="w-full rounded-md bg-cover max-h-[512px]"
                      alt="Produk UMKM"
                    />
                    <span className="inline-block absolute -top-2 -right-2 cursor-pointer bg-white w-max rounded-full">
                      <IconCircleXFilled className="text-rose-600" />
                    </span>
                    <p className="font-bold mt-3 text-lg">{product.name}</p>
                    <p className="font-semibold my-1 text-danger">
                      {formatRupiah(product.price)}
                    </p>
                    <p className="text-xs font-semibold">Deskripsi</p>
                    <p className="text-xs">{product.description}</p>
                    <div className="flex gap-3 mt-3">
                      <Button color="warning" size="sm" className="w-full">
                        Edit
                      </Button>
                      <Button color="danger" size="sm" className="w-full">
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
