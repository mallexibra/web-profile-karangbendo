'use client';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import TextareaForm from '@/components/forms/TextareaForm';
import { VillageProfile } from '@/types/VillageProfile';
import axiosInstance from '@/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function ProfileDesa() {
  const villageProfileSchema = yup.object().shape({
    visi: yup.string().required('Visi wajib diisi'),
    misi: yup.string().required('Misi wajib diisi'),
    resident: yup.number().required('Jumlah Penduduk wajib diisi').integer(),
    children: yup.number().required('Jumlah Anak-anak wajib diisi').integer(),
    mature: yup.number().required('Jumlah Dewasa wajib diisi').integer(),
    old: yup.number().required('Jumlah Lanjut Usia wajib diisi').integer(),
    image: yup.mixed<File>().required('Struktur Aparatur Desa wajib diisi'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(villageProfileSchema),
  });

  type FormFields = Pick<
    VillageProfile,
    'visi' | 'misi' | 'resident' | 'children' | 'mature' | 'old' | 'image'
  >;

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/village-profiles');
      const data: VillageProfile = response.data.data;
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof FormFields, value);
      });
    } catch (error) {
      console.log(`Error fetching data profile desa: ${error}`);
    }
  };

  const submitData = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <form
        action=""
        onSubmit={handleSubmit(submitData)}
        className="flex gap-5"
        method="post"
      >
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
            <InputForm
              {...register('image')}
              type="file"
              label="Struktur Aparatur Desa"
              name="struktur"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </LabelForm>
        </section>
        <section className="flex flex-col gap-3 w-1/2">
          <LabelForm label="Jumlah Penduduk">
            <InputForm
              {...register('resident')}
              type="number"
              label="Jumlah Penduduk"
              name="penduduk"
              placeholder="Masukkan jumlah penduduk"
            />
            {errors.resident && (
              <p className="text-red-500 text-sm">{errors.resident.message}</p>
            )}
          </LabelForm>
          <LabelForm label="Jumlah Anak-anak">
            <InputForm
              {...register('children')}
              type="number"
              label="Jumlah Anak-anak"
              name="anak_anak"
              placeholder="Masukkan jumlah anak-anak"
            />
            {errors.children && (
              <p className="text-red-500 text-sm">{errors.children.message}</p>
            )}
          </LabelForm>
          <LabelForm label="Jumlah Dewasa">
            <InputForm
              {...register('mature')}
              type="number"
              label="Jumlah Dewasa"
              name="dewasa"
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
              name="lanjut_usia"
              placeholder="Masukkan jumlah lanjut usia"
            />
            {errors.old && (
              <p className="text-red-500 text-sm">{errors.old.message}</p>
            )}
          </LabelForm>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
            >
              <IconPlus color="#fff" size={18} />
              <p>Tambah Data</p>
            </button>
          </div>
        </section>
      </form>
    </Card>
  );
}
