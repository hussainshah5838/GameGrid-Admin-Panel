import React from "react";
import StatsOverview from "../Components/dashboard/StatsOverview";
import UserTrafficChart from "../Components/dashboard/UserTrafficChart";
import TrafficCharts from "../Components/dashboard/TrafficCharts";

const DashboardContent = () => {
  return (
    <div>
      <StatsOverview />
      <UserTrafficChart />
      <TrafficCharts />
    </div>
  );
};

export default DashboardContent;
