interface Product {
    products: any
}
const ProdNavigations: React.FC<Product> = ({ products }) => {
    return (
        <div className="navs flex mt-8 lg:ml-10 ml-2 w-fit">
            <a href="/" className="text-[#0C203B] text-sm">Home</a>
            <p className="text-[#0C203B] text-sm mx-1">/</p>
            <a href="/product" className="text-[#0C203B] text-sm">Product</a>
            <p className="text-[#0C203B] text-sm mx-1">/</p>
            <a href="/product" className="text-[#EDB62E] text-sm">{products?.product?.product_name}</a>
        </div>
    )
}

export default ProdNavigations