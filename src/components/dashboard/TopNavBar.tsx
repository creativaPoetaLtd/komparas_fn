import { FaBell, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { baseUrl } from "../../api";

const TopNavbar = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const socket = io(`${baseUrl}`);

    socket.on("newContactMessage", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="ml-[15%] px-3 py-2 shadow-sm">
      <div className="search-bar relative flex justify-between items-center">
        <div className="hello-user text-md font-medium">Hello, Admin</div>
        <div className="search-bar__left relative w-[35%] flex rounded-md">
          <div className="search-bar__right__icon absolute left-0 top-0 bottom-0 flex justify-center items-center pl-2">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="pl-8 py-3 outline-none w-full rounded-md"
          />
        </div>
        <div className="search-bar__right flex space-x-10">
          {/* Message Icon with Notification Count */}
          <div className="relative flex justify-center items-center text-2xl cursor-pointer"
               onClick={handleNotificationClick}>
            <FaMessage />
            {/* Notification count positioned relative to the message icon */}
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>

          <div className="search-bar__right__icon flex justify-center items-center text-2xl">
            <FaBell />
          </div>

          <div className="search-bar__right__icon flex text-4xl justify-center items-center">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="user"
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <div className="absolute top-16 right-12 w-64 bg-white shadow-lg rounded-md p-4">
          <h3 className="font-semibold mb-2">New Messages</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-1">
                <p className="font-bold">{notification.name}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <a
                  href="https://mail.google.com"
                  className="text-blue-500 text-xs underline"
                >
                  View in Gmail
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
