import React, { useState } from 'react';

interface Product {
    products: any
}

const MainProductPage: React.FC<Product> = ({ products }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    console.log("dddddddddddddddddddd", products);

    return (
        <div className='w-full  pl-0 flex flex-col h-fit'>

            <div className="w-full h-fit flex lg:flex-row  flex-col ">
                <div className="flex md:flex-row  flex-col-reverse lg:w-[50%] w-full m-auto justify-center items-center h-full">
                    <div className="flex md:[w-20%] md:h-[450px] space-y-4 py-4 md:overflow-y-auto  w-full md:flex-col justify-between flex-row">
                        {products?.product?.product_images?.map((image: any, index: number) => (
                            <div key={index} className="otherImages md:w-[170px] w-[77px] m-auto items-start flex justify-start md:h-[138px] h-[79px]" onClick={() => handleImageClick(index)}>
                                <img src={image.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" />
                            </div>
                        ))}
                    </div>
                    <div className="md:w-[80%] w-full h-full">
                        <div className='w-full mt-12'>
                            <h1 className="text-xl w-[20rem] mt-12 lg:pl-32 md:pl-16 pl-2 font-semibold">{products?.product?.product_name}</h1>
                        </div>
                        <div className="MainIMageDiv md:w-[500px] w-[350px] md:h-[600px] h-[285px] flex m-auto justify-center items-center">
                            <img src={products?.product?.product_images[selectedImageIndex]?.product_image} alt="" className="md:w-[446px] w-[296px] md:h-[315px] h-[228px] object-contain" />
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col space-y-4 mx-auto items-start justify-start py-20 lg:w-[40%] w-full ">
                    <div className="md:w-[415px] w-full p-2 flex flex-col space-y-3">
                        <div className='flex space-x-3'>
                        <h1 className="text-base text-red-500 font-light line-through">
                            {products?.product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price
                                .toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                        </h1>
                        <h1 className='realprice font-semibold'>
                        {products?.product?.our_price.toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                        </h1>
                        </div>
                        <p className="text-sm">{products?.product?.product_description}</p>
                    </div>
                    <div className="line md:w-[412px] w-full h-[1px] md:hidden flex lg:flex bg-[#EDB62E]"></div>
                    <div className="flex flex-col text-sm shopTable">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-[#353535] item-start m-auto p-2 text-start">Iduka</th>
                                    <th className="text-[#353535] item-start m-auto p-2 text-start">Igociro</th>
                                    <th className="text-[#353535] item-start m-auto p-2 md:flex hidden text-start">Amasaha y'akazi</th>
                                    <th className="text-[#353535] item-start m-auto p-2 md:hidden flex text-start">Amasaha..</th>
                                    <th className="text-[#353535] item-start m-auto p-2 text-start">
                                        Gura
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.product?.vendors?.map((shop: any, index: number) => (
                                    <tr key={index}>
                                        <td className="text-[#353535] item-start m-auto p-2">{shop?.name}</td>
                                        {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                                            price?.vendor_id === shop?._id && (
                                                <td key={priceIndex} className="text-[#353535] item-start m-auto p-2">
                                                    {price?.price}
                                                </td>
                                            )
                                        ))}
                                        <td className="text-[#353535] item-start m-auto p-2">{shop?.working_hours}</td>
                                        <td className="text-[#353535] item-start m-auto p-2 text-start">
                                            <button className="w-fit p-1 text-white bg-[#353535] rounded-md font-light text-sm">Gurira hano</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProductPage;
