import ContainerAdmin from '@/components/containers/ContainerAdmin';
import ProfileDesa from './_section/ProfileDesa';
import AparaturDesa from './_section/AparaturDesa';

export default function ProfileDesaPage() {
  return (
    <ContainerAdmin>
      <ProfileDesa />
      <AparaturDesa />
    </ContainerAdmin>
  );
}
