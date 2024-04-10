import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaSearch } from 'react-icons/fa';



const MobileHomeNav = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/about">
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/setting">
          <a>Setting</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/login">
          <a>Login</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const isLogin = localStorage.getItem("KomparasLoginsInfo");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("KomparasLoginsInfo");
    navigate("/login");
  }

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
          <a>Home</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/about_us">
          <a>About</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/contact">
          <a>Contact</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <button onClick={handleLogout}>
          <a>
            {isLogin ? "Logout" : "Login"}
          </a>
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='w-full lg:hidden flex bg-white h-fit justify-between flex-col'>
      <nav className=" flex justify-between items-center p-4">
        <div>
          <Dropdown overlay={burgerMenu}>
            <HiBars3BottomLeft className="text-3xl" />
          </Dropdown>
        </div>
        <h1 className="text-xl">Komparas</h1>
        <div>
          <Dropdown overlay={menu}>
            <Button>
              <UserOutlined />
            </Button>
          </Dropdown>
        </div>
      </nav>
      <div className='searchBar flex justify-center md:w-3/5 w-[96%] rounded-md self-center mt-3 items-center border-gray-300 border'>
        <input type="text" placeholder="Search" className=" w-full h-full p-2 outline-none rounded-md " />
        <button className="rounded-md">
          <FaSearch className="text-lg]" />
        </button>
      </div>
    </div>
  );
};

export default MobileHomeNav;
