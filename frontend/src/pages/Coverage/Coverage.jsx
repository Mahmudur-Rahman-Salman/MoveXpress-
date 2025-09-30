import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const districts = [
  { name: "Dhaka", coords: [23.8103, 90.4125] },
  { name: "Chattogram", coords: [22.3569, 91.7832] },
  { name: "Sylhet", coords: [24.8949, 91.8687] },
  { name: "Rajshahi", coords: [24.3745, 88.6042] },
  { name: "Khulna", coords: [22.8456, 89.5403] },
];

const Coverage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        We are available in all areas 🚚
      </h2>

      {/* Search Box (placeholder for now) */}
      <div className="form-control w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search your district..."
          className="input input-bordered w-full"
        />
      </div>

      {/* Map */}
      <div className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Map tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Markers for districts */}
          {districts.map((district, index) => (
            <Marker key={index} position={district.coords}>
              <Popup>{district.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
