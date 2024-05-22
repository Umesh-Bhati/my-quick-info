import PdfDataTable from "./PdfDataTable";
import PdfHeader from "./PdfHeader";
import { pdfColumns } from "../tables/ap-inquiry/columns";
import { memo } from "react";

function APInquiryDocument({ data = [], ...headerProps }: any) {
  if (data?.length > 0) {
    return (
      <PdfDataTable
        columns={pdfColumns}
        data={data}
        renderHeader={() => <PdfHeader {...headerProps} />}
        maxEntriesPerPage={35}
      />
    );
  } else {
    return;
  }
}

export default memo(APInquiryDocument);
