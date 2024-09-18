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
import { useState } from "react";
import { cn } from "@/utils/classname";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Keuangan() {
    const [btnActive, setBtnActive] = useState<'pendapatan' | 'belanja' | 'pengeluaran'>('pendapatan')
    const pieData = {
        labels: [
            'Pendapatan',
            'Belanja',
            'Pengeluaran'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <ContainerClient classNames="flex gap-5 pt-8">
            <section className="w-1/2 grid place-items-center">
                <div className="w-1/2">
                    <Pie data={pieData} />
                </div>
            </section>
            <section className="w-1/2">
                <Card classNames="w-full">
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setBtnActive('pendapatan')} className={cn("px-2 py-1 text-sm font-medium rounded-md border border-primary", btnActive == "pendapatan" ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
                            Pendapatan
                        </button>
                        <button type="button" onClick={() => setBtnActive('belanja')} className={cn("px-2 py-1 text-sm font-medium rounded-md border border-primary", btnActive == "belanja" ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
                            Belanja
                        </button>
                        <button type="button" onClick={() => setBtnActive('pengeluaran')} className={cn("px-2 py-1 text-sm font-medium rounded-md border border-primary", btnActive == "pengeluaran" ? 'bg-primary text-white' : 'bg-primary/10 text-primary')}>
                            Pengeluaran
                        </button>
                    </div>
                    <table cellPadding={12} className="font-semibold">
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dana Desa (DD)</td>
                                <td>Rp. 12.000</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </section>
        </ContainerClient>
    )
}
