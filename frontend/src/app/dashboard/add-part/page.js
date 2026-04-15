"use client";

import dynamic from "next/dynamic";

const ShopDashboardLayout = dynamic(
  () => import("../../../components/ShopDashboardLayout.jsx"),
  { ssr: false },
);
const AddNewPartForm = dynamic(
  () => import("../../../components/dashboard/AddNewPartForm.jsx"),
  { ssr: false },
);

export default function AddPartPage() {
  return (
    <ShopDashboardLayout>
      <AddNewPartForm />
    </ShopDashboardLayout>
  );
}
