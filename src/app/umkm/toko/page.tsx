import ContainerAdmin from '@/components/containers/ContainerAdmin';
import Toko from './_section/Toko';
import LoadingBar from '@/components/loading/LoadingBar';

export default function TokoUMKM() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <Toko />
    </ContainerAdmin>
  );
}
