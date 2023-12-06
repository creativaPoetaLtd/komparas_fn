import relatedProducts from "../dumyData/relatedProduct"
import { useDrag } from 'react-dnd';

const DraggableProduct = ({ product }:any) => {
  const [, drag] = useDrag({
    type: 'PRODUCT',
    item: { product },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className='productCard bg-white rounded-md shadow-md'>
      <div className='w-full h-[200px]'>
        <img src={product.productImage} alt="product" className="w-full h-full rounded-sm object-cover" />
      </div>
      <div className='w-full h-[fit] flex flex-col justify-start items-start p-3'>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>Name:</span> {product.name}
        </p>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>Price</span> {product.price}
        </p>
        <p className='text-sm font-normal text-gray-800'>
          <span className='f font-semibold'>location:</span> {product.location}
        </p>
      </div>
    </div>
  );
}
const RelatedProducts = () => {
  return (
    <div className='grid laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 phone:grid-cols-2 gap-2'>
      {relatedProducts.map((product, index) => (
        <DraggableProduct key={index} product={product} />
      ))}
    </div>
  );
};
export default RelatedProducts;
