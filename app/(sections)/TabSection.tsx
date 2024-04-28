"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetTable from "./budget-table";
import { useBudgetTable } from "@/hooks";
import GlForm from "@/components/forms/on-demand-reports/gl-details";
import GlDetailsTable from "@/components/tables/gl-details";
import useGlDetailTable from "@/hooks/useGlDetailTable";
import ApInquiryTable from "@/components/tables/ap-inquiry";
import ApInquiryForm from "@/components/forms/on-demand-reports/ap-inquiry";
import BugdetForm from "@/components/forms/on-demand-reports/budget-vs-actual";
import { useFetchDepartments, useFetchFunds } from "@/hooks/business-central";
import { useEffect } from "react";
import { bcTableFormatters } from "@/lib/response-formatter/business-central";

export default function TabSection() {
  const budgetController = useBudgetTable();
  const glDetailsController = useGlDetailTable();
  const departmentProps = useFetchDepartments();
  const fundsProps = useFetchFunds();

  useEffect(() => {
    fundsProps.fetchFunds('on-submit');
    departmentProps.fetchDepartments('on-submit');
  }, []);

  return (
    <Tabs defaultValue="budgetVsActual">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="budgetVsActual">Budget vs Actual</TabsTrigger>
        <TabsTrigger value="glDetails">GL Detail</TabsTrigger>
        <TabsTrigger value="apInquiry">AP Inquiry</TabsTrigger>
      </TabsList>
      <TabsContent className={"flex  flex-col"} value="budgetVsActual">
        <BugdetForm
          onSubmit={budgetController.onSubmit}
          fundList={fundsProps.data.value}
          isDepartmentLoading={departmentProps.isLoading}
          isFundLoading={fundsProps.isLoading}
          departmentList={departmentProps.data.value}
          form={budgetController.form}
          isReqLoading={budgetController.isLoading}
        />
        <BudgetTable
          {...budgetController}
          data={bcTableFormatters.budgetTable(
            budgetController.data.value,
            budgetController.form.watch("endDate")
          )}
        />
      </TabsContent>
      <TabsContent className={"flex  flex-col"} value="glDetails">
        <GlForm
          onSubmit={glDetailsController.onSubmit}
          fundList={fundsProps.data.value}
          isDepartmentLoading={departmentProps.isLoading}
          isFundLoading={fundsProps.isLoading}
          departmentList={departmentProps.data.value}
          form={glDetailsController.form}
          isReqLoading={glDetailsController.isLoading}
        />
        <GlDetailsTable
          {...glDetailsController}
          data={glDetailsController.data.value}
        />
      </TabsContent>
      <TabsContent className={"flex  flex-col"} value="apInquiry">
        <ApInquiryForm {...glDetailsController} />
        <ApInquiryTable
          data={glDetailsController.glTableData || []}
          {...glDetailsController}
        />
      </TabsContent>
    </Tabs>
  );
}
