import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";


const TermCard = ({ term, description }:{term:string, description:string}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 p-4">
      <button
        className="flex justify-between items-center w-full text-left text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-primary-600">{term}</h3>
        <span className="text-red-700">
          {isOpen ?  <AiFillMinusCircle className="text-[#EDB62E] text-2xl"/> : <AiFillPlusCircle className="text-[#EDB62E] text-2xl"/>}
        </span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600 text-lg">{description}</p>}
    </div>
  );
};

export default TermCard;
