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
import useApVendorTable from "@/hooks/useApVendorTable";

export default function TabSection() {
  const budgetController = useBudgetTable();
  const glDetailsController = useGlDetailTable();
  const departmentProps = useFetchDepartments();
  const fundsProps = useFetchFunds();
  const apVendorController = useApVendorTable();


  useEffect(() => {
    fundsProps.fetchFunds("on-submit");
    departmentProps.fetchDepartments("on-submit");
  }, []);

  return (
    <Tabs defaultValue="budgetVsActual">
      <TabsList className="grid w-full items-center py-[6px]  justify-center grid-cols-3">
        <TabsTrigger
          className="w-52 self-center  m-auto"
          value="budgetVsActual"
        >
          Budget vs Actual
        </TabsTrigger>
        <TabsTrigger className="w-52 self-center  m-auto" value="glDetails">
          GL Detail
        </TabsTrigger>
        <TabsTrigger className="w-52 self-center  m-auto" value="apInquiry">
          AP Inquiry
        </TabsTrigger>
      </TabsList>
      <TabsContent className={"flex  flex-col"} value="budgetVsActual">
        <BugdetForm
          {...budgetController}
          onSubmit={budgetController.onSubmit}
          fundList={fundsProps.data.value}
          isDepartmentLoading={departmentProps.isLoading}
          isFundLoading={fundsProps.isLoading}
          departmentList={departmentProps.data.value}
          form={budgetController.form}
          isReqLoading={budgetController.isLoading}
          data={budgetController.data}
          exportToPdf={budgetController.exportToPdf}
          isFetchingNext={budgetController.isFetchingNext}
        />
        <BudgetTable
          {...budgetController}
          data={bcTableFormatters.budgetTable(
            budgetController.data.value,
            budgetController.form.watch("endDate"),
            budgetController.form.watch("fundNo")
          )}
        />
      </TabsContent>
      <TabsContent className={"flex  flex-col"} value="glDetails">
        <GlForm
          {...glDetailsController}
          onSubmit={glDetailsController.onSubmit}
          fundList={fundsProps.data.value}
          isDepartmentLoading={departmentProps.isLoading}
          isFundLoading={fundsProps.isLoading}
          departmentList={departmentProps.data.value}
          form={glDetailsController.form}
          isReqLoading={glDetailsController.isLoading}
          isFetchingNext={glDetailsController.isFetchingNext}
          exportToPdf={glDetailsController.exportToPdf}
          data={glDetailsController.data}
        />

        <GlDetailsTable
          {...glDetailsController}
          data={glDetailsController.data.value}
        />
      </TabsContent>
      <TabsContent className={"flex  flex-col"} value="apInquiry">
        <ApInquiryForm
          {...apVendorController}
          isReqLoading={apVendorController.isLoading}
        />
        <ApInquiryTable
          {...apVendorController}
          data={apVendorController.data.value}
        />
      </TabsContent>
    </Tabs>
  );
}
