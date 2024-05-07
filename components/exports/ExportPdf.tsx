"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function ExportPdf({ document, fileName }: any) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <PDFDownloadLink
        document={document}
        fileName={fileName}
        style={{
          textDecoration: "none",
          paddingTop: 8,
          paddingBottom: 8,
          color: "white",
          width: "100%",
          backgroundColor: "#103A84",
          borderRadius: 10,
          height: "fit",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignSelf: "flex-end",
          fontSize: 14,
        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading Document..." : "Export PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}
