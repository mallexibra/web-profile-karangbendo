import Navbar from '@/components/sidebar/Navbar';
import HeaderInformationVillage from './_section/Header'
import PotensiDesa from './_section/PotensiDesa'
import Kelembagaan from './_section/Kelembagaan';
import Infrastruktur from './_section/Infrastruktur';
import PengaduanMasyarakat from './_section/PengaduanMasyarakat';
import LoadingBar from '@/components/loading/LoadingBar';

export default function ProfileDesaPage() {
    return (
        <main>
            <LoadingBar />
            <HeaderInformationVillage />
            <Navbar/>
            <PotensiDesa />
            <Kelembagaan />
            <Infrastruktur />
            <PengaduanMasyarakat />
        </main>
    );
}
