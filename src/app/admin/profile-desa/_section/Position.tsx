'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { Position } from '@/types/Position';
import { VillageInstitution } from '@/types/VillageInstitution';
import axiosInstance from '@/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    IconEdit,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function PositionSection() {
    const [positions, setPositions] = useState<VillageInstitution[]>([]);
    const [type, setType] = useState<'add' | 'edit'>('add');
    const [id, setId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const villagePositionschema = yup.object({
        name: yup.string().required('Nama wajib diisi'),
    });

    const modalClick = () => {
        const modal = document.getElementById(`modal_institution_${type}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };


    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/positions');
            const dataTemporary: Position[] = response.data.data;

            setPositions(dataTemporary);
        } catch (error) {
            console.log(`Error fetching data positions: ${error}`);
        }
    };

    const handleAddPositions = async (data: any) => {
        setLoading(true);
        try {
            let response;
            if (!id) {
                response = await axiosInstance.post('/positions', data);
            } else {
                response = await axiosInstance.patch(
                    `/positions/${id}`,
                    data,
                );
            }

            if (response.status) {
                close();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: `Sukses ${id ? "edit" : "tambah"} data jabatan`,
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
            console.log(`Error create data jabatan: ${error}`);
        }finally{
            setLoading(false);
        }
    };

    type FormFields = Pick<Position, 'name'>;

    const handleEdit = (data: Position) => {
        Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof FormFields, value);
        });
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/positions/${id}`);
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses delete data jabatan',
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
            console.log(`Error delete data jabatan: ${error}`);
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(villagePositionschema),
    });

    const close: any = () => {
        const modal = document.getElementById(`modal_institution_${type}`) as HTMLDialogElement;
        if (id) {
            setId(null);
        }
        if (modal) {
            modal.close();
            reset();
            setIsModalOpen(false);
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
                <p className="font-bold">Jabatan</p>
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
            <dialog id={`modal_institution_${type}`} className="modal">
                <div className="modal-box">
                    <button
                        type="button"
                        onClick={close}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg">
                        {type == 'add' ? 'Tambah' : 'Edit'} jabatan
                    </h3>

                    <form
                        method="post"
                        onSubmit={handleSubmit(handleAddPositions)}
                        className="mt-3 flex flex-col gap-2"
                    >
                        <LabelForm label="Nama">
                            <InputForm
                                {...register('name')}
                                type="text"
                                label="Nama"
                                name="name"
                                placeholder="Input nama jabatan"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </LabelForm>

                        <Button type="submit" color="primary" size="base" disable={loading}>
                            {loading ? "Loading..." : "Save"}
                        </Button>
                    </form>
                </div>
            </dialog>
            <div className="flex gap-3 flex-wrap">
                {positions.length > 0 ? (
                    positions.map((item: VillageInstitution, i: number) => {
                        return (
                            <div
                                key={i}
                                className="border border-custom flex gap-3 items-center w-max p-2 rounded-md"
                            >
                                <p className="font-semibold">{item.name}</p>
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
                    <p className="text-center font-medium">Data jabatan kosong!</p>
                )}
            </div>
        </Card>
    );
}