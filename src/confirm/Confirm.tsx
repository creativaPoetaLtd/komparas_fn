import SubNav from "../components/Navigations/SubNav"
import MobileHomeNav from "../components/home/HomeMobileNav"
import HomeNav from "../components/home/HomeNav"
import Footer from "../components/Footer"
import ConfirmSteps from "./Steps"

const Confirm = () => {
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white justify-between lg:px-24 px-2 min-h-screen h-fit  flex flex-col'>
                <ConfirmSteps /> 
            </div>
            <Footer />
        </div>
    )
}

export default Confirm