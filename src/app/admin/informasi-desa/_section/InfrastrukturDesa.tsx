'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { VillageInfrastruktur } from '@/types/VillageInfrastruktur';
import axiosInstance from '@/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconCircleXFilled,
  IconPlus,
  IconSquareRoundedXFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function InfrastrukturDesa() {
  const [infrastrukturs, setInfrastrukturs] = useState<VillageInfrastruktur[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const villageInformationSchema = yup.object({
    name: yup.string().required('Nama wajib diisi'),
    image: yup
      .mixed<File>()
      .required('Gambar Infrastruktur Desa wajib diisi')
      .test(
        'fileRequired',
        'Gambar Infrastruktur Desa wajib diisi',
        function (value) {
          if(selectedImage == null) return false;
          const isValueValid = value instanceof File;
          return isValueValid;
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

  const modalClick = () => {
    const modal = document.getElementById(
      'modal_add_infrastruktur',
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById(
      'modal_add_infrastruktur',
    ) as HTMLDialogElement;
    if (modal) {
      setSelectedImage(null);
      modal.close();
      reset();
      setIsModalOpen(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(villageInformationSchema),
  });

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

  const handleAddInfrastrukturVillage = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key];
          formData.append(key, value);
        }
      }
      let response = await axiosInstance.post(
        '/village-infrastruktur',
        formData,
      );

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses tambah data infrastruktur desa',
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
      console.log(`Error create data apparatur desa: ${error}`);
    } finally {
      setSelectedImage(null);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `/village-infrastruktur/${id}`,
      );
      if (response.status) {
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses delete data infrastruktur desa',
        });
        fetchData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan tak terduga.',
      });
      console.log(`Error delete data infrastruktur desa: ${error}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/village-infrastruktur');
      const dataTemporary: VillageInfrastruktur[] = response.data.data;

      setInfrastrukturs(dataTemporary);
    } catch (error) {
      console.log(`Error fetching data infrastruktur desa: ${error}`);
    }
  };

  useEffect(() => {
    if (isModalOpen) modalClick();
  }, [isModalOpen]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Infrastruktur Desa</p>
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <dialog id="modal_add_infrastruktur" className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Tambah Infrastruktur Desa</h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddInfrastrukturVillage)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama">
              <InputForm
                {...register('name')}
                type="text"
                label="Nama"
                name="name"
                placeholder="Input nama infrastruktur desa"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </LabelForm>

            <div className="relative">
              {selectedImage && (
                <IconSquareRoundedXFilled
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                  className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                />
              )}
              <LabelForm label="Gambar Infrastruktur">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    width={500}
                    height={300}
                    alt="Infrastruktur Desa"
                    className="rounded-md w-full object-cover"
                  />
                ) : (
                  <InputForm
                    {...register('image')}
                    type="file"
                    label="Gambar Infrastruktur"
                    name="image"
                    onChange={handleImageChange}
                  />
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </LabelForm>
            </div>

            <Button type="submit" color="primary" size="base" disable={loading}>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </form>
        </div>
      </dialog>
      <div className="flex items-start gap-5 flex-wrap">
        {infrastrukturs.length > 0 ? (
          infrastrukturs.map(
            (infrastruktur: VillageInfrastruktur, i: number) => (
              <div key={i} className="relative w-max">
                <Image
                  src={infrastruktur.image}
                  className="rounded-md bg-cover"
                  width={215}
                  height={120}
                  alt={infrastruktur.name}
                />
                <span className="inline-block absolute -top-2 -right-2 cursor-pointer bg-white w-max rounded-full">
                  <IconCircleXFilled
                    onClick={() => {
                      Swal.fire({
                        title: 'Apakah anda yakin akan menghapus data ini?',
                        showDenyButton: true,
                        confirmButtonText: 'Yakin',
                        denyButtonText: 'Tidak yakin',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          return handleDelete(infrastruktur.id);
                        }
                      });
                    }}
                    className="text-rose-600"
                  />
                </span>
                <div className="absolute h-14 rounded-b-md text-sm flex items-end p-3 font-semibold text-white bg-gradient-to-b from-transparent to-primary w-full left-0 bottom-0 right-0">
                  <p>{infrastruktur.name}</p>
                </div>
              </div>
            ),
          )
        ) : (
          <p className="text-center">Data infrastruktur desa sedang kosong!</p>
        )}
      </div>
    </Card>
  );
}
