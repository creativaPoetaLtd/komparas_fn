/* eslint-disable @typescript-eslint/no-explicit-any */

const ServiceCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <div className="text-center">
      <div className="text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[#EDB62E]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default ServiceCard;
