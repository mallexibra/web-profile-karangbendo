import ContainerClient from "@/components/containers/ContainerClient";

export default function Infrastruktur() {
    return (
        <ContainerClient>
            <div id="infrastrukturdesa" className="mt-10 pt-10">
                <h2 className="title">Infrastruktur Desa</h2>
                <p>Desa Karangbendo memiliki infrastruktur yang memadai, termasuk jalan aspal, sekolah dasar, puskesmas, dan balai desa yang digunakan untuk berbagai kegiatan masyarakat.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-5">
                    <div className="relative w-72 bg-primary rounded-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D" className="w-full" alt="Infrastruktur Desa" />
                        <div className="px-3 pb-3 pt-5 bg-gradient-to-b from-transparent to-primary absolute w-full flex flex-col justify-end top-12 bottom-0">
                            <p className="font-semibold text-white">Sekolah Dasar</p>
                        </div>
                    </div>
                    <div className="relative w-72 bg-primary rounded-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D" className="w-full" alt="Infrastruktur Desa" />
                        <div className="px-3 pb-3 pt-5 bg-gradient-to-b from-transparent to-primary absolute w-full flex flex-col justify-end top-12 bottom-0">
                            <p className="font-semibold text-white">Sekolah Dasar</p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerClient>
    )
}
