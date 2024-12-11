import ContainerAdmin from '@/components/containers/ContainerAdmin';
import PeraturanDesa from './_section/PeraturanDesa';
import PeraturanKepalaDesa from './_section/PeraturanKepalaDesa';
import KeputusanKepalaDesa from './_section/KeputusanKepalaDesa';
import LoadingBar from '@/components/loading/LoadingBar';

export default function ProdukHukumPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <PeraturanDesa />
      <PeraturanKepalaDesa />
      <KeputusanKepalaDesa />
    </ContainerAdmin>
  );
}
