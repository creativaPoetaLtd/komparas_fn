import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import imag4 from "../../assets/imag4.png"
const NewArrival = () => {
    return (
        <div className='flex flex-col w-full px-[4.9rem] py-12'>
            <div className='flex flex-col px-2 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                    </div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Arrival</h1>
                </div>
                <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>New Arrival</h1>
            </div>
            <div className="flex w-full space-x-8">
                <div className="flex w-1/2 h-[600px] relative bg-[#0C203B]">
                    <div className="absolute bottom-8 left-8 text-white flex flex-col">
                        <h1 className="flex font-semibold">PlayStation 5</h1>
                        <p className="flex text-xs mt-3 w-[242px]">Black and White version of the PS5 coming out on sale.</p>
                        <button className="flex underline underline-offset-4 mt-4 text-[#FFAD33]">VIEW MORE</button>
                    </div>
                    <div className="flex h-[511px] w-[511px] justify-center items-center m-auto">
                        <img src={image1} width={100} height={100} className="w-full h-full" />
                    </div>
                </div>
                <div className="flex w-1/2 flex-col space-y-8 h-[600px]">
                    <div className="flex h-1/2 relative w-full bg-[#0C203B] items-end">
                        <div className="absolute bottom-8 left-8 text-white flex flex-col">
                            <h1 className="flex font-semibold">Womens Collections</h1>
                            <p className="flex text-xs mt-3 w-[242px]">Featured woman collections that give you another vibe.</p>
                            <button className="flex underline underline-offset-4 mt-4 text-[#FFAD33]">VIEW MORE</button>
                        </div>
                        <div className="flex h-[286px] w-[432px] float-right absolute right-0">
                            <img src={image2} width={100} height={100} className="w-full h-full flex" />
                        </div>
                    </div>

                    <div className="w-full h-1/2 flex space-x-8">
                        <div className="flex w-1/2 relative bg-[#0C203B]">
                            <div className="absolute bottom-6 left-6 text-white flex flex-col">
                                <h1 className="flex font-semibold">Speakers</h1>
                                <p className="flex text-xs mt-2 w-[242px]">Amazon wireless speakers</p>
                                <button className="flex underline underline-offset-4 mt-3 text-[#FFAD33]">VIEW MORE</button>
                            </div>
                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={image3} width={100} height={100} className="w-full h-full" />
                            </div>
                        </div>
                        <div className="flex w-1/2 relative bg-[#0C203B]">
                            <div className="absolute bottom-6 left-6 text-white flex flex-col">
                                <h1 className="flex font-semibold">Perfume</h1>
                                <p className="flex text-xs mt-2 w-[242px]">GUCCI INTENSE OUD EDP</p>
                                <button className="flex underline underline-offset-4 mt-3 text-[#FFAD33]">VIEW MORE</button>
                            </div>
                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={imag4} width={100} height={100} className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default NewArrival