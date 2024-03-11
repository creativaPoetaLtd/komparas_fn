interface IProduct {
    products: any
}

const ThreeButtons: React.FC<IProduct> = ({ products }) => {
  return (
    <div className="lg:w-[60%] md:w-[50%] flex flex-col">
    <div className="flex flex-col space-y-5 xl:w-[637px] lg:w-[537px] md:w-[337px] m-auto justify-center">
        <div className="threeButtons flex flex-row justify-between">
            <button className="w-[30%] bg-[#EDB62E] text-white p-2 rounded-md">Our Review</button>
            <button className="w-[30%] bg-[#0C203B] text-white p-2 rounded-md">Specification</button>
            <button className="w-[30%] bg-[#0C203B] text-white p-2 rounded-md">Other Review</button>
        </div>
        <p className="text-[#0C203B] text-sm">
            {products?.product?.our_review}
        </p>
    </div>
</div>
  )
}

export default ThreeButtons