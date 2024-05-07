"use client";

import { fixedDecimal } from "@/lib/response-formatter/business-central";
import { StyleSheet, Text } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";

export type Budget = {
  id: string;
  G_L_Account_No: string;
  G_L_Account_Name: string;
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
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
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
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {row.original.mtd}
        </h1>
      ) : (
        row.original.mtd
      ),
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
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {row.original.openPurchOrd}
        </h1>
      ) : (
        row.original.openPurchOrd
      ),
  },
  {
    accessorKey: "openReq",
    header: "Open Req",
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {row.original.openReq}
        </h1>
      ) : (
        row.original.openReq
      ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) =>
      row.original?.desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {row.original.budget}
        </h1>
      ) : (
        row.original.budget
      ),
  },
  {
    accessorKey: "budget",
    header: "Available",
    cell: ({
      row: {
        original: { ytd, openPurchOrd, openReq, budget, desc },
      },
    }) =>
      desc ? (
        <h1 className="text-primary-forground text-sm font-bold">
          {fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq)}
        </h1>
      ) : (
        fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq)
      ),
  },
];
export const pdfColumns: ColumnDef<Budget>[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "GL Account",
  },
  {
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
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
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}> {row.ytd}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.ytd}</Text>
      ),
  },
  {
    accessorKey: "openReq",
    header: "Open Req",
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}> {row.openReq}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.openReq}</Text>
      ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: (row: any) =>
      row.desc ? (
        <Text style={styles.boldTxt}> {row.budget}</Text>
      ) : (
        <Text style={styles.cellTxt}> {row.budget}</Text>
      ),
  },
  {
    accessorKey: "budget",
    header: "Available",
    cell: ({ budget, ytd, openPurchOrd, openReq, desc }: any) =>
      desc ? (
        <Text style={styles.boldTxt}>
          {fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq)}
        </Text>
      ) : (
        <Text style={styles.cellTxt}>
          {fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq)}
        </Text>
      ),
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
