import { memo, useCallback } from "react";
import { ChangeTag, ColumnProps, TableData } from "@table/types";
import { classNames } from "@/utils";
import SortIcon from "./sort-icon";
import { useFormContext, useWatch } from "react-hook-form";

export interface THProps {
  col: ColumnProps;
  onchange: (values: TableData, tag: ChangeTag) => void;
  loading?: boolean;
  style?: React.CSSProperties;
  className?: { th?: string; l1?: string; l2?: string };
}
export const TH = memo(({ col, onchange, loading, ...props }: THProps) => {
  const table = useFormContext<TableData>();
  const { sortField, sortOrder } = useWatch<TableData>();
  const resizable = !col.frozen && !col.style?.maxWidth;
  const isSortTarget = sortField === col.field;
  const sorted = isSortTarget && !!sortOrder;

  const handleChange = useCallback(() => {
    if (loading) return;
    if (col.field && col.sortable) {
      let order = isSortTarget ? sortOrder : 0;
      if (order === 0) order = 1;
      else if (order === 1) order = -1;
      else if (order === -1) order = 0;
      const newValues = { ...table.getValues(), sortField: col.field, sortOrder: order };
      table.reset(newValues);
      onchange(newValues, "sort");
    }
  }, [sortField, sortOrder, loading]);

  return (
    <th
      style={{
        ...col.style,
        ...(col.frozen && { position: "sticky", [col.frozen.pos]: col.frozen.distance, zIndex: 2 }),
        ...props.style,
      }}
      className={classNames(
        "select-none overflow-hidden bg-gray-200",
        {
          "pointer-events-none cursor-not-allowed": loading,
        },
        props.className?.th,
        col.className,
      )}
      border-collapse
      border-spacing-0
    >
      <div
        className={classNames(
          "h-16 w-full overflow-hidden whitespace-nowrap p-2 text-right",
          "bg-gray-200 text-base font-medium text-gray-600 transition duration-200",
          "min-w-full border-e border-gray-300",
          "flex items-center justify-center",
          {
            "resize-x": resizable,
          },
          props.className?.l1,
        )}
      >
        <div
          className={classNames(
            "flex w-full items-center gap-2",
            { "cursor-pointer": col.sortable },
            props.className?.l2,
          )}
          onClick={handleChange}
        >
          {col.header as React.ReactNode}
          {col.sortable && <SortIcon sortOrder={sortOrder} sorted={sorted} />}
        </div>
      </div>
    </th>
  );
});

TH.displayName = "TH";
