"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type User = {
  id: string;
  fund_no: string;
  dept_rel: string;
  action: ReactNode;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fund_no",
    header: "Funds",
  },
  {
    accessorKey: "dept_rel",
    header: "Depts",
  },

  {
    accessorKey: "Edit",
    cell: ({ row: { original } }) => {
      return (
        <Button variant={"outline"} className="bg-red-500 text-white">
          <h1 className="text-sm">Delete</h1>
        </Button>
      );
    },
  },
];
