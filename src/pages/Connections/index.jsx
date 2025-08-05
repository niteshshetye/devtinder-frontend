import axios from "axios";
import { useEffect, useState } from "react";

import NoDataFound from "../../components/NoDataFound";
import RefreshRequests from "../../components/RefreshRequests";
import ConnectionList from "../../components/connections/ConnectionList";
import ConnectionHeader from "../../components/connections/ConnectionHeader";

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
    return <NoDataFound message="No Connections Found" />;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <ConnectionHeader />
      <ConnectionList connections={connections} />
      <RefreshRequests
        title="Refresh Connections"
        fetchData={fetchConnections}
      />
    </div>
  );
};

export default Connections;
