import { useState, useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { RxDividerHorizontal } from "react-icons/rx";
import headset from '../../assets/headset.png'
import image5 from '../../assets/image5.png'
import image4 from '../../assets/image4.png'

const TimingProduct = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-05-24") - +new Date();
        let timeLeft: any = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className='flex flex-col w-full lg:px-[4rem] px-2'>
            <div className='flex lg:flex-row md:flex-col flex-col w-full justify-between md:h-[520px] h-fit'>
                <div className='bunner lg:w-[63%] md:w-full w-full h-full  py-4 lg:pl-2 pl-2'>
                    <div className='mainPage flex bg-[#0C203B] pb-5 h-full relative'>
                        <div className='mainPageContent w-[50%] h-full lg:p-8 md:p-2 p-2'>
                            <div className='timers md:p-2 p-1 justify-between flex w-full'>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.days}</div>
                                    <div className='label'> Iminsi</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.hours}</div>
                                    <div className='label'>Amasaha</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.minutes}</div>
                                    <div className='label'>Iminota</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.seconds}</div>
                                    <div className='label'>Amasegonda</div>
                                </div>
                            </div>
                            <div className='flex mt-6'>
                                <RxDividerHorizontal className='text-white text-xl my-auto justify-center' />
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>THE BEST PLACE TO PLAY</p>
                            </div>
                            <p className='md:text-4xl text-2xl md:mt-6 mt-3 text-white'>
                                Apple Airpod Max
                            </p>
                            <p className='text-sm md:mt-6 mt-3 text-white'>
                                Computational Audio.
                            </p>
                            <p className='text-sm mt-0 text-white'>
                                Listen, its powerful.
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm md:mt-8 mt-3 md:p-3 p-2 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View More</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image w-[50%] h-full pr-12 md:pt-32 pt-24 relative">
                            <div className='timerCircle text-xs absolute bg-[#EDB62E] md:top-[26px] top-3 md:right-16 right-3 flex-col p-2 items-center border-4 border-white flex rounded-full md:h-[100px] h-[80px] md:w-[100px] w-[80px] my-auto justify-center'>
                                <div className='label text-white text-xl font-semibold'>$299</div>
                            </div>
                            <div className="md:w-[250px] w-[180px] md:h-[275px] h-[200px] object-cover">
                                <img src={headset} height={100} width={100} alt="" className="w-full h-full " />
                            </div>
                        </div>
                        <div className="circles w-full absolute bottom-3 left-2 flex justify-start">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className={`w-2 h-2 rounded-full mx-1 bg-white cursor-pointer ${index === 3 ? 'bg-[#EDB62E]' : ''}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='sideCategories lg:w-[35%] w-full py-4 md:px-2 px-2 lg:space-y-6 md:space-y-0 sm:space-y-3 md:space-x-5 sm:space-x-0 lg:space-x-0 h-full flex md:flex-row sm:flex-col flex-col lg:flex-col 2xl:flex-col'>
                    <div className='h-[50%] sm:h-[50%] lg:h-[50%] 2xl:h-[50%] md:h-[100%] flex w-full  justify-between bg-[#0C203B] relative'>
                        <div className='absolute top-8 rounded-md p-2 right-12 w-fit h-fit bg-[#EDB62E] text-white'>
                            <p className='text-lg'>29% OFF</p>
                        </div>
                        <div className='mainPageContent w-[45%] h-full md:p-4 p-3 flex justify-center m-auto flex-col'>
                            <div className='flex'>
                                <p className='text-[#EDB62E] md:text-base text-sm my-auto justify-center'>SUMMER SALES</p>
                            </div>
                            <p className='md:text-xl test-base mt-5 text-white'>
                                New Google Pixel 6 Pro
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm mt-6 md:p-2 p-2 md:px-2 px-2 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View More</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image w-[55%] flex justify-end  h-full pl-4 pt-12">
                            <div className="w-full h-full object-cover">
                                <img src={image5} height={312} width={312} alt="" className="w-[312px] h-full" />
                            </div>
                        </div>
                    </div> 
                    <div className='h-[50%] sm:h-[50%] lg:h-[50%] 2xl:h-[50%] md:h-[100%] w-full flex p-4 bg-[#F2F4F5]'>
                        <div className="image w-[50%] h-full pl-2">
                            <div className="w-[160px] h-[160px] object-cover">
                                <img src={image4} height={160} width={160} alt="" className="w-full h-full " />
                            </div>
                        </div>
                        <div className='mainPageContent w-[50%] h-full pr-8 py-2'>
                            <p className='text-2xl mt-1 '>
                            Xiaomi FlipBuds Pro
                            </p>
                            <div className='flex'>
                                <p className=' font-thin justify-center'>$299 USD</p>
                            </div>
                            <button className="flex space-x-2 rounded-md text-sm mt-6 md:p-3 p-2 md:px-4 px-2 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View More</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
    )
}

export default TimingProduct;
