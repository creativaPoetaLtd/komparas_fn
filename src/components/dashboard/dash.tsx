// src/App.js
import React, { useState } from 'react';
import Sidebar from './SideBar';
import TopNavbar from './TopNavBar';
import DashboardMenu from './components/DashboardMenu';
import Products from './components/Products';
import Categories from './components/Categories';
import Users from './components/Users';
import Shops from './components/Shops';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Help from './components/Help';


function Dashboard() {
    const [selectedMenu, setSelectedMenu] = useState('home');

    const handleMenuClick = (menu: React.SetStateAction<string>) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="app">
            <Sidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
            <div className="conten w-full">
                <TopNavbar />
                <div className="m min-h-screen">
                    {selectedMenu === 'dashboard' && <DashboardMenu />}
                    {selectedMenu === 'products' && <Products />}
                    {selectedMenu === 'categories' && <Categories />}
                    {selectedMenu === 'users' && <Users />}
                    {selectedMenu === 'shops' && <Shops />}
                    {selectedMenu === 'profile' && <Profile />}
                    {selectedMenu === 'settings' && <Settings />}
                    {selectedMenu === 'helps' && <Help />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
