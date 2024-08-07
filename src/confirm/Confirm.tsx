import SubNav from "../components/Navigations/SubNav"
import MobileHomeNav from "../components/home/HomeMobileNav"
import HomeNav from "../components/home/HomeNav"
import Footer from "../components/Footer"
import { useState } from "react"
import ConfirmSteps from "./Steps"

const Confirm = () => {
    const [isBuyer, setIsBuyer] = useState<boolean>(false);

    const handleIsBuyer = () => {
        setIsBuyer(!isBuyer);
    }
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white justify-between lg:px-24 px-2 min-h-screen h-fit  flex flex-col'>
                {isBuyer ? <ConfirmSteps /> : (
                <div className="flex w-fit min-h-96 h-fit  border-gray-950 border-2 m-auto justify-center gap-4 p-3 items-center">
                   <button className="bg-black text-white px-4 py-3 w-fit rounded-md">Ndi Umucuruzi</button>
                   <div className=" flex flex-col mt-6">
                   <button className="bg-black text-white px-4 py-3 w-fit rounded-md" onClick={handleIsBuyer}>Ndi Umuguzi</button>
                   <p className="text-gray-950">(Maze kugura tel.)</p>
                   </div>
                </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Confirm