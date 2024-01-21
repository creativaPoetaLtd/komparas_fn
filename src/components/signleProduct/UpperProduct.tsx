import { useDrop } from 'react-dnd';
import { getPoductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductModel from '../models/ProductModel';
import ComparisonModel from './ComparisonModel';

const UpperProduct = () => {
  const CompareDiv = () => {
    const [, drop] = useDrop({
      accept: 'PRODUCT',
      drop: () => ({ name: 'CompareDiv' }),
    });
    const [products, setProducts] = useState<any>([]);
    const productId: any = useParams().id;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | any>(null);
    const [selectedProductId1, setSelectedProductId1] = useState<string | any>(null);
    const [isSelectedId, setIsSelectedId] = useState(true);
    const [isSelectedId1, setIsSelectedId1] = useState(true);
    const [getOtherProducts, setGetOtherProducts] = useState<any>([])
    const [getOtherProducts1, setGetOtherProducts1] = useState<any>([])

    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await getPoductById(productId);
        setProducts(data);
      };
      fetchProduct();
    }, [productId]);



    const handleSelectProduct = (selectedProductId: string) => {
      setSelectedProductId(selectedProductId);
      console.log("selected product ID: ", selectedProductId);
      localStorage.setItem('selectedProductId', selectedProductId);
      setIsSelectedId(false);
      setIsOpen(false);
    };

    const handleSelectProduct1 = (selectedProductId1: string) => {
      setSelectedProductId1(selectedProductId1);
      console.log("selected product ID: ", selectedProductId1);
      localStorage.setItem('selectedProductId1', selectedProductId1);
      setIsSelectedId1(false);
      setIsOpen(false);
    };

    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await getPoductById(selectedProductId);
        setGetOtherProducts(data);
      };
      fetchProduct();
    }, [selectedProductId]);

    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await getPoductById(selectedProductId1);
        setGetOtherProducts1(data);
      };
      fetchProduct();
    }, [selectedProductId1]);

    return (
      <div ref={drop} className="CompareDiv flex gap-2 flex-wrap justify-center  items-center m-auto h-fit">
        <div className="w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm">
          <img src={products?.product?.product_image} alt='product' className='w-full h-full rounded-sm object-cover' />
        </div>
        <button onClick={() => setIsOpen(true)} className="isProductsDivModel_Button compareButton w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm flex">
          {isSelectedId ? (
            <p className='text-2xl font-bold flex justify-center text-center items-center m-auto'
              onClick={() => setIsOpen(true)}
            >+</p>
          ) : (
            <img src={getOtherProducts?.product?.product_image} alt='product' className='w-full h-full rounded-sm object-cover' />
          )}
        </button>
        <button onClick={() => setIsOpen(true)} className="isProductsDivModel1_Button compareButton w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm flex">
          {isSelectedId1 ? (
            <p className='text-2xl font-bold flex justify-center text-center items-center m-auto'
              onClick={() => setIsOpen(true)}
            >+</p>
          ) : (
            <img src={getOtherProducts1?.product?.product_image} alt='product' className='w-full h-full rounded-sm object-cover' />
          )}
        </button>

        <ProductModel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectProduct={handleSelectProduct}
          onSelectProduct1={handleSelectProduct1}
          selected_id={selectedProductId}
          selected_id1={selectedProductId1}
          activeModal={isSelectedId ? 'productsDivModel' : 'productsDivModel1'}
        />
      </div>
    )
  }
  const productRating = 4.5;
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= productRating) {
        // Render a filled star for each full rating
        stars.push(<span className='text-2xl text-blue-700' key={i}>&#9733;</span>);
      } else if (i - 0.5 <= productRating) {
        // Render a half-filled star for half rating
        stars.push(<span className='text-2xl text-blue-700' key={i}>&#9734;&#9733;</span>);
      } else {
        // Render an empty star for no rating
        stars.push(<span className='text-2xl text-blue-700' key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  const [products, setProducts] = useState<any>([]);
  const productId: any = useParams().id;
  const [isCompare, setIsCompare] = useState(false);
  const [isShowSpecifications, setIsSpecification] = useState(true);
  const [isShowReview, setIsReview] = useState(false);
  const [isShowOthersReview, setIsOthersReview] = useState(false);

  const handleShowSpecification = () => {
    setIsOthersReview(false)
    setIsReview(false)
    setIsSpecification(true)
  }

  const handleShowReview = () => {
    setIsOthersReview(false)
    setIsSpecification(false)
    setIsReview(true)
  }

  const handleShowOthersReview = () => {
    setIsReview(false)
    setIsSpecification(false)
    setIsOthersReview(true)
  }


  const handleCompare = () => {
    setIsCompare(true)
  }
  const handleCompareClose = () => {
    setIsCompare(false)
  }
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getPoductById(productId);
      setProducts(data);
    };
    fetchProduct();
  }, [productId]);
  return (
    <div className='laptop:w-[60%] desktop:w-[60%] tablet:w-[60%] w-full  flex-col space-y-8  h-fit'>
      <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
        <div className='w-full flex flex-col  h-fit p-5 space-y-4'>
          <h1 className='text-4xl font-bold'>{products?.product?.product_name}</h1>
          <div className='productRating flex space-x-2 justify-start my-auto items-center'>
            {renderRatingStars()}
            <span className='text-lg text-gray-400'>(4.5)</span>
          </div>
          <div className='line w-full h-[1px] bg-blue-700' />
        </div>
        <div className='image flex w-full h-[25rem] p-2 rounded-sm'>
          <img src={products?.product?.product_image} alt='product' className='w-full h-full rounded-sm object-cover' />
        </div>
        <div className="relatedPictures flex  w-full justify-center items-center m-auto h-[7rem] space-x-2 p-2">
          {products?.product?.product_images?.map((image: any, index: any) => (
            <div key={index} className="w-[7rem] h-full bg-gray-400 rounded-sm">
              <img src={image.product_image} className='w-full h-full rounded-sm object-cover' />
            </div>
          ))}
        </div>
        <div className='description flex h-[60%] flex-col w-full'>
          <div className='w-full h-fit'>
            <div className='w-full flex flex-col h-fit p-5 space-y-4'>
              <h1 className='text-2xl font-bold'>{products?.product?.product_name}</h1>
              <p className='text-lg font-medium'>
                {products?.product?.product_description}
              </p>
            </div>
          </div>
        </div>
        <div className='line  flex flex-col laptop:w-[60%] desktop:w-[60%] w-[95%] justify-center m-auto h-fit  items-center border-2 border-gray-300 py-2 rounded-md' >
          <CompareDiv />
          <div className="flex w-full justify-end pr-6">
            <button className='py-1 px-4 mt-2 border-blue-700 border flex justify-end float-right text-blue-700 rounded-md' onClick={handleCompare}>Compare</button>
          </div>
        </div>
        {isCompare && (
          <ComparisonModel onClose={handleCompareClose} />
        )}
        <div className="threeButtons mt-12 grid grid-cols-3 gap-4 space-x-2 laptop:px-12 desktop:px-12 tablet:px-2 px-2">
          <button className={`py-3 font-semibold laptop:text-xl desktop:text-xl tablet:text-sm text-sm laptop:px-4 desktop:px-4 tablet:px-1 px-1 text-gray-500 border-gray-300 border flex justify-center  rounded-md ${isShowReview ? 'bg-blue-700 text-white' : ''} `}
            onClick={handleShowReview}
          >Our review</button>
          <button className={`py-3 font-semibold laptop:text-xl desktop:text-xl tablet:text-sm text-sm laptop:px-4 desktop:px-4 tablet:px-1 px-1 text-gray-500 border-gray-300 border flex justify-center  rounded-md ${isShowSpecifications ? 'bg-blue-700 text-white' : ''}`}
            onClick={handleShowSpecification}
          >Specifications</button>
          <button className={`py-3 font-semibold laptop:text-xl desktop:text-xl tablet:text-sm text-sm text-gray-500 laptop:px-4 desktop:px-4 tablet:px-1 px-1 border-gray-300 border flex justify-center  rounded-md ${isShowOthersReview ? 'bg-blue-700 text-white' : ''}`}
            onClick={handleShowOthersReview}
          >Others Review</button>
        </div>
        {isShowReview ? (
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mt-12 ml-10 pb-4'>Our review</h1>
            <p className='text-gray-500 ml-10'>{products?.product?.our_review}</p>
          </div>
        ) : isShowOthersReview ? (
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mt-12 ml-10 pb-4'>Others review</h1>
            <div className='text-gray-500 w-full justify-center text-center items-center m-auto'>NO OTHER'S REVIEW YET</div>
          </div>
        ) : (
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mt-12 ml-10 pb-4'>Full specification</h1>
            {products?.product?.product_specifications?.map((specification: any, index: any) => (
              <div key={index} className="flex flex-col w-full text-gray-500 px-10">
                <div className="flex justify-between w-full py-2 border-b-4">
                  <div className="flex w-1/2 font-medium">{specification?.key}</div>
                  <div className="flex w-1/2">{specification?.value}</div>
                </div>
              </div>
            ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default UpperProduct