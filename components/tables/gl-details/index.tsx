"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function GlDetailsTable(rest: any) {
  return <DataTable columns={columns} {...rest} />;
}
