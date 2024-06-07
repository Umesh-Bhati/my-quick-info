"use client";

import { fixedDecimal } from "@/lib/response-formatter/business-central";
import { Text } from "@react-pdf/renderer";
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

const renderTableNumCell = (val: number, isBold?: string | boolean) => {
  if (+val === 0) return "";
  return (
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
      {`$ ${Number(val).toLocaleString()}`}
    </h1>
  );
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

type PDFColType = ColumnDef<Budget> & {
  isAmtsNum?: boolean;
  flex?: number;
  showTotalAmt?: boolean;
  showDescTitle?: boolean;
};

export const pdfColumns: PDFColType[] = [
  {
    accessorKey: "G_L_Account_No",
    header: "GL Account",
    flex: 0.8,
  },
  {
    accessorKey: "G_L_Account_Name",
    header: "G/L Account Name",
    flex: 1.7,
    showDescTitle: true,
  },
  {
    accessorKey: "mtd",
    header: "MTD",
    isAmtsNum: true,
  },
  {
    accessorKey: "ytd",
    header: "YTD",
    isAmtsNum: true,
  },
  {
    accessorKey: "openPurchOrd",
    header: "Open Purch Ord",
    flex: 1.5,
    isAmtsNum: true,
  },
  {
    accessorKey: "openReq",
    header: "Open Req",
    isAmtsNum: true,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    isAmtsNum: true,
    showTotalAmt: true,
  },
  {
    accessorKey: "available",
    header: "Available",
    isAmtsNum: true,
    cell: ({ budget, ytd, openPurchOrd, openReq }: any) => {
      const val: number = fixedDecimal(
        +budget - +ytd - +openPurchOrd - +openReq
      );
      if (+val < 0)
        return (
          <Text style={{ color: "rgb(239, 68, 68)" }}>
            {`$ ${Number(val).toLocaleString()}`}{" "}
          </Text>
        );
      return `$ ${Number(val).toLocaleString()}`;
    },
  },
];
