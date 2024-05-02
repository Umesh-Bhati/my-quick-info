"use client";

import { ColumnDef } from "@tanstack/react-table";

export type VendorType = {
  G_L_Account_No: string;
  G_L_Account_Name: string;
  Posting_Date: string;
  Description: string;
  Document_No: string;
  Amount: number;
  External_Document_No: string;
  Vendor_No: string;
  Vendor_Name: string;
};

export const columns: ColumnDef<VendorType>[] = [
  {
    accessorKey: "Posting_Date",
    header: "Document Date",
  },
  {
    accessorKey: "Document_Type",
    header: "Document Type",
  },
  {
    accessorKey: "Document_No",
    header: "Document No",
  },

  {
    accessorKey: "External_Document_No",
    header: "External Document No",
  },
  {
    accessorKey: "Vendor_No",
    header: "Vendor No",
  },
  {
    accessorKey: "Vendor_Name",
    header: "Vendor Name",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
];
