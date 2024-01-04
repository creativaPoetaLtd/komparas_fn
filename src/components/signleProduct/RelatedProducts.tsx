import { useDrag } from 'react-dnd';
import { getPoductById, getProductOnCategory } from "../../api/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DraggableProduct = ({ product }: any) => {
  const [, drag] = useDrag({
    type: 'PRODUCT',
    item: { product },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const viewProduct = (product:any) => {
    window.location.href = `/product/${product}`;
  }

  return (
    <div ref={drag} className='productCard bg-white rounded-md shadow-md cursor-pointer' onClick={()=>viewProduct(product._id)}>
      <div className='w-full h-[200px]'>
        <img src={product.product_image} alt="product" className="w-full h-full rounded-sm object-cover" />
      </div>
      <div className='w-full h-[fit] flex flex-col justify-start items-start p-3'>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>Name:</span> {product?.product_name}
        </p>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>Price</span> {product?.product_price}$
        </p>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>description:</span> {(product?.product_description).slice(0, 23)+'...'}
        </p>
      </div>
    </div>
  );
}
const RelatedProducts = () => {

  const [products1, setProducts] = useState<any>([]);
  const productId: any = useParams().id;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getPoductById(productId);
      setProducts(data);
    };
    fetchProduct();
  }, [productId]);
  const category = products1?.product?.category?.name;
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProductOnCategory(category);
        setRelatedProducts(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchRelatedProducts();
  }
    , [category]);
  return (
    <>
      {loading && <h1>Loading...</h1>}
      <div className='grid laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 phone:grid-cols-2 gap-2'>
        {relatedProducts?.products?.map((product: any, index: any) => (
          <DraggableProduct key={index} product={product} />
        ))}
      </div>
    </>
  );
};
export default RelatedProducts;
