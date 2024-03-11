interface Product {
    products: any
    }

const MainProductPage: React.FC<Product> = ({ products }) => {
  return (
    <div className='w-full flex flex-col h-fit'>
                    <div className="w-full h-fit flex lg:flex-row  flex-col ">
                        <div className="flex md:flex-row flex-col-reverse lg:w-[65%] w-full m-auto justify-center items-center h-full">
                            <div className="flex md:[w-20%] w-full md:flex-col justify-between flex-row">
                                {products?.product?.product_images?.map((image: any, index: any) => (

                                    <div key={index} className="md:w-[170px] w-[77px] m-auto items-center flex justify-center md:h-[138px] h-[79px]">
                                        <img src={image.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="md:w-[80%] w-full h-full">
                                <div className="md:w-[500px] w-[350px] md:h-[600px] h-[285px] flex m-auto justify-center items-center">
                                    <img src={products?.product?.product_image} alt="" className="md:w-[446px] w-[296px] md:h-[315px] h-[228px] object-contain" />
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col space-y-4 m-auto items-center justify-center lg:w-[40%] w-full ">
                            <div className="md:w-[415px] w-full p-2 flex flex-col space-y-3">
                                <h1 className="text-xl font-semibold">{products?.product?.product_name}</h1>
                                <h1 className="text-base font-light">Rwf 100,000</h1>
                                <p className="text-sm">{products?.product?.product_description}</p>
                            </div>
                            <div className="line md:w-[412px] w-full h-[1px] md:hidden flex lg:flex bg-[#EDB62E]"></div>
                            <div className="flex flex-col shopTable">
                                <table className="md:w-[415px] w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Shop logo</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Price</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Working hours</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.product?.vendors?.map((shop: any, index: any) => (

                                            <tr key={index}>
                                                <td className="text-[#353535] item-start m-auto p-2">{shop?.name}</td>
                                                {products?.product?.vendor_prices?.map((price: any, index: any) => (
                                                    price?.vendor_id === shop?._id && (
                                                        <td key={index} className="text-[#353535] item-start m-auto p-2">
                                                            {price?.price}
                                                        </td>
                                                    )
                                                ))}
                                                <td className="text-[#353535] item-start m-auto p-2">{shop?.working_hours}</td>
                                                <td className="text-[#353535] item-start m-auto p-2 text-start">
                                                    <button className="w-fit p-2 text-white bg-[#353535] rounded-md font-light text-sm">Shop Here</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default MainProductPage