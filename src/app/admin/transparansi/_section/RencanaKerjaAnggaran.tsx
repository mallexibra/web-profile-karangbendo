'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { SelectForm } from '@/components/forms/SelectForm';
import { WorkPlanAndBudget } from '@/types/WorkPlanAndBudget';
import axiosInstance from '@/utils/axiosInstance';
import { formatRupiah } from '@/utils/format';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

export default function RencanaKerjaAnggaran() {
    const [plans, setPlans] = useState<WorkPlanAndBudget[]>([]);
    const [type, setType] = useState<string>('add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const workPlanBudgetSchema = yup.object({
        name: yup.string().required('Nama wajib diisi'),
        budget: yup
            .number()
            .positive('Jumlah anggaran harus bilangan positif')
            .required('Jumlah anggaran wajib diisi')
            .transform((_, val) => (val !== '' ? Number(val) : null)),
        description: yup.string().required('Deskripsi wajib diisi'),
        date: yup.string().required('Tanggal wajib diisi'),
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(workPlanBudgetSchema),
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/work-plan-budget');
            const dataTemporary: WorkPlanAndBudget[] = response.data.data;
            // const data = dataTemporary.filter((user: User) => user.role == 'admin');

            setPlans(dataTemporary);
        } catch (error) {
            console.log(`Error fetching data village government finance: ${error}`);
        }
    };

    type FormFields = Pick<
        WorkPlanAndBudget,
        'name' | 'description' | 'date' | 'budget'
    >;

    const handleEdit = (data: FormFields) => {
        Object.entries(data).forEach(([key, value]) => {
            if (key == 'date') {
                setValue('date', value.toString().split('T')[0]);
            } else {
                setValue(key as keyof FormFields, value);
            }
        });
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
        }
    };

    const handleDelete = async (id: number) => {
        try {
            let response = await axiosInstance.delete(`/work-plan-budget/${id}`);

            if (response.status) {
                close();
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Sukses delete data rencana anggaran desa',
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
        } catch (error) { }
    };

    const handleAddFinance = async (data: any) => {
        let response;
        if (id) {
            response = await axiosInstance.patch(`/work-plan-budget/${id}`, data);
        } else {
            response = await axiosInstance.post('/work-plan-budget', data);
        }

        if (response.status) {
            close();
            Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: `Sukses ${id ? 'edit' : 'tambah'} data rencana anggaran desa`,
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

    const [isCompleted, setIsCompleted] = useState(false);

    const handleToggle = () => {
        setIsCompleted((prev) => !prev);
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
                <p className="font-bold">Rencana Kerja dan Anggaran</p>
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
                        Rencana Anggaran
                    </h3>

                    <form
                        method="post"
                        onSubmit={handleSubmit(handleAddFinance)}
                        className="mt-3 flex flex-col gap-2"
                    >
                        <LabelForm label="Nama Kegiatan">
                            <InputForm
                                disabled={type == 'view'}
                                {...register('name')}
                                type="text"
                                label="Nama Kegiatan"
                                name="name"
                                placeholder="Input nama rencana kegiatan"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </LabelForm>

                        <LabelForm label='Status Program Kerja'>
                            <SelectForm label={'Status Program Kerja'} name={'status'} data={[{ label: 'Selesai', value: 'selesai' }, { label: 'Belum Selesai', value: 'belum' }]} />
                        </LabelForm>

                        <LabelForm label="Tanggal Kegiatan">
                            <InputForm
                                disabled={type == 'view'}
                                {...register('date')}
                                type="date"
                                label="Tanggal Kegiatan"
                                name="date"
                                placeholder="Input tanggal rencana kegiatan"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </LabelForm>

                        <LabelForm label="Deskripsi">
                            <textarea
                                disabled={type == 'view'}
                                {...register('description')}
                                placeholder="Masukkan deskripsi rencana kegiatan"
                                rows={3}
                                className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </LabelForm>

                        <LabelForm label="Jumlah Anggaran">
                            <InputForm
                                disabled={type == 'view'}
                                {...register('budget')}
                                type="number"
                                label="Jumlah Anggaran"
                                name="budget"
                                placeholder="Input jumlah anggaran"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </LabelForm>

                        <LabelForm label="Jumlah Anggaran Terpakai">
                            <InputForm
                                disabled={type == 'view'}
                                type="number"
                                label="Jumlah Anggaran Terpakai"
                                name="budget"
                                placeholder="Input jumlah anggaran terpakai"
                            />
                        </LabelForm>

                        {type != 'view' && (
                            <Button type="submit" color="primary" size="base">
                                Save
                            </Button>
                        )}
                    </form>
                </div>
            </dialog>
            {plans.length <= 0 ? (
                <p>Data sedang kosong!</p>
            ) : (
                <div className="overflow-x-auto rounded-md">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="text-center p-3">NO</th>
                                <th>NAMA ANGGARAN</th>
                                <th>ANGGARAN</th>
                                <th>AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="bg-second font-medium">
                            {plans.map((plan: WorkPlanAndBudget, i: number) => (
                                <tr key={i}>
                                    <td className="text-center p-3">{i + 1}</td>
                                    <td>{plan.name}</td>
                                    <td>{formatRupiah(plan.budget)}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <IconEye
                                                onClick={() => {
                                                    handleEdit(plan);
                                                    setType('view');
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-slate-800 cursor-pointer"
                                            />
                                            <IconEdit
                                                onClick={() => {
                                                    handleEdit(plan);
                                                    setType('edit');
                                                    setId(plan.id);
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
                                                            return handleDelete(plan.id);
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
