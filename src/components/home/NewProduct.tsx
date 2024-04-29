import { ArrowRight } from '@phosphor-icons/react';
// import image6 from '../../assets/image6.png'
// import image7 from '../../assets/img7.png'
import { useEffect } from 'react';
import { getAllProducts } from '../../api/product';
import React from 'react';
const NewProduct = () => {
    const [products, setProducts] = React.useState<any[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts();
            setProducts(response?.data?.products);
        }
        fetchProducts();
    }
    ,[]);

    const prod1 = products[(products?.length) - 1];
    const prod2 = products[(products?.length) - 2]
    console.log(prod2?.product_description);

    return (
        <div className='flex flex-col w-full lg:px-[4rem] px-2'>
            <div className='flex flex-col px-2 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                    </div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Telefoni nshya twabazaniye</h1>
                </div>
                {/* <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Telefoni nshya</h1> */}
            </div>
            <div className='flex lg:flex-row md:flex-col flex-col w-full justify-between md:h-[336px] h-fit'>
                <div className='bunner lg:w-[50%] w-full h-full  py-4 lg:pl-1 pl-2'>
                    <div className='mainPage flex  md:flex-row flex-col bg-[#F2F4F5] h-full relative'>
                        <div className='mainPageContent md:w-[45%] w-full md:h-full h-fit p-2'>

                            <div className='flex mt-1 bg-black p-1 w-fit h-fit'>
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>INTRODUCING</p>
                            </div>
                            <p className='text-3xl mt-2 fon text-black'>
                                {prod1?.product_name}
                            </p>
                            {prod1?.product_description && (
                                <p className='text-sm mt-4 text-white'>
                                    {prod1.product_description.length > 50 ? `${prod1.product_description.substring(0, 50)}...` : prod1.product_description}
                                </p>
                            )}


                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">Reba</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image md:w-[55%] w-fnull flex justify-end  h-full px-8 md:py-12 py-6 pb-9">
                            <div className="w-[240px] md:h-[240px] h-[210px] object-cover">
                                <img src={prod1?.product_image} height={240} width={240} alt="" className="w-[240px] h-[240px]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bunner lg:w-[50%] w-full h-full  py-4 lg:pl-4 pl-2 z-10'>
                    <div className='mainPage flex md:flex-row flex-col bg-[#0C203B] h-full'>
                        <div className='mainPageContent md:w-[60%] w-full h-full p-6'>
                            <div className='flex mt-1 bg-[#EDB62E] p-1 w-fit h-fit'>
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>INTRODUCING</p>
                            </div>
                            <p className='text-2xl mt-2 fon text-white'>
                                {prod2?.product_name}
                            </p>
                            {prod2?.product_description && (
                                <p className='text-sm mt-4 text-white'>
                                    {prod2.product_description.length > 50 ? `${prod2.product_description.substring(0, 50)}...` : prod2.product_description}
                                </p>
                            )}

                            <button className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">Reba</p>
                                <ArrowRight className="m-auto justify-center" />
                            </button>
                        </div>
                        <div className="image md:w-[40%] w-full flex justify-end  h-full md:pr-8 pr-2 md:py-12 py-2 pb-9 relative">
                            <div className='timerCircle text-xs absolute z-0 bg-[#EDB62E] md:top-0 -top-10 md:right-0 right-2 flex-col p-2 items-center border-1 border-white flex rounded-full h-[80px] w-[80px] my-auto justify-center'>
                                <div className='label text-white text-lg font-semibold'>$590</div>
                            </div>
                            <div className="md:w-[240px] w-full md:h-[240px] h-[210px]] object-cover">
                                <img src={
                                    prod2?.product_image
                                } height={240} width={240} alt="" className="md:w-[240px] w-full h-[240px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;
