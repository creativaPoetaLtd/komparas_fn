import relatedShops from "../dumyData/comparisonTable"
const ShopsProductTable = () => {
  return (
    <div className='w-full flex flex-col h-fit'>
        <table className="rounded shadow w-full">
          <thead>
            <tr className="gap-1 px-2 py-6 text-black-1000 font-[400] bg-blue-200">
              <th className="p-2 py-3 font-[400] text-left">Shop Logo</th>
              <th className="p-2 py-3 font-[400] text-left">Price</th>
              <th className="p-2 py-3 font-[400] text-left">Address</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {relatedShops.map((shop, index) => (
            <tr
              className="border-b shadow border-grey-800 hover:bg-green-100 hover:cursor-pointer"
              key={index}
            >
              <td className="md:py-4 xs:py-2 whitespace-nowrap capitalize text-sm font-normal px-2 text-gray-800">
                <img src={shop.shopLogo} alt="product" className="w-24 h-12 rounded-sm object-cover" />
              </td>
              <td className="md:py-4 xs:py-2 whitespace-nowrap capitalize text-sm font-normal px-2 text-gray-800">
                <p className="text-sm font-normal text-gray-800">
                  {shop.price}$
                </p>
              </td>
              <td className="md:py-4 xs:py-2 whitespace-nowrap capitalize text-sm font-normal px-2 text-gray-800">
                <p className="text-sm font-normal text-gray-800">
                  Location: {shop.address.location}
                </p>
                <p className="text-sm font-normal text-gray-800">
                  phone: {shop.address.phone}
                </p>
                <p className="text-sm font-normal text-gray-800">
                  email: {shop.address.email}
                </p>
              </td>
             
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>
  )
}

export default ShopsProductTable