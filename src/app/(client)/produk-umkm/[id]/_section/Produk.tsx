import Button from "@/components/button/Button";
import ContainerClient from "@/components/containers/ContainerClient";
import { IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";

export default function Produk(){
    return(
        <ContainerClient>
            <div className="flex gap-3">
                <section className="w-1/2">
                    <img src="https://images.unsplash.com/photo-1726090102306-49df28adaf0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D" className="rounded-md" alt="Image" />
                </section>
                <section className="w-1/2 space-y-2">
                    <p className="font-bold text-2xl">Kopi Robusta Karangbendo</p>
                    <p className="text-rose-500 font-semibold text-lg">Rp. 500.000</p>
                    <div className="flex justify-start items-center gap-3">
                        <IconMapPin className="text-rose-500"/>
                        <p className="font-semibold text-lg">Desa Karangbendo</p>
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam incidunt facilis ad illum quidem doloremque sint exercitationem quas reprehenderit assumenda accusamus nesciunt, aliquid labore, enim omnis, itaque nam ab voluptates nemo recusandae deleniti iste earum saepe? Veniam omnis dolor neque alias labore a possimus! Corrupti iure unde maxime, nihil asperiores cumque sit adipisci dicta aperiam praesentium enim repellat laborum? Vel quibusdam quae deleniti nesciunt quis! Vero fuga magnam quos dicta quis officia cum consequuntur sed aliquam eius! Magnam nesciunt, veritatis adipisci, animi explicabo iure a aliquid voluptatum ipsum, labore accusamus!</p>
                    <Button className="flex items-center justify-center mt-5 gap-3 w-full" type="button">
                        <IconBrandWhatsapp color="white"/>
                        <p>Hubungi Penjual</p>
                    </Button>
                </section>
            </div>
        </ContainerClient>

    )
}
