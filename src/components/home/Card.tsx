import React from 'react';
// import { CardProps } from './types'; // Define your card props interface

const Card: React.FC = ({ title, description, imageUrl }:any) => {
  return (
    <div className="bg-white shadow-md p-4">
      <img className="w-full h-40 object-cover mb-4" src={imageUrl} alt={title} />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
