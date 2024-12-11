import Navbar from '@/components/sidebar/Navbar';
import Header from './_section/Header';
import CommunityActivities from './_section/CommunityActivities';
import HistoryVillage from './_section/HistoryVillage';
import InformationVillage from './_section/InformationVillage';
import VillageApparatur from './_section/VillageApparatus';
import LocationVillage from './_section/LocationVillage';
import LoadingBar from '@/components/loading/LoadingBar';

export default function HomePage() {
  return (
    <main>
      <LoadingBar />
      <Header />
      <Navbar />
      <CommunityActivities />
      <HistoryVillage />
      <InformationVillage />
      <VillageApparatur />
      <LocationVillage />
    </main>
  );
}
