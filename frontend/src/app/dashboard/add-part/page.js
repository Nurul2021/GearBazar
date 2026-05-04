"use client";

import dynamic from "next/dynamic";

const AddNewPartForm = dynamic(
  () => import("../../../components/dashboard/AddNewPartForm.jsx"),
  { ssr: false },
);

export default function AddPartPage() {
  return <AddNewPartForm />;
}
