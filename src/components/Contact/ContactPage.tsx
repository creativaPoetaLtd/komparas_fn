import { Envelope, Phone } from "@phosphor-icons/react"
import SubNav from "../Navigations/SubNav"
import MobileHomeNav from "../home/HomeMobileNav"
import HomeNav from "../home/HomeNav"
import Footer from "../Footer"

const ContactPage = () => {
    return (
        <>
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-10 pl-2 flex flex-col'>
                <SubNav />
                <HomeNav />
                <MobileHomeNav />
                <div className='w-full flex flex-col h-full'>
                    <div className='flex md:flex-row flex-col w-full md:h-[457px] mt-16'>
                        <div className="w-[30%] flex flex-col  space-y-6 m-auto justify-center items-center">
                            <div className="felx flex-col space-y-2 w-[262px]">
                                <div className="flex m-auto items-start">
                                    <div className="w-[40px] h-[40px] rounded-full flex bg-[#EDB62E]">
                                        <Phone className="text-white text-xl m-auto justify-center items-center" />
                                    </div>
                                    <h1 className="text-xl font-bold flex my-auto justify-center ml-2">Call To Us</h1>
                                </div>
                                <h1 className="text-sm">We are available 24/7, 7 days a week.</h1>
                                <p className="text-sm">Phone: +250 784 534 678</p>
                            </div>
                            <div className="line w-[262px] h-[1px] bg-[#EDB62E]"></div>
                            <div className="felx flex-col space-y-2 w-[262px]">
                                <div className="flex m-auto items-start">
                                    <div className="w-[40px] h-[40px] rounded-full flex bg-[#EDB62E]">
                                        <Envelope className="text-white text-xl m-auto justify-center items-center" />
                                    </div>
                                    <h1 className="text-xl font-bold flex my-auto justify-center ml-2">Write To US</h1>
                                </div>
                                <p className="text-sm">Fill out our form and we will contact you within 24 hours.</p>
                                <p className="email text-sm">Email:  komparas@gmail.com</p>
                                <p className="email text-sm">Email:  support@komparas.com</p>
                            </div>
                        </div>
                        <div className="w-[70%] flex flex-col shadow">
                            <form action="" className="flex flex-col w-[737px] m-auto justify-center  h-full space-y-6">
                                <div className="flex flex-row justify-between">
                                    <input type="text" placeholder="Your Name *" className="w-[235px] h-[50px] bg-[#F5F5F5] rounded-md p-2" />
                                    <input type="text" placeholder="Your Email *" className="w-[235px] h-[50px] bg-[#F5F5F5] rounded-md p-2" />
                                    <input type="text" placeholder="Your Phone *" className="w-[235px] h-[50px] bg-[#F5F5F5] rounded-md p-2" />
                                </div>
                                <textarea name="" id="" cols={30} rows={10} placeholder="Your Message *" className="w-full h-[200px] bg-[#F5F5F5] rounded-md p-2 mt-4"></textarea>
                                <button className="bg-[#EDB62E] text-white px-4 py-3 w-fit float-right justify-end self-end rounded-md">Send Massage</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactPage