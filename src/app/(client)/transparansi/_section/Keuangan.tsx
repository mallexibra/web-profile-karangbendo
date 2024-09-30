"use client"
import ContainerClient from "@/components/containers/ContainerClient";
import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import Card from "@/components/cards/Card";
import { useEffect, useState } from "react";
import { cn } from "@/utils/classname";
import axiosInstance from "@/utils/axiosInstance";
import { VillageGovernmentFinance } from "@/types/VillageGovernmentFinance";
import { formatRupiah } from "@/utils/format";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Keuangan() {
    const [btnActive, setBtnActive] = useState<'pendapatan' | 'pengeluaran'>('pendapatan')
    const [finance, setFinance] = useState<VillageGovernmentFinance[]>([])
    const [dataset, setDataset] = useState<number[]>([]);
    const pieData = {
        labels: [
            'Pendapatan',
            'Belanja',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: dataset,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    const fetchData = async () => {
        try {
            const response = (await axiosInstance.get('/village-government-finance')).data
            const financeGovernment: VillageGovernmentFinance[] = response.data
            const income: number = financeGovernment.filter((item: VillageGovernmentFinance, i: number) => item.type == "income").reduce((accumulator: number, currentValue: VillageGovernmentFinance) => {
                return accumulator + currentValue.amount;
            }, 0)
            const expenditure: number = financeGovernment.filter((item: VillageGovernmentFinance, i: number) => item.type == "expenditure").reduce((accumulator: number, currentValue: VillageGovernmentFinance) => {
                return accumulator + currentValue.amount;
            }, 0)
            setDataset([income, expenditure]);
            setFinance(financeGovernment)
        } catch (error: any) {
            console.log(`Error fetch data village government finance: ${error.message}`)
        }
    }

    const mapBtnActiveToType = (btn: 'pendapatan' | 'pengeluaran') => {
        return btn === 'pendapatan' ? 'income' : 'expenditure';
    };

    const filteredData = finance.filter(item => item.type === mapBtnActiveToType(btnActive));

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ContainerClient classNames="flex flex-col md:flex-row gap-5 pt-8">
            <section className="md:w-1/2 w-full grid place-items-center">
                <div className="w-1/2">
                    <Pie data={pieData} />
                </div>
            </section>
            <section className="md:w-1/2 w-full">
                <Card classNames="w-full">
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setBtnActive('pendapatan')} className={cn("px-2 py-1 text-sm font-medium rounded-md border border-primary", btnActive == "pendapatan" ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
                            Pendapatan
                        </button>
                        <button type="button" onClick={() => setBtnActive('pengeluaran')} className={cn("px-2 py-1 text-sm font-medium rounded-md border border-primary", btnActive == "pengeluaran" ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
                            Pengeluaran
                        </button>
                    </div>
                    <table cellPadding={12} className="font-semibold">
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{formatRupiah(item.amount)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center">Data {btnActive} desa sedang kosong!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </section>
        </ContainerClient>
    )
}
