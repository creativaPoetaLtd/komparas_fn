import relatedImages from "../dumyData/relatedImages";
import { useDrop } from 'react-dnd';

const UpperProduct = () => {

  const CompareDiv = () => {
    const [, drop] = useDrop({
      accept: 'PRODUCT',
      drop: () => ({ name: 'CompareDiv' }),
    });
    return (
      <div ref={drop} className="CompareDiv flex gap-2 flex-wrap justify-center  items-center m-auto h-fit">
        <div className="w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm">
          <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/41-nc-alum-starlight-sport-band-starlight-s9?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693282285539' alt='product' className='w-full h-full rounded-sm object-cover' />
        </div>
        <div className="w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm flex">
          <p className='text-2xl font-bold flex justify-center text-center items-center m-auto'>+</p>
        </div>
        <div className="w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm flex">
          <p className='text-2xl font-bold flex justify-center text-center items-center m-auto'>+</p>
        </div>
        <div className="w-[7rem] h-[7rem] border-bg-gray-400 border text-gray-500 rounded-sm flex">
          <p className='text-2xl font-bold flex justify-center text-center items-center m-auto'>+</p>
        </div>
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

  return (
    <div className='laptop:w-[70%] desktop:w-[70%] tablet:w-[70%] w-full  flex-col space-y-8  h-fit'>
      <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
        <div className='w-full flex flex-col  h-fit p-5 space-y-4'>
          <h1 className='text-4xl font-bold'>Apple Smart Watch Sport Edition</h1>
          <div className='productRating flex space-x-2 justify-start my-auto items-center'>
            {renderRatingStars()}
            <span className='text-lg text-gray-400'>(4.5)</span>
          </div>
          <div className='line w-full h-[1px] bg-blue-700' />
        </div>
        <div className='image flex w-full h-[25rem] p-2 rounded-sm'>
          <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/41-nc-alum-starlight-sport-band-starlight-s9?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693282285539' alt='product' className='w-full h-full rounded-sm object-cover' />
        </div>
        <div className="relatedPictures flex  w-full justify-center items-center m-auto h-[7rem] space-x-2 p-2">
          {relatedImages.map((image, index) => (

            <div key={index} className="w-[7rem] h-full bg-gray-400 rounded-sm">
              <img src={image.image} className='w-full h-full rounded-sm object-cover' />
            </div>
          ))}

        </div>
        <div className='description flex h-[60%] flex-col w-full'>
          <div className='w-full h-fit'>
            <div className='w-full flex flex-col h-fit p-5 space-y-4'>
              <h1 className='text-2xl font-bold'>Exquisitely Crafted, Captivatingly Brilliant</h1>
              <p className='text-lg font-medium'>
                Inspired by the works of glassblowers and artisan metalsmiths, the Samsung Galaxy S6 represents a seamless fusion of glass and metal. Make a breathtaking design statement with its beautiful curves and radiant glass surfaces that reflect a wide spectrum of dazzling colours.
              </p>
            </div>
          </div>

        </div>
        <div className='line  flex flex-col laptop:w-[70%] desktop:w-[70%] w-[95%] justify-center m-auto h-fit  items-center border-2 border-gray-300 py-2 rounded-md' >
          <CompareDiv />
          <div className="flex w-full justify-end pr-6">
            <button className='py-1 px-4 border-blue-700 border flex justify-end float-right text-blue-700 rounded-md'>Compare</button>
          </div>
        </div>
        <div className="threeButtons mt-12 grid grid-cols-3 gap-4 space-x-2 px-12">
          <button className='py-3 font-semibold text-xl px-4 text-gray-500 border-gray-300 border flex justify-center  rounded-md'>Discription</button>
          <button className='py-3 font-semibold text-xl px-4 text-white border-gray-300 border flex justify-center bg-red-600  rounded-md'>Full spcesification</button>
          <button className='py-3 font-semibold text-xl text-gray-500 px-4 border-gray-300 border flex justify-center  rounded-md'>Review</button>
        </div>
        <h1 className='text-2xl font-bold mt-12 ml-10 pb-4'>Full specification</h1>
        <div className="flex flex-col w-full text-gray-500 px-10">
          <div className="flex justify-between w-full py-2 border-b-4">
            <div className="flex w-1/2 font-medium">NetWork:</div>
            <div className="flex w-1/2">2 mbps</div>
          </div>
          <div className="flex justify-between w-full py-2 border-b-4">
            <div className="flex w-1/2 font-medium">NetWork:</div>
            <div className="flex w-1/2">2 mbps</div>
          </div>
          <div className="flex justify-between w-full py-2 border-b-4">
            <div className="flex w-1/2 font-medium">NetWork:</div>
            <div className="flex w-1/2">2 mbps</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UpperProduct