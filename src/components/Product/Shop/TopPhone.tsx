const TopPhone = ({ productData, vendorID }: any) => {
    return (
        <div className="phoneCard flex h-[10rem]">
            <div className="h-full w-[12rem] p-2 border border-yellow-500 rounded-md">
                <img src={
                    productData?.product?.product_image
                } alt="phone" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col h-full justify-between ml-4">
                <div className="flex flex-col">
                    <h1 className="text-lg">
                        {productData?.product?.product_name}
                    </h1>
                    <p className="text-sm">Igiciro: RWF
                        {productData?.product?.vendor_prices?.find((vendor: any) => vendor.vendor_id === vendorID)?.price}
                    </p>
                </div>
                <p className="text-sm">Amabara Ahari:</p>
                <div className="flex gap-1 mb-1">
                    {productData?.product?.vendor_prices?.map((price: any) => (
                        price?.vendor_id === vendorID && (
                            <>
                                {price?.colors.length >= 1 && (
                                    <>
                                        {JSON.parse(JSON.stringify(price?.colors).replace(/[\"\#]+/g, '').replace(/(\w+)/g, '"$1"')).map((color: any, colorIndex: number) => (
                                            <div key={colorIndex} style={{
                                                backgroundColor: `${color ? color : '#0a0a0a'}`,
                                            }} className={`h-[1.5rem] w-[1.5rem] bg-[#${color ? color : '#0a0a0a'}] border border-gray-600`}></div>
                                        ))}
                                    </>
                                )}
                                {price?.colors?.length <= 0 && (
                                    <p>Amabara Ntayo</p>
                                )}
                            </>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopPhone