import ContainerAdmin from '@/components/containers/ContainerAdmin';
import InfrastrukturDesa from './_section/InfrastrukturDesa';
import KegiatanMasyarakat from './_section/KegiatanMasyarakat';
import AduanMasyarakat from './_section/AduanMasyarakat';

export default function InformasiDesaPage() {
  return (
    <ContainerAdmin>
      <InfrastrukturDesa />
      <KegiatanMasyarakat />
      <AduanMasyarakat />
    </ContainerAdmin>
  );
}
