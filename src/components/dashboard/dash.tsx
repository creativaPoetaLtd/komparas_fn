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
import JobApplicationsTable from './Jobs/JobList';
import KomparaKodeTable from './Codes/KomparasKodes';
import AdsManagementPage from './ads/AdsPage';
import AdvertisementList from './bunnerAds/bunnerAds';
import ServiceList from './services/Service';
import Blog from '../../components/blog/dashblog';

function Dashboard() {
    const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Set the default selected menu to 'dashboard'

    const handleMenuClick = (menu: React.SetStateAction<string>) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="app">
            <Sidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
            <div className="conten w-full">
                <TopNavbar />
                <div className="m min-h-screen ml-[15%]">
                    {selectedMenu === 'dashboard' && <DashboardMenu onMenuClick={handleMenuClick} />}
                    {selectedMenu === 'products' && <Products />}
                    {selectedMenu === 'categories' && <Categories />}
                    {selectedMenu === 'users' && <Users />}
                    {selectedMenu === 'shops' && <Shops />}
                    {selectedMenu === 'profile' && <Profile />}
                    {selectedMenu === 'settings' && <Settings />}
                    {selectedMenu === 'helps' && <Help />}
                    {selectedMenu === 'jobs' && <JobApplicationsTable />}
                    {selectedMenu === 'kodes' && <KomparaKodeTable />}
                    {selectedMenu === 'ads' && <AdsManagementPage />}
                    {selectedMenu === 'bunner ads' && <AdvertisementList />}
                    {selectedMenu === 'services' && <ServiceList />}
                    {selectedMenu === 'blogs' && <Blog />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;