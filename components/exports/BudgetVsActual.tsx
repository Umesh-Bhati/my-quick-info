import PdfDataTable from "./PdfDataTable";
import PdfHeader from "./PdfHeader";
import { bcTableFormatters } from "@/lib/response-formatter/business-central";
import { pdfColumns } from "@/app/(sections)/budget-table/columns";

export default function BudgetVsActual({ data = [], ...props }: any) {
  if (data?.length > 0) {
    return (
      <PdfDataTable
        columns={pdfColumns}
        data={bcTableFormatters.budgetTable(
          data,
          props.postingDate,
          props?.fundNo
        )}
        renderHeader={() => (
          <PdfHeader
            reportType="Budget vs Actual"
            fundName={props.fundName}
            postingDate={props.postingDate}
            departmentName={props.departmentName}
          />
        )}
      />
    );
  } else {
    return;
  }
}
