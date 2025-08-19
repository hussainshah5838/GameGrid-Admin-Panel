import React from "react";
import ShipmentsTable from "../Components/Shipments/ShipmentsTable";
import StatsOverview from "../Components/dashboard/StatsOverview";

const ShipmentsPage = () => {
  return (
    <div>
      <StatsOverview />
      <ShipmentsTable />
    </div>
  );
};

export default ShipmentsPage;
