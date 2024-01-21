import React from 'react';
import Footer from './components/Footer';

const About: React.FC = () => {
    return (
        <><div className="min-h-screen flex  flex-col items-center justify-center">
            <div className="fewDescription w-full mt-20 flex desktop:flex-row laptop:flex-row tablet:flex-row flex-col laptop:space-y-0 tablet:space-y-0 desktop:space-y-0 space-y-4 laptop:px-24 desktop:px-24 tablet:px-4 px-2  pb-10 laptop:space-x-10 tablet:space-x-5 desktop:space-x-10 space-x-0 text-gray-600 items-center">
                <div className='flex flex-col laptop:w-[70%] desktop:w-[70%] tablet:w-[70%] w-full justify-start  shadow-2xl p-6 space-y-5'>
                    <div className="text-4xl font-bold">What is Komparas?</div>
                    <div className="laptop:text-lg desktop:text-lg tablet:text-base text-sm font-bold">
                        Komparas is a website where you can compare prices from different stores. We provide you
                        with the best prices and the best quality. <b>Our goals</b> are to provide you with the bes prices and the best quality. We also want to
                        make your shopping experience easier and more convenient.
                    </div>
                </div>
                <div className="buttons laptop:w-[30%] desktop:w-[30%] tablet:w-[30%] w-full shadow-2xl space-y-3 p-3 flex flex-col">
                    <p className="text-sm font-bold">Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution; it represents the wise choice of many
                        alternatives.</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Contact Us
                    </button>
                </div>
            </div>

            <div className="fewDescription w-full flex desktop:flex-row laptop:flex-row tablet:flex-row flex-col laptop:space-y-0 tablet:space-y-0 desktop:space-y-0 space-y-4 laptop:px-24 desktop:px-24 tablet:px-4 px-2  pb-10 laptop:space-x-10 tablet:space-x-5 desktop:space-x-10 space-x-0 text-gray-600 items-center">
                <div className="buttons laptop:w-[30%] desktop:w-[30%] tablet:w-[30%] w-full shadow-2xl space-y-3 p-3 flex flex-col">
                    <p className="text-sm font-bold">
                        Our services are the best in the market, we provide you with the best prices and the best quality.
                    </p>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Compare Prices
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Compare Quality
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Compare Shops
                    </button>
                </div>
                <div className='flex flex-col laptop:w-[70%] desktop:w-[70%] tablet:w-[70%] w-full justify-start  shadow-2xl p-6 space-y-5'>
                    <div className="laptop:text-lg desktop:text-lg tablet:text-base text-sm font-bold">
                    Welcome to Kompars, your trusted product comparator system located in Belgium. We strive to provide
          comprehensive and reliable product information to help you make informed decisions.
                        Our team is dedicated to ensuring that you have access to detailed specifications, reviews, and
                        comparisons to simplify your product research process. Feel free to explore our platform and discover
                        the best products that suit your needs.
                    </div>
                </div>
            </div>
        </div><Footer /></>
    );
};

export default About;
