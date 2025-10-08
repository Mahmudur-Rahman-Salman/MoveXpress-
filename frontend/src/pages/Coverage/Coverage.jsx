import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLoaderData } from "react-router";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper: smoothly fly to a district
function FlyToDistrict({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 10, { duration: 1.5 });
  }
  return null;
}

const Coverage = () => {
  const districts = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    // Case-insensitive + partial match
    const found = districts.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (found) {
      setActiveCoords([found.latitude, found.longitude]);
      setActiveDistrict(found.district);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        We are available in all areas 🚚
      </h2>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="form-control w-full max-w-md mb-8 flex flex-row"
      >
        <input
          type="text"
          placeholder="Search your district..."
          className="input input-bordered flex-1 rounded-l-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-r-md">
          Go
        </button>
      </form>

      {/* Map */}
      <div className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Smooth fly when district selected */}
          <FlyToDistrict coords={activeCoords} />

          {/* Markers */}
          {districts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
            >
              <Popup autoOpen={district.district === activeDistrict}>
                <strong>{district.district}</strong> ({district.region}) <br />
                City: {district.city} <br />
                Areas: {district.covered_area.join(", ")} <br />
                Status: {district.status} <br />
                <a
                  href={district.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
