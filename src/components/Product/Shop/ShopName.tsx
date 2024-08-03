import { useState } from 'react';
import { FacebookLogo, TelegramLogo, WhatsappLogo } from '@phosphor-icons/react';
import { CiShare2, CiWarning } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import Stepper from './Stpeer';

const ShopName = ({ shopData }: any) => {
    const [showSharePanel, setShowSharePanel] = useState(false);
    const [showAdressPanel, setShowAdressPanel] = useState(false);
    const [showKomparasCodePanel, setShowKomparasCodePanel] = useState(false);
    const dataForShop:any = shopData;
    const toggleKomparasCodePanel = () => {
        setShowKomparasCodePanel(!showKomparasCodePanel);
    };
    const toggleSharePanel = () => {
        setShowSharePanel(!showSharePanel);
    };

    const closeSharePanel = () => {
        setShowSharePanel(false);
    };

    const toggleAdressPanel = () => {
        setShowAdressPanel(!showAdressPanel);
    }

    
    return (
        <>
            <div className="flex w-full space-x-12 md:px-4 px-1">
                <div className="flex flex-col text-sm">
                    <h1 className="shopname text-sm text-yellow-500">
                        {shopData?.name}
                    </h1>
                    <p className="shopOwner text-sm text-[#353535]">
                        {shopData?.owner}
                    </p>
                </div>
                <div className="logo bg-slate-400 flex justify-center items-center my-auto">
                    <img src={shopData?.image} alt="logo" className="w-fit h-10" />
                </div>
            </div>
            <div className="flex md:space-x-6 space-x-2 mt-12 md:px-8 px-1">
                <div className="flex flex-col">
                    <a href={`tel:${shopData?.phone}`} className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <p  className="flex justify-center m-auto">
                            <IoCallOutline className="text-white text-2xl" />
                        </p>
                    </a>
                    <p className="md:text-sm text-xs  text-[#353535]">Duhamagare</p>
                </div>
                <div className="flex flex-col">
                    <button onClick={toggleAdressPanel} className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <p className="flex justify-center m-auto">
                            <MdOutlineEmail className="text-white text-2xl" />
                        </p>
                    </button>
                    <p className="md:text-sm text-xs  text-[#353535]">Tugereho</p>
                </div>
                <div className="flex flex-col">
                    <button onClick={toggleKomparasCodePanel} className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <p className="flex justify-center items-center m-auto">
                            <img src="/dd.png" alt="whatsapp" className="w-full h-full rounded-full self-center m-auto" />
                        </p>
                    </button>
                    <p className="md:text-sm text-xs  text-[#353535]">Komparas Code</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center cursor-pointer" onClick={toggleSharePanel}>
                        <CiShare2 className="text-white text-2xl" />
                    </div>
                    <p className="md:text-sm text-xs text-[#353535]">Sangiza abandi</p>
                </div>
            </div>
            {showSharePanel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="md:text-lg font-semibold">Sangiza Abandi kuri:</h2>
                            <button className="text-gray-600 hover:text-gray-900" onClick={closeSharePanel}>&times;</button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <a href={`https://wa.me/?text=${window.location.href}`} className="flex items-center space-x-1 bg-green-600 p-2 rounded">
                                <WhatsappLogo className="text-white text-xl flex my-auto justify-center" />
                                <span className="text-white flex my-auto justify-center mt-[1.9px]">WhatsApp</span>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} className="flex items-center space-x-1 bg-blue-600 p-2 rounded">
                                <FacebookLogo className="text-white text-2xl flex my-auto justify-center" />
                                <span className="text-white flex my-auto justify-center mt-[1.9px]">Facebook</span>
                            </a>
                            <a href={`https://telegram.me/share/url?url=${window.location.href}`} className="flex items-center space-x-1 bg-blue-500 p-2 rounded">
                                <TelegramLogo className="text-white text-xl flex my-auto justify-center" />
                                <span className="text-white flex my-auto justify-center mt-[1.9px]">Telegram</span>
                            </a>
                            <a href={`mailto:?subject=Check this out&body=${window.location.href}`} className="flex items-center space-x-1 bg-gray-600 p-2 rounded">
                                <MdEmail className="text-white text-xl flex my-auto justify-center" />
                                <span className="text-white flex my-auto justify-center mt-[1.9px]">Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {showAdressPanel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="md:text-lg font-semibold">Tugereho:</h2>
                            <button className="text-gray-600 hover:text-gray-900" onClick={toggleAdressPanel}>&times;</button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-[#353535] text-sm">
                                <b>Duherereye</b> : {shopData?.location}, {' '} {shopData?.description}
                            </p>
                            <p className="text-[#353535] text-sm">
                                <b>Email Wadusangaho ni</b> : {shopData?.email}
                            </p>
                            <p className="text-[#353535] text-sm">
                                <b>Wadusang no kuri nimero ya telephone</b> : {shopData?.phone}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {showKomparasCodePanel && (
                <Stepper shopData={dataForShop} />
                // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                //     <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                //         <div className="flex justify-between items-center mb-4">
                //             <h2 className="md:text-lg font-semibold">Komparas Code:</h2>
                //             <button className="text-gray-600 hover:text-gray-900" onClick={toggleKomparasCodePanel}>&times;</button>
                //         </div>
                //         <div className="flex flex-col space-y-2">
                //             <p className="text-[#353535] text-sm">
                //                 <b>Code ya Komparas</b> : {codeOfShop}
                //             </p>
                //         </div>
                //     </div>
                // </div>
            )}
            <div className="flex flex-col mt-4 md:px-8 px-1">
                <div className="flex w-full space-x-4 my-auto justify-center h-fit">
                    <CiWarning className="text-[#353535] md:text-4xl text-6xl flex my-auto justify-center" />
                    <p className="text-sm text-[#353535]">
                        Kigirango uhabwe iyi telefoni, kuri icyi giciro ningombwa ko uhabwa kode uzahabwa n'umucuruzi, Kanda aho handithe Komparas code ubone iyo Code
                    </p>
                </div>
                <div className="flex w-full space-x-4 my-auto mt-2 justify-center h-fit">
                    <CiWarning className="text-[#353535] md:text-2xl text-4xl flex my-auto justify-center" />
                    <p className="text-sm text-[#353535] justify-center my-auto flex">Ningombwa ko ubanza guhamagara uwo mucuruzi kugirango umenye niba iyo telephone igihari</p>
                </div>
            </div>
        </>
    );
};

export default ShopName;
