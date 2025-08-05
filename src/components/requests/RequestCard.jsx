const RequestCard = ({ request = {}, handleReviewRequest }) => {
  console.log({ photoUrl: request });

  return (
    <div key={request._id} className="card card-side bg-base-300 shadow-sm">
      <figure className="w-40 h-40">
        <img
          src={request.senderUserId.photoUrl}
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
  );
};

export default RequestCard;
