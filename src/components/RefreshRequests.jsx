import React from "react";

const RefreshRequests = ({ title = "", fetchData }) => {
  return (
    <div className="mt-4">
      <button onClick={fetchData} className="btn btn-primary">
        {title}
      </button>
    </div>
  );
};

export default RefreshRequests;
