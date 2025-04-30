import { CgPhone } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";

const ShopContact = ({ shopData }: any) => {
  return (
    <div className="w-full rounded-lg shadow-md p-4 bg-white my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location Section */}
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <CiLocationArrow1 className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Location</h3>
            <p className="text-gray-600">
              {shopData?.location || "Location not available"}
            </p>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <CgPhone className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Call Us</h3>
            <p className="text-gray-600">{shopData?.phone || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-4">
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          {shopData ? (
            <iframe
              src={shopData.location_discription}
              className="w-full h-full border-0"
              title="Shop Location Map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Map not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopContact;
