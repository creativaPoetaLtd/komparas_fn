import React, { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
// import { useLocation } from 'react-router-dom';

interface IProduct {
    products: any
}

const ThreeButtons: React.FC<IProduct> = ({ products }) => {
    const [activeButton, setActiveButton] = useState('ourReview1');
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    // const location = useLocation();
    // useEffect(() => {
    //     localStorage.clear();
    // }, [location.pathname]);
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
    const hasDescription = (key: any) => {
        // Normalize the key for case-insensitive comparison
        const normalizedKey = key.trim().toUpperCase();
        
        return terms.some(item => 
        normalizedKey === item.term.trim().toUpperCase() || 
        normalizedKey.includes(item.term.trim().toUpperCase()) ||
        item.term.trim().toUpperCase().includes(normalizedKey)
        );
    };
  
    // Function to get the description for a term
    const getDescription = (key: any) => {
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
                    {/* <button
                        className={`w-[39%] text-white p-2 rounded-r-md ${activeButton === 'otherReview' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('otherReview')}
                    >
                        Icyo bayivugaho
                    </button> */}
                </div>
                {activeButton === 'ourReview1' && (
                    <>
                        {products?.product?.our_review?.map((review: any, index: number) => (
                            <>
                                {review.key !== 'Umwanzuro' && (

                                    <div key={index + 1} className='ourReview rounded-md border border-green-500 flex flex-col'>
                                        <div className="text-sm font-semibold text-start rounded-md bg-yellow-100 p-2 flex" onClick={() => handleValueClick(index)}>
                                            <p className='KeyDiv text-sm'>{review?.key}</p>
                                            {showValueMap[index] ? <Minus className='ml-auto' /> : <Plus className='ml-auto' />}
                                        </div>
                                        {showValueMap[index] && (
                                            <div className='ValusePargrapth text-sm text-justify p-3' dangerouslySetInnerHTML={{ __html: review?.value }}></div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                    </>
                )}
                {activeButton === 'ourReview' && (
                    <>
                        {products?.product?.our_review?.map((review: any, index: number) => (
                            <>

                                {review.key === 'Umwanzuro' && (
                                    <div key={index + 1} className='ourReview rounded-md border border-green-500 flex flex-col'>
                                        <div className='ValusePargrapth text-sm text-justify p-3' dangerouslySetInnerHTML={{ __html: review?.value }}></div>
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
                                        <span className="relative group ml-1">
                                            <span className="inline-flex items-center justify-center bg-gray-100 text-blue-600 rounded-full w-6 h-6 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                                            ?
                                            </span>
                                            <span className="absolute left-0 bottom-full mb-2 w-80 p-3 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                            {getDescription(spec?.key)}
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
        </div>
    );
};

export default ThreeButtons;
