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
                          {price?.colors.length >= 1 && (
                            <td key={priceIndex} className="text-[#353535] flex item-start m-auto p-2">
                              {JSON.parse(JSON.stringify(price?.colors).replace(/[\"\#]+/g, '').replace(/(\w+)/g, '"$1"')).map((color: any, colorIndex: number) => (
                                <div key={colorIndex} style={{
                                  backgroundColor: `${color ? color : '#0a0a0a'}`,
                                }} className={`bg-[#${color ? color : '#0a0a0a'}] rounded-full h-4 flex w-4 m-1`}></div>
                              ))}
                            </td>
                          )}
                          {price?.colors?.length <= 0 && (
                            <td key={priceIndex} className="text-[#353535] flex item-start m-auto p-2">
                              {[...Array(4).keys()].map((_, index) => (
                                <div key={index} style={{
                                  backgroundColor: `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0').slice(0, 6).toUpperCase()
                                    }`
                                }} className={`bg-[#0a0a0a] rounded-full h-4 flex w-4 m-1`}></div>
                              ))}
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