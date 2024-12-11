import Navbar from "@/components/sidebar/Navbar";
import HeaderUMKM from "./_section/Header";
import Produk from "./_section/Produk";
import LoadingBar from "@/components/loading/LoadingBar";

export default function ProdukUMKM(){
    return(
        <main>
            <LoadingBar />
            <HeaderUMKM/>
            <Navbar/>
            <Produk/>
        </main>
    )
}
