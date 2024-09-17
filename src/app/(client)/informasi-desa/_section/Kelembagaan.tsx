import ContainerClient from "@/components/containers/ContainerClient";

export default function Kelembagaan() {
    return (
        <ContainerClient>
            <div id="kelembagaan" className="mt-10 pt-10">
                <h2 className="title">Kelembagaan</h2>
                <p>Desa ini memiliki beberapa kelembagaan aktif seperti kelompok tani, karang taruna, dan koperasi desa yang berperan dalam pemberdayaan masyarakat.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Badan Permusyawaratan Desa (BPD)</p>
                    </div>
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Karang Taruna (KARTAR)</p>
                    </div>
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Rukun Tetangga, Rukun Warga</p>
                    </div>
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Lembaga Pemberdayaan Masyarakat Desa</p>
                    </div>
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Pembinaan Kesejahteraan Keluarga</p>
                    </div>
                    <div className="font-medium p-3 rounded-md border-2 w-max border-custom shadow-sm">
                        <p>Kader Pemberdayaan Masyarakat Desa</p>
                    </div>
                </div>
            </div>
        </ContainerClient>
    )
}
