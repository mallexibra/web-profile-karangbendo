import ContainerAdmin from '@/components/containers/ContainerAdmin';
import SettingToko from './_section/SettingToko';
import LoadingBar from '@/components/loading/LoadingBar';

export default function UMKMPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <SettingToko />
    </ContainerAdmin>
  );
}
