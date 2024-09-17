import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";

export default function WorkPlan() {
    return (
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
                                DOWNLOAD
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white  hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                            </th>
                            <td className="px-6 py-4">
                                TES
                            </td>
                            <td className="px-6 py-4">
                                123
                            </td>
                            <td className="px-6 py-4">
                                <Button type="button" size="sm">Download</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ContainerClient>
    )
}
