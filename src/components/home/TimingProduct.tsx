import { useState, useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { RxDividerHorizontal } from "react-icons/rx";
import headset from '../../assets/headset.png'
import image5 from '../../assets/image5.png'
import image4 from '../../assets/image4.png'

const TimingProduct = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-02-24") - +new Date();
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
        <div className='flex flex-col w-full px-[4.5rem]'>
            <div className='flex w-full justify-between h-[520px]'>
                <div className='bunner w-[63%] h-full  py-4 pl-4'>
                    <div className='mainPage flex bg-[#0C203B] h-full relative'>
                        <div className='mainPageContent w-[50%] h-full p-8'>
                            <div className='timers p-2 justify-between flex w-full'>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.days}</div>
                                    <div className='label'>Days</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.hours}</div>
                                    <div className='label'>Hours</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.minutes}</div>
                                    <div className='label'>Minutes</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.seconds}</div>
                                    <div className='label'>Seconds</div>
                                </div>
                            </div>
                            <div className='flex mt-6'>
                                <RxDividerHorizontal className='text-white text-xl my-auto justify-center' />
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>THE BEST PLACE TO PLAY</p>
                            </div>
                            <p className='text-4xl mt-6 text-white'>
                                Apple Airpod Max
                            </p>
                            <p className='text-sm mt-6 text-white'>
                                Computational Audio.
                            </p>
                            <p className='text-sm mt-0 text-white'>
                                Listen, its powerful.
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View More</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image w-[50%] h-full pr-12 pt-32 relative">
                            <div className='timerCircle text-xs absolute bg-[#EDB62E] top-[26px] right-16 flex-col p-2 items-center border-4 border-white flex rounded-full h-[100px] w-[100px] my-auto justify-center'>
                                <div className='label text-white text-xl font-semibold'>$299</div>
                            </div>
                            <div className="w-[250px] h-[275px] object-cover">
                                <img src={headset} height={100} width={100} alt="" className="w-full h-full " />
                            </div>
                        </div>
                        <div className="circles w-full absolute bottom-0 flex justify-start ml-8 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className={`w-3 h-3 rounded-full mx-1 bg-white cursor-pointer ${index === 3 ? 'bg-[#EDB62E]' : ''}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='sideCategories w-[35%] py-4 space-y-6 h-full flex flex-col'>
                    <div className='h-[50%] flex w-full  justify-between bg-[#0C203B] relative'>
                        <div className='absolute top-8 rounded-md p-2 right-12 w-fit h-fit bg-[#EDB62E] text-white'>
                            <p className='text-lg'>29% OFF</p>
                        </div>
                        <div className='mainPageContent w-[45%] h-full p-8'>
                            <div className='flex'>
                                <p className='text-[#EDB62E] text-lg my-auto justify-center'>SUMMER SALES</p>
                            </div>
                            <p className='text-2xl mt-5 text-white'>
                                New Google Pixel 6 Pro
                            </p>
                            <button className="flex space-x-2 rounded-md text-sm mt-6 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
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
                    <div className='h-1/2 w-full flex p-4 bg-[#F2F4F5]'>
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
                            <button className="flex space-x-2 rounded-md text-sm mt-6 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
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
