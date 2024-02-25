import { useState, useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import Frame9 from '../../assets/Frame9.png'


const RadioSection = () => {
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
        <div className='flex flex-col w-full lg:px-[4.5rem] lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-96 px-2'>
            <div className='flex md:flex-row flex-col w-full justify-between md:h-[520px] h-fit'>
                <div className='bunner w-full h-full  py-4 lg:pl-4 pl-1'>
                    <div className='mainPage flex md:flex-row flex-col m-auto items-center bg-[#0C203B] justify-between h-full relative'>
                        <div className='mainPageContent lg:w-[30%] md:w-[50%] w-full flex flex-col m-auto justify-center items-start h-full p-8'>
                           
                            <div className='flex mt-6'>
                                <p className='my-auto font-thin text-[#EDB62E] justify-center'>Categories</p>
                            </div>
                            <p className='lg:text-4xl md:text-2xl text-xl font-semibold mt-6 text-white pr-3'>
                            Enhance Your Music Experience
                            </p>
                            
                            <div className='timers py-5 justify-between flex w-full'>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle font-semibold'>{timeLeft.days}</div>
                                    <div className='label'>Days</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle font-semibold'>{timeLeft.hours}</div>
                                    <div className='label'>Hours</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle font-semibold'>{timeLeft.minutes}</div>
                                    <div className='label'>Minutes</div>
                                </div>
                                <div className='timerCircle text-xs flex-col p-2 items-center bg-white flex rounded-full h-[62px] w-[62px] my-auto justify-center'>
                                    <div className='circle font-semibold'>{timeLeft.seconds}</div>
                                    <div className='label'>Seconds</div>
                                </div>
                            </div>
                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">View More</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image md:w-[50%] w-full h-full  flex  justify-center items-center m-auto pt-5 relative">
                            
                            <div className="lg:w-[600px] lg:h-[420px] md:w-[359px] md:h-[218px] w-[358px] h-[217.39px] justify-center items-center m-auto object-cover">
                                <img src={Frame9} height={420} width={600} alt="" className="w-full h-full " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RadioSection;
