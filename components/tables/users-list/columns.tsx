"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PenSquareIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  active: boolean;
  editBtn: ReactNode;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_admin",
    header: "Is Admin",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "Edit",
    cell: ({ row: { original } }) => {
      return (
        <Button variant={"outline"} size={"icon"}>
          <Link href={`/profile?email=${original?.email}`}>
            <PenSquareIcon className="w-6 h-6 text-foreground/60" />
          </Link>
        </Button>
      );
    },
  },
];
