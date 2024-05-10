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

const renderTableNumCell = (val: number, isBold?: string | boolean) => (
  <h1
    className={`${!!isBold ? "font-bold text-[14.5px]" : "text-sm"} ${
      +val !== 0
        ? +val > 0
          ? isBold
            ? "text-green-600"
            : "text-green-500"
          : isBold
          ? "text-red-600"
          : "text-red-500"
        : ""
    } text-primary-forground  `}
  >
    {val}
  </h1>
);

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
        row.original.G_L_Account_Name
      ),
  },
  {
    accessorKey: "mtd",
    header: "MTD",
    cell: ({
      row: {
        original: { desc, mtd },
      },
    }) => renderTableNumCell(+mtd, desc),
  },
  {
    accessorKey: "ytd",
    header: "YTD",

    cell: ({
      row: {
        original: { desc, ytd },
      },
    }) => renderTableNumCell(+ytd, desc),
  },
  {
    accessorKey: "openPurchOrd",
    header: "Open Purch Ord",

    cell: ({
      row: {
        original: { desc, openPurchOrd },
      },
    }) => renderTableNumCell(+openPurchOrd, desc),
  },
  {
    accessorKey: "openReq",
    header: "Open Req",

    cell: ({
      row: {
        original: { desc, openReq },
      },
    }) => renderTableNumCell(+openReq, desc),
  },
  {
    accessorKey: "budget",
    header: "Budget",

    cell: ({
      row: {
        original: { desc, budget },
      },
    }) => renderTableNumCell(+budget, desc),
  },
  {
    accessorKey: "budget",
    header: "Available",
    cell: ({
      row: {
        original: { ytd, openPurchOrd, openReq, budget, desc },
      },
    }) => {
      const avlVal = fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq);
      return renderTableNumCell(avlVal, desc);
    },
  },
];

const renderNumCell = (val: number, isBold?: string | boolean) => {
  return !!isBold ? (
    <Text
      style={[
        styles.boldTxt,
        +val !== 0
          ? { color: +val > 0 ? "rgb(22, 163, 74)" : "rgb(220, 38, 38)" }
          : {},
      ]}
    >
      {val}
    </Text>
  ) : (
    <Text
      style={[
        styles.cellTxt,
        +val !== 0
          ? { color: +val > 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)" }
          : {},
      ]}
    >
      {val}
    </Text>
  );
};

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
        <Text style={styles.cellTxt}> {row.G_L_Account_Name}</Text>
      ),
  },
  {
    accessorKey: "mtd",
    header: "MTD",
    cell: (row: any) => renderNumCell(row.mtd, row?.desc),
  },
  {
    accessorKey: "ytd",
    header: "YTD",
    cell: (row: any) => renderNumCell(row.ytd, row?.desc),
  },
  {
    accessorKey: "openPurchOrd",
    header: "Open Purch Ord",
    cell: (row: any) => renderNumCell(row.openPurchOrd, row?.desc),
  },
  {
    accessorKey: "openReq",
    header: "Open Req",
    cell: (row: any) => renderNumCell(row.openReq, row?.desc),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: (row: any) => renderNumCell(row.budget, row?.desc),
  },
  {
    accessorKey: "budget",
    header: "Available",
    cell: ({ budget, ytd, openPurchOrd, openReq, desc }: any) => {
      const avlVal = fixedDecimal(+budget - +ytd - +openPurchOrd - +openReq);
      return renderNumCell(avlVal, desc);
    },
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
    textAlign: "left",
    color: "#000000",
    fontSize: 9,
  },
});
