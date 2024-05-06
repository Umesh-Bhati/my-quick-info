import { Document, Page } from "@react-pdf/renderer";
import { pdfColumns } from "../tables/gl-details/columns";
import PdfDataTable from "./PdfDataTable";
import PdfFooter from "./PdfFooter";
import { calTotalOfGlTable } from "@/lib/utils";
import PdfHeader from "./PdfHeader";
import { memo } from "react";

function GLDocument({ data = [], ...headerProps }: any) {
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
            data={calTotalOfGlTable(
              data,
              "G_L_Account_No",
              "G_L_Account_Name",
              "Amount"
            )}
          />
          <PdfFooter />
        </Page>
      </Document>
    );
  } else {
    return;
  }
}

export default memo(GLDocument);
