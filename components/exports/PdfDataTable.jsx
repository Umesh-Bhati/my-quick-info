import React, { memo } from "react";
import { Text, View, StyleSheet, Document, Page } from "@react-pdf/renderer";
import { fixedDecimal } from "@/lib/response-formatter/business-central";

const Footer = memo(
  ({ totalPage, page }) => {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Restricted for management use only. Not for external distribution
        </Text>
        <Text style={styles.footerPage}>
          Page {page} / {totalPage}
        </Text>
      </View>
    );
  },
  () => "Footer"
);

Footer.displayName = "Footer";
const renderTableCell = (row, col, styles) => {
  const cellItem = row[col.accessorKey];
  const isAmtsNum = col.isAmtsNum;
  const color = isAmtsNum
    ? +cellItem > 0 || +row.total > 0
      ? "rgb(34, 197, 94)"
      : "rgb(239, 68, 68)"
    : "#232b2b";

  if (col.accessorKey === "available") {
    const val = fixedDecimal(+row.budget - +row.ytd - +row.openPurchOrd - +row.openReq);
    const availableColor = +val < 0 ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)";
    return (
      <Text style={[styles.tableCell, { color: availableColor }]}>
        {`$ ${Number(val).toLocaleString()}`}
      </Text>
    );
  }

  if (isAmtsNum && +cellItem === 0) return null;

  const textContent = row.desc
    ? col.showDescTitle ? `Total: ${row.desc}`
      : col.showTotalAmt ? `$ ${Number(+cellItem || row.total).toLocaleString()}`
        : ""
    : col.cell ? col.cell(row)
      : isAmtsNum ? `$ ${Number(+cellItem).toLocaleString()}`
        : cellItem;

  return (
    <Text style={[styles.tableCell, { color: isAmtsNum ? color : "#0e1111" }]}>
      {textContent}
    </Text>
  );
};

const PdfDataTable = ({ columns, data, renderHeader, maxEntriesPerPage = 30 }) => {
  const totalPages = Math.ceil(data.length / maxEntriesPerPage);
  const pageData = Array.from({ length: totalPages }, (_, index) => data.slice(maxEntriesPerPage * index, maxEntriesPerPage * (index + 1)));

  return (
    <Document>
      {pageData.map((pageDataSlice, pageIndex) => (
        <Page key={pageIndex} size="A3" style={styles.page}>
          {renderHeader()}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {columns.map((header, index) => (
                <View
                  key={index}
                  style={[
                    styles.tableCol,
                    index !== 0 && styles.tableColBorderLeft,
                    header.flex && { flex: header.flex },
                  ]}
                >
                  <Text style={styles.tableCellHeader}>{header.header}</Text>
                </View>
              ))}
            </View>
            {pageDataSlice.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {columns.map((col, cellIndex) => (
                  <View
                    key={cellIndex}
                    style={[
                      styles.tableCol,
                      cellIndex !== 0 && styles.tableColBorderLeft,
                      styles.tableColBorderTop,
                      row.desc && styles.tableRowDesc,
                      col.flex && { flex: col.flex },
                    ]}
                  >
                    {renderTableCell(row, col, styles)}
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Footer page={pageIndex + 1} totalPage={totalPages} />
        </Page>
      ))}
    </Document>
  );
};

export default PdfDataTable;

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingHorizontal: 40,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 10,
    borderTopWidth: 1,
  },
  footerText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  footerPage: {
    alignSelf: "flex-end",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: "#103A84",
    borderColor: "white",
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    flex: 1,
    borderColor: "lightGrey",
    padding: 2,
    justifyContent: "center",
  },
  tableColBorderLeft: {
    borderLeftWidth: 1,
  },
  tableColBorderTop: {
    borderTopWidth: 1,
  },
  tableRowDesc: {
    backgroundColor: "#D3D3D3",
  },
  tableCellHeader: {
    margin: 5,
    color: "white",
    fontFamily: "Helvetica-Bold",
  },
  tableCell: {
    margin: 5,
    textAlignVertical: "center",
    color: "#0e1111",
  },
});
