"use client";

import ShopDashboardLayout from "../../../components/ShopDashboardLayout.jsx";
import OrdersTable from "../../../components/dashboard/OrdersTable.jsx";

export default function OrdersPage() {
  return (
    <ShopDashboardLayout>
      <OrdersTable />
    </ShopDashboardLayout>
  );
}
