import Image from "next/image";
import Link from "next/link";

export default function ButtonOverlay() {
    return (<Link className="fixed bottom-12 right-6" href={""}>
        <Image src={"/assets/icons/whatsapp.png"} width={50} height={50} alt="Icon Whatsapp" />
    </Link>)
}
