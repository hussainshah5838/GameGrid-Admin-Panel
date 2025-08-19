import React from "react";
import OrderListTable from "../Components/userlist/OrderListTable";
import StatsOverview from "../Components/dashboard/StatsOverview";

const UsersPage = () => {
  return (
    <div>
      <StatsOverview />
      <OrderListTable />
    </div>
  );
};

export default UsersPage;
