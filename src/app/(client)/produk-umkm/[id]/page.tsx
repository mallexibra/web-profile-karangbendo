import Navbar from "@/components/sidebar/Navbar";
import HeaderDetailProduk from "./_section/Header";
import Produk from "./_section/Produk";

export default function DetailProduk(){
    return(
        <main className="min-h-screen">
            <HeaderDetailProduk/>
            <Navbar/>
            <Produk/>
        </main>
    )
}
