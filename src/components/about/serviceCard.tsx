/* eslint-disable @typescript-eslint/no-explicit-any */

const ServiceCard = ({ icon, title, description, onNavigate }: { icon: any, title: string, description: string, onNavigate:any }) => (
  <div
    onClick={onNavigate}
   className="bg-white shadow-lg rounded-lg p-6">
    <div className="text-center">
      <div className="text-primary-500 mb-4">
        <img src={icon} alt={title} className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-[#EDB62E]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default ServiceCard;
