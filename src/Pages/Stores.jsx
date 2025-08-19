import React from "react";
import StoresTable from "../Components/stores/StoresTable";
import StatsOverview from "../Components/dashboard/StatsOverview";

const Stores = () => {
  return (
    <div>
      <StatsOverview />
      <StoresTable />
    </div>
  );
};

export default Stores;
