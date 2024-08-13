import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function BudgetTable(props: any) {
  return <DataTable columns={columns} whichTable="budget" {...props} />;
}
