"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetTable from "./budget-table";
import { useBudgetTable } from "@/hooks";
import GlForm from "@/components/forms/on-demand-reports/GlForm";
import GlDetailsTable from "@/components/tables/gl-details";
import useGlDetailTable from "@/hooks/useGlDetailTable";

export default function TabSection() {
  const budgetController = useBudgetTable();
  const glDetailsController = useGlDetailTable();

  return (
    <Tabs defaultValue="budgetVsActual">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="budgetVsActual">Budget vs Actual</TabsTrigger>
        <TabsTrigger value="glDetails">GL Detail</TabsTrigger>
        <TabsTrigger value="another">API Inquiry</TabsTrigger>
      </TabsList>
      <TabsContent className={"flex  flex-col"} value="budgetVsActual">
        <BudgetTable {...budgetController} />
      </TabsContent>
      <TabsContent className={"flex  flex-col"} value="glDetails">
        <GlForm {...glDetailsController} />
        <GlDetailsTable data={glDetailsController.glTableData} />
      </TabsContent>
    </Tabs>
  );
}
