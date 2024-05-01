"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function UsersTable({ data }: { data: any[] }) {
  return <DataTable columns={columns} data={data} fetchNextPage={() => {}} />;
}
