import Navbar from '@/components/sidebar/Navbar';
import HeaderInformationVillage from './_section/Header'
import PotensiDesa from './_section/PotensiDesa'
import Kelembagaan from './_section/Kelembagaan';
import Infrastruktur from './_section/Infrastruktur';
import PengaduanMasyarakat from './_section/PengaduanMasyarakat';

export default function ProfileDesaPage() {
    return (
        <main>
            <HeaderInformationVillage />
            <Navbar/>
            <PotensiDesa />
            <Kelembagaan />
            <Infrastruktur />
            <PengaduanMasyarakat />
        </main>
    );
}
