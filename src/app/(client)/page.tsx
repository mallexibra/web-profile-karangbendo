import Navbar from '@/components/sidebar/Navbar';
import Header from './_section/Header';
import CommunityActivities from './_section/CommunityActivities';
import HistoryVillage from './_section/HistoryVillage';
import InformationVillage from './_section/InformationVillage';
import VillageApparatur from './_section/VillageApparatus';
import LocationVillage from './_section/LocationVillage';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Navbar />
      <CommunityActivities/>
      <HistoryVillage/>
      <InformationVillage/>
      <VillageApparatur/>
      <LocationVillage/>
    </main>
  );
}
