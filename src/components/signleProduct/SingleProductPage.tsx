import React from 'react';
import Footer from '../Footer';
import NavIndex from '../Navigations/NavIndex';
import RelatedProducts from './RelatedProducts';
import ShopsProductTable from './ShopsProductTable';
import UpperProduct from './UpperProduct';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const SingleProductPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col min-h-screen">
        <NavIndex />
        <div className='singleProduct min-h-screen h-fit laptop:px-20 desktop:px-20 tablet:px-10 px-3 flex  flex-col mt-24 pb-20'>
          <div className='flex w-full laptop:flex-row tablet:flex-row flex-col  h-fit desktop:space-x-5 tablet:space-x-3 laptop:space-x-5 space-x-0 laptop:space-y-0 desktop:space-y-0 tablet:space-y-0 space-y-3'>
            <UpperProduct />
            <div className='laptop:w-[40%] desktop:w-[40%] tablet:w-[40%] w-full h-fit flex flex-col space-y-4'>
              <ShopsProductTable />
              <p className='font-bold text-xl text-gray-700'>Telefoni bihuje</p>
              <RelatedProducts />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
}
export default SingleProductPage;
