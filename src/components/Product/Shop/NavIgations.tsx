interface Product {
    products: any
    shopData: any
}
const ShopNavigations: React.FC<Product> = ({ products,shopData }) => {
    return (
        <div className="navs flex mt-8 lg:ml-0 ml-2 w-fit">
            <a href="/" className="text-[#0C203B] text-sm">Ahabanza</a>
            <p className="text-[#0C203B] text-sm mx-1">/</p>
            <a href="/products" className="text-[#0C203B] text-sm">Zose</a>
            <p className="text-[#0C203B] text-sm mx-1">/</p>
            <a href="/product" className="text-[#EDB62E] text-sm">{products?.product?.product_name}</a>
            <p className="text-[#0C203B] text-sm mx-1">/</p>
            <p className="text-[#EDB62E] text-sm">{shopData?.name}</p>
        </div>
    )
}

export default ShopNavigations