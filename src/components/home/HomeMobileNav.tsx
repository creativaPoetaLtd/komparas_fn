import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaSearch } from 'react-icons/fa';



const MobileHomeNav = () => {
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
        <Link to="/login">
          <a>Injira</a>
        </Link>
      </Menu.Item>
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
          <a>Ibitwerekeyeho</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/contact">
          <a>Tuvugishe</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/">
          <a>Serivisi</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/">
          <a>Sobanukirwa</a>
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
  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;

  return (
    <div className={`w-full text-white lg:hidden flex ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  h-fit justify-between flex-col`}>
      <nav className=" flex justify-between items-center p-4">
        <div>
          <Dropdown overlay={burgerMenu}>
            <HiBars3BottomLeft className="text-3xl" />
          </Dropdown>
        </div>
        <img src='/cc.png' alt='logo' className='h-8' />
        <div>
          <Dropdown overlay={menu}>
            <Button>
              <UserOutlined className='test text-white' />
            </Button>
          </Dropdown>
        </div>
      </nav>
      <div className='searchBar flex justify-center md:w-3/5 bg-white w-[96%] rounded-md self-center mt-2 mb-2 items-center border-gray-300 border'>
        <input type="text" placeholder="Search" className="t text-black w-full h-full p-2 outline-none rounded-md " />
        <button className="rounded-md">
          <FaSearch className="text-lg text-black" />
        </button>
      </div>
    </div>
  );
};

export default MobileHomeNav;
