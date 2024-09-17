import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";

export default function PeraturanDesa(){
    return(
        <ContainerClient>
            <h2 className="title">Peraturan Desa</h2>
            <p>Peraturan Desa adalah peraturan yang ditetapkan oleh Kepala Desa setelah mendapat persetujuan dari Badan Permusyawaratan Desa (BPD). Peraturan ini mengatur berbagai aspek kehidupan masyarakat desa, seperti tata ruang, lingkungan hidup, dan kegiatan ekonomi.</p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-primary">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-primary text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                NO
                            </th>
                            <th scope="col" className="px-6 py-3">
                               JUDUL PERATURAN
                            </th>
                            <th scope="col" className="px-6 py-3">
                                NOMOR
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TANGGAL PENETAPAN
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
