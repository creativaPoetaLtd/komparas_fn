import React from "react";
interface GoogleMapSectionProps {
  apiKey: string;
}

const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({ apiKey }) => {


  return (
    <div className="GoogleMapSection md:block hidden mt-12">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Space+Needle,Seattle+WA`}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMapSection;
