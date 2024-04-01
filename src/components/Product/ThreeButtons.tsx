import React, { useState } from 'react';

interface IProduct {
    products: any
}

const ThreeButtons: React.FC<IProduct> = ({ products }) => {
    const [activeButton, setActiveButton] = useState('ourReview');

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    return (
        <div className="lg:w-[60%] md:w-[50%] flex flex-col">
            <div className="flex flex-col space-y-5 xl:w-[637px] lg:w-[537px] md:w-[337px] m-auto justify-center">
                <div className="threeButtons flex flex-row">
                    <button
                        className={`w-[30%] text-white p-2 rounded-l-md ${activeButton === 'ourReview' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('ourReview')}
                    >
                        Our Review
                    </button>
                    <button
                        className={`w-[30%] text-white p-2 ${activeButton === 'specification' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('specification')}
                    >
                        Specification
                    </button>
                    <button
                        className={`w-[30%] text-white p-2 rounded-r-md ${activeButton === 'otherReview' ? 'bg-[#EDB62E]' : 'bg-[#0C203B]'}`}
                        onClick={() => handleButtonClick('otherReview')}
                    >
                        Other Review
                    </button>
                </div>
                {activeButton === 'ourReview' && (
                    <p className="OurReview text-[#0C203B] text-sm">
                        {products?.product?.our_review}
                    </p>
                )}
                {activeButton === 'specification' && (
                    <table className="specificationTable">
                        <thead>
                            <tr>
                                <th className="text-[#353535] border-b item-start m-auto p-2 text-start">Specification</th>
                                <th className="text-[#353535] border-b item-start m-auto p-2 text-start">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.product?.product_specifications?.map((spec: any, index: any) => (
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
