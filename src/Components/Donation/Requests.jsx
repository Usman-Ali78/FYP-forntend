import React, { useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([
    { id: 1, ngo: "NGO XYZ", time: "Pickup in 1 hour", status: "Pending" },
    { id: 2, ngo: "NGO ABC", time: "Pickup in 3 hours", status: "Pending" },
  ]);

  const handleRequestAction = (id, status) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pickup Requests</h2>
      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-lg mb-4">
          Manage all food pickup requests from NGOs.
        </p>
        <ul className="mt-2 space-y-2">
          {requests.map((request) => (
            <li
              key={request.id}
              className="p-3 bg-gray-200 rounded flex justify-between items-center"
            >
              <span className="font-semibold">
                🚛 {request.ngo} - {request.time}
              </span>
              <div className="space-x-2">
                {request.status === "Pending" ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleRequestAction(request.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleRequestAction(request.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded ${
                      request.status === "Accepted"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {request.status}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Requests;