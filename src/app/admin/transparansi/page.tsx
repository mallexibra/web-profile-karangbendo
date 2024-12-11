import ContainerAdmin from '@/components/containers/ContainerAdmin';
import KeuanganDesa from './_section/KeuanganDesa';
import DokumentasiKegiatan from './_section/DokumentasiKegiatan';
import RencanaKerjaAnggaran from './_section/RencanaKerjaAnggaran';
import LoadingBar from '@/components/loading/LoadingBar';

export default function TransparansiPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <KeuanganDesa />
      <DokumentasiKegiatan />
      <RencanaKerjaAnggaran />
    </ContainerAdmin>
  );
}
