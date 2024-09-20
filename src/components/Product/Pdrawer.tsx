import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { useParams } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: () => void;
    comparisonData: any;
}

const ComparisonDrawerSingle: React.FC<Props> = ({ onClose }) => {
    const id1 = localStorage.getItem('selectedProductId') as string;
    const id2: string = localStorage.getItem('selectedProductId2') as string;
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});
    const handleValueClick = (index: number) => {
        setShowValueMap({
            ...showValueMap,
            [index]: !showValueMap[index],
        });
    };

    const { productId }: any = useParams();
    const [product, setProduct] = useState<any>([]);
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        const ids = [id1, id2, productId].filter((id) => id !== null);
        const fetchData = async () => {
            const response = await getProductByMultpleIdsInQueryParams(ids);
            setProduct(response.data);

            const initialShowValueMap: { [key: number]: boolean } = {};
            response.data?.product?.forEach((_product: any, index: number) => {
                initialShowValueMap[index] = true;
            });
            setShowValueMap(initialShowValueMap);
        };
        fetchData();
    }, [id1, id2, productId]);

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY;
            if (top > 200) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navigate = useNavigate();
    function addSpaceBetweenWords(str: any) {
        return str.replace(/\//g, ' /');
    }


    return (
        <div className="overflow-y-auto  w-full bg-black bg-opacity-50 ">
            <div className="bg-white w-full overflow-y-auto p-4 relative rounded-md shadow-lg">
                <button onClick={
                    () => {
                        localStorage.removeItem('selectedProductId');
                        localStorage.removeItem('selectedProductId2');
                        onClose();
                        navigate(-1);
                    }
                } className="absolute top-4 right-4 text-red-500">
                    <FaTimes size={24} />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Gereranya</h2>
                <div className="flex relative overflow-y-auto  flex-col items-center">
                    <div className={`${fixed ? 'fixed grid lg:px-[10%] px-0 grid-cols-3 flex-shrink-1 top-0  mx-auto justify-center gap-4 pb-2  z-50  w-full lg:right-3 right-0 bg-red-50 md:pb-0' : 'hidden'}`}>
                        {product?.product?.map((product: any) => (
                            <div
                                key={product._id}
                                className="border p-4 rounded-md flex flex-col items-start"
                            >
                                <img src={product.product_image} alt={product.product_name} className="w-[20%] mx-auto flex justify-center h-10 object-contain mb-2" />
                                <h3 className="font-medium flex mx-auto justify-center  text-xs">{product.product_name}</h3>
                                <p className='flex text-xs mx-auto justify-center text-green-600'>
                                    {product?.vendor_prices?.length >= 1 && product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price
                                        .toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                                </p>
                                <Link to={`/product/${product._id}`} className="mt- w-full bg-black text-yellow-500 py-1 text-xs rounded-md flex justify-center">
                                    Yirebe
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="pb-12 lg:px-[10%] px-0 lg:gap-4 gap-1 grid grid-cols-3 r  w-full">
                        {product?.product?.map((product: any) => (
                            <div
                                key={product._id}
                                className="border border-green-600 lg:p-4 p-1 rounded-md   flex flex-col items-start"
                            >
                                <img src={product.product_image} alt={product.product_name} className="w-full h-40 object-contain mb-4" />
                                <h3 className="font-semibold text-lg">{product.product_name}</h3>
                                <p className='flex font-semibold text-green-600 mt-4 mb-4'>
                                    {product?.vendor_prices?.length >= 1 && product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price
                                        .toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                                </p>
                                <ul className="text-sm w-full">
                                    {product?.product_specifications?.map((spec: any, index: any) => (
                                        <div key={index} className="flex flex-col mb-2">
                                            <div
                                                className="flex justify-between items-center cursor-pointer"
                                                onClick={() => handleValueClick(index)}
                                            >
                                                <span>{addSpaceBetweenWords(spec.key)}</span>
                                                {showValueMap[index] ? <FaAngleUp /> : <FaAngleDown />}
                                            </div>
                                            {showValueMap[index] && (
                                                <p className="text-green-600 mt-1">{spec.value}</p>
                                            )}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-2 fixed justify-between bottom-0 lg:px-[13%] px-4  z-50  w-full lg:right-0 right-0 bg-white flex gap-4">
                        <button
                            onClick={() => {
                                localStorage.removeItem('selectedProductId');
                                localStorage.removeItem('selectedProductId2');
                                onClose();
                                navigate(-1);
                            }}
                            className="bg-black text-white px-4 py-1 rounded-md"
                        >
                            Siba
                        </button>
                        <button onClick={() => {
                            onClose();
                            navigate(-1);
                        }} className="text-red-500 px-4 py-1 rounded-md border border-red-500">

                            Funga
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonDrawerSingle;
