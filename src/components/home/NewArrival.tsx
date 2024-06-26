import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
// import image3 from "../../assets/image3.png"
import imag4 from "../../assets/imag4.png"

interface NewArrivalProps {
    productData: any;
}
const NewArrival: React.FC<NewArrivalProps> = ({}) => {
    const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
    const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
  
    return (
        <div className='flex flex-col w-full lg:px-[3rem] px-2 py-12'>
            <div className='flex flex-col px-2 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                    </div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Telefoni zigisohoka</h1>
                </div>
                {/* <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Telefoni zikigera ku isoko</h1> */}
            </div>
            <div className="flex lg:flex-row px-2 md:flex-col flex-col w-full lg:space-x-8 lg:space-y-0 space-y-3">
                <div className={`flex lg:w-1/2 md:w-full w-full h-[600px] relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                    <div className="absolute bottom-8 left-8 text-white flex flex-col">
                        <h1 className="flex font-semibold">PlayStation 5</h1>
                        <p className="flex text-xs mt-3 w-[242px]">Black and White version of the PS5 coming out on sale.</p>
                        <button className="flex underline underline-offset-4 mt-4 text-[#FFAD33]">VIEW MORE</button>
                    </div>
                    <div className="flex h-[511px] w-[511px]  justify-center items-center m-auto">
                        <img src={image1} width={100} height={100} className="w-full h-full" />
                    </div>
                </div>
                <div className="flex lg:w-1/2 w-full flex-col lg:space-y-8 space-y-3 h-[600px]">
                    <div className={`flex h-1/2 relative w-full ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  items-end`}>
                        <div className="absolute md:bottom-8 bottom-4 md:left-8 left-2 text-white flex flex-col">
                            <h1 className="flex font-semibold">Womens Collections</h1>
                            <p className="flex text-xs mt-3 md:w-[242px] w-[150px]">Featured woman collections that give you another vibe.</p>
                            <button className="flex underline underline-offset-4 mt-3 md:text-base text-sm text-[#FFAD33]">VIEW MORE</button>
                        </div>
                        <div className="flex  md:h-[286px] md:w-[432px] float-right absolute right-0">
                            <img src={image2} width={100} height={100} className="w-full object-contain  h-full right-0" />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex md:space-x-8 space-x-2">
                        <div className={`flex w-1/2 relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                            <div className="absolute md:bottom-6 bottom-3 md:left-6 left-2 text-white flex flex-col">
                                <h1 className="flex font-semibold">Speakers</h1>
                                <p className="flex text-xs mt-2 md:w-[242px]">Amazon wireless speakers</p>
                                <button className="flex underline underline-offset-4 mt-3 text-[#FFAD33] md:text-base text-sm">VIEW MORE</button>
                            </div>
                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={imag4}width={100} height={100} className="w-full h-full" />
                            </div>
                        </div>
                        <div className={`flex w-1/2 relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                            <div className="absolute md:bottom-6 bottom-3 md:left-6 left-2 text-white flex flex-col">
                                <h1 className="flex font-semibold">Perfume</h1>
                                <p className="flex text-xs mt-2 md:w-[242px]">GUCCI INTENSE OUD EDP</p>
                                <button className="flex underline underline-offset-4 mt-3 md:text-base text-sm text-[#FFAD33]">VIEW MORE</button>
                            </div>
                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={image1} width={100} height={100} className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default NewArrival