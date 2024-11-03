'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { CommunityActivities } from '@/types/CommunityActivities';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/format';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconPlus, IconSquareRoundedXFilled } from '@tabler/icons-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function KegiatanMasyarakat() {
  const [activities, setActivities] = useState<CommunityActivities[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dataImage, setDataImage] = useState<string | null>(null);
  const [type, setType] = useState<string>('add');
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const communityActivitiesSchema = yup.object({
    name: yup.string().required('Nama wajib diisi'),
    description: yup.string().required('Deskripsi wajib diisi'),
    time: yup.string().required('Tanggal wajib diisi'),
    image: yup
      .mixed<File>()
      .test(
        'fileRequired',
        'Gambar wajib diisi',
        function (value) {
            const isDataImageValid = !!dataImage;
            const isValueValid = value instanceof File;
            const isIdValid = !!id;
            console.log(isDataImageValid, isValueValid, isIdValid)
            return isDataImageValid || isValueValid || isIdValid;
        },
    )
    .test('fileSize', 'Ukuran file maksimal 2MB', function (value) {
        if (value) {
            console.log("Value: ", value.size, MAX_FILE_SIZE)
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
      `modal_${type}1`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById(
      `modal_${type}1`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
      reset();
      setIsModalOpen(false);
      setSelectedImage(null);
      setType('add');
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(communityActivitiesSchema),
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

  type FormFields = Pick<
    CommunityActivities,
    'name' | 'description' | 'time' | 'image'
  >;

  const handleEdit = (data: CommunityActivities) => {
    Object.entries(data).forEach(([key, value]) => {
      console.log(value);
      if (key === 'image') {
        setDataImage(value);
      } else if (key == 'time') {
        setValue('time', value.split('T')[0]);
      } else {
        setValue(key as keyof FormFields, value);
      }
    });
  };

  const handleAddCommunityActivities = async (data: any) => {
    setLoading(true);
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
        response = await axiosInstance.patch(
          `/community-activities/${id}`,
          formData,
        );
      } else {
        response = await axiosInstance.post('/community-activities', formData);
      }

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: `Sukses ${id ? 'edit' : 'tambah'} data kegiatan masyarakat`,
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
      console.log(`Error create data community activities: ${error}`);
    }finally{
        setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `/community-activities/${id}`,
      );
      if (response.status) {
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses delete data kegiatan masyarakat',
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
      console.log(`Error delete data community activities: ${error}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/community-activities');
      const dataTemporary: CommunityActivities[] = response.data.data;
      // const data = dataTemporary.filter((user: User) => user.role == 'admin');

      setActivities(dataTemporary);
    } catch (error) {
      console.log(`Error fetching data community activities: ${error}`);
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
        <p className="font-bold">Kegiatan Masyarakat</p>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <dialog id={`modal_${type}1`} className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">
            {type.split('_')[0] == 'edit' ? 'Edit' : 'Tambah'} Kegiatan
            Masyarakat
          </h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddCommunityActivities)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama">
              <InputForm
                {...register('name')}
                type="text"
                label="Nama"
                name="name"
                placeholder="Input nama community activities"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Deskripsi">
              <textarea
                {...register('description')}
                placeholder="Masukkan deskripsi kegiatan masyarakat"
                rows={3}
                className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </LabelForm>

            <LabelForm label="Tanggal">
              <InputForm
                {...register('time')}
                type="date"
                label="Tanggal"
                name="time"
                placeholder="Input tanggal kegiatan masyarakat"
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time.message}</p>
              )}
            </LabelForm>

            {selectedImage || dataImage ? (
              <div className="relative">
                <Image
                  src={
                    selectedImage || `${dataImage}`
                  } width={500} height={300}
                  alt="Kegiatan Masyarakat"
                  className="rounded-md w-full object-cover"
                />
                <IconSquareRoundedXFilled
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                  className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                />
              </div>
            ) : (
              <LabelForm label="Dokumentasi Kegiatan">
                <InputForm
                  {...register('image')}
                  type="file"
                  label="Dokumentasi Kegiatan"
                  name="image"
                  onChange={handleImageChange}
                />
              </LabelForm>
            )}
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            <Button type="submit" color="primary" size="base" disable={loading}>
              {loading ? "Loading..." : "Save"}
            </Button>
          </form>
        </div>
      </dialog>
      <div className="flex flex-wrap gap-3">
        {activities.length <= 0 ? (
          <p>Data kegiatan masyarakat sedang kosong!</p>
        ) : (
          activities.map((activity: CommunityActivities, i: number) => (
            <div
              key={i}
              className="border border-custom w-max rounded-md overflow-hidden"
            >
              <Image
                src={activity.image}
                width={252}
                height={20}
                className="bg-cover w-full h-32 rounded-t-md"
                alt="Communal Work Image"
              />
              <div className="max-w-[280px] space-y-2 p-3">
                <p className="font-semibold text-primary">{activity.name}</p>
                <p className="text-xs font-medium opacity-35">
                  {formatDate(activity.time)}
                </p>
                <p className="text-sm">{activity.description}</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setType(`edit_${activity.id}`);
                      setId(activity.id);
                      handleEdit(activity);
                    }}
                    color="warning"
                    size="sm"
                    className="w-full"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: 'Apakah anda yakin akan menghapus data ini?',
                        showDenyButton: true,
                        confirmButtonText: 'Yakin',
                        denyButtonText: 'Tidak yakin',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          return handleDelete(activity.id);
                        }
                      });
                    }}
                    color="danger"
                    size="sm"
                    className="w-full"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
