"use client";

import { ColumnDef } from "@tanstack/react-table";


export type Budget = {
  id: string;
  G_L_Account_No: string;
  Description: string;
  mtd: string;
  ytd: string;
  openPurchOrd: string;
  openReq: string;
  budget: string;
  total?: string;
  desc?: string;
};

export const columns: ColumnDef<Budget>[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "GL Account",
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          Total: {row.original.desc}
        </h1>
      ) : (
        row.original.Description
      ),
  },
  {
    accessorKey: "mtd",
    header: "MTD",
  },
  {
    accessorKey: "ytd",
    header: "YTD",
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {row.original.ytd}
        </h1>
      ) : (
        row.original.ytd
      ),
  },
  {
    accessorKey: "openPurchOrd",
    header: "Open Purch Ord",
  },
  {
    accessorKey: "openReq",
    header: "Open Req",
  },
  {
    accessorKey: "budget",
    header: "Budget",
  },
];
