import ContainerClient from '@/components/containers/ContainerClient';
import BgHeader from '../../../assets/bgheader.png';

export default function Header() {
  return (
    <header id="header"
      className="pt-20 min-h-screen grid place-items-center"
      style={{
        backgroundImage: `url(${BgHeader.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ContainerClient classNames="text-white">
        <div className="text-center space-y-5">
          <div className="w-max px-3 py-2 font-medium text-xs bg-primary/35 border border-primary rounded-md mx-auto">
            Selamat Datang
          </div>
          <h1 className="font-extrabold text-5xl">DESA KARANGBENDO</h1>
          <p className="font-medium text-xl max-w-2xl">
            Nikmati Keindahan Alam dan Kekayaan Budaya Lokal. Temukan Pesona
            Desa Kami yang Memikat!
          </p>
        </div>
      </ContainerClient>
    </header>
  );
}
