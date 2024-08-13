import Card from '@/components/cards/Card';
import ContainerAdmin from '@/components/containers/ContainerAdmin';
import TableSection from './_section/TableSection';

export default function DashboardPage() {
  return (
    <ContainerAdmin>
      <Card>
        <h3 className="font-bold text-lg">Selamat Datang</h3>
        <p className="pt-2">
          Selamat datang di dashboard admin untuk website Desa Karangbendo. Di
          sini Anda dapat mengelola konten dan pengaturan website dengan mudah.
          Pantau aktivitas terbaru, kelola artikel, gambar, dan informasi desa
          dengan efisien untuk memastikan informasi terbaru selalu tersedia
          untuk masyarakat.
        </p>
      </Card>
      <TableSection />
    </ContainerAdmin>
  );
}
