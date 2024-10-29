import { classNames } from "@/utils";
import { ColumnProps, TableData, TableProps } from "@/components/macro/table/types";
import { forwardRef, memo } from "react";
import TD from "./TD";
import { FieldValues, UseFormReturn, useFormContext } from "react-hook-form";

export type TableRowProps = Pick<TableProps, "rightClickMenu"> & {
  loading?: boolean;
  data: any;
  index: number;
  columns?: ColumnProps[];
  expanded?: boolean;
  className?: (data: any, table: UseFormReturn<TableData, any, FieldValues>) => string;
  onClick?: (data: any, table: UseFormReturn<TableData, any, FieldValues>) => void;
  extraElements?: (data: any, table: UseFormReturn<TableData, any, FieldValues>) => React.ReactNode;
};

const TableRow = memo(
  forwardRef<HTMLTableRowElement, TableRowProps>(({ data, index, columns, loading, expanded, ...props }, ref) => {
    const table = useFormContext<TableData>();
    return (
      <tr
        {...props}
        ref={ref}
        key={index}
        className={classNames(
          "bg-gray-50 hover:bg-gray-100 transition-all",
          {
            "[&_td]:!border-b-0": expanded,
          },
          props.className && props.className(data, table)
        )}
        onClick={() => props.onClick && props.onClick(data, table)}
      >
        {columns?.map((col, key) => {
          return <TD key={key} col={col} data={data} rowIndex={index} loading={loading} />;
        })}
        {props.extraElements && props.extraElements(data, table)}
      </tr>
    );
  })
);

export default TableRow;
