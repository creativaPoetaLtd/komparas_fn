import Footer from "../Footer"
import SubNav from "../Navigations/SubNav"
import MobileHomeNav from "../home/HomeMobileNav"
import HomeNav from "../home/HomeNav"
import login from "../../assets/login.png"

const SignupPage = () => {
    return (
        <><div className='w-full bg-white h-fit justify-between'>
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className="flex lg:mt-12 mt-2 w-full h-[581px] mb-11">
                <div className="w-[65%] lg:flex hidden h-full">
                    <div className="xl:w-[805px] lg:w-[705px] h-[581px] flex">
                    <img src={login} alt="" className="w-full h-full" />
                    </div>
                </div>
                <div className="md:w-[30%] w-full md:px-0 px-8 h-full flex flex-col justify-center lg:items-start lg:m-0 m-auto items-center">
                    <h1 className="text-2xl font-semibold text-[#0C203B] flex items-start text-start">Create an account</h1>
                    <p className="text-sm mt-3">Enter your details below</p>
                    <form action="" className="flex flex-col md:w-[371px] w-full mt-6">
                        <input type="text" placeholder="Name" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input type="text" placeholder="Email" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input type="password" placeholder="Your Password" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input type="password" placeholder="Confirm Password" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <button className="bg-[#EDB62E] text-white px-4 py-3 w-full float-right justify-end self-end rounded-md">Create Account</button>
                    </form>
                    <div className="flex mt-3">
                        <p className="text-sm">Already have an account?</p>
                        <a href="/login" className="text-[#EDB62E] ml-1 text-sm flex my-auto justify-center underline underline-offset-4">Login</a>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default SignupPage