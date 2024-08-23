import ContainerClient from '@/components/containers/ContainerClient';
import Navbar from '@/components/sidebar/Navbar';

export default function HomePage() {
  return (
    <main>
      <ContainerClient>
        <Navbar />
        <p>Ini halaman home</p>
      </ContainerClient>
    </main>
  );
}
