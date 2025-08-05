const ConnectionCard = ({ connection = {} }) => {
  return (
    <div className="card card-side bg-base-300 shadow-sm">
      <figure className="w-40 h-40">
        <img
          src={connection.photoUrl}
          className="w-30 h-30 object-cover rounded-[50%]"
          alt="Connection User Profile picture"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${connection.firstName} ${connection.lastName}`}</h2>
        <p>{`${connection.age}, ${connection.gender}`}</p>
        <p>{connection.bio}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
