import ContainerAdmin from '@/components/containers/ContainerAdmin';
import KeuanganDesa from './_section/KeuanganDesa';
import DokumentasiKegiatan from './_section/DokumentasiKegiatan';
import RencanaKerjaAnggaran from './_section/RencanaKerjaAnggaran';

export default function TransparansiPage() {
  return (
    <ContainerAdmin>
      <KeuanganDesa />
      <DokumentasiKegiatan />
      <RencanaKerjaAnggaran />
    </ContainerAdmin>
  );
}
