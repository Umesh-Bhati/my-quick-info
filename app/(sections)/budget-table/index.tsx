"use client";
import BugdetForm, { IBugdet } from "@/components/forms/BudgetForm";
import { Budget, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface IBugdetTable extends IBugdet {
  budgetTableData: Budget[];
}

export default function BudgetTable(props: IBugdetTable) {
  return (
    <>
      <BugdetForm {...props} />
      <DataTable columns={columns} data={props?.budgetTableData || []} />
    </>
  );
}
