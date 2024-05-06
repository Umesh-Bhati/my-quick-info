import { Document, Page } from "@react-pdf/renderer";
import PdfDataTable from "./PdfDataTable";
import PdfFooter from "./PdfFooter";
import PdfHeader from "./PdfHeader";
import { bcTableFormatters } from "@/lib/response-formatter/business-central";
import { pdfColumns } from "@/app/(sections)/budget-table/columns";

export default function BudgetVsActual({ data = [], ...headerProps }: any) {
  if (data?.length > 0) {
    return (
      <Document>
        <Page
          size="A4"
          style={{
            flexDirection: "column",
            padding: 10,
          }}
        >
          <PdfHeader {...headerProps} />
          <PdfDataTable
            columns={pdfColumns}
            data={bcTableFormatters.budgetTable(data, headerProps.postingDate)}
          />
          <PdfFooter />
        </Page>
      </Document>
    );
  } else {
    return;
  }
}
