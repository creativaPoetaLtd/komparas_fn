import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import MobileHomeNav from "../home/HomeMobileNav";
import HomeNav from "../home/HomeNav";
import SubNav from "../Navigations/SubNav";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api";

interface Service {
  _id: number;
  service_name: string;
  service_description: string;
  image: string;
}

const ServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/services`);
        setServices(response.data.advertisements);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching services:", err);
        setError(err.message || "Failed to fetch services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId: number): void => {
    navigate(`/services/${serviceId}`);
  };

  // Function to remove markdown formatting and truncate text
  const truncateText = (text: string, maxLength: number): string => {
    const plainText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/<u>(.*?)<\/u>/g, "$1")
      .replace(/\n/g, " ");

    if (plainText.length <= maxLength) {
      return plainText;
    }

    let truncated = plainText.substring(0, maxLength).trim();
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }

    return truncated + "...";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />

      <header className="bg-gradient-to-r from-primary-600 to-primary-800 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-3 text-black">
            Serivisi dutanga
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-black opacity-90">
            Menya byinshi dutanga nyuma yo kugura telefoni kandi utasanga ahandi
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent"></div>
      </header>

      <main className="container mx-auto px-6 py-12 cursor-default -mt-10 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg p-8">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-500 text-lg">
              No services available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-xl shadow-md border border-gray-200"
              >
                <div className="relative">
                  <div className="w-full h-56 bg-gray-300 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.service_name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.service_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
                    {truncateText(service.service_description, 150)}
                  </p>
                  <button
                    onClick={() => handleServiceClick(service._id)}
                    className="w-full bg-primary-600 text-black font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition duration-300 flex items-center justify-center"
                  >
                    <span>Learn More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-black">
            Interested in our services?
          </h2>
          <p className="text-lg max-w-lg mx-auto mb-8 text-black opacity-90">
            Get in touch with us today and learn more about how we can help you.
          </p>
          <button
            onClick={() => navigate("/contact_us")}
            className="bg-black text-white font-medium py-2 px-6 rounded hover:bg-slate-800 focus:outline-none"
          >
            Contact Us
          </button>
        </div>
        <div className="absolute left-0 top-0 w-full h-full opacity-10">
          <div className="absolute left-5 top-5 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute right-10 bottom-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full bg-white"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
