"use client"
import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";
import { WorkPlanAndBudget } from "@/types/WorkPlanAndBudget";
import axiosInstance from "@/utils/axiosInstance";
import { formatDate, formatRupiah } from "@/utils/format";
import { useEffect, useState } from "react";

export default function WorkPlan() {
    const [plan, setPlan] = useState<WorkPlanAndBudget[]>([]);
    const [itemPlan, setItemPlan] = useState<WorkPlanAndBudget>({
        id: 0,
        name: "",
        budget: 0,
        date: "",
        description: "",
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/work-plan-budget')).data
            setPlan(response.data);
        } catch (error: any) {
            console.log(`Error fetch data work and plan: ${error.message}`);
        }
    }

    const modalClick = () => {
        const modal = document.getElementById("modal") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const close: any = () => {
        const modal = document.getElementById("modal") as HTMLDialogElement;
        if (modal) {
            modal.close();
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) modalClick();
    }, [isModalOpen]);

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div id="renacanakerjadananggaran">
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <button
                        type="button"
                        onClick={close}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg">
                        Detail Program Kerja dan Anggaran
                    </h3>

                    <div className="mt-5 space-y-3">
                        <div>
                            <h4 className="font-semibold">Nama Kegiatan</h4>
                            <p>{itemPlan.name}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Anggaran Kegiatan</h4>
                            <p>{formatRupiah(itemPlan.budget)}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Waktu Kegiatan</h4>
                            <p>{formatDate(itemPlan.date)}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Deskripsi Kegiatan</h4>
                            <p>{itemPlan.description}</p>
                        </div>
                    </div>
                </div>
            </dialog>
            <ContainerClient classNames="my-24">
                <h2 className="title">Rencana Kerja dan Anggaran</h2>
                <p>Informasi ini disajikan untuk memastikan bahwa masyarakat mengetahui program-program prioritas dan alokasi dana untuk setiap kegiatan yang direncanakan.</p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-primary">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-primary text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NO
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NAMA KEGIATAN
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ANGGARAN
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    AKSI
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {plan.length > 0 ? plan.map((item: WorkPlanAndBudget, i: number) => (
                                <tr className="bg-white  hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatRupiah(item.budget)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button type="button" onClick={() => {
                                            setItemPlan(item);
                                            setIsModalOpen(true);
                                        }} size="sm">Detail</Button>
                                    </td>
                                </tr>
                            )) : (<tr><td colSpan={4} className="px-6 py-4 text-center font-medium">Data rencana kerja dan anggaran sedang kosong!</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </ContainerClient>
        </div>
    )
}
