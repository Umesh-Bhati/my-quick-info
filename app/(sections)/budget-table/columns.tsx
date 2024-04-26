"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Budget = {
  id: string;
  G_L_Account_No: string;
  Description: string;
  mtd: string;
  ytd: string;
  openPurchOrd: string;
  openReq: string;
  budget: string;
};

export const columns: ColumnDef<Budget>[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "GL Account",
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
  {
    accessorKey: "mtd",
    header: "MTD",
  },
  {
    accessorKey: "ytd",
    header: "YTD",
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
