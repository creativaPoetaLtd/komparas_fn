
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
const NavBar = () => {
  return (

    <div className='flex z-50 fixed justify-between text-lg  font-semibold w-full h-fit p-5 mt-0 laptop:px-12 desktop:px-12 tablet:px-12 px-3 bg-white border-b-2 border-gray-200'>
      <div className='log tablet:text-3xl desktop:text-3xl laptop:text-3xl text-xl'>
        <button className='bg-white'>KOMPARAS</button>
      </div>
      <div className='laptop:flex tablet:flex desktop:flex hidden  justify-between space-x-10'>
        <Link to={'/products'} className='bg-white'>Products</Link>
        <Link to={'/about_us'} className='bg-white'>About</Link>
        <Link to={'/contact_us'} className='bg-white'>Contact</Link>
      </div>
      <div className='flex laptop:space-x-12 desktop:space-x-12 tablet:space-x-12 space-x-6'>
        {/* <button className='bg-white text-2xl'>
          <div className="icon-container">
            <BsFillSuitHeartFill />
            <span className="icon-badge">9+</span>
          </div>
        </button>
        <button className='bg-white text-3xl'>
          <div className="icon-container">
            <AiOutlineShoppingCart />
            <span className="icon-badge">9+</span>
          </div>
        </button> */}
        <UserAvatar />
      </div>
    </div>
  );
};

export default NavBar;
