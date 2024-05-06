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
  return (
    <View style={styles.container}>
      <Image
        src={"http://localhost:3000/logos/images/harshwal.png"}
        style={styles.logoImg}
      />
      <View style={styles.txtContainer}>
        <Text style={{ fontSize: 8, color: "black" }}>
          {`CAHUILLA BAND OF INDIANS`}
        </Text>
        {reportType && (
          <Text style={styles.boldTxt}>Report Name:- {reportType}</Text>
        )}
        {postingDate && (
          <Text style={styles.boldTxt}>
            Date:-{" "}
            {format(postingDate ? postingDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {fromDate && (
          <Text style={styles.boldTxt}>
            From:- {format(fromDate ? fromDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {toDate && (
          <Text style={styles.boldTxt}>
            To:- {format(toDate ? toDate : new Date(), "MM-dd-yyyy")}
          </Text>
        )}
        {fundName && <Text style={styles.boldTxt}>Fund:- {fundName}</Text>}
        {departmentName && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Department:- {departmentName}
          </Text>
        )}
        {documentType && (
          <Text style={styles.boldTxt}>Document Type:- {documentType}</Text>
        )}

        {documentNo && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Document No:- {documentNo}
          </Text>
        )}
        {vendorNo && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Vendor No:- {vendorNo}
          </Text>
        )}
        {vendorName && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Vendor Name:- {vendorName}
          </Text>
        )}
        {description && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Description:- {description}
          </Text>
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
  txtContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    gap: 3,
  },
  logoImg: {
    width: 150,
    height: 30,
    position: "absolute",
    top: 5,
    left: 0,
  },
  boldTxt: {
    fontSize: 8,
    color: "black",
    fontFamily: "Helvetica-Bold",
    fontWeight: "bold",
  },
});
