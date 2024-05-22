import React, { memo } from "react";
import { Text, View, StyleSheet, Document, Page } from "@react-pdf/renderer";

const Footer = ({ totalPage, page, }) => (
  <View style={styles.footer}>
    <Text style={{ alignSelf: 'center', marginTop: 20 }} > Restricted for management use only. Not for external distribution</Text>
    <Text style={{ alignSelf: "flex-end" }}>Page {page} / {totalPage}</Text>
  </View>
);

const PdfDataTable = ({ columns, data, renderHeader, maxEntriesPerPage = 30 }) => {

  const SlicedData = (index) =>
    data.length > maxEntriesPerPage ? data.slice(maxEntriesPerPage * index, maxEntriesPerPage * (index + 1)) : data;
  const pageData = new Array(Math.ceil(data.length / maxEntriesPerPage)).fill(null);


  return (
    <Document>
      {pageData.map((_, pageIndex) => (
        <Page key={pageIndex} size="A3" style={styles.page}>
          {renderHeader()}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {columns.map((header, index) => (
                <View
                  key={index}
                  style={[
                    styles.tableCol,
                    { borderLeftWidth: index === 0 ? 0 : 1 },
                    header?.flex && { flex: header.flex },
                  ]}
                >
                  <Text style={styles.tableCellHeader}>{header.header}</Text>
                </View>
              ))}
            </View>
            {SlicedData(pageIndex).map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={styles.tableRow}>
                  {columns.map((col, cellIndex) => {
                    const cellItem = row?.[col?.accessorKey];
                    const isAmtsNum = col?.isAmtsNum;
                    const color = isAmtsNum
                      ? +cellItem > 0 || +row?.total > 0
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)"
                      : "#232b2b";
                    return (
                      <View
                        key={cellIndex}
                        style={[
                          styles.tableCol,
                          {
                            borderLeftWidth: cellIndex === 0 ? 0 : 1,
                            borderTopWidth: 1,
                            borderColor: "grey",
                          },
                          !!row?.desc
                          && { backgroundColor: "#D3D3D3" },
                          col?.flex && { flex: col.flex },
                        ]}
                      >
                        {(isAmtsNum && +cellItem === 0) || (
                          <Text
                            style={[
                              styles.tableCell,
                              { color: isAmtsNum ? color : "#0e1111" },
                            ]}
                          >
                            {row?.desc ? col.showDescTitle ? `Total: ${row.desc}` : col.showTotalAmt ? Number(+cellItem || row?.total).toLocaleString() : "" : col?.cell ? col?.cell(row) : isAmtsNum
                              ?
                              Number(+cellItem).toLocaleString()
                              : cellItem
                            }
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              )
            })}
          </View>
          <Footer page={pageIndex + 1} totalPage={pageData?.length} />
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
    borderTop: 1,
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
    paddingVertical: 0,
    justifyContent: "center",
  },
  tableCellHeader: {
    margin: 5,
    color: "white",
    fontFamily: "Helvetica-Bold",
  },
  tableCell: {
    margin: 5,
    textAlignVertical: "center",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "black",
    borderTopStyle: "solid",
    marginTop: 5,
    paddingTop: 5,
    justifyContent: "flex-end",
  },
  totalLabel: {
    marginRight: 10,
  },
  totalValue: {
    width: "12.5%",
    textAlign: "right",
  },
});
