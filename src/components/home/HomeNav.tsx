/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { UserOutlined } from '@ant-design/icons';

const HomeNav = () => {
  const location = useLocation();
const urlParts = location.pathname.split("/");
const lastPart = urlParts[urlParts.length - 1];
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [searchValue, setSearchValue] = useState("");
  const [, setSearchedId] = useState<string>("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      const allProducts = response?.data?.products;

      const productNames = allProducts?.map((product: any) => ({
        id: product._id,
        name: product.product_name,
      }));

      setAutocompleteOptions(productNames);
    };

    fetchProducts();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOptionSelect = (event: any) => {
    const selectedOption:any = autocompleteOptions.find(option => option.name === event.target.value);
    if (selectedOption) {
      setSearchedId(selectedOption.id);
      navigate(`/product/${selectedOption.id}`);
    }
  };

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
      <Menu.Item key="2">
        <Link to={'/client/confirm'}>
          Kwemeza
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <button onClick={handleLogout}>
          {isLogin ? "  Sohoka" : "Injira"}
        </button>
      </Menu.Item>
    
    </Menu>
  );

  const isAdminFromLocalStorag: any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin";

  return (
    <nav className={`w-full text-white lg:flex hidden justify-between px-32 pb-3 pt-7 ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
      <div className='logo flex my-auto justify-center pl-5 '>
        <Link className='text-xl text-white font-semibold' to={'/'}>
          <img src='/cc.png' alt='logo' className='h-8' />
        </Link>
      </div>
      <ul className='flex space-x-8 my-auto justify-center'>
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'home' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/'>Ahabanza</NavLink>
          </li>
          {selectedMenu === 'home' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'about_us' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/about_us'>Abo turibo</NavLink>
          </li>
          {selectedMenu === 'about_us' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'servisi' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/serivisi'>Serivisi</NavLink>
          </li>
          {selectedMenu === 'servisi' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'sobanukirwa' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/sobanukirwa'>Sobanukirwa</NavLink>
          </li>
          {selectedMenu === 'sobanukirwa' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'contact_us' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/contact_us'>Twandikire</NavLink>
          </li>
          {selectedMenu === 'contact_us' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
      </ul>
      {lastPart !== 'products' && (

      <div className='searchBar bg-[#F5F5F5] rounded-md pr-3'>
        <input
          type='text'
          placeholder='Shakisha Telefoni'
          className='p-2 outline-none text-black rounded-md bg-[#F5F5F5]'
          value={searchValue}
          onChange={handleInputChange}
          onInput={handleOptionSelect}
          list="autocomplete-options"
        />
        <datalist id="autocomplete-options">
          {autocompleteOptions.map((option, index) => (
            <option key={index} value={option.name} />
          ))}
        </datalist>
      </div>
      )}
      <Dropdown overlay={menu} className='mt-1'>
        <Button>
          <UserOutlined className='test text-white' />
        </Button>
      </Dropdown>
    </nav>
  );
};

export default HomeNav;
