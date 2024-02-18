import { ArrowRight } from '@phosphor-icons/react';
import image6 from '../../assets/image6.png'
import image7 from '../../assets/img7.png'

const NewProduct = () => {

    return (
        <div className='flex flex-col w-full px-[4.5rem]'>
            <div className='flex flex-col px-3 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                    </div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">New</h1>
                </div>
                <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>New Product</h1>
            </div>
            <div className='flex w-full justify-between h-[336px]'>
                <div className='bunner w-[50%] h-full  py-4 pl-4'>
                    <div className='mainPage flex bg-[#F2F4F5] h-full relative'>
                        <div className='mainPageContent w-[45%] h-full p-2'>

                            <div className='flex mt-1 bg-black p-1 w-fit h-fit'>
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>INTRODUCING</p>
                            </div>
                            <p className='text-4xl mt-2 fon text-black'>
                                New Apple Homepod Mini
                            </p>
                            <p className='text-sm mt-6 text-black'>
                                Jam-packed with innovation, HomePod mini delivers unexpectedly.
                            </p>
                            <p className='text-sm mt-0 text-black'>
                                Listen, its powerful.
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image w-[55%] flex justify-end  h-full px-8 py-12 pb-9">
                            <div className="w-[240px] h-[240px] object-cover">
                                <img src={image6} height={240} width={240} alt="" className="w-[240px] h-[240px]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bunner w-[50%] h-full  py-4 pl-4 z-10'>
                    <div className='mainPage flex bg-[#0C203B] h-full relative'>
                        <div className='timerCircle text-xs absolute z-0 bg-[#EDB62E] top-0 right-0 flex-col p-2 items-center border-1 border-white flex rounded-full h-[80px] w-[80px] my-auto justify-center'>
                            <div className='label text-white text-lg font-semibold'>$590</div>
                        </div>
                        <div className='mainPageContent w-[60%] h-full p-6'>

                            <div className='flex mt-1 bg-[#EDB62E] p-1 w-fit h-fit'>
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>INTRODUCING</p>
                            </div>
                            <p className='text-4xl mt-2 fon text-white'>
                                Xiaomi Mi 11 Ultra 12GB+256GB</p>
                            <p className='text-sm mt-4 text-white'>
                                Jam-packed with innovation, HomePod mini delivers unexpectedly.                            </p>
                            <p className='text-sm mt-0 text-white'>
                                Listen, its powerful.
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image w-[40%] flex justify-end  h-full pr-8 py-12 pb-9">
                            <div className="w-[240px] h-[240px] object-cover">
                                <img src={image7} height={240} width={240} alt="" className="w-[240px] h-[240px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;
