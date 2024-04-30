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
  total?: string;
  desc?: string;
};

export const columns: ColumnDef<GlDetail>[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "Account No.",
  },
  {
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
    cell: ({ row }) =>
      row.original.desc ? (
        <h1 className="text-primary-forground text-sm font-semiBold">
          Total:{row.original.desc}
        </h1>
      ) : (
        row.original.G_L_Account_Name
      ),
  },
  {
    accessorKey: "Posting_Date",
    header: "Posting Date",
  },
  {
    accessorKey: "Description",
    header: "Description",
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
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ row }) =>
      row.original.desc ? (
        <h1 className="text-primary-forground text-sm font-semiBold">
          {row.original.total}
        </h1>
      ) : (
        row.original.Amount
      ),
  },
];
