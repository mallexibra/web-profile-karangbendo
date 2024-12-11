import ContainerAdmin from '@/components/containers/ContainerAdmin';
import AddUMKM from './_section/AddUMKM';
import LoadingBar from '@/components/loading/LoadingBar';

export default function ProdukHukumPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <AddUMKM />
    </ContainerAdmin>
  );
}
