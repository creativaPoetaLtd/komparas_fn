const TopPhone = ({ productData, vendorID }: any) => {
  const product = productData?.product;
  const vendorPrice = product?.vendor_prices?.find(
    (vendor: any) => vendor.vendor_id === vendorID
  );
  
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-shadow duration-300 mb-10">
      {/* Product Image */}
      <div className="h-[12rem] md:w-[14rem] p-3 border-2 border-yellow-400 rounded-lg bg-gray-50 flex items-center justify-center">
        <img
          src={product?.product_image || "/placeholder.jpg"}
          alt={product?.product_name || "Phone"}
          className="h-full w-full object-contain rounded-md"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col md:ml-6 h-full w-full mt-4 md:mt-0">
        {/* Product Name & Price */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {product?.product_name || "Unknown Product"}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
            <p className="text-sm text-gray-600">Igiciro:</p>
            <span className="text-xl text-yellow-500 font-bold">
              RWF {vendorPrice?.price?.toLocaleString() || "N/A"}
            </span>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {product?.product_description || "No description available"}
          </p>
        </div>
        
        {/* Available Colors */}
        <div className="mt-auto pt-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-700 font-medium mr-3">Amabara Ahari:</p>
            {vendorPrice?.colors?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {vendorPrice.colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-full border-2 border-gray-200 shadow-md transform hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: color || "#0a0a0a" }}
                  ></div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Amabara Ntayo</p>
            )}
          </div>
        </div>
        
        {/* Additional Info - Added to balance the layout */}
        <div className="flex flex-wrap items-center mt-4 text-xs text-gray-500">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Irabona mu iduka</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Kwishyurwa byoroshye</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPhone;