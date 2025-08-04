import axios from "axios";
import { useEffect, useState } from "react";

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
    return (
      <div className="flex justify-center">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-bold text-2xl">My Requests</h1>
      <div className="w-full max-w-4xl mt-4 flex flex-col gap-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="card card-side bg-base-300 shadow-sm"
          >
            <figure className="w-40 h-40">
              <img
                src={request.photoUrl}
                className="w-30 h-30 object-cover rounded-[50%]"
                alt="Connection User Profile picture"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{`${request.senderUserId.firstName} ${request.senderUserId.lastName}`}</h2>
              <p>{`${request.senderUserId.age}, ${request.senderUserId.gender}`}</p>
              <p>{request.senderUserId.bio}</p>
              <div className="card-actions justify-start">
                <button
                  onClick={() => handleReviewRequest(request._id, "accepted")}
                  className="btn btn-success mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReviewRequest(request._id, "rejected")}
                  className="btn btn-error"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={fetchRequests} className="btn btn-primary">
          Refresh Requests
        </button>
      </div>
    </div>
  );
};

export default Requests;
