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

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            {/* Shop Info Section */}
            <div className="p-5 flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full p-1 flex-shrink-0">
                    <img src={shopData?.image} alt="logo" className="h-14 w-14 object-cover rounded-full" />
                </div>
                <div className="flex-grow">
                    <h1 className="text-xl font-bold text-gray-800">{shopData?.name}</h1>
                    <p className="text-gray-600 text-sm">{shopData?.owner}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around bg-gray-50 p-4 border-t border-gray-100">
                {[
                    { onClick: () => window.location.href = `tel:${shopData?.phone}`, icon: <IoCallOutline size={18} />, text: "Call" },
                    { onClick: () => setShowAdressPanel(true), icon: <MdOutlineEmail size={18} />, text: "Address" },
                    { onClick: () => setShowKomparasCodePanel(true), icon: <img src="/dd.png" alt="komparas" className="h-5 w-5" />, text: "Komparas" },
                    { onClick: () => setShowSharePanel(true), icon: <CiShare2 size={18} />, text: "Share" },
                ].map(({ onClick, icon, text }, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <button onClick={onClick} className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-sm hover:bg-yellow-600 transition">
                            <span className="text-white">{icon}</span>
                        </button>
                        <p className="text-xs text-gray-700 mt-1">{text}</p>
                    </div>
                ))}
            </div>

            {/* Warnings */}
            <div className="p-4 bg-yellow-50 border-t border-yellow-100">
                <div className="flex items-start space-x-3">
                    <CiWarning className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-sm">
                        Kugirango uhabwe iyi telefoni, kuri icyi giciro ningombwa ko uhabwa kode uzahabwa n'umucuruzi, Kanda aho handithe Komparas code ubone iyo Code
                    </p>
                </div>
                <div className="flex items-start space-x-3">
                    <CiWarning className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-sm">
                    Ningombwa ko ubanza guhamagara uwo mucuruzi kugirango umenye niba iyo telephone igihari
                    </p>
                </div>
            </div>

            {/* Share Modal */}
            {showSharePanel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Share via:</h2>
                            <button onClick={() => setShowSharePanel(false)} className="text-gray-500 text-xl hover:text-gray-800">&times;</button>
                        </div>
                        <div className="flex flex-col space-y-3">
                            {[
                                { link: `https://wa.me/?text=${window.location.href}`, icon: <WhatsappLogo />, text: "WhatsApp", bg: "bg-green-600" },
                                { link: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, icon: <FacebookLogo />, text: "Facebook", bg: "bg-blue-600" },
                                { link: `https://telegram.me/share/url?url=${window.location.href}`, icon: <TelegramLogo />, text: "Telegram", bg: "bg-blue-500" },
                                { link: `mailto:?subject=Check this out&body=${window.location.href}`, icon: <MdEmail />, text: "Email", bg: "bg-gray-600" },
                            ].map(({ link, icon, text, bg }, index) => (
                                <a key={index} href={link} className={`flex items-center space-x-2 p-3 rounded-lg ${bg} hover:opacity-80 transition`}>
                                    <span className="text-white text-xl">{icon}</span>
                                    <span className="text-white text-md">{text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Address Modal */}
            {showAdressPanel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Tugereho:</h2>
                            <button onClick={() => setShowAdressPanel(false)} className="text-gray-500 text-xl hover:text-gray-800">&times;</button>
                        </div>
                        <p className="text-gray-700 mb-2"><b>Duherereye:</b> {shopData?.location}, {shopData?.description}</p>
                        <p className="text-gray-700 mb-2"><b>Email Wadusangaho ni:</b> {shopData?.email}</p>
                        <p className="text-gray-700"><b>Wadusang no kuri nimero ya telephone:</b> {shopData?.phone}</p>
                    </div>
                </div>
            )}

            {/* Komparas Code Modal */}
            {showKomparasCodePanel && <Stepper shopData={shopData} onClose={() => setShowKomparasCodePanel(false)} />}
        </div>
    );
};

export default ShopName;
