import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaShopSlash } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";

const Sidebar = ({ selectedMenu, onMenuClick }: any) => {
    return (
        <div className="w-[15%] min-h-screen bg-gray-200 p-3">
            <h1 className="text-2xl font-bold">KOMPARAS</h1>
            <div className='text-md font-medium mt-5 flex flex-col h-[85%]  justify-between'>
                <div className="flex flex-col ">
                    <div className={`menu-item flex cursor-pointer text-md font-medium mt-5  py-2 ${selectedMenu === 'dashboard' ? 'active' : ''}`} onClick={() => onMenuClick('dashboard')}>
                        <MdDashboard className="mr-2 flex justify-center items-center my-auto" />
                        Dashboard
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'users' ? 'active' : ''}`} onClick={() => onMenuClick('users')}>
                    <FaUsers className="mr-2 flex justify-center items-center my-auto" />
                        Users
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'shops' ? 'active' : ''}`} onClick={() => onMenuClick('shops')}>
                    <FaShopSlash className="mr-2 flex justify-center items-center my-auto" />

                        Shops
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'products' ? 'active' : ''}`} onClick={() => onMenuClick('products')}>
                    <FaProductHunt className="mr-2 flex justify-center items-center my-auto" />
                        Products
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'categories' ? 'active' : ''}`} onClick={() => onMenuClick('categories')}>
                    <MdCategory className="mr-2 flex justify-center items-center my-auto" />
                        Categories
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className={`menu-item flex cursor-pointer text-md font-medium mt-5 py-2 ${selectedMenu === 'profile' ? 'active' : ''}`} onClick={() => onMenuClick('profile')}>
                    <CgProfile className="mr-2 flex justify-center items-center my-auto" />
                        Profile
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'settings' ? 'active' : ''}`} onClick={() => onMenuClick('settings')}>
                    <IoMdSettings className="mr-2 flex justify-center items-center my-auto" />
                        Settings
                    </div>
                    <div className={`menu-item flex cursor-pointer text-md font-medium py-2 ${selectedMenu === 'helps' ? 'active' : ''}`} onClick={() => onMenuClick('helps')}>
                    <IoMdHelpCircleOutline className="mr-2 flex justify-center items-center my-auto" />
                        Help
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
