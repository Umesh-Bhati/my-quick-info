"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function ApInquiryTable(props: any) {
  return <DataTable columns={columns} whichTable="apInquiry" {...props} />;
}
