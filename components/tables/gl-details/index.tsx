"use client";
import { calTotalOfGlTable } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function GlDetailsTable(rest: any) {
  return (
    <DataTable
      columns={columns}
      whichTable="glDetails"
      {...rest}
      data={calTotalOfGlTable(
        rest.data,
        "G_L_Account_No",
        "G_L_Account_Name",
        "Amount"
      )}
    />
  );
}
