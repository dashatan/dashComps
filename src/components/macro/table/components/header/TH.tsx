import { memo, useCallback, useState } from "react";
import { ChangeTag, ColumnProps, TableData } from "../../types";
import { classNames } from "@/utils";
import SortIcon from "./sort-icon";
import { useFormContext, useWatch } from "react-hook-form";

export interface THProps {
  col: ColumnProps;
  onchange: (values: TableData, tag: ChangeTag) => void;
  loading?: boolean;
}
export const TH = memo(({ col, onchange, loading }: THProps) => {
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
      }}
      className={classNames("bg-slate-200 overflow-hidden select-none", {
        "pointer-events-none cursor-not-allowed": loading,
      })}
      border-collapse
      border-spacing-0
    >
      <div
        className={classNames(
          "h-16 p-2 whitespace-nowrap w-full overflow-hidden text-right",
          "bg-slate-200 text-gray-600 font-medium text-base transition duration-200",
          "border-l border-slate-300 min-w-full",
          "flex items-center justify-center",
          {
            "resize-x": resizable,
          }
        )}
      >
        <div
          className={classNames("flex items-center gap-2 w-full", { "cursor-pointer": col.sortable })}
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
