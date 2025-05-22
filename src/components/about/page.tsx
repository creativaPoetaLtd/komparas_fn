import MobileHomeNav from '../home/HomeMobileNav'
import HomeNav from '../home/HomeNav'
import SubNav from '../Navigations/SubNav'
import girls from '../../assets/girls.png'
import ShopIcon from '../../assets/ShopIcon.png'
import DollerICon from '../../assets/Icon-Sale.png'
import ShopBag from '../../assets/ShopBag.png'
import MoneyBag from '../../assets/MoneyBag.png'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import man from '../../assets/man.png'
import girl from '../../assets/girl.png'
import gentle from '../../assets/gentle.png'
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import Footer from '../Footer'

const AboutPage = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        gap: 10,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-24 px-2 flex flex-col'>
                <div className="navs flex mt-8 lg:ml-11 ml-4 w-fit">
                    <a href="/" className="text-[#0C203B] text-sm">Ahabanza</a>
                    <p className="text-[#0C203B] text-sm mx-1">/</p>
                    <a href="/page" className="text-[#EDB62E] text-sm">Abo turi bo</a>
                </div>

                <div className='w-full flex flex-col h-full'>
                    <div className='flex md:flex-row flex-col w-full md:h-[609px] mt-16'>
                        <div className='md:w-[50%] w-full flex flex-col justify-center m-auto'>
                            <div className='flex flex-col space-y-4 lg:w-[525px] md:w-[400px] m-auto justify-center'>
                                <p className='flex text-sm'>Komparas ni <b>urubuga rw’ikoranabuhanga</b> rwagenewe gufasha abakiriya kubona telefoni nziza, zizewe kandi zikomeye, bakazibonera ku giciro cyiza, banahabwe serivisi zinyongera zihariye zitangwa binyuze muri Komparas.</p>
                                <p className='flex text-sm'></p>
                                <h1 className='text-5xl flex font-medium'>Intego yacu</h1>
                                <p className='flex text-sm'>Gufasha buri muntu kugura telefone mu buryo bworoshye, buhendutse kandi butekanye.</p>
                            </div>
                        </div>
                        <div className='md:w-[50%] w-full flex flex-col'>
                            <img src={girls} className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
                <div className='grid py-20 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-3'>
                    <div className='flex flex-col lg:w-[270px] w-[163px] lg:h-[230px] md:w-[163px] m-auto items-center justify-center rounded-md border border-black lg:space-y-3 space-y-2 py-1'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={ShopIcon} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-3xl'>10.5k</h1>
                        <p className='flex lg:text-sm md:text-xs text-xs text-[#0C203B]'>Amaduka dukorana nayo</p>
                    </div>
                    <div className='flex flex-col lg:w-[270px] w-[163px] lg:h-[230px] md:w-[163px] bg-[#EDB62E] text-white m-auto items-center justify-center rounded-md border border-black lg:space-y-3 space-y-2 py-1'>
                        <div className='w-[80px] h-[80px] bg-[#EDB62E] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-white flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[white] flex rounded-full m-auto justify-center'>
                                    <img src={DollerICon} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-white text-3xl'>33k</h1>
                        <p className='flex lg:text-sm md:text-xs text-xs text-white'>Telefoni zigurishirizwa hano ku kwezi</p>
                    </div>
                    <div className='flex flex-col lg:w-[270px] w-[163px] lg:h-[230px] md:w-[163px] m-auto items-center justify-center rounded-md border border-black lg:space-y-3 space-y-2 py-1'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={ShopBag} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-3xl'>45.5k</h1>
                        <p className='flex lg:text-sm md:text-xs text-xs text-[#0C203B]'>Abakiriye bagura banyuze hano ku kwezi</p>
                    </div>
                    <div className='flex flex-col lg:w-[270px] w-[163px] lg:h-[230px] md:w-[163px] m-auto items-center justify-center rounded-md border border-black lg:space-y-3 space-y-2 py-1'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={MoneyBag} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-3xl'>25k</h1>
                        <p className='flex lg:text-sm md:text-xs text-xs text-[#0C203B]'>Telefoni zigurishirizwa hano ku mwaka</p>
                    </div>
                </div>
                <div className=" py-10 w-full">

                    <Slider {...settings}
                        className="flex justify-center w-full"
                    >
                        <div className="bg-white p-2 md:px-3 px-1  w-[30rem] h-[564px] rounded-md ">
                            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] w-full items-center justify-center h-full">
                                <img src={man} className='w-[236px] h-[391px] object-cover' />
                                <div className='flex flex-col space-y-2 justify-start items-start mt-2 p-2 self-start'>
                                    <h1 className='name font-semibold text-lg'>Tom Cruise</h1>
                                    <h1 className='text-sm'>Founder & Chairman</h1>
                                    <div className='socialMedias mt-2 flex space-x-3'>
                                        <FaXTwitter className='text-base ' />
                                        <IoLogoInstagram />
                                        <CiLinkedin />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-2 md:px-6 px-3  w-[370px] h-[564px] rounded-md ">
                            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
                                <img src={girl} className='w-[236px] h-[391px] object-cover' />
                                <div className='flex flex-col space-y-2 justify-start items-start mt-2 p-2 self-start'>
                                    <h1 className='name font-semibold text-lg'>Emma Watson</h1>
                                    <h1 className='text-sm'>Managing Director</h1>
                                    <div className='socialMedias mt-2 flex space-x-3'>
                                        <FaXTwitter className='text-base ' />
                                        <IoLogoInstagram />
                                        <CiLinkedin />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-2 md:px-6 px-3  w-[370px] h-[564px] rounded-md ">
                            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
                                <img src={gentle} className='w-[336px] h-[391px] object-cover' />
                                <div className='flex flex-col space-y-2 justify-start items-start mt-2 p-2 self-start'>
                                    <h1 className='name font-semibold text-lg'>Will Smith</h1>
                                    <h1 className='text-sm'>Product Designer</h1>
                                    <div className='socialMedias mt-2 flex space-x-3'>
                                        <FaXTwitter className='text-base ' />
                                        <IoLogoInstagram />
                                        <CiLinkedin />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-2 md:px-6 px-3  w-[370px] h-[564px] rounded-md ">
                            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
                                <img src={girl} className='w-[236px] h-[391px] object-cover' />
                                <div className='flex flex-col space-y-2 justify-start items-start mt-2 p-2 self-start'>
                                    <h1 className='name font-semibold text-lg'>Emma Watson</h1>
                                    <h1 className='text-sm'>Managing Director</h1>
                                    <div className='socialMedias mt-2 flex space-x-3'>
                                        <FaXTwitter className='text-base ' />
                                        <IoLogoInstagram />
                                        <CiLinkedin />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-2 md:px-3 px-1  w-[30rem] h-[564px] rounded-md ">
                            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] w-full items-center justify-center h-full">
                                <img src={man} className='w-[236px] h-[391px] object-cover' />
                                <div className='flex flex-col space-y-2 justify-start items-start mt-2 p-2 self-start'>
                                    <h1 className='name font-semibold text-lg'>Tom Cruise</h1>
                                    <h1 className='text-sm'>Founder & Chairman</h1>
                                    <div className='socialMedias mt-2 flex space-x-3'>
                                        <FaXTwitter className='text-base ' />
                                        <IoLogoInstagram />
                                        <CiLinkedin />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>

                <div className='grid py-20 md:grid-cols-3 grid-cols-1 gap-1'>
                    <div className='flex flex-col w-[256px] h-[230px] m-auto items-center justify-center space-y-3'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={ShopIcon} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-lg'>FREE AND FAST DELIVERY</h1>
                        <p className='flex text-sm text-[#0C203B]'>Sallers active our site</p>
                    </div>
                    <div className='flex flex-col w-[256px] h-[230px] m-auto items-center justify-center space-y-3'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={ShopBag} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-lg'>24/7 CUSTOMER SERVICE</h1>
                        <p className='flex text-sm text-[#0C203B]'>Friendly 24/7 customer support</p>
                    </div>
                    <div className='flex flex-col w-[256px] h-[230px] m-auto items-center justify-center space-y-3'>
                        <div className='w-[80px] h-[80px] bg-[#c1c1c1] flex rounded-full'>
                            <div className='w-[58px] h-[58px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                <div className='w-[40px] h-[40px] bg-[#0C203B] flex rounded-full m-auto justify-center'>
                                    <img src={ShopBag} width={100} height={100} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold text-[#0C203B] text-lg'>MONEY BACK GUARANTEE</h1>
                        <p className='flex text-sm text-[#0C203B]'>We reurn money within 30 days</p>
                    </div>
                </div>
            </div><Footer />
        </div>
    )
}

export default AboutPage
