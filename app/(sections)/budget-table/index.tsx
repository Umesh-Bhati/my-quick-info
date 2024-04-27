import BugdetForm from "@/components/forms/on-demand-reports/budget-vs-actual";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function BudgetTable(props: any) {
  return (
    <>
      <BugdetForm {...props} />
      <DataTable
        columns={columns}
        data={props?.budgetTableData || []}
        {...props}
      />
    </>
  );
}
