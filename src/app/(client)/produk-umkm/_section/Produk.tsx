import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";

export default function Produk(){
    return(
        <ContainerClient>
            <h2 className="title">Pilih berbagai produk yang dihasilkan oleh UMKM Desa Karangbendo.</h2>
            <p>Pilih berbagai produk yang dihasilkan oleh UMKM Desa Karangbendo.</p>
            <div className="mt-5 flex flex-wrap min-h-screen items-start">
                <div className="max-w-72 rounded-md p-3 border border-black/20">
                    <img src="https://images.unsplash.com/photo-1726121678240-9126d5017990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D" className="rounded-md mb-3" alt="Image Produk" />
                    <p className="font-bold text-xl">Batik Karangbendo</p>
                    <p className="font-semibold text-rose-500">Rp. 150.000</p>
                    <p className="font-semibold">Deskripsi</p>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur</p>
                    <Button type="button" className="w-full text-center mt-3 font-medium">Detail Produk</Button>
                </div>
            </div>
        </ContainerClient>
    )
}
