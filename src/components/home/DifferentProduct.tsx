import React, { useState, useEffect } from 'react';

interface DifferentProductProps {
  productData: any;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const DifferentProduct: React.FC<DifferentProductProps> = ({ productData }) => {
  const [shuffledProductData, setShuffledProductData] = useState<any[]>([]);

  useEffect(() => {
    if (productData) {
      setShuffledProductData(shuffleArray([...productData]));
    }
  }, [productData]);

  return (
    <div className='flex flex-col w-full lg:px-[2rem] px-1 mt-6 py-12'>
      <div className='flex flex-col px-8 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]"></div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Telefoni zigezweho</h1>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {shuffledProductData.map((product: any, index: number) => (
          <div key={index} className="Card bg-[] flex flex-col p-3 md:px-5 px-2">
            <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
              <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
            </div>
            <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
            <p className="text-xs text-[#909090] mt-2 text-justify">{product?.product_description}</p>
            <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifferentProduct;
