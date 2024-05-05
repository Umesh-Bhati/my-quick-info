import { StyleSheet, Text, View } from "@react-pdf/renderer";

export default function PdfFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Restricted for management use only. Not for external distribution
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderTop: 1,
    width: "100%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  txt: { fontSize: 8, color: "black" },
});
