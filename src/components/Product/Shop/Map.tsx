import React, { useState } from "react";
import * as GoogleMapsApi from '@react-google-maps/api';

const { GoogleMap, LoadScript } = GoogleMapsApi;
interface GoogleMapSectionProps {
  apiKey: string;
}

const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({ apiKey }) => {
  const [, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  return (
    <div className="GoogleMapSection md:block hidden mt-12">
      <LoadScript googleMapsApiKey={apiKey} id="google-map-script">
        <GoogleMap
          id="shop-map"
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          zoom={10}
          center={{
            lat: -2.001373,
            lng: 30.061884,
          }}
          onLoad={onLoad}
        />
      </LoadScript>
    </div>
  );
};

export default GoogleMapSection;
