/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/product';
import { isAdminFromLocalStorage } from '../Footer';
import { handleLogout } from '../dashboard/TopNavBar';


const MobileHomeNav = () => {

const location = useLocation();
const urlParts = location.pathname.split("/");
const lastPart = urlParts[urlParts.length - 1];
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
  const navigate = useNavigate();
  const menu = (
    <Menu>
      
      <Menu.Item key="2">
        <Link to={'/client/confirm'}>
          Kwemeza
        </Link>
      </Menu.Item>
      {isAdminFromLocalStorage() && (
        <Menu.Item key="3">
          <button onClick={handleLogout}>
            Sohoka
          </button>
        </Menu.Item>
      )}
    </Menu>
  );
  const burgerMenu = (
    <Menu style={
      {
        width: '90vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        gap: '1rem',
        
      }
    
    }>
      <Menu.Item key="0">
        <Link to="/">
          <a>Ahabanza</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/about_us">
          <a>Abo turibo</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/">
          <a>Serivisi</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/sobanukirwa">
          <a>Sobanukirwa</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/contact">
          <a>Twandikire</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/blogs">
          <a>Blogs</a>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="3">
        <button onClick={handleLogout}>
          <a>
            {isLogin ? "Logout" : "Login"}
          </a>
        </button>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div className={`w-full text-white lg:hidden flex ${isAdminFromLocalStorage() ? "bg-[#848482]" : "bg-[#0C203B]"}  h-fit justify-between flex-col`}>
      <nav className=" flex justify-between items-center p-4">
        <div>
          <Dropdown overlay={burgerMenu}>
            <HiBars3BottomLeft className="text-3xl" />
          </Dropdown>
        </div>
        <Link to="/">
        <img src='/cc.png' alt='logo' className='h-8' />
        </Link>
        <div>
          <Dropdown overlay={menu}>
            <Button>
              <UserOutlined className='test text-white' />
            </Button>
          </Dropdown>
        </div>
      </nav>
      {lastPart !== 'products' && (
      <div className='searchBar flex justify-center md:w-3/5 bg-white w-[96%] rounded-md self-center mt-2 mb-2 items-center border-gray-300 border'>
        <input type="text" value={searchValue}
          onChange={handleInputChange}
          onInput={handleOptionSelect}
          list="autocomplete-options"
          placeholder="Search" className="t text-black w-full h-full p-2 outline-none rounded-md " />
           <datalist id="autocomplete-options">
          {autocompleteOptions.map((option, index) => (
            <option key={index} value={option.name} />
          ))}
        </datalist>
        <button className="rounded-md">
          <FaSearch className="text-lg text-black" />
        </button>
      </div>
      )}
    </div>
  );
};

export default MobileHomeNav;
