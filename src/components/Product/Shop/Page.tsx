import { useEffect, useState } from "react";
import ShopNavigations from "./NavIgations"
import { useParams } from "react-router-dom";
import { getPoductById } from "../../../api/product";
import HomeNav from "../../home/HomeNav";
import TopPhone from "./TopPhone";
import Line from "./Line";
import RelatedProfducts from "./RelatedProfducts";
import GoogleMapSection from "./Map";
import { CiLocationArrow1, CiWarning } from "react-icons/ci";
import { TbTimeDuration0 } from "react-icons/tb";
import { CgPhone } from "react-icons/cg";
import Footer from "../../Footer";


const ShopPage = () => {
    const [products, setProduct] = useState<any>([]);

    const { productId }: any = useParams();
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

    const category = products?.product?.category?.name;
    // const [relatedProducts, setRelatedProducts] = useState<any>([]);
    // const [allProd, setAllProd] = useState<any>([])
    const [, setLoading] = useState(false);
    const [, setError] = useState(false);
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            setLoading(true);
            try {
                // const { data } = await getProductOnCategory(category);
                // setRelatedProducts(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchRelatedProducts();
    }, [category]);
    useEffect(() => {
        const handleProd = async () => {
            // const response = await getAllProducts();
            // setAllProd(response?.data?.products);
        }
        handleProd();
    }
        , []);


    return (
        <section className="shop-pag flex flex-col w-full min-h-screen h-fit">
            <HomeNav />
            <div className="w-[85%] flex self-center flex-col">
                <ShopNavigations products={products} />
                <div className="flex w-full">
                    <div className="w-1/2  m-12 flex flex-col">
                        <TopPhone />
                        <Line />
                        <RelatedProfducts />
                        <GoogleMapSection apiKey={"miaumiauapikey"} />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="flex w-full justify-between px-4">
                            <div className="flex flex-col text-sm">
                                <h1 className="shopname text-sm text-yellow-500">Isaro shop</h1>
                                <p className="shopOwner text-sm text-[#353535]">Ineza Gasaro Sheja</p>
                            </div>
                            <div className="logo bg-slate-400 flex justify-center items-center  my-auto">
                                <img src="/cc.png" alt="logo" className="w-fit h-10" />
                            </div>
                        </div>
                        <div className="flex space-x-8 mt-12 px-8">
                            <div className="flex flex-col">
                                <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                                <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                                <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                                <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                                <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 px-8">
                            <div className="flex w-full space-x-4">
                                <CiWarning className="text-[#353535] text-2xl justify-center" />
                                <p className="text-sm text-[#353535] justify-center my-auto flex">Izindi Terefone dufite</p>
                            </div>
                            <div className="flex w-full space-x-4">
                                <CiWarning className="text-[#353535] text-2xl justify-center" />
                                <p className="text-sm text-[#353535] justify-center my-auto flex">Izindi Terefone dufite</p>
                            </div>
                        </div>
                        <Line />
                        <div className="flex workingHours space-x-4 px-8">
                            <TbTimeDuration0 className="text-[#353535] text-2xl justify-center my-auto" />
                            <div className="flex flex-col">
                                <p className="text-sm text-[#fe4141]">Hafunguye</p>
                                <h1 className="text-sm mt-3 text-[#353535] font-bold">Amasaha y'akazi</h1>
                                <p className="text-sm text-[#353535]">Kuwa mbere 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa kabiri 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa gatatu 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa kane 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa gatanu 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa gatandatu 08:00 - 18:00</p>
                                <p className="text-sm text-[#353535]">Kuwa cyenda 08:00 - 18:00</p>
                            </div>
                            </div>
                            <Line />
                            <div className="flex workingHours space-x-4 px-8">
                            <CgPhone className="text-[#353535] text-2xl justify-center my-auto" />
                            <div className="flex flex-col">
                                <p className="text-sm text-[#fe4141]">+250 788 777 777</p>
                            </div>
                            </div>
                            <Line />
                        <div className="flex workingHours space-x-4 px-8">
                            <CiLocationArrow1 className="text-[#353535] text-2xl justify-center my-auto" />
                            <div className="flex flex-col">
                                <p className="text-sm text-[#fe4141]">Location</p>
                                <h1 className="text-sm mt-3 text-[#353535] font-bold">Kigali, Rwanda</h1>
                                <p className="text-sm text-[#353535]">Nyarugenge, Nyamirambo</p>
                                <p className="text-sm text-[#353535]">KG12, 123T</p>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default ShopPage
