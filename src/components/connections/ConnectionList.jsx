import ConnectionCard from "./ConnectionCard";

const ConnectionList = ({ connections = [] }) => {
  return (
    <div className="w-full max-w-4xl mt-4 flex flex-col gap-4">
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connection={connection} />
      ))}
    </div>
  );
};

export default ConnectionList;
