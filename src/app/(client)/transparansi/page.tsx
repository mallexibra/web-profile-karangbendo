import Navbar from '@/components/sidebar/Navbar';
import HeaderTransparancy from './_section/Header';
import Keuangan from './_section/Keuangan';
import Documentation from './_section/Documentation';
import WorkPlan from './_section/WorkPlan';
import LoadingBar from '@/components/loading/LoadingBar';

export default function Transparansi() {
  return (
    <main className='w-full overflow-x-hidden'>
      <LoadingBar />
      <HeaderTransparancy />
      <Navbar />
      <Keuangan />
      <Documentation />
      <WorkPlan />
    </main>
  );
}
