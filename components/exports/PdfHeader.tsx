import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

interface IPdfHeader {
  reportType: "Budget vs Actual" | "GL Details" | "AP Inquiry";
  fundName?: string;
  postingDate: string | number;
  departmentName?: string;
}

export default function PdfHeader({
  reportType,
  fundName,
  postingDate,
  departmentName,
}: IPdfHeader) {
  return (
    <View style={styles.container}>
      <Image
        src={"http://localhost:3000/logos/images/harshwal.png"}
        style={styles.logoImg}
      />
      <View style={styles.txtContainer}>
        <Text style={{ fontSize: 8, color: "black" }}>
          {`CAHUILLA BAND OF INDIANS\n${reportType} Report\n ${format(
            postingDate ? postingDate : new Date(),
            "MM-dd-yyyy"
          )}`}
        </Text>
        {fundName && <Text style={styles.boldTxt}>Fund:- {fundName}</Text>}
        {departmentName && (
          <Text style={{ fontSize: 8, color: "black" }}>
            Department:- {departmentName}
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
    gap: 5,
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
