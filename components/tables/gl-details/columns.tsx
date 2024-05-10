"use client";

import { StyleSheet, Text } from "@react-pdf/renderer";
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
        <h1
          className={`${
            +total !== 0
              ? +total > 0
                ? "text-green-600"
                : "text-red-600"
              : ""
          } text-primary-forground text-sm font-semiBold`}
        >
          {total}
        </h1>
      ) : (
        <h1
          className={`${
            +Amount !== 0
              ? +Amount > 0
                ? "text-green-500"
                : "text-red-500"
              : " "
          } text-primary-forground text-sm `}
        >
          {Amount}
        </h1>
      );
    },
  },
];

export const pdfColumns = [
  {
    accessorKey: "G_L_Account_No",
    header: "Account No.",
    width: "10%",
  },
  {
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}> Total: {row.desc}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.G_L_Account_Name}</Text>
      ),

    width: "18.4%",
  },
  {
    accessorKey: "Posting_Date",
    header: "Posting Date",
    width: "10%",
  },
  {
    accessorKey: "Description",
    header: "Description",
    width: "22%",
  },
  {
    accessorKey: "Document_No",
    header: "Document No",
  },
  {
    accessorKey: "External_Document_No",
    header: "External Document No",
    width: "16%",
  },
  {
    accessorKey: "Amount",
    header: "Amount",

    cell: (row: any) =>
      row.desc ? (
        <Text
          style={[
            styles.boldTxt,
            +row.total !== 0
              ? {
                  color:
                    +row.total > 0 ? "rgb(22, 163, 74)" : "rgb(220, 38, 38)",
                }
              : {},
          ]}
        >
          {row.total}
        </Text>
      ) : (
        <Text
          style={[
            styles.cellTxt,
            +row.Amount !== 0
              ? {
                  color:
                    +row.Amount > 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
                }
              : {},
          ]}
        >
          {row.Amount}
        </Text>
      ),
    width: "10%",
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
