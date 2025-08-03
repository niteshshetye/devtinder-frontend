import axios from "axios";
import { useEffect, useState } from "react";

import { USER_URLS } from "../../config/api";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const { data = {} } = await axios.get(USER_URLS.CONNECTIONS, {
        withCredentials: true,
      });
      setConnections(data.data || []);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections.length) {
    return (
      <div className="flex justify-center">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-bold text-2xl">My Connections</h1>
      <div className="w-full max-w-4xl mt-4">
        {connections.map((connection) => (
          <div className="card card-side bg-base-300 shadow-sm">
            <figure className="w-28 h-[133px]">
              <img
                src={connection.photoUrl}
                className="w-full h-full object-cover"
                alt="Connection User Profile picture"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{`${connection.firstName} ${connection.lastName}`}</h2>
              <p>{`${connection.age}, ${connection.gender}`}</p>
              <p>{connection.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={fetchConnections} className="btn btn-primary">
          Refresh Connections
        </button>
      </div>
    </div>
  );
};

export default Connections;
