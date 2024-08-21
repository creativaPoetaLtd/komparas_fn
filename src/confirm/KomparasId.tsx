import SubNav from "../components/Navigations/SubNav"
import MobileHomeNav from "../components/home/HomeMobileNav"
import HomeNav from "../components/home/HomeNav"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { getKomparasCodebyCode } from "../api/shops"
import { useParams } from "react-router-dom"
import { getPoductById } from "../api/product"
import { useNavigate } from "react-router-dom"
import { updateIsSoldConfirmToTrue } from "../api/shops"
import { notification } from "antd"
import Stepper from "./Stepper"

const Confirm = () => {
    const [data, setData] = useState<any>(null);
    const [productId, setProductId] = useState<string>("");
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [productLoading, setProductLoading] = useState<boolean>(true);
    const { KomparasId }: any = useParams();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isSteps, setIsSteps] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCode = async () => {
            const response = await getKomparasCodebyCode(KomparasId);
            setData(response?.komparasCode);
            setProductId(response?.komparasCode?.product_id);
            setLoading(false);
        }
        fetchCode();
    }
        , [KomparasId, refresh])

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProduct(data);
            setProductLoading(false);
        };
        fetchProduct();

    }, [productId]);

    const handleSteps = () => {
        setIsSteps(!isSteps);
    }

    const handleConfirmToTrue = async () => {
        const res = await updateIsSoldConfirmToTrue(KomparasId);
        notification.success({
            message: 'Byakunze',
            description: res.message
        })
        setRefresh(!refresh);
    }

    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <button className="absolute top-[25%] px-10 left-36 rounded-md bg-black py-3 text-white" onClick={() => navigate(-1)}>Back</button>
            {loading ?
                (
                    <div className="loading flex w-full min-h-screen h-fit justify-center items-center">
                        <div className="loader">Loading...
                        </div>
                    </div>)
                : (
                    <div className='w-full bg-white justify-between lg:px-24 px-2 min-h-screen h-fit  flex flex-col'>
                        {data !== null ? (
                            <div className="flex flex-col py-12 w-fit min-h-96 h-fit  border-gray-950 border-2 m-auto justify-start gap-4 p-3 items-start">
                                <h1 className="">Amazina: {data?.fullName}</h1>
                                <h1 className="">Aho waguze telephone: {data?.shopName}</h1>
                                <div className="phoneCard flex h-[10rem] mt-12">
                                    <div className="h-full w-[12rem] p-2 border border-yellow-500 rounded-md">
                                        {productLoading ? <div className="loader">Loading...</div> :
                                            <img src={
                                                product?.product?.product_image
                                            } alt="phone" className="h-full w-full object-contain" />
                                        }
                                    </div>
                                    <div className="flex flex-col h-full justify-between ml-4">
                                        {productLoading ? <div className="loader">Loading...</div> : (
                                            <div className="flex flex-col">
                                                <h1 className="text-lg">
                                                    {product?.product?.product_name}
                                                </h1>
                                                <p className="text-sm">Igiciro: RWF
                                                    {product?.product?.vendor_prices?.find((vendor: any) => vendor.vendor_id === data?.shopId)?.price}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <form className="flex gap-4 mt-10 w-full">
                                    {data?.sold_confirm ? <div className="flex relative gap-4 w-full mt-8">
                                        <p className="text-green-600 text-lg">Komeza urebe izindi serivise tugufitiye</p>
                                        <button type="button" className="bg-yellow-500 flex self-end absolute text-xs -bottom-10 px-4 py-1 w-fit right-0 rounded-md" onClick={handleSteps}>Komeza</button>
                                    </div> :
                                        (
                                            <>
                                                <input
                                                    className="my-auto justify-center items-center flex"
                                                    type="checkbox"
                                                    name="confirm"
                                                    id="confirm"
                                                    onClick={handleConfirmToTrue}
                                                />
                                                <label className="my-auto justify-center items-center flex" htmlFor="isBuyer">Nda shaka kwemeza ko naguze telephone</label>
                                            </>
                                        )}
                                </form>
                            </div>
                        ) : (
                            <div className="flex w-fit min-h-96 h-fit  border-gray-950 border-2 m-auto justify-center gap-4 p-3 items-center">
                                <div className=" flex flex-col mt-6 space-y-12 w-full mx-auto justify-center items-center">
                                    <img className="errorImg h-72 w-96" src="https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg" alt="error" />
                                    <p className="text-red-500 text-3xl">Kode wakoresheje ntabwo yabonetse</p>
                                    <button className="bg-yellow-500 flex self-end mt-4 px-4 py-3 w-fit rounded-md" onClick={() => navigate(-1)}>Ongera ugerageze</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {isSteps && <Stepper onClose={handleSteps} />}
            <Footer />
        </div>
    )
}

export default Confirm