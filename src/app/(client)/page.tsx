import Navbar from '@/components/sidebar/Navbar';
import Header from './_section/Header';
import CommunityActivities from './_section/CommunityActivities';
import HistoryVillage from './_section/HistoryVillage';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Navbar />
      <CommunityActivities/>
      <HistoryVillage/>
    </main>
  );
}
