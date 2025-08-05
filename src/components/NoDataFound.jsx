const NoDataFound = ({ message = "" }) => {
  return (
    <div className="flex justify-center">
      <h1 className="text-bold text-2xl">{message}</h1>
    </div>
  );
};

export default NoDataFound;
