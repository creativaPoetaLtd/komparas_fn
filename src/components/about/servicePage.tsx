
import Footer from '../Footer';
import MobileHomeNav from '../home/HomeMobileNav';
import HomeNav from '../home/HomeNav';
import SubNav from '../Navigations/SubNav';
import ServiceCard from './serviceCard';
import axios from 'axios';
import { baseUrl } from '../../api';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ServicePage = () => {

  const navigate = useNavigate();
  const [services, setServices] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get(`${baseUrl}/services`);
      setServices(response.data.advertisements);
    };
    fetchServices();
  }, []);
  
  const handleNavigation = (id: string) => {
    navigate(`/services/${id}`);
  };
  

    
  return (
    <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Serivisi dutanga</h1>
        <p className="text-xl">Menya byinshi dutanga nyuma yo kugura telefoni kandi utasanga ahandi</p>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.image}
              title={service.service_name}
              description={service.service_description}
              onNavigate={() => handleNavigation(service._id)}
            />
          ))}
        </div>
      </div>

      <div className="bg-primary-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Interested in our services?</h2>
        <p className="text-xl mb-6">Get in touch with us today and learn more about how we can help you.</p>
        <button className="bg-white text-primary-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
          Contact Us
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
