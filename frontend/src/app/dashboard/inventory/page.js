"use client";

import ShopDashboardLayout from "../../../components/ShopDashboardLayout.jsx";
import InventoryTable from "../../../components/dashboard/InventoryTable.jsx";

export default function InventoryPage() {
  return (
    <ShopDashboardLayout>
      <InventoryTable />
    </ShopDashboardLayout>
  );
}
