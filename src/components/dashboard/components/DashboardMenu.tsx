import React, { useState } from 'react';
import { 
  // LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  FolderOpen, 
  Briefcase, 
  Code, 
  ShoppingCart,
  Image,
  Settings,
  FileText,
  TrendingUp,
  Activity,
  Calendar,
  
} from 'lucide-react';

interface DashboardCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  // count: string | number;
  color: string;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, color, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  isHovered;
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-l-4 ${color} p-6 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
        </div>
        <div className={`text-2xl font-bold ${color.replace('border-', 'text-')}`}>
          {/* {count} */}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className={`mt-4 flex items-center text-sm ${color.replace('border-', 'text-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <span>View Details</span>
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, change, color }) => (
  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
        </p>
      </div>
      <div className={`p-2 rounded-full ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

interface DashboardMenuProps {
  onMenuClick?: (menu: string) => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ onMenuClick }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  selectedCard;
  const dashboardItems = [
    // {
    //   icon: LayoutDashboard,
    //   title: "Dashboard",
    //   description: "Overview of your business metrics and analytics",
    //   // count: "1",
    //   color: "border-blue-500",
    //   menuKey: "dashboard"
    // },
    {
      icon: Users,
      title: "Users",
      description: "Manage customer accounts and user profiles",
      // count: "2.4K",
      color: "border-green-500",
      menuKey: "users"
    },
    {
      icon: ShoppingBag,
      title: "Shops",
      description: "Store management and merchant dashboard",
      // count: "156",
      color: "border-purple-500",
      menuKey: "shops"
    },
    {
      icon: Package,
      title: "Products",
      description: "Product catalog and inventory management",
      // count: "8.9K",
      color: "border-orange-500",
      menuKey: "products"
    },
    {
      icon: FolderOpen,
      title: "Categories",
      description: "Product categorization and taxonomy",
      // count: "24",
      color: "border-pink-500",
      menuKey: "categories"
    },
    {
      icon: Briefcase,
      title: "Jobs",
      description: "Job listings and career opportunities",
      // count: "89",
      color: "border-indigo-500",
      menuKey: "jobs"
    },
    {
      icon: Code,
      title: "Kodes",
      description: "Promotional codes and discount management",
      // count: "145",
      color: "border-cyan-500",
      menuKey: "kodes"
    },
    {
      icon: ShoppingCart,
      title: "Ads",
      description: "Advertisement campaigns and promotions",
      // count: "67",
      color: "border-red-500",
      menuKey: "ads"
    },
    {
      icon: Image,
      title: "Banner Ads",
      description: "Banner advertisement management",
      // count: "23",
      color: "border-yellow-500",
      menuKey: "bunner ads" // Matching the sidebar key
    },
    {
      icon: Settings,
      title: "Services",
      description: "Service offerings and management",
      // count: "45",
      color: "border-teal-500",
      menuKey: "services"
    },
    {
      icon: FileText,
      title: "Blogs",
      description: "Content management and blog posts",
      // count: "127",
      color: "border-gray-500",
      menuKey: "blogs"
    }
  ];

  const stats = [
    { icon: TrendingUp, label: "Total Revenue", value: "1M+", change: 12, color: "bg-green-500" },
    { icon: Activity, label: "Active Admins", value: "20+", change: 8, color: "bg-blue-500" },
    { icon: ShoppingCart, label: "Orders", value: "500+", change: -3, color: "bg-orange-500" },
    { icon: Calendar, label: "This Month", value: "31 Days", change: 0, color: "bg-purple-500" }
  ];

  const handleCardClick = (menuKey: string) => {
    setSelectedCard(menuKey);
    if (onMenuClick) {
      onMenuClick(menuKey);
    }
    
  };

  const handleQuickAction = (action: string) => {
    if (onMenuClick) {
      onMenuClick(action);
    }
  };

  return (
    <div className="dashboard p-5 w-full min-h-screen h-fit flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KOMPARAS</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Dashboard Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              // count={item.count}
              color={item.color}
              onClick={() => handleCardClick(item.menuKey)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 text-left"
            onClick={() => handleQuickAction('products')}
          >
            <div className="flex items-center mb-2">
              <Package className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium">Add New Product</span>
            </div>
            <p className="text-sm text-gray-600">Create a new product listing</p>
          </button>
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-300 text-left"
            onClick={() => handleQuickAction('users')}
          >
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Manage Users</span>
            </div>
            <p className="text-sm text-gray-600">View and edit user accounts</p>
          </button>
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-300 text-left"
            onClick={() => handleQuickAction('blogs')}
          >
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-purple-500 mr-2" />
              <span className="font-medium">Create Blog Post</span>
            </div>
            <p className="text-sm text-gray-600">Write and publish new content</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;