import ContainerAdmin from '@/components/containers/ContainerAdmin';
import PeraturanDesa from './_section/PeraturanDesa';
import PeraturanKepalaDesa from './_section/PeraturanKepalaDesa';
import KeputusanKepalaDesa from './_section/KeputusanKepalaDesa';

export default function ProdukHukumPage() {
  return (
    <ContainerAdmin>
      <PeraturanDesa />
      <PeraturanKepalaDesa />
      <KeputusanKepalaDesa />
    </ContainerAdmin>
  );
}
