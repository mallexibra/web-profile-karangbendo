'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import { VillageGovernmentFinance } from '@/types/VillageGovernmentFinance';
import axiosInstance from '@/utils/axiosInstance';
import { formatRupiah } from '@/utils/format';
import { optionType } from '@/utils/option';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconEdit,
  IconPlus,
  IconSquareRoundedXFilled,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function KeuanganDesa() {
  const [finance, setFinance] = useState<VillageGovernmentFinance[]>([]);
  const [type, setType] = useState<string>('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const villageGovernmentFinance = yup.object({
    name: yup.string().required('Nama wajib diisi'),
    type: yup.string().required('Jenis Keuangan wajib diisi'),
    amount: yup
      .number()
      .positive('Jumlah keuangan harus bilangan positif')
      .required('Jumlah keuangan wajib diisi')
      .transform((_, val) => (val !== '' ? Number(val) : null)),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(villageGovernmentFinance),
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/village-government-finance');
      const dataTemporary: VillageGovernmentFinance[] = response.data.data;

      setFinance(dataTemporary);
    } catch (error) {
      console.log(`Error fetching data village government finance: ${error}`);
    }
  };

  type FormFields = Pick<VillageGovernmentFinance, 'name' | 'type' | 'amount'>;

  const handleEdit = (data: FormFields) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof FormFields, value);
    });
  };

  const modalClick = () => {
    const modal = document.getElementById(
      `modal_${type}2`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById(
      `modal_${type}2`,
    ) as HTMLDialogElement;
    if (modal) {
      setId(null);
      modal.close();
      reset();
      setIsModalOpen(false);
      setType('add');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      let response = await axiosInstance.delete(
        `/village-government-finance/${id}`,
      );

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses delete data keuangan desa',
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
    } catch (error) {}
  };

  const handleAddFinance = async (data: any) => {
    setLoading(true);
    try {
      let response;
      if (id) {
        response = await axiosInstance.put(
          `/village-government-finance/${id}`,
          data,
        );
      } else {
        response = await axiosInstance.post(
          '/village-government-finance',
          data,
        );
      }

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: `Sukses ${id ? 'edit' : 'tambah'} data keuangan desa`,
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
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan tak terduga!',
      });
    } finally {
      setLoading(false);
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
        <p className="font-bold">Keuangan Pemerintah Desa</p>
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
      <dialog id={`modal_${type}2`} className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">
            {type.split('_')[0] == 'edit' ? 'Edit' : 'Tambah'} Keuangan Desa
          </h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddFinance)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama">
              <InputForm
                {...register('name')}
                type="text"
                label="Nama"
                name="name"
                placeholder="Input nama keuangan desa"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Jenis Keuangan">
              <SelectForm
                {...register('type')}
                label="Jenis Keuangan"
                name="type"
                data={optionType}
              />
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Jumlah Keuangan">
              <InputForm
                {...register('amount')}
                type="number"
                label="Jumlah Keuangan"
                name="amount"
                placeholder="Input jumlah keuangan desa"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </LabelForm>

            <Button type="submit" color="primary" size="base" disable={loading}>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </form>
        </div>
      </dialog>
      {finance.length <= 0 ? (
        <p>Data sedang kosong!</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-center p-3">NO</th>
                <th>NAMA ANGGARAN</th>
                <th>JENIS</th>
                <th>JUMLAH</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody className="bg-second font-medium">
              {finance.map((item: VillageGovernmentFinance, i: number) => (
                <tr key={i}>
                  <td className="text-center p-3">{i + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.type == 'income' ? 'Pendapatan' : 'Pengeluaran'}
                  </td>
                  <td>{formatRupiah(item.amount)}</td>
                  <td>
                    <div className="flex items-center gap-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
