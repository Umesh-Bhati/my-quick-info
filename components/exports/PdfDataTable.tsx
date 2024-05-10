import React, { memo } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface ColumnDef<TData> {
  accessorKey: keyof TData;
  header: string;
  cell?: (data: TData, key: keyof TData, row: TData) => React.ReactNode;
}

interface PdfDataTableProps<TData> {
  columns: any;
  data: TData[];
}

const PdfDataTable = <TData,>({ columns, data }: PdfDataTableProps<TData>) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {columns.map((column: any, i: number) => {
          const width = column.width || `${100 / columns.length}%`;
          return (
            <View
              key={column.accessorKey as string}
              style={[
                styles.headCellContainer,
                { width, borderRight: i === columns.length - 1 ? 0 : 0.5 },
              ]}
            >
              <Text style={styles.columnHeader}>{column.header}</Text>
            </View>
          );
        })}
      </View>
      {data.map((row: any, rowIndex: number) => (
        <View key={rowIndex} style={styles.tableRow}>
          {columns.map((column: any, i: number) => {
            const width = column.width || `${100 / columns.length}%`;
            return (
              <View
                key={column.accessorKey as string}
                style={[
                  styles.cell,
                  { width, borderRight: i === columns.length - 1 ? 0 : 0.5 },
                ]}
              >
                {!!column?.cell ? (
                  column.cell(row)
                ) : (
                  <Text style={styles.cellTxt}>{row[column?.accessorKey]}</Text>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default memo(PdfDataTable);
const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#000",
    borderRadius: 5,
  },
  tableRow: {
    display: "flex",
    width: "100%",
    margin: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    height: 40,
  },

  headCellContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRight: 0.5,
    backgroundColor: "#103A84",
    borderColor: "white",
  },
  columnHeader: {
    fontWeight: "bold",
    fontSize: 9,
    textAlign: "center",
    color: "white",
  },
  cell: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRight: 0.5,
  },
  cellTxt: {
    textAlign: "left",
    fontSize: 8,
  },
});
