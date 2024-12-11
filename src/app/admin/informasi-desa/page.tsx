import ContainerAdmin from '@/components/containers/ContainerAdmin';
import InfrastrukturDesa from './_section/InfrastrukturDesa';
import KegiatanMasyarakat from './_section/KegiatanMasyarakat';
import AduanMasyarakat from './_section/AduanMasyarakat';
import PotensiDesa from '@/app/admin/informasi-desa/_section/PotensiDesa';
import LembagaDesa from './_section/LembagaDesa';
import LoadingBar from '@/components/loading/LoadingBar';

export default function InformasiDesaPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <PotensiDesa />
      <LembagaDesa />
      <InfrastrukturDesa />
      <KegiatanMasyarakat />
      <AduanMasyarakat />
    </ContainerAdmin>
  );
}
