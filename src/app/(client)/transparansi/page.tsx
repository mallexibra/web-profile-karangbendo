import Navbar from "@/components/sidebar/Navbar";
import HeaderTransparancy from "./_section/Header";
import Keuangan from "./_section/Keuangan";
import Documentation from "./_section/Documentation";
import WorkPlan from "./_section/WorkPlan";

export default function Transparansi (){
    return (
        <main>
            <HeaderTransparancy/>
            <Navbar/>
            <Keuangan/>
            <Documentation/>
            <WorkPlan/>
        </main>
    )
}
