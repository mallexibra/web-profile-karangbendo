import Navbar from "@/components/sidebar/Navbar";
import PeraturanDesa from "./_section/PeraturanDesa";
import HeaderProdukHukum from "./_section/Header";
import PeraturanKepalaDesa from "./_section/PeraturanKepalaDesa";
import KeputusanKepalaDesa from "./_section/KeputusanKepalaDesa";
import LoadingBar from "@/components/loading/LoadingBar";

export default function ProdukHukum(){
    return(
        <main className='w-full overflow-x-hidden'>
            <LoadingBar />
            <HeaderProdukHukum/>
            <Navbar/>
            <PeraturanDesa/>
            <PeraturanKepalaDesa/>
            <KeputusanKepalaDesa/>
        </main>
    )
}
