
const RelatedProfducts = () => {
  return (
    <div className="flex w-full flex-col text-sm relatedProd">
    <h1 className="text-sm text-yellow-500">Izindi Terefone dufite - Isaro shop</h1>
    <div className="grid gap-8 grid-cols-2 w-full">
        {[1,2].map((_, index: number) => (
        <div key={index} className="Card bg-[] flex md:w-[13rem] flex-col">
            <div className="h-[10rem] mx-auto justify-center flex md:w-full">
                <img src={'/image41.png'} height={300} width={300} className="h-full object-contain w-full" />
            </div>
            <h1 className="flex font-semibold mt-8">No name</h1>
            <p className="text-xs text-[#909090] mt-2 text-justify">{
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus in odio. Sed sit amet purus in odio.'
            }</p>
            {/* <p className="text-xs text-[#909090] mt-2 text-justify">{
product?.product_description?.slice(0, 180) + (product?.product_description?.length > 100 ? '...' : '')
}</p> */}
            <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
        </div>
        ))}
    </div>
</div>
  )
}

export default RelatedProfducts