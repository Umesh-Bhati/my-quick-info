"use client";
import React from "react";

import dynamic from "next/dynamic";
import BudgetVsActual from "./BudgetVsActual";
import { bcTableFormatters } from "@/lib/response-formatter/business-central";
// import glData from "@/app/jsons/gl-data.json";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
);

const DownloadPDF = () => {
    return (
        <PDFViewer
            style={{
                width: typeof window !== "undefined" ? window.innerWidth : 600,
                height: typeof window !== "undefined" ? window.innerHeight : 900,
            }}
        >
            <BudgetVsActual
                data={[]}
                postingDate={new Date()}
                fundNo={"0100"}
                fundName={"fundNamee"}
                departmentName={"All"}
            />
        </PDFViewer>
    );
};

export default DownloadPDF;
