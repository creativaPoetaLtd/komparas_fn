import { Button, Dropdown, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { UserOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import { isAdminFromLocalStorage } from '../Footer';
import { handleLogout } from '../dashboard/TopNavBar';

const HomeNav = () => {
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  const lastPart = urlParts[urlParts.length - 1];
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [searchValue, setSearchValue] = useState("");
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
    const selectedOption: any = autocompleteOptions.find(option => option.name === event.target.value);
    if (selectedOption) {
      navigate(`/product/${selectedOption.id}`);
      setSearchValue(""); // Clear search after navigation
    }
  };

  // Handle search button click or Enter key press
  const handleSearch = () => {
    if (searchValue.trim()) {
      // Find exact match first
      const exactMatch = autocompleteOptions.find(option => 
        option.name.toLowerCase() === searchValue.toLowerCase()
      );
      
      if (exactMatch) {
        navigate(`/product/${exactMatch.id}`);
      } else {
        // Find partial match
        const partialMatch = autocompleteOptions.find(option => 
          option.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        if (partialMatch) {
          navigate(`/product/${partialMatch.id}`);
        } else {
          // Redirect to products page with search query
          navigate(`/products?search=${encodeURIComponent(searchValue)}`);
        }
      }
      
      setSearchValue(""); // Clear search after navigation
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelectedMenu(path || 'home');
  }, [location]);

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

  return (
    <nav className={`w-full text-white lg:flex hidden justify-between px-32 pb-3 pt-7 ${isAdminFromLocalStorage() ? "bg-[#848482]" : "bg-[#0C203B]"} `}>
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
        <div className='flex flex-col space-y-0 w-fit'>
          <li className={`text-white ${selectedMenu === 'blog' ? 'text-bold font-bold' : ''}`}>
            <NavLink to='/blogs'>Blogs</NavLink>
          </li>
          {selectedMenu === 'blogs' && <div className='line h-[2px] w-full bg-green-500'></div>}
        </div>
      </ul>
      {lastPart !== 'products' && (
        <div className='searchBar bg-[#F5F5F5] rounded-md pr-3 flex items-center'>
          <input
            type='text'
            placeholder='Shakisha Telefoni'
            className='p-2 outline-none text-black rounded-md bg-[#F5F5F5] flex-1'
            value={searchValue}
            onChange={handleInputChange}
            onInput={handleOptionSelect}
            onKeyPress={handleKeyPress}
            list="autocomplete-options"
          />
          <datalist id="autocomplete-options">
            {autocompleteOptions.map((option, index) => (
              <option key={index} value={option.name} />
            ))}
          </datalist>
          <button 
            onClick={handleSearch}
            className='ml-2 text-gray-600 hover:text-gray-800 transition-colors'
          >
            <FaSearch />
          </button>
        </div>
      )}
      <Dropdown overlay={menu} className='mt-1'>
        <Button>
          <UserOutlined className='test text-black' />
        </Button>
      </Dropdown>
    </nav>
  );
};

export default HomeNav;