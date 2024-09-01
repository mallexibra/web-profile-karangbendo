'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { LegalProduct } from '@/types/LegalProduct';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/format';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconEdit,
  IconFile,
  IconFileDownload,
  IconPlus,
  IconSquareRoundedXFilled,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function PeraturanKepalaDesa() {
  const [regulation, setRegulation] = useState<LegalProduct[]>([]);
  const [type, setType] = useState<string>('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const regulationSchema = yup.object({
    title: yup.string().required('Nama wajib diisi'),
    number: yup.string().required('Nomor wajib diisi'),
    description: yup.string().required('Deskripsi wajib diisi'),
    file: yup
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
    resolver: yupResolver(regulationSchema),
  });

  console.log(errors);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/legal-product');
      const dataTemporary: LegalProduct[] = response.data.data;
      const data = dataTemporary.filter((legal: LegalProduct) => legal.type == 'village_head_regulation');

      setRegulation(data);
    } catch (error) {
      console.log(`Error fetching data village government finance: ${error}`);
    }
  };

  type FormFields = Pick<LegalProduct, 'title' | 'description' | 'number'>;

  const handleEdit = (data: FormFields) => {
    Object.entries(data).forEach(([key, value]) => {
      if (key == 'file') {
        setValue('file', null);
      } else {
        setValue(key as keyof FormFields, value);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setSelectedFile(file.name);
      setValue('file', file);
    } else {
      console.log('No file selected or fileList is empty');
    }
  };

  const modalClick = () => {
    const modal = document.getElementById(
      `modal_${type}3`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById(
      `modal_${type}3`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
      reset();
      setIsModalOpen(false);
      setType('add');
      setSelectedFile(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      let response = await axiosInstance.delete(`/legal-product/${id}`);

      if (response.status) {
        close();
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Sukses delete data peraturan desa',
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

  const handleAddRegulation = async (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let value = data[key];
        formData.append(key, value);
      }
    }

    formData.append('type', 'village_head_regulation');

    let response;
    if (id) {
      response = await axiosInstance.patch(`/legal-product/${id}`, formData);
    } else {
      response = await axiosInstance.post('/legal-product', formData);
    }

    if (response.status) {
      close();
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: `Sukses ${id ? 'edit' : 'tambah'} data peraturan desa`,
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
        <p className="font-bold">Peraturan Kepala Desa</p>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <dialog id={`modal_${type}3`} className="modal">
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
            Peraturan Kepala Desa
          </h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddRegulation)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama Kegiatan">
              <InputForm
                disabled={type == 'view'}
                {...register('title')}
                type="text"
                label="Nama Kegiatan"
                name="title"
                placeholder="Input judul peraturan"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Nomor">
              <InputForm
                disabled={type == 'view'}
                {...register('number')}
                type="text"
                label="Nomor"
                name="number"
                placeholder="Input nomor peraturan"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Deskripsi">
              <textarea
                disabled={type == 'view'}
                {...register('description')}
                placeholder="Masukkan deskripsi peraturan"
                rows={3}
                className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </LabelForm>

            <LabelForm label="File">
              {selectedFile ? (
                <div className="relative bg-second w-full rounded-md p-3 border-custom border">
                  <div className="flex items-center text-sm font-medium gap-3">
                    <IconFile size={28} className="text-primary" />
                    <p>{selectedFile}</p>
                  </div>
                  <IconSquareRoundedXFilled
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                    className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                  />
                </div>
              ) : (
                <InputForm
                  disabled={type == 'view'}
                  {...register('file')}
                  accept=".pdf,.doc,.docx"
                  type="file"
                  label="File"
                  name="file"
                  placeholder="Input file peraturan"
                  onChange={handleFileChange}
                />
              )}
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file.message}</p>
              )}
            </LabelForm>

            {type != 'view' && (
              <Button type="submit" color="primary" size="base">
                Save
              </Button>
            )}
          </form>
        </div>
      </dialog>
      {regulation.length <= 0 ? (
        <p>Data sedang kosong!</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-center p-3">NO</th>
                <th>JUDUL PERATURAN</th>
                <th>NOMOR</th>
                <th>DESKRIPSI</th>
                <th>DOWNLOAD</th>
              </tr>
            </thead>
            <tbody className="bg-second font-medium">
              {regulation.map((item: LegalProduct, i: number) => (
                <tr>
                  <td className="text-center p-3">{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.number}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <a href={`/assets/legal/${item.file}`} target="_blank">
                        <IconFileDownload className="text-primary" />
                      </a>
                      <IconEdit
                        onClick={() => {
                          setType(`edit_${item.id}`);
                          setId(item.id);
                          handleEdit(item);
                          setIsModalOpen(true);
                          setSelectedFile(
                            `${item.title}.${item.file.split('.')[1]}`,
                          );
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
