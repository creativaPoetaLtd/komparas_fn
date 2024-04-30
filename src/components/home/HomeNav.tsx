import { Button, Dropdown, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';


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

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/">
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">
          <a>Setting</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        {/* <Link to="/login">
          <a>Injira</a>
        </Link> */}
        <button onClick={handleLogout}>
            {isLogin ? "  Sohoka" : "Injira"}
          </button>
      </Menu.Item>
    </Menu>
  );
  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;


  return (
    <nav className={`w-full text-white lg:flex hidden justify-between px-32 pb-3 pt-7 ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
      <div className='logo flex my-auto justify-center pl-5 '>
        <Link className='text-xl text-white font-semibold' to={'/'}>
          <img src='/cc.png' alt='logo' className='h-8' />
        </Link>
      </div>
      <ul className='flex space-x-8 my-auto justify-center'>
        <div className='flex flex-col space-y-0 w-fit'>
        <li
          className={`text-white ${
            selectedMenu === 'home' ? 'text-bold font-bold' : ''
          }`}
        >
          <NavLink to='/'>Ahabanza</NavLink>
        </li>
        {selectedMenu === 'home' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
        <li
          className={`text-white ${
            selectedMenu === 'about_us' ? 'text-bold font-bold' : ''
          }`}
        >
          <NavLink to='/about_us'>Abo turibo</NavLink>
        </li>
        {selectedMenu === 'about_us' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
        <li
          className={`text-white ${
            selectedMenu === 'contact_us' ? 'text-bold font-bold' : ''
          }`}
        >
          <NavLink to='/contact_us'>Twandikire</NavLink>
        </li>
        {selectedMenu === 'contact_us' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        {/* <div className='flex flex-col space-y-0 w-fit'>
        <li
          className={`text-white ${
            selectedMenu === 'login' ? 'text-bold font-bold' : ''
          }`}
        >
          <button onClick={handleLogout}>
            {isLogin ? "  Sohoka" : "Injira"}
          </button>
        </li>
        {selectedMenu === 'login' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div> */}




        {/* <li
          className={`text-white ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>Abo turibo</NavLink>
        </li>
        <li
          className={`text-white ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>Serivisi</NavLink>
        </li>
        <li
          className={`text-white ${
            selectedMenu === 'about_us' ? 'underline underline-offset-4' : ''
          }`}
        >
          <NavLink to='/about_us'>Sobanukirwa</NavLink>
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
        </li> */}
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
      <Dropdown overlay={menu} className='mt-1'>
            <Button>
              <UserOutlined className='test text-white' />
            </Button>
          </Dropdown>
    </nav>
  );
};

export default HomeNav;
