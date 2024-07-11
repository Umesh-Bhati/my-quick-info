"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

interface IPdfHeader {
  reportType: "Budget vs Actual" | "GL Details" | "AP Inquiry";
  fundName?: string;
  postingDate: string | number;
  departmentName?: string;
  fromDate?: string;
  toDate?: string;
  documentType?: string;
  documentNo?: string | number;
  vendorNo?: string | number;
  vendorName?: string;
  description?: string;
}

export default function PdfHeader({
  reportType,
  fundName,
  postingDate,
  departmentName,
  fromDate,
  toDate,
  documentType,
  vendorNo,
  vendorName,
  description,
  documentNo,
}: IPdfHeader) {
  const PORT =
    (typeof window !== "undefined" && window?.location?.port) ||
    (process.env.NODE_ENV === "development" && "3000") ||
    "3008";

  const URL = `https://myquickinfo.com/logos/images/harshwal.png`;
  return (
    <View style={styles.container}>
      <Image src={URL} style={styles.logoImg} />
      <View style={styles.txtContainer}>
        <Text style={{ fontSize: 11, color: "black" }}>
          {`CAHUILLA BAND OF INDIANS`}
        </Text>
        {reportType && (
          <Text style={styles.txt}>Report Name:- {reportType}</Text>
        )}
        {postingDate && (
          <Text style={styles.txt}>
            Date:-{" "}
            {format(postingDate ? postingDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {fromDate && (
          <Text style={styles.txt}>
            From:- {format(fromDate ? fromDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {toDate && (
          <Text style={styles.txt}>
            To:- {format(toDate ? toDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {fundName && <Text style={styles.txt}>Fund:- {fundName}</Text>}
        {departmentName && (
          <Text style={styles.txt}>Department:- {departmentName}</Text>
        )}
        {documentType && (
          <Text style={styles.txt}>Document Type:- {documentType}</Text>
        )}

        {documentNo && (
          <Text style={styles.txt}>Document No:- {documentNo}</Text>
        )}
        {vendorNo && <Text style={styles.txt}>Vendor No:- {vendorNo}</Text>}
        {vendorName && (
          <Text style={styles.txt}>Vendor Name:- {vendorName}</Text>
        )}
        {description && (
          <Text style={styles.txt}>Description:- {description}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    paddingVertical: 10,
    alignItems: "center",
  },
  txt: {
    fontSize: 10,
  },
  txtContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    gap: 5,
  },
  logoImg: {
    width: 200,
    aspectRatio: 150 / 30,
    position: "absolute",
    top: 5,
    left: -30,
  },
});
