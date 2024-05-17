"use client";

import { Text } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { StyleSheet } from "@react-pdf/renderer";

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
      <h1
        className={`${
          +Amount !== 0 ? (+Amount > 0 ? "text-green-500" : "text-red-500") : ""
        } text-primary-forground text-sm font-semiBold`}
      >
        {Amount}
      </h1>
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
    cell: ({ Amount }: any) => (
      <Text
        style={{
          fontSize: 8,
          color:
            +Amount !== 0
              ? +Amount > 0
                ? "rgb(22, 163, 74)"
                : "rgb(220, 38, 38)"
              : "#000",
        }}
      >
        {Amount}
      </Text>
    ),
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
];

const styles = StyleSheet.create({
  cellTxt: {
    textAlign: "left",
    fontSize: 8,
    fontWeight: "normal",
  },
  boldTxt: {
    fontWeight: "ultrabold",
    textAlign: "center",
    color: "#000000",
    fontSize: 9,
  },
});
