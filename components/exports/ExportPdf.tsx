"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ExportPdf({
  document,
  fileName,
  isGenerate = false,
  setIsGenerate
}: any) {
  if (isGenerate)
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

  return (
    <Button
      type="button"
      onClick={() => setIsGenerate(true)}
      className="relative h-9 text-sm self-end overflow-hidden"
    >
      Generate PDF
    </Button>
  );
}
