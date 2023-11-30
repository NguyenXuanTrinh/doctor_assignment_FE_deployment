import React from "react";
import GoogleMapReact from "google-map-react";
import { EnvironmentFilled } from "@ant-design/icons";
const AnyReactComponent = () => (
  <div className="relative">
    <div className="text-white text-xl font-semibold absolute top-[-50px]">
      Your address
    </div>
    <EnvironmentFilled style={{ fontSize: 20, color: "red" }} />
  </div>
);

const Map = ({ position, setPosition }) => {
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  return (
    <div style={{ height: "400px", width: "60%" }}>
      <GoogleMapReact
        center={position}
        bootstrapURLKeys={{ key: "AIzaSyCvk6qLs0y58YjjslBybB35L911KfMKTXE" }}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={(value) => {
          setPosition({ lat: value?.lat, lng: value?.lng });
        }}
      >
        <AnyReactComponent lat={position?.lat} lng={position?.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
