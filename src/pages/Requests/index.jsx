import axios from "axios";
import { useEffect, useState } from "react";

import NoDataFound from "../../components/NoDataFound";
import RefreshRequests from "../../components/RefreshRequests";
import RequestsLists from "../../components/requests/RequestsLists";
import RequestHeader from "../../components/requests/RequestHeader";

import { REQUESTS_URLS, USER_URLS } from "../../config/api";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data = {} } = await axios.get(USER_URLS.REQUESTS, {
        withCredentials: true,
      });
      setRequests(data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleReviewRequest = async (requestId, action) => {
    try {
      await axios.post(
        `${REQUESTS_URLS.REVIEW_REQUEST}/${action}/${requestId}`,
        {},
        { withCredentials: true }
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests.length) {
    return <NoDataFound message="No Requests Found" />;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <RequestHeader />
      <RequestsLists
        requests={requests}
        handleReviewRequest={handleReviewRequest}
      />
      <RefreshRequests title="Refresh Requests" fetchData={fetchRequests} />
    </div>
  );
};

export default Requests;
