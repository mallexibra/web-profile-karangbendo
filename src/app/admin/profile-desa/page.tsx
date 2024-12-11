import ContainerAdmin from '@/components/containers/ContainerAdmin';
import ProfileDesa from './_section/ProfileDesa';
import AparaturDesa from './_section/AparaturDesa';
import LoadingBar from '@/components/loading/LoadingBar';

export default function ProfileDesaPage() {
  return (
    <ContainerAdmin>
      <LoadingBar />
      <ProfileDesa />
      <AparaturDesa />
    </ContainerAdmin>
  );
}
