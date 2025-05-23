import { Link } from 'react-router-dom'

const OtherShops = ({products, productID}:any) => {
  return (
    <div className="flex flex-col text-sm shopTable">
            <table className="w-full">
              <thead>
                <p className="text-green-500 px-2 item-start m-auto text-start">Ahandi wayisanga</p>
              </thead>
              <tbody>
                {products?.product?.vendors?.map((shop: any, index: number) => (
                  <tr key={index + 12}>
                    <td className="text-[#353535] item-start m-auto p-2">{shop?.name}</td>
                    {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                      price?.vendor_id === shop?._id && (
                        <td key={priceIndex} className="text-[#353535] item-start m-auto p-2">
                          {price?.price}
                        </td>
                      )
                    ))}
                    {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                      price?.vendor_id === shop?._id && (
                        <>
                          {price?.colors?.length > 0 ? (
                            <td key={priceIndex} className="text-[#353535] flex items-start m-auto p-2">
                              {price.colors.map((color: string, index: number) => (
                                <div
                                  key={index}
                                  style={{ backgroundColor: color }}
                                  className="rounded-full h-4 w-4 m-1"
                                ></div>
                              ))}
                            </td>
                          ) : (
                            <td key={priceIndex} className="text-[#353535] flex items-start m-auto p-2">
                              <span className="text-sm text-gray-500 ml-1">NA</span>
                            </td>
                          )}
                          {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                            price?.vendor_id === shop?._id && (
                              <td key={priceIndex} className="text-[#353535] item-start m-auto p-r2">
                                <Link to={`/product/${productID}/shop/${shop?._id}`} className="bg-black text-yellow-500 px-2 py-1 rounded-md">Yirebe</Link>
                              </td>
                            )
                          ))}

                        </>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  )
}

export default OtherShops