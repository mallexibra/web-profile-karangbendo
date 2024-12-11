import Navbar from "@/components/sidebar/Navbar";
import HeaderDetailProduk from "./_section/Header";
import Produk from "./_section/Produk";
import LoadingBar from "@/components/loading/LoadingBar";

export default function DetailProduk(){
    return(
        <main className="min-h-screen">
            <LoadingBar />
            <HeaderDetailProduk/>
            <Navbar/>
            <Produk/>
        </main>
    )
}
