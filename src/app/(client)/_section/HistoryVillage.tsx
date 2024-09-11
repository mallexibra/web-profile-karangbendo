import ContainerClient from "@/components/containers/ContainerClient";

export default function HistoryVillage(){
    return (
        <div id="sejarahdesa">
            <ContainerClient classNames="min-h-[50vh] pt-20">
                <h2 className="title">Mengenal Lebih Dekat, <span className="text-black">Desa Karangbendo</span></h2>
                <div className="flex gap-3 mt-3">
                    <img src="/assets/village-profile/karangbendo.png" className="rounded-md w-1/3 bg-cover" alt="Desa Karangbendo"/>
                    <div>
                        <h3 className="title text-base mb-3">Sejarah Desa Karangbendo</h3>
                        <p>Desa Karangbendo, yang terletak di Kecamatan Rogojampi, Kabupaten Banyuwangi, Provinsi Jawa Timur, didirikan pada tahun 1900 oleh sekelompok petani yang mencari lahan subur. Desa ini terdiri dari lima dusun, yaitu Dusun Bades, Jajangsurat, Karanganyar, Krajan, dan Pancoran. Seiring waktu, Karangbendo berkembang menjadi komunitas yang dinamis dengan beragam kegiatan budaya dan ekonomi, yang berkontribusi pada perkembangan desa. Meskipun mengalami modernisasi, desa ini tetap mempertahankan tradisi lokalnya, menjadikannya perpaduan unik antara warisan budaya dan kemajuan di Banyuwangi.</p>
                    </div>
                </div>
            </ContainerClient>
        </div>
    )
}
