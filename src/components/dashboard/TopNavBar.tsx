import { FaBell, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const TopNavbar = () => {
  return (
    <div className="ml-[15%] px-3 py-2 shadow-sm">
      <div className="search-bar relative flex justify-between items-center">
        <div className="hello-user text-md font-medium">Hello, Admin</div>
        <div className="search-bar__left relative w-[35%] flex rounded-md">
          <div className="search-bar__right__icon absolute left-0 top-0 bottom-0 flex justify-center items-center pl-2">
            <FaSearch />
          </div>
          <input type="text" placeholder="Search" className="pl-8 py-3 outline-none w-full rounded-md" />
        </div>
        <div className="search-bar__right flex space-x-10 ">
        <div className="search-bar__right__icon flex justify-center items-center text-2xl">
            <FaMessage />
          </div>
          <div className="search-bar__right__icon flex justify-center items-center text-2xl">
            <FaBell />
          </div>
          <div className="search-bar__right__icon flex text-4xl justify-center items-center">
            <img src="https://i.pravatar.cc/150?img=8" alt="user" className="w-[40px] h-[40px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;


