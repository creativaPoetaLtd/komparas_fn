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
    <nav className='w-full lg:flex hidden justify-between px-20 pb-3 pt-7 border-black border-b bg-white'>
      <div className='logo flex my-auto justify-center'>
        <Link className='text-xl text-[#0C203B] font-semibold' to={'/'}>Komparas</Link>
      </div>
      <ul className='flex space-x-8 my-auto justify-center'>
        <li
          className={`text-black ${
            selectedMenu === 'home' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/'>Ahabanza</NavLink>
        </li>
        <li
          className={`text-black ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>Abo turibo</NavLink>
        </li>
        <li
          className={`text-black ${
            selectedMenu === 'contact_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/contact_us'>Twandikire</NavLink>
        </li>
        <li
          className={`text-black ${
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
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default HomeNav;
