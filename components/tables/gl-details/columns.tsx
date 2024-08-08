"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
    cell: ({ row }: any) =>
      row.original.desc ? (
        <h1 className="text-primary-forground text-sm font-semiBold">
          Total: {row.original.desc}
        </h1>
      ) : (
        row.original.G_L_Account_Name
      ),
  },
  {
    accessorKey: "Posting_Date",
    header: "Posting Date",
    cell: ({
      row: {
        original: { Posting_Date },
      },
    }) => (Posting_Date ? format(Posting_Date, "MM-dd-yyyy") : ""),
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
    cell: ({
      row: {
        original: { total = 0, Amount, desc },
      },
    }) => {
      return desc ? (
        <td className={`text-sm font-semibold`}>
          {`$ ${
            +total < 0
              ? "(" + Number(total).toLocaleString().replace(/-/g, "") + ")"
              : Number(total).toLocaleString()
          }`}
        </td>
      ) : (
        <td className={`text-sm`}>
          {`$ ${
            Amount < 0
              ? "(" + Number(Amount).toLocaleString().replace(/-/g, "") + ")"
              : Number(Amount).toLocaleString()
          }`}
        </td>
      );
    },
  },
];

export const pdfColumns = [
  {
    accessorKey: "G_L_Account_No",
    header: "Account No.",
    flex: 0.6,
  },
  {
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
    flex: 1.8,
    showDescTitle: true,
  },
  {
    accessorKey: "Posting_Date",
    header: "Posting Date",
    cell: ({ Posting_Date }: any) =>
      Posting_Date ? format(Posting_Date, "MM-dd-yyyy") : "",
  },
  {
    accessorKey: "Description",
    header: "Description",
    flex: 2,
  },
  {
    accessorKey: "Document_No",
    header: "Document No",
    flex: 0.9,
  },
  {
    accessorKey: "External_Document_No",
    header: "External Document No",
    flex: 1.5,
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    isAmtsNum: true,
    showTotalAmt: true,
  },
];
