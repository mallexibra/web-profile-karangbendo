import ContainerClient from "@/components/containers/ContainerClient";
import Image from "next/image";
import KarangbendoVillage from '../../../assets/karangbendo.png';

export default function HistoryVillage(){
    return (
        <div id="sejarahdesa">
            <ContainerClient classNames="md:pt-24 pt-12">
                <h2 data-aos="fade-down" className="title">Mengenal Lebih Dekat, <span className="text-black">Desa Karangbendo</span></h2>
                <div className="flex flex-col md:flex-row gap-3 mt-3">
                    <Image data-aos="fade-right" src={KarangbendoVillage} width={800} height={600} className="rounded-md md:w-1/3 w-full object-cover" alt="Desa Karangbendo"/>
                    <div data-aos="fade-left">
                        <h3 className="title text-base mb-3">Sejarah Desa Karangbendo</h3>
                        <p>Desa Karangbendo, yang terletak di Kecamatan Rogojampi, Kabupaten Banyuwangi, Provinsi Jawa Timur, didirikan pada tahun 1900 oleh sekelompok petani yang mencari lahan subur. Desa ini terdiri dari lima dusun, yaitu Dusun Bades, Jajangsurat, Karanganyar, Krajan, dan Pancoran. Seiring waktu, Karangbendo berkembang menjadi komunitas yang dinamis dengan beragam kegiatan budaya dan ekonomi, yang berkontribusi pada perkembangan desa. Meskipun mengalami modernisasi, desa ini tetap mempertahankan tradisi lokalnya, menjadikannya perpaduan unik antara warisan budaya dan kemajuan di Banyuwangi.</p>
                    </div>
                </div>
            </ContainerClient>
        </div>
    )
}
