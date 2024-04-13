import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const HomeNav = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('home');

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelectedMenu(path || 'home');
  }, [location]);
  const isLogin = localStorage.getItem("KomparasLoginsInfo");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("KomparasLoginsInfo");
    navigate("/login");
  }

  return (
    <nav className='w-full text-white lg:flex hidden justify-between px-20 pb-3 pt-7 bg-[#0C203B]'>
      <div className='logo flex my-auto justify-center md:pl-14'>
        <Link className='text-xl text-white font-semibold' to={'/'}>Komparas</Link>
      </div>
      <ul className='flex space-x-8 my-auto justify-center'>
        <li
          className={`text-white ${
            selectedMenu === 'home' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/'>Ahabanza</NavLink>
        </li>
        <li
          className={`text-white ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>Abo turibo</NavLink>
        </li>
        <li
          className={`text-white ${
            selectedMenu === 'contact_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/contact_us'>Twandikire</NavLink>
        </li>
        <li
          className={`text-white ${
            selectedMenu === 'login' ? 'underline underline-offset-4' : ''
          }`}
        >
          <button onClick={handleLogout}>
            {isLogin ? "  Sohoka" : "Injira"}
          </button>
        </li>
      </ul>
      <div className='searchBar bg-[#F5F5F5] rounded-md pr-3'>
        <input
          type='text'
          placeholder='Shakisha'
          className='p-2 outline-none rounded-md bg-[#F5F5F5]'
        />
        <button>
          <FaSearch className='text-black' />
        </button>
      </div>
    </nav>
  );
};

export default HomeNav;
