'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import ContainerClient from '@/components/containers/ContainerClient';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import axiosInstance from '@/utils/axiosInstance';
import { optionAduan } from '@/utils/option';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function PengaduanMasyarakat() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const complaintSchema = yup.object({
    name: yup.string().required('Nama wajib diisi'),
    complaint: yup
      .mixed()
      .required('Jenis aduan wajib diisi')
      .oneOf(
        optionAduan.map((option) => option.value),
        'Jenis aduan tidak valid',
      ),
    description: yup.string().required('Deskripsi wajib diisi'),
    emailOrPhone: yup
      .string()
      .required('Email atau nomor telepon harus diisi')
      .test('is-valid', 'Email atau nomor telepon tidak valid', (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    image: yup
      .mixed<File>()
      .test('fileRequired', 'Bukti aduan wajib diisi', function (value) {
        if (selectedImage == null) return false;
        const isValueValid = value instanceof File;
        return isValueValid;
      })
      .test('fileSize', 'Ukuran file maksimal 2MB', function (value: any) {
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
      setValue('image', file);
    } else {
      console.log('No file selected or fileList is empty');
    }
  };

  const handleAddComplaint = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key];
          formData.append(key, value);
        }
      }
      let response = await axiosInstance.post('/public-complaints', formData);

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
      reset();
      setSelectedImage(null);
    } catch (error: any) {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <ContainerClient>
      <div
        id="pengaduanmasyarakat"
        className="flex md:flex-row flex-col gap-5 pt-24 pb-20"
      >
        <section data-aos="fade-left" className="md:w-1/2">
          <h2 className="title">Pengaduan Masyarakat</h2>
          <p>
            Masyarakat Desa Karangbendo dapat menyampaikan keluhan, saran, atau
            masukan mengenai pelayanan dan kondisi desa melalui form pengaduan
            yang disediakan. Setiap pengaduan akan ditindaklanjuti oleh aparatur
            desa dengan cepat dan transparan.
          </p>
          <p className="font-semibold mt-3">Alamat</p>
          <p>Desa Karangbendo, Rogojampi, Banyuwangi, Jawa Timur</p>
          <p className="font-semibold mt-3">Telepon</p>
          <p>(0333) 123456</p>
          <p className="font-semibold mt-3">Email</p>
          <p>desa.karangbendo@example.com</p>
        </section>
        <section data-aos="fade-right" className="md:w-1/2">
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
              <LabelForm label="Email/Nomor Telepon">
                <InputForm
                  {...register('emailOrPhone')}
                  type="text"
                  label="Email/Nomor Telepon"
                  name="emailOrPhone"
                  placeholder="Input nomor telepon kamu"
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.emailOrPhone.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.complaint.message}
                  </p>
                )}
              </LabelForm>
              <LabelForm label="Deskripsi">
                <textarea
                  {...register('description')}
                  placeholder="Masukkan deskripsi Aduan"
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
                {selectedImage && (
                  <IconSquareRoundedXFilled
                    onClick={() => {
                      setSelectedImage(null);
                    }}
                    className="text-red-600 absolute top-4 -right-2 cursor-pointer"
                  />
                )}
                <LabelForm label="Bukti Pendukung">
                  {selectedImage ? (
                    <>
                      <Image
                        src={selectedImage}
                        width={500}
                        height={160}
                        alt="Bukti Pendukung Aduan Masyarakat"
                        className="rounded-md w-full h-40 object-cover"
                      />
                    </>
                  ) : (
                    <InputForm
                      type="file"
                      label="Bukti Pendukung"
                      name="image"
                      onChange={handleImageChange}
                    />
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </LabelForm>
              </div>
              <Button
                type="submit"
                color="primary"
                size="base"
                disable={loading}
              >
                {loading ? 'Loading...' : 'Save'}
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </ContainerClient>
  );
}
