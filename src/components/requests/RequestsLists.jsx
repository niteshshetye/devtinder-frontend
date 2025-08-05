import RequestCard from "./RequestCard";

const RequestsLists = ({ requests, handleReviewRequest }) => {
  return (
    <div className="w-full max-w-4xl mt-4 flex flex-col gap-4">
      {requests.map((request) => (
        <RequestCard
          request={request}
          handleReviewRequest={handleReviewRequest}
        />
      ))}
    </div>
  );
};

export default RequestsLists;
