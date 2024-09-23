'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import { VillageApparatus } from '@/types/VillageApparatus';
import axiosInstance from '@/utils/axiosInstance';
import { formatText } from '@/utils/format';
import { optionPosition } from '@/utils/option';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconEdit,
  IconPlus,
  IconSquareRoundedXFilled,
  IconTrash,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function AparaturDesa() {
  const [apparatus, setApparatus] = useState<VillageApparatus[]>([]);
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dataImage, setDataImage] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const villageApparatusSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    position: yup
      .string()
      .required('Position is required and must be a string'),
    profile: yup
      .mixed<File>()
      .nullable()
      .test(
        'fileRequired',
        'Struktur Aparatur Desa wajib diisi',
        function (value) {
          return !!dataImage || !!value;
        },
      )
      .test('fileSize', 'Ukuran file maksimal 2MB', function (value) {
        if (dataImage) return true;
        if (value) {
          return value.size <= MAX_FILE_SIZE;
        }
        return true;
      })
      .test(
        'fileFormat',
        'Format file tidak valid, hanya jpg, jpeg, dan png yang diperbolehkan',
        function (value) {
          if (dataImage) return true;
          if (value) {
            return SUPPORTED_FORMATS.includes(value.type);
          }
          return true;
        },
      ),
  });

  const modalClick = () => {
    const modal = document.getElementById(`modal_${type}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setValue('profile', file);
    } else {
      console.log('No file selected or fileList is empty');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/village-apparatus');
      const dataTemporary: VillageApparatus[] = response.data.data;
      // const data = dataTemporary.filter((user: User) => user.role == 'admin');

      setApparatus(dataTemporary);
    } catch (error) {
      console.log(`Error fetching data apparatur desa: ${error}`);
    }
  };

  const handleAddUser = async (data: any) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key];
          if (key === 'profile' && !selectedImage && dataImage) {
            value = null;
          }
          formData.append(key, value);
        }
      }
      let response;
      if (!id) {
        response = await axiosInstance.post('/village-apparatus', formData);
      } else {
        response = await axiosInstance.patch(
          `/village-apparatus/${id}`,
          formData,
        );
      }

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses tambah data apparatur desa',
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
    }
  };

  type FormFields = Pick<VillageApparatus, 'name' | 'position'>;

  const handleEdit = (data: VillageApparatus) => {
    setDataImage(data.profile);
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof FormFields, value);
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/village-apparatus/${id}`);
      if (response.status) {
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses delete data apparatur desa',
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
      console.log(`Error delete data apparatur desa: ${error}`);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(villageApparatusSchema),
  });

  const close: any = () => {
    const modal = document.getElementById(`modal_${type}`) as HTMLDialogElement;
    if (id) {
      setId(null);
    }
    if (modal) {
      modal.close();
      reset();
      setIsModalOpen(false);
      setSelectedImage(null)
      setDataImage(null)
    }
  };

  useEffect(() => {
    if (isModalOpen) modalClick();
  }, [type, isModalOpen]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Aparatur Desa</p>
        <button
          type="button"
          onClick={() => {
            setType('add');
            setIsModalOpen(true);
          }}
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <dialog id={`modal_${type}`} className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">
            {type == 'add' ? 'Tambah' : 'Edit'} Apparatur Desa
          </h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddUser)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama">
              <InputForm
                {...register('name')}
                type="text"
                label="Nama"
                name="name"
                placeholder="Input nama apparatur desa"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Jabatan">
              <SelectForm
                {...register('position')}
                label="Jabatan"
                name="position"
                data={optionPosition}
              />
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </LabelForm>

            {selectedImage || dataImage ? (
              <div className="relative">
                <Image
                  src={
                    selectedImage || `/assets/village-apparatus/${dataImage}`
                  }
                  fill
                  alt="Struktur Aparatur Desa"
                  className="rounded-md"
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
              <LabelForm label="Profile">
                <InputForm
                  {...register('profile')}
                  type="file"
                  label="Profile"
                  name="profile"
                  onChange={handleImageChange}
                />
              </LabelForm>
            )}
            {errors.profile && (
              <p className="text-red-500 text-sm">{errors.profile.message}</p>
            )}

            <Button type="submit" color="primary" size="base">
              Save
            </Button>
          </form>
        </div>
      </dialog>
      <div className="flex gap-3 flex-wrap">
        {apparatus.length > 0 ? (
          apparatus.map((item: VillageApparatus, i: number) => {
            return (
              <div
                key={i}
                className="border border-custom flex gap-3 items-center w-max p-2 rounded-md"
              >
                <Image
                  src={`/assets/village-apparatus/${item.profile}`}
                  width={500} height={500}
                  className="w-12 h-12 rounded-md object-cover"
                  alt="Profile Aparatur Desa"
                />
                <div className="text-sm mr-3">
                  <p className="font-semibold">{item.name}</p>
                  <p>{formatText(item.position)}</p>
                </div>
                <IconEdit
                  onClick={() => {
                    handleEdit(item);
                    setType('edit');
                    setId(item.id);
                    setIsModalOpen(true);
                  }}
                  className="text-warning cursor-pointer"
                />
                <IconTrash
                  onClick={() => {
                    Swal.fire({
                      title: 'Apakah anda yakin akan menghapus data ini?',
                      showDenyButton: true,
                      confirmButtonText: 'Yakin',
                      denyButtonText: 'Tidak yakin',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        return handleDelete(item.id);
                      }
                    });
                  }}
                  className="text-danger cursor-pointer"
                />
              </div>
            );
          })
        ) : (
          <p className="text-center font-medium">Data apparatur desa kosong!</p>
        )}
      </div>
    </Card>
  );
}
