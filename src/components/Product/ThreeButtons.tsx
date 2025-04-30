import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus, } from '@phosphor-icons/react';
import { IoInformationCircleOutline } from "react-icons/io5";
import { Pencil } from "lucide-react";
import { Editor } from "primereact/editor";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { updateProduct } from '../../api/product';
import { isAdminFromLocalStorage } from "../Footer";

interface IProduct {
    products: any
}

const ThreeButtons: React.FC<IProduct> = ({ products }) => {
    const [activeButton, setActiveButton] = useState('ourReview1');
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});
    const [openTooltip, setOpenTooltip] = useState<number | null>(null);
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const [dialogWidth, setDialogWidth] = useState("50vw");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeReview, setActiveReview] = useState<{ index: number; value: string } | null>(null);

    const openModal = (index: number, value: string) => {
        setActiveReview({ index, value });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveReview(null);
    };

    const handleSave = async () => {
        if (activeReview !== null) {
            try {
                const productId = products?.product?._id;
                const updatedReview = {
                    key: products.product.our_review[activeReview.index].key,
                    value: activeReview.value
                };

                await updateProduct({ our_review: [updatedReview] }, productId);

                products.product.our_review[activeReview.index].value = activeReview.value;

                closeModal();
            } catch (error) {
                console.error("Failed to update review:", error);
            }
        }
    };

    // Handle clicks outside the tooltip
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setOpenTooltip(null);
            }
        };

        // Add event listener when the tooltip is open
        if (openTooltip !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openTooltip]);

    // Adjust dialog width based on screen size
    useEffect(() => {
        const updateWidth = () => {
        if (window.innerWidth < 768) {
            setDialogWidth("90vw");
        } else {
            setDialogWidth("50vw");
        }
        };
    
        updateWidth();
        window.addEventListener("resize", updateWidth);
        
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const handleValueClick = (index: number) => {
        const updatedShowValueMap: { [key: number]: boolean } = {};
        updatedShowValueMap[index] = !showValueMap[index];
        Object.keys(showValueMap).forEach((key) => {
            if (parseInt(key) !== index) {
                updatedShowValueMap[parseInt(key)] = false;
            }
        });

        setShowValueMap(updatedShowValueMap);
    };

    const terms = [
        { term: 'RAM', description: 'Ubu ni ububiko bwa telefoni bubika igihe gito kandi bugakora mugihe hari ibintu turi gukora kuri telefoni. Ubu bubiko bukorana na proseseri bya hafi kugira ngo mugihe iyi pororoseseri irimo ikora ikintu runaka ikoreshe ububiko buri hafi(RAM) aho gufata igihe kinini ijya gukoresha bwa bubiko bubika igihe kinini(Storage). Ibi bituma proseseri ikorera ku muvuduko uri hejuru.' },
        { term: 'HARD DISK', description: 'ubu ni ububiko bubika ibintu igihe kirekire muri telefoni ' },
        { term: 'ROM', description: 'Read-Only Memory, typically used to store firmware and system software.' },
        { term: 'Camera', description: 'Captures photos and videos using different megapixel counts.' },
        { term: 'NFC(Near Field Communication )', description: 'aka ni akantu(chip) kaba muri telefoni gatuma telefoni ibasha kukorana n’indi telefoni byegeranye cyangwa indi ikindi gikoresho cy’amashanyarazi(Electronic device) kiri hafi aho.' },
        { term: 'Memory Card', description: 'Expandable storage for your phone.' },
        { term: '5G', description: 'Ni tekinoloji ituma telefoni ibasha gufasha telefoni kugira interineti ikorera ku muvuduko wo hejuru cyane.' },
        { term: 'Operating System(OS)', description: 'Iyi ni sisitemu ikora nk’umutima w’umuntu ariko kandi kuri telefoni nabow ni nk’umutima. Iyi sistemu niyo ikora ibintu byose bishobora gutuma telefoni itangira gukora ariko kandi ikanakurikirana neza niba andi ma pororgaramu abasha gukoranana neza hagati yayo.  Urugero rw’iyi sisitemu twavuga nka: Android, Apple, Window, Mac.' },
        { term: 'Proseseri', description: ' Iyi porogaramu yo ni nka moteri cyangwa ubwonko bwa telefoni, ifasha telefoni gutekereza, igakora ibyo uyikoresha ayisabye. Urugero nko gufungura porogaramu kandi nanone igakora ibyo uyisabye byose. ' },
        { term: 'Fingerprints', description: 'A biometric security feature that uses your fingerprint for authentication.' },
        { term: 'Face Recognition', description: 'A biometric method to unlock your phone using your face.' },
        { term: 'WI-FI:', description: 'umuyoboro ufasha telefoni kubasha kujya kuri interineti.' },
        { term: 'Aperture', description: 'Ni akantu kaba kuri kamera gatuma urumuri rubasha kwinjira mu ifoto. Uko aka kantu kaba kanini ninako urumuri rwinjira ari rwinshi bikaba byatuma ifoto iba nziza cyane.' },
    ];

    // Function to check if a term has a description
    const hasDescription = (key: string): boolean => {
        // Normalize the key for case-insensitive comparison
        const normalizedKey = key.trim().toUpperCase();
        
        return terms.some(item => 
        normalizedKey === item.term.trim().toUpperCase() || 
        normalizedKey.includes(item.term.trim().toUpperCase()) ||
        item.term.trim().toUpperCase().includes(normalizedKey)
        );
    };
  
    // Function to get the description for a term
    const getDescription = (key: string): string => {
        const normalizedKey = key.trim().toUpperCase();
        
        const term = terms.find(item => 
        normalizedKey === item.term.trim().toUpperCase() || 
        normalizedKey.includes(item.term.trim().toUpperCase()) ||
        item.term.trim().toUpperCase().includes(normalizedKey)
        );
        
        return term ? term.description : '';
    };

    return (
        <div className="lg:w-[54%] md:w-[337px] flex flex-col">
            <div className='flex flex-col md:px-4 px-3 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]"></div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">
                        Ibyo wamenya kuri telefoni
                    </h1>
                </div>
            </div>
            <div className="flex flex-col space-y-5 xl:w-[637px] lg:w-[537px] md:w-full w-full m-auto justify-center">
                <div className="threeButtons text-xs flex flex-row">
                    <button
                        className={`w-[39%] text-white p-2 rounded-l-md ${activeButton === 'ourReview1' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('ourReview1')}
                    >
                        Yimenye neza
                    </button>

                    <button
                        className={`w-[32%] text-white p-2 ${activeButton === 'specification' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('specification')}
                    >
                        Ibiranga telefoni
                    </button>
                    <button
                        className={`w-[39%] text-white p-2 ${activeButton === 'ourReview' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('ourReview')}
                    >
                        Icyo tuyivugaho
                    </button>
                </div>
                {activeButton === "ourReview1" && (
                    <>
                    {products?.product?.our_review?.map((review: any, index: number) => (
                        review.key !== "Umwanzuro" && (
                            <div 
                                key={index} 
                                className="ourReview rounded-md border border-[#4e7db9] flex flex-col cursor-pointer"
                                onClick={() => handleValueClick(index)}
                            >
                                <div className="text-sm font-semibold text-start rounded-md text-white bg-[#4e7db9] p-2 flex justify-between items-center">
                                    <p className="KeyDiv text-sm">{review?.key}</p>

                                    <div className="flex items-center gap-3">
                                        {showValueMap[index] ? <Minus /> : <Plus />}
                                        {isAdminFromLocalStorage() && (
                                        <button 
                                            className="text-white hover:text-black transition duration-200"
                                            onClick={(e) => { 
                                                e.stopPropagation();
                                                openModal(index, review?.value);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        )}
                                    </div>
                                </div>

                                {showValueMap[index] && (
                                    <div className="ValusePargrapth text-sm text-justify p-3" dangerouslySetInnerHTML={{ __html: review?.value }}></div>
                                )}
                            </div>
                        )
                    ))}
                    </>
                )}
                {activeButton === 'ourReview' && (
                    <>
                        {products?.product?.our_review?.map((review: any, index: number) => (
                        <>
                            {review.key === 'Umwanzuro' && (
                            <div 
                                key={index + 1} 
                                className="ourReview rounded-md border border-green-500 flex flex-col"
                            >
                                <div 
                                className="ValusePargrapth text-sm text-justify p-3" 
                                dangerouslySetInnerHTML={{ __html: review?.value }}
                                ></div>

                                {isAdminFromLocalStorage() && (
                                <button 
                                className="self-end bg-blue-500 text-white px-2 py-1  rounded text-xs mb-4 mr-2"
                                onClick={() => openModal(index, review?.value)}
                                >
                                Edit
                                </button>
                                )}
                            </div>
                            )}
                        </>
                        ))}
                    </>
                )}
                {activeButton === 'specification' && (
                    <table className="specificationTable">
                        <thead>
                            <tr>
                                <th className="text-[#353535] border-b item-start m-auto p-2 text-start">Ibiranga telefoni</th>
                                <th className="text-[#353535] border-b item-start m-auto p-2 text-start">Amakuru ajyanye na telefoni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.product?.product_specifications?.map((spec: any, index: number) => (
                                <tr key={index}>
                                    <td className="text-[#353535] border-b p-2 flex items-center">
                                        {spec?.key}
                                        {hasDescription(spec?.key) && (
                                            <span className="relative ml-1 flex items-center" ref={tooltipRef}>
                                                <span 
                                                    className="inline-flex items-center justify-center text-blue-600 text-sm font-medium cursor-pointer"
                                                    onClick={() => setOpenTooltip(openTooltip === index ? null : index)}
                                                >
                                                    <IoInformationCircleOutline />
                                                </span>
                                                <span 
                                                    className={`absolute left-0 bottom-full mb-2 sm:w-96 w-52 p-3 text-sm text-white bg-gray-800 rounded shadow-lg transition-all duration-200 z-10 ${
                                                        openTooltip === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span>{getDescription(spec?.key)}</span>
                                                        <span 
                                                            className="text-white cursor-pointer p-1"
                                                            onClick={() => setOpenTooltip(null)}
                                                        >
                                                            ✕
                                                        </span>
                                                    </div>
                                                    <a 
                                                        href="/sobanukirwa"
                                                        className="text-blue-400 underline mt-2 block"
                                                    >
                                                        reba byose
                                                    </a>
                                                    <span className="absolute left-0 top-full w-2 h-2 bg-gray-800 transform rotate-45 translate-x-2 -translate-y-1"></span>
                                                </span>
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-[#353535] border-b item-start m-auto p-2">{spec?.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {activeButton === 'otherReview' && (
                    <p className="OtherReview text-[#0C203B] text-sm">
                        COMMING SOON
                    </p>
                )}
            </div>
            <Dialog 
                header="Edit Review" 
                visible={isModalOpen} 
                onHide={closeModal} 
                style={{ width: dialogWidth, backgroundColor: "#fff" }} 
                className="p-5 bg-white shadow-lg rounded-md text-black"
            >
                <Editor
                    value={activeReview?.value || ""}
                    style={{ height: "200px", backgroundColor: "white", color: "black", padding: "10px" }}
                    onTextChange={(e) => setActiveReview((prev) => prev ? { ...prev, value: e.htmlValue || "" } : null)}
                />
                <div className="flex justify-end mt-4 space-x-3">
                    <Button 
                        label="Cancel" 
                        icon="pi pi-times" 
                        className="p-button-outlined px-4 border-gray-400 text-gray-700 hover:bg-gray-200 transition duration-200" 
                        onClick={closeModal} 
                    />
                    <Button 
                        label="Save" 
                        icon="pi pi-check" 
                        className="p-button-success text-white bg-green-600 px-5 py-2 rounded-md hover:bg-green-700 transition duration-200" 
                        onClick={handleSave} 
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default ThreeButtons;
