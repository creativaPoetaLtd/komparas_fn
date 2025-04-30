import { useEffect, useState } from "react";
import ShopNavigations from "./NavIgations"
import { useParams } from "react-router-dom";
import { getPoductById, getProductByVendorId } from "../../../api/product";
import HomeNav from "../../home/HomeNav";
import TopPhone from "./TopPhone";
import Line from "./Line";
import RelatedProfducts from "./RelatedProfducts";
import GoogleMapSection from "./Map";
import Footer from "../../Footer";
import ShopName from "./ShopName";
import OpeningTimes from "./OpeningTimes";
import ShopContact from "./ShopPhone";
import MobileHomeNav from "../../home/HomeMobileNav";
import { getShopById } from "../../../api/getAllShops";
import OtherShops from "./OtherShops";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
    const [products, setProduct] = useState<any>([]);
    const [shopData, setShopData] = useState<any>([]);
    const [shopProducts, setShopProducts] = useState<any>([]);
    const { productId }: any = useParams();
    const { shopId }: any = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("shop");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId, shopId]);
    useEffect(() => {
        const fetchProduct = async () => {
            const prod = await getProductByVendorId(shopId);
            setShopProducts(prod);
        };
        fetchProduct();
    }, [shopId]);

    useEffect(() => {
        const fetchShop = async () => {
            const { data } = await getShopById(shopId);
            setShopData(data);
        };
        fetchShop();
    }, [shopId]);

    return (
        <section className="shop-pag flex flex-col w-full min-h-screen h-fit">
            <HomeNav />
            <MobileHomeNav />
            <div className="md:w-[85%] md:px-1 px-4 w-full flex self-center flex-col">
                <ShopNavigations products={products} shopData={shopData} />
                <div className="flex md:flex-row flex-col md:space-x-20 space-x-0 w-full">
                    <div className="md:w-1/2 w-full  mt-4 flex flex-col">
                        <TopPhone productData={products} vendorID={shopId} />
                        {/* <Line /> */}
                        <div className="flex flex-col md:hidden">
                            <ShopName shopData={shopData} />
                            <Line />
                            <OpeningTimes shopData={shopData} />
                            <Line />
                            <ShopContact shopData={shopData} />
                        </div>
                        <RelatedProfducts shopProducts={shopProducts} vendorID={shopId} />
                        <Line />
                        {search !== "shop" &&
                        <OtherShops products={products} productID={productId} vendorID={shopId} />
                        }
                        <div className="flex flex-col md:hidden">
                            <Line />
                        </div>
                        <GoogleMapSection apiKey={"miaumiauapikey"} />
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col">
                        <div className="hidden md:flex flex-col">
                            <ShopName shopData={shopData} />
                            <Line />
                            <OpeningTimes shopData={shopData} />
                            <Line />
                            <ShopContact shopData={shopData} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default ShopPage
