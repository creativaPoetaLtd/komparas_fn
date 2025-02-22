import React, { useState } from 'react';
import { isAdminFromLocalStorage } from '../Footer';

interface MarqueeProps {
    className?: string;
    children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({ className, children }) => {
    const [isPaused, setIsPaused] = useState(false);

    const handleHover = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div
            className={`${className} marquee`}
            style={{
                overflow: 'hidden',
                position: 'relative',
                whiteSpace: 'nowrap',
                display: 'inline-block',
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
            <div
                style={{
                    display: 'inline-block',
                    paddingLeft: '100%',
                    animation: `marquee 20s linear infinite ${isPaused ? 'paused' : ''}`,
                }}
            >
                {children}
            </div>
        </div>
    );
};


const SubNav = () => {
  
    return (
        <div className={`lg:flex md:flex-row flex-col md:px-32 px-2  m-auto p-2 text-white justify-end md:space-x-16 space-x-5 items-end w-full ${isAdminFromLocalStorage() ? "bg-[#848482]" : "bg-black"} `}>

            <Marquee className='flex justify-end w-full items-end'>
            <p className='text-sm'>Koresha Komparas Code, ugabanyirizweho 15% kuri buri telefoni yose uguriye mu Isaro shop <span className='ml-3'>
                    <a href='/products' className='text-sm underline'>--Shakira hano---</a>
                </span></p>
            </Marquee>
        </div>
    )
}

export default SubNav;
