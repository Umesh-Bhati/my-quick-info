"use client";

import { ColumnDef } from "@tanstack/react-table";

export type GlDetail = {
  G_L_Account_No: string;
  G_L_Account_Name: string;
  Posting_Date: string;
  Description: string;
  Document_No: string;
  Amount: number;
  External_Document_No: string;
};

export const columns: ColumnDef<GlDetail>[] = [
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
    accessorKey: "Document_No",
    header: "Vendor No",
  },
  {
    accessorKey: "External_Document_No",
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
