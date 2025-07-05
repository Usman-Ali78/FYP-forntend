import React, { useState } from "react";

const Map = () => {
  const [ngosNearby, setNgosNearby] = useState([
    { id: 1, name: "NGO Help", distance: "2.5 km" },
    { id: 2, name: "Food Aid", distance: "3.1 km" },
    { id: 3, name: "Hunger Relief", distance: "4.2 km" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Partnered NGOs</h2>
      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-lg mb-4">
          NGOs you are currently partnered with.
        </p>
        <ul className="mt-2 space-y-2">
          {ngosNearby.map((ngo) => (
            <li
              key={ngo.id}
              className="p-3 bg-gray-200 rounded flex justify-between items-center"
            >
              <div>
                <span className="font-semibold">📍 {ngo.name}</span>
                <p className="text-sm text-gray-500">{ngo.distance} away</p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Contact
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;