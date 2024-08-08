"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
    cell: ({
      row: {
        original: { Posting_Date },
      },
    }) => (Posting_Date ? format(Posting_Date, "MM-dd-yyyy") : ""),
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
    cell: ({
      row: {
        original: { Amount },
      },
    }) => (
      <td className={`text-sm font-semiBold`}>
        {`$ ${
          +Amount < 0
            ? "(" + Number(Amount).toLocaleString().replace(/-/g, "") + ")"
            : Number(Amount).toLocaleString()
        }`}
      </td>
    ),
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
];

export const pdfColumns = [
  {
    accessorKey: "Posting_Date",
    header: "Document Date",
  },
  {
    accessorKey: "Document_Type",
    header: "Document Type",
    flex: 0.8,
  },
  {
    accessorKey: "Document_No",
    header: "Document No",
    flex: 0.8,
  },

  {
    accessorKey: "External_Document_No",
    header: "External Document No",
    flex: 1.5,
  },
  {
    accessorKey: "Vendor_No",
    header: "Vendor No",
    flex: 0.8,
  },
  {
    accessorKey: "Vendor_Name",
    header: "Vendor Name",
    flex: 0.8,
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    isAmtsNum: true,
    flex: 0.7,
  },
  {
    accessorKey: "Description",
    header: "Description",
    flex: 2.5,
  },
];
