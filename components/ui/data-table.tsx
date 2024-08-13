"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./skeleton";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNext?: boolean;
  whichTable?: "budget" | "glDetails" | "apInquiry";
}

export const columnConfig: any = {
  budget: {
    mtd: { isAmt: true },
    ytd: { isAmt: true },
    openPurchOrd: { isAmt: true },
    openReq: { isAmt: true },
    budget: { isAmt: true },
    total: { isAmt: true },
    available:{isAmt: true}
  },
  glDetails: {
    Amount: { isAmt: true },
  },
  apInquiry: {
    Amount: {
      isAmt: true,
    },
  },
};

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchNextPage,
  isFetchingNext,
  whichTable,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = table.getRowModel();

  const containerRef = useBottomScrollListener<any>(
    !!fetchNextPage ? fetchNextPage : () => {}
  );

  return (
    <div
      style={{
        position: "relative",
        overflow: "auto",
        maxHeight: "900px",
        scrollbarWidth: "none",
      }}
      className={`rounded-md  border bg-accent/30 ${
        data.length > 0 ? "min-h-fit" : "min-h-[700px]"
      } `}
      ref={containerRef}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="bg-muted" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const accerssorKey = header.id;
                const { isAmt = false } = whichTable
                  ? columnConfig[whichTable]?.[accerssorKey] || {}
                  : {};
                return (
                  <TableHead
                    className={`${
                      isAmt ? "text-right" : "text-center"
                    } text-sm min-w-20 font-bold`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      className={`text-center min-w-48 border-r border`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {isFetchingNext &&
            new Array(80).fill(null).map((_, rowKey) => (
              <TableRow key={rowKey}>
                {table.getHeaderGroups()[0].headers.map((_, key) => (
                  <TableCell className="text-center border-r" key={key}>
                    <Skeleton key={key} className="h-8" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data.length === 0 && (
        <h1 className="text-sm text-center mt-72 align-center text-[#181C32]">
          No results
        </h1>
      )}
    </div>
  );
}
