import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const HomeNav = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('home');

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelectedMenu(path || 'home');
  }, [location]);

  return (
    <nav className='w-full lg:flex hidden justify-between px-20 pb-3 pt-7 border-black border-b bg-white'>
      <div className='logo flex my-auto justify-center'>
        <h1 className='text-xl text-[#0C203B] font-semibold'>Komparas</h1>
      </div>
      <ul className='flex space-x-8 my-auto justify-center'>
        <li
          className={`text-black ${
            selectedMenu === 'home' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/'>Home</NavLink>
        </li>
        <li
          className={`text-black ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>About</NavLink>
        </li>
        <li
          className={`text-black ${
            selectedMenu === 'contact_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/contact_us'>Contact</NavLink>
        </li>
        <li
          className={`text-black ${
            selectedMenu === 'login' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/login'>Signup</NavLink>
        </li>
      </ul>
      <div className='searchBar bg-[#F5F5F5] rounded-md pr-3'>
        <input
          type='text'
          placeholder='Search'
          className='p-2 outline-none rounded-md bg-[#F5F5F5]'
        />
        <button>
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default HomeNav;
