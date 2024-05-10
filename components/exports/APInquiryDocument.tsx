import { Document, Page } from "@react-pdf/renderer";
import PdfDataTable from "./PdfDataTable";
import PdfFooter from "./PdfFooter";
import PdfHeader from "./PdfHeader";
import { pdfColumns } from "../tables/ap-inquiry/columns";
import { memo } from "react";

function APInquiryDocument({ data = [], ...headerProps }: any) {
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
          <PdfDataTable columns={pdfColumns} data={data} />
          <PdfFooter />
        </Page>
      </Document>
    );
  } else {
    return;
  }
}

export default memo(APInquiryDocument);
