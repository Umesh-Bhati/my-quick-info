"use client";

import { StyleSheet, Text } from "@react-pdf/renderer";
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
export const pdfColumns: ColumnDef<Budget>[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "GL Account",
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}>Total: {row.desc}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.Description}</Text>
      ),
  },
  {
    accessorKey: "mtd",
    header: "MTD",
  },
  {
    accessorKey: "ytd",
    header: "YTD",
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}> {row.ytd}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.ytd}</Text>
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

const styles = StyleSheet.create({
  cellTxt: {
    textAlign: "center",
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
