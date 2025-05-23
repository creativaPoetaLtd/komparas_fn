import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaShopSlash } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaBlog } from 'react-icons/fa';

// import { CgProfile } from "react-icons/cg";
// import { IoMdSettings } from "react-icons/io";
// import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsCode, BsJournalAlbum } from "react-icons/bs";
import { ShoppingBag } from "lucide-react";

const MenuItem = ({ icon: Icon, label, selected, onClick }:any) => (
  <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selected ? 'active' : ''}`} onClick={onClick}>
    <Icon className="mr-2 flex justify-center items-center my-auto" />
    {label}
  </div>
);

const Sidebar = ({ selectedMenu, onMenuClick }:any) => {
  return (
    <div className="w-[15%] fixed h-screen bg-gray-200 flex flex-col p-3">
      <Link className="text-2xl font-bold" to={"/"}>KOMPARAS</Link>
      <div className='text-md font-medium mt-5 flex flex-col h-screen justify-between'>
        <div className="flex flex-col">
        <MenuItem icon={MdDashboard} label="Dashboard" selected={selectedMenu === 'dashboard'} onClick={() => onMenuClick('dashboard')} />
<MenuItem icon={FaUsers} label="Users" selected={selectedMenu === 'users'} onClick={() => onMenuClick('users')} />
<MenuItem icon={FaShopSlash} label="Shops" selected={selectedMenu === 'shops'} onClick={() => onMenuClick('shops')} />
<MenuItem icon={FaProductHunt} label="Products" selected={selectedMenu === 'products'} onClick={() => onMenuClick('products')} />
<MenuItem icon={MdCategory} label="Categories" selected={selectedMenu === 'categories'} onClick={() => onMenuClick('categories')} />
<MenuItem icon={BsJournalAlbum} label=" Jobs" selected={selectedMenu === 'jobs'} onClick={() => onMenuClick('jobs')} />
<MenuItem icon={BsCode} label=" Kodes" selected={selectedMenu === 'kodes'} onClick={() => onMenuClick('kodes')} />
<MenuItem icon={ShoppingBag} label=" Ads" selected={selectedMenu === 'ads'} onClick={() => onMenuClick('ads')} />
<MenuItem icon={ShoppingBag} label=" Bunner Ads" selected={selectedMenu === 'bunner ads'} onClick={() => onMenuClick('bunner ads')} />
<MenuItem icon={FaShopSlash} label=" Services" selected={selectedMenu === 'services'} onClick={() => onMenuClick('services')} />
<MenuItem icon={FaBlog} label="Blogs" selected={selectedMenu === 'blogs'} onClick={() => onMenuClick('blogs')} />


        </div>
        {/* <div className="flex flex-col">
          <MenuItem icon={CgProfile} label="Profile" selected={selectedMenu === 'profile'} onClick={() => onMenuClick('profile')} />
          <MenuItem icon={IoMdSettings} label="Settings" selected={selectedMenu === 'settings'} onClick={() => onMenuClick('settings')} />
          <MenuItem icon={IoMdHelpCircleOutline} label="Help" selected={selectedMenu === 'helps'} onClick={() => onMenuClick('helps')} />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
