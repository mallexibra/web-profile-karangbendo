import ContainerClient from "@/components/containers/ContainerClient";
import React from "react";

const PotensiDesa = () => {
    return (
        <ContainerClient>
            <div id="potensidesa">
                <h2 className="title">Potensi Desa</h2>
                <p>Desa Karangbendo memiliki potensi alam yang melimpah, termasuk lahan pertanian yang subur, hutan bambu, dan sungai yang kaya akan ikan.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-5">
                    {[1, 2, 3, 4, 5].map((item: any, i: number) => (<div key={i} className="space-y-2">
                        <img src="https://images.unsplash.com/photo-1725714834280-0c7584637d06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D" className="rounded-md w-44" alt="Potensi Desa" />
                        <p className="text-center font-semibold">Lahan Pertanian</p>
                    </div>))}
                </div>
            </div>
        </ContainerClient>
    )
}

export default PotensiDesa;
