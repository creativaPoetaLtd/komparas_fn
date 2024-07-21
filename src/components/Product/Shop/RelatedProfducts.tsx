import { Link } from "react-router-dom";

const RelatedProfducts = ({shopProducts, vendorID}:any) => {
  return (
    <div className="flex w-full flex-col text-sm relatedProd">
    <h1 className="text-sm text-yellow-500">Izindi Terefone dufite - Isaro shop</h1>
    <div className="grid gap-8 grid-cols-2 w-full">
        {shopProducts?.data?.products?.map((product: any, index: number) => product?.vendor_prices?.map((vendor: any) => (
            vendor?.vendor_id === vendorID && (
                <div key={index} className="Card py-2 px-1 rounded-md bg-[#F7F7F7] flex md:w-[13rem] flex-col">
                    <div className="h-[10rem] mx-auto justify-center flex md:w-full">
                        <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
                    </div>
                    <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
                    <p className="text-xs text-[#909090] mt-2 text-justify">{
                        product?.product_description?.length > 100 ? product?.product_description?.slice(0, 100) + '...' : product?.product_description
                    }</p>
                    <Link className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md" to={
                        `/product/${product?._id}`
                    }>Read more</Link>
                </div>
            )
        )))}
    </div>
</div>
  )
}

export default RelatedProfducts