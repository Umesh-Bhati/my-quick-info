import { pdfColumns } from "../tables/gl-details/columns";
import PdfDataTable from "./PdfDataTable";
import { calTotalOfGlTable } from "@/lib/utils";
import PdfHeader from "./PdfHeader";
import { memo } from "react";

function GLDocument({ data = [], ...headerProps }: any) {
  if (data?.length > 0) {
    return (
      <PdfDataTable
        columns={pdfColumns}
        data={calTotalOfGlTable(
          data,
          "G_L_Account_No",
          "G_L_Account_Name",
          "Amount"
        )}
        renderHeader={() => <PdfHeader {...headerProps} />}
      />
    );
  } else {
    return;
  }
}

export default memo(GLDocument);
