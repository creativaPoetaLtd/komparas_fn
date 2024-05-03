import React, { useEffect, useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

interface IProduct {
    products: any
}

const ThreeButtons: React.FC<IProduct> = ({ products }) => {
    const [activeButton, setActiveButton] = useState('ourReview1');
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const location = useLocation();
    useEffect(() => {
        localStorage.clear();
    }, [location.pathname]);
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
   return (
        <div className="lg:w-[54%] md:w-[337px] flex flex-col">
            <div className="flex flex-col space-y-5 xl:w-[637px] lg:w-[537px] md:w-full w-full m-auto justify-center">
                <div className="threeButtons flex flex-row">
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
                    <button
                        className={`w-[39%] text-white p-2 rounded-r-md ${activeButton === 'otherReview' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('otherReview')}
                    >
                        Icyo bayivugaho
                    </button>
                </div>
                {activeButton === 'ourReview1' && (
                    <>
                        {products?.product?.our_review?.map((review: any, index: number) => (
                            <>
                            {review.key !== 'Umwanzuro' && (

                            <div key={index + 1} className='ourReview rounded-md border border-black flex flex-col'>
                                <div className="text-sm font-semibold text-start rounded-md bg-slate-200 p-2 flex" onClick={() => handleValueClick(index)}>
                                    <p className='KeyDiv text-sm'>{review?.key}</p>
                                </div>
                                
                                    <div className='ValusePargrapth text-sm text-justify p-3' dangerouslySetInnerHTML={{ __html: review?.value }}></div>
                                
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

                            
                            <div key={index + 1} className='ourReview rounded-md border border-black flex flex-col'>
                                <div className="text-sm font-semibold text-start rounded-md bg-slate-200 p-2 flex" onClick={() => handleValueClick(index)}>
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
                                    <td className="text-[#353535] border-b item-start m-auto p-2">{spec?.key}</td>
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
