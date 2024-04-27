"use client";
import { GlDetail, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function GlDetailsTable({
  data,
  ...rest
}: {
  data: GlDetail[];
}) {
  return <DataTable columns={columns} data={data} {...rest} />;
}
