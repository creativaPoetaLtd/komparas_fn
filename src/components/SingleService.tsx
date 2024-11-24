import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../api';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import HomeNav from './home/HomeNav';
import MobileHomeNav from './home/HomeMobileNav';
import SubNav from './Navigations/SubNav';



const SingleServicePage: React.FC<any> = ({

}) => {

    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<any | null>(null);

    React.useEffect(() => {
        const fetchService = async () => {
            const response = await axios.get(`${baseUrl}/services/${id}`);
            setService(response?.data?.advertisement);
        };
        fetchService();
    }, [id]);

    if (!service) {
        return <p>Loading...</p>;
    }


  return (
    <div className='w-full'>
        <HomeNav    />
        <MobileHomeNav />
        <SubNav />
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-[400px] relative">
            <img 
              src={service?.image} 
              alt={service?.service_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {service?.service_name}
            </h1>
            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </div>
  );
};

export default SingleServicePage;