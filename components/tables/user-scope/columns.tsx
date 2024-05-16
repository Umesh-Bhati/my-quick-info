"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type User = {
  id: string;
  fund_no: string;
  dept_rel: string;
  action: ReactNode;
};

export const columns: (arg1: any, arg2: any) => ColumnDef<User>[] = (
  onDelete,
  isDeleting
) => [
  {
    accessorKey: "fund_no",
    header: "Funds",
  },
  {
    accessorKey: "dept_rel",
    header: "Depts",
  },

  {
    accessorKey: "Action",
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return (
        <Button
          onClick={() => onDelete(id)}
          variant={"outline"}
          className="bg-red-500 text-sm text-white"
        >
          {isDeleting == id && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Delete
        </Button>
      );
    },
  },
];
