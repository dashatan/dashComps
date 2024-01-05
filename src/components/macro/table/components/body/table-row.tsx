import { classNames } from "@/utils";
import { ColumnProps } from "../../types";
import { memo } from "react";
import TD from "./TD";

export interface TableRowProps {
  loading?: boolean;
  data: any;
  index: number;
  columns?: ColumnProps[];
  expanded?: boolean;
}

const TableRow = memo(function TableRow({ data, index, columns, loading, expanded }: TableRowProps) {
  return (
    <tr
      key={index}
      className={classNames("bg-gray-50 [&_td]:hover:!bg-gray-100 transition-all", { "[&_td]:!border-b-0": expanded })}
    >
      {columns?.map((col, key) => {
        return <TD key={key} col={col} data={data} rowIndex={index} loading={loading} />;
      })}
    </tr>
  );
});

export default TableRow;
