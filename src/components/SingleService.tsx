import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNav from "./home/HomeNav";
import MobileHomeNav from "./home/HomeMobileNav";
import SubNav from "./Navigations/SubNav";
import { baseUrl } from "../api";

interface Service {
  _id: number;
  service_name: string;
  service_description: string;
  image: string;
}

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

const SingleServicePage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/services/${id}`);
        setService(response?.data?.advertisement);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching service:", err);
        setError(err.message || "Failed to fetch service details");
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Function to render markdown content
  const renderMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      .replace(/\n/g, "<br />")
      .replace(/^(\d+)\.\s(.+)$/gm, "<ol><li>$2</li></ol>")
      .replace(/^-\s(.+)$/gm, "<ul><li>$1</li></ul>");
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <HomeNav />
        <MobileHomeNav />
        <SubNav />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <HomeNav />
        <MobileHomeNav />
        <SubNav />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">
            {error || "Service not found"}
          </h2>
          <button
            onClick={() => navigate("/serivisi")}
            className="bg-primary-600 text-black px-4 py-2 rounded"
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <HomeNav />
      <MobileHomeNav />
      <SubNav />
      <main className="mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-96 relative">
            <img
              src={service.image}
              alt={service.service_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.service_name}
            </h1>

            <div
              className="prose prose-lg text-gray-700 max-w-none mt-6"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(service.service_description),
              }}
            />

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => navigate("/serivisi")}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleServicePage;
