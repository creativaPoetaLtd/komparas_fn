import { CiLocationArrow1 } from "react-icons/ci";

const Location = ({ shopData }: any) => {
  return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="p-5">
              <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-500 p-2 rounded-full flex items-center justify-center">
                      <CiLocationArrow1 className="text-white text-xl" />
                  </div>
                  <div>
                      <p className="text-xs uppercase text-yellow-600 font-semibold tracking-wide">
                          Location
                      </p>
                      <h2 className="text-lg font-bold text-gray-800">
                          {shopData?.location || "Location not available"}
                      </h2>
                  </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2 pl-12">
                  {shopData?.description || "No additional details provided."}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <a 
                      href={`https://maps.google.com/?q=${shopData?.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center"
                  >
                      <span>View on map</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                  </a>
              </div>
          </div>
      </div>
  );
};

export default Location;
