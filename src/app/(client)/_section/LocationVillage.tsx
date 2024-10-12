import ContainerClient from "@/components/containers/ContainerClient";

export default function LocationVillage() {
    return (
        <div id="lokasidesa" className="py-24 flex items-center">
            <ContainerClient classNames="flex md:flex-row flex-col items-center gap-3">
                <section data-aos="fade-left" className="overflow-hidden md:w-1/2 w-full rounded-md md:rounded-l-md">
                    <div className="bg-primary px-5 py-3 text-white font-bold text-lg">
                        <p>Peta Lokasi Desa Karangbendo</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31583.752391360853!2d114.29672535436337!3d-8.305874470665518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1574cb3bdaae7%3A0x9082cab606c90fdd!2sKarangbendo%2C%20Rogojampi%2C%20Banyuwangi%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1726028808120!5m2!1sen!2sid" className="w-full h-80" loading="lazy"></iframe>
                </section>
                <section data-aos="fade-right">
                    <table cellPadding={8} className="table-auto font-medium">
                        <tbody>
                            <tr className="font-semibold">
                                <td className="whitespace-nowrap">Luas Wilayah</td>
                                <td>: 10 km²</td>
                            </tr>
                            <tr className="font-semibold">
                                <td className="whitespace-nowrap">Jumlah Desa</td>
                                <td>: Dusun Bades, Dusun Jajangsurat, Dusun Karanganyar, Dusun Krajan, Dusun Pancoran</td>
                            </tr>
                            <tr className="font-semibold">
                                <td className="whitespace-nowrap">Kode Pos</td>
                                <td>: 68462</td>
                            </tr>
                            <tr className="font-semibold">
                                <td className="whitespace-nowrap">Batas Daerah</td>
                                <td>: Desa Rogojampi di utara, Desa Ketapang di selatan, Sungai Bengawan di barat, dan Desa Pancar di timur.</td>
                            </tr>
                            <tr className="font-semibold">
                                <td className="whitespace-nowrap">Letak Wilayah</td>
                                <td>: Rogojampi, Kabupaten Banyuwangi, Provinsi Jawa Timur, Indonesia.</td>
                            </tr>
                        </tbody>
                    </table>

                </section>
            </ContainerClient>
        </div>
    )
}
