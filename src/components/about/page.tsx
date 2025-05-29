import MobileHomeNav from '../home/HomeMobileNav'
import HomeNav from '../home/HomeNav'
import SubNav from '../Navigations/SubNav'
import girls from '../../assets/girls.png'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Footer from '../Footer'

const AboutPage = () => {

    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 h-fit justify-between lg:px-24 px-4 flex flex-col relative overflow-hidden'>
                {/* Decorative background elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#EDB62E]/10 to-[#0C203B]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-[#0C203B]/5 to-[#EDB62E]/10 rounded-full blur-3xl"></div>
                
                <div className="navs flex mt-8 lg:ml-11 ml-4 w-fit relative z-10">
                    <a href="/" className="text-[#0C203B] text-sm font-medium hover:text-[#EDB62E] transition-colors duration-300">Ahabanza</a>
                    <p className="text-[#0C203B] text-sm mx-2">/</p>
                    <a href="/product" className="text-[#EDB62E] text-sm font-semibold bg-[#EDB62E]/10 px-3 py-1 rounded-full hover:bg-[#EDB62E]/20 transition-all duration-300">Abo turi bo</a>
                </div>

                <div className='w-full flex flex-col h-full relative z-10'>
                    <div className='flex md:flex-row flex-col w-full min-h-[650px] mt-16 items-center'>
                        <div className='md:w-[50%] w-full flex flex-col justify-center relative'>
                            {/* Floating accent elements */}
                            <div className="absolute -top-8 -left-4 w-16 h-16 bg-[#EDB62E]/20 rounded-full animate-pulse"></div>
                            <div className="absolute top-1/2 -right-8 w-8 h-8 bg-[#0C203B]/15 rounded-full animate-bounce delay-300"></div>
                            
                            <div className='flex flex-col space-y-6 lg:w-[550px] md:w-[450px] m-auto justify-center px-6 md:px-0'>
                                {/* Animated title with gradient */}
                                <div className="relative">
                                    <h1 className='text-6xl md:text-7xl font-black bg-gradient-to-r from-[#0C203B] via-[#EDB62E] to-[#0C203B] bg-clip-text text-transparent leading-tight transform hover:scale-105 transition-transform duration-500 cursor-default'>
                                        ABO TURI BO
                                    </h1>
                                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#EDB62E] to-[#0C203B] rounded-full"></div>
                                </div>
                                
                                {/* Enhanced description with better typography */}
                                <div className="space-y-4">
                                    <p className='text-gray-700 text-base leading-relaxed font-medium bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'>
                                        <span className="text-[#EDB62E] font-bold">Komparas</span> ni urubuga rworoshye gukoresha rwagenewe guhuza abacuruzi ba telefoni n'abakiriya mu buryo bwihuse kandi bwizewe.
                                    </p>
                                    <p className='text-gray-600 text-sm leading-relaxed bg-gradient-to-r from-white/70 to-blue-50/70 backdrop-blur-sm p-5 rounded-xl border border-white/30'>
                                        Gukorana na Komparas nk'umucuruzi byagufasha guhura n'abaguzi benshi kandi bafite gahunda, bityo ibicuruzwa byawe ntibitinde mu bubiko, kandi imyungu ikiyongera.
                                    </p>
                                </div>

                                {/* Call-to-action buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="px-8 py-4 bg-gradient-to-r from-[#EDB62E] to-[#f4c842] text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105">
                                        Tangira ubu
                                    </button>
                                    <button className="px-8 py-4 bg-transparent border-2 border-[#0C203B] text-[#0C203B] font-semibold rounded-full hover:bg-[#0C203B] hover:text-white transition-all duration-300 backdrop-blur-sm">
                                        Menya byinshi
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className='md:w-[50%] w-full flex flex-col relative mt-8 md:mt-0'>
                            {/* Image container with enhanced styling */}
                            <div className="relative group">
                                {/* Decorative frame */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#EDB62E] to-[#0C203B] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#0C203B] to-[#EDB62E] rounded-2xl opacity-10"></div>
                                
                                {/* Main image */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img 
                                        src={girls} 
                                        className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700' 
                                        alt="About us"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C203B]/20 via-transparent to-[#EDB62E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                {/* Floating stats */}
                                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#0C203B]">500+</div>
                                        <div className="text-xs text-gray-600">Abakiriya</div>
                                    </div>
                                </div>
                                
                                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-[#EDB62E] to-[#f4c842] p-4 rounded-2xl shadow-xl text-white">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">10+</div>
                                        <div className="text-xs">Amaduka</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* New Section - Getting Online Process */}
                <div className='w-full bg-gray-50 py-20 px-4 md:px-8 lg:px-16 mt-16'>
                    <div className='max-w-6xl mx-auto'>
                        <h2 className='text-3xl md:text-4xl font-bold text-[#0C203B] text-center mb-16'>
                            IBIBAZO TUJE GUKEMURA
                        </h2>
                        
                        <div className='grid md:grid-cols-2 gap-12 items-center'>
                            {/* Left side - Steps */}
                            <div className='space-y-8'>
                                {/* Step 1 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>01</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Kuba utazwi bihagije
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Ibigo byinshi by'ubucuruzi birwana no kumenyekana ku isoko ryuzuye. 
                                            Igisubizo cyacu tuzagufasha kumenywa n'abantu benshi batandukanye 
                                            basura urubuga rwacu.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>02</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Kudakoresha interineti
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Kuba umuntu adafite urubuga rwa interineti bishobora gutuma ubucuruzi 
                                            budatera imbere. dutanga uburyo bwihariye bwo kwamamaza hifashishijwe 
                                            ikoranabuhanga, bukubiyemo kunoza SEO, kwamamaza, n'ibindi.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>03</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Kutagira abakiriya bahoraho
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Ibigo byinshi by'ubucuruzi bigira ikibazo cyo kutagira abakiriya bahoraho. 
                                            Umuti wacu ukubiyemo gusobanurira neza cyane abantu ibyiza byo gukoresha 
                                            interineti ko biborohereza kubona ibyo bashaka kandi vuba.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Image placeholder */}
                            <div className='flex justify-center'>
                                <div className='w-full max-w-md h-80 bg-gradient-to-br from-[#EDB62E] to-[#0C203B] rounded-lg flex items-center justify-center shadow-lg'>
                                    <div className='text-center text-white'>
                                        <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                                                <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                            </svg>
                                        </div>
                                        <h4 className='font-semibold text-lg'>Ibisubizo byacu</h4>
                                        <p className='text-sm opacity-90 mt-2'>Dufasha ibigo bigera ku ntego zabo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                
               

                {/* New Section - UBURYO DUKORAMO */}
                <div className='w-full bg-white py-20 px-4 md:px-8 lg:px-16 mt-16'>
                    <div className='max-w-6xl mx-auto'>
                        <h2 className='text-3xl md:text-4xl font-bold text-[#0C203B] text-center mb-16'>
                            UBURYO DUKORAMO
                        </h2>
                        
                        <div className='grid md:grid-cols-2 gap-12 items-center'>
                            {/* Left side - Interactive Process Visualization */}
                            <div className='relative h-full flex items-center justify-center'>
                                {/* Main circular process flow */}
                                <div className='relative w-80 h-80'>
                                    {/* Central hub */}
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#EDB62E] to-[#f4c842] rounded-full flex items-center justify-center shadow-2xl z-10'>
                                        <svg className='w-12 h-12 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z'></path>
                                        </svg>
                                    </div>

                                    {/* Orbiting elements */}
                                    {/* Phone Upload - Top */}
                                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#EDB62E]/30'>
                                        <svg className='w-8 h-8 text-[#0C203B]' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'></path>
                                        </svg>
                                    </div>

                                    {/* Specifications - Right */}
                                    <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#EDB62E]/30'>
                                        <svg className='w-8 h-8 text-[#0C203B]' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                                            <path fillRule='evenodd' d='M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v6a4 4 0 01-4 4H6a4 4 0 01-4-4V5z' clipRule='evenodd'></path>
                                        </svg>
                                    </div>

                                    {/* Store Connection - Bottom */}
                                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#EDB62E]/30'>
                                        <svg className='w-8 h-8 text-[#0C203B]' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd'></path>
                                        </svg>
                                    </div>

                                    {/* Connecting lines */}
                                    <svg className='absolute inset-0 w-full h-full -z-10' viewBox='0 0 320 320'>
                                        <defs>
                                            <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='100%'>
                                                <stop offset='0%' stopColor='#EDB62E' stopOpacity='0.3'/>
                                                <stop offset='100%' stopColor='#0C203B' stopOpacity='0.1'/>
                                            </linearGradient>
                                        </defs>
                                        <circle cx='160' cy='160' r='120' fill='none' stroke='url(#gradient1)' strokeWidth='2' strokeDasharray='10,5'/>
                                    </svg>

                                    {/* Floating particles */}
                                    <div className='absolute top-10 right-10 w-3 h-3 bg-[#EDB62E] rounded-full animate-ping'></div>
                                    <div className='absolute bottom-20 left-10 w-2 h-2 bg-[#0C203B] rounded-full animate-pulse delay-500'></div>
                                    <div className='absolute top-20 left-20 w-4 h-4 bg-[#EDB62E]/30 rounded-full animate-bounce delay-1000'></div>
                                </div>

                                {/* Background glow effect */}
                                <div className='absolute inset-0 bg-gradient-to-br from-[#EDB62E]/5 via-transparent to-[#0C203B]/5 rounded-3xl blur-3xl'></div>
                            </div>

                            {/* Right side - Steps */}
                            <div className='space-y-8'>
                                {/* Step 1 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>01</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Gushyira amafoto ya telefone ku rubuga
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Dushyira amafoto ya telefone zitandukanye ku rubuga 
                                            rwacu aho umuguzi aza akareba telefone ashaka 
                                            nuko imeze.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>02</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Ibirango bya telefone
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Urubuga rwacu kandi dushyiraho ibirango bya 
                                            telefone, ububiko, uburyo ingana, nuko ikora kugira 
                                            ngo bizafashe umukira guhitamo imunogeye.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className='flex items-start space-x-4'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-[#EDB62E] rounded-full flex items-center justify-center'>
                                        <span className='text-white font-bold text-lg'>03</span>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-[#0C203B] mb-3'>
                                            Iduka wasangamo iyo telefone
                                        </h3>
                                        <p className='text-gray-700 text-sm leading-relaxed'>
                                            Umucuri wemeye gukorana natwe dushyira telefone 
                                            ze kurubuga rwacu ndetse n'iduka rye kuburyo 
                                            umuguzi abona iduka na nyiraryo ubundi 
                                            bakivuganira.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
               

                {/* <div className='grid py-20 md:grid-cols-3 grid-cols-1 gap-1'>
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
                </div> */}
            </div><Footer />
        </div>
    )
}

export default AboutPage