import { memo, useCallback } from "react";
import { classNames } from "@/utils";
import { ChangeTag, ColumnProps, FilterValue, TableData } from "@table/types";
import filterElements from "@table/components/filter";

export interface FilterProps {
  col: ColumnProps;
  values?: TableData;
  onchange: (values: TableData, tag: ChangeTag) => void;
  loading?: boolean;
}
export const Filter = memo(({ col, values, onchange, loading }: FilterProps) => {
  const filters = values?.filters;
  const value = filters && col.field && filters[col.field] ? filters[col.field] : undefined;
  const type = col.filterElementType || "";
  const options = col.filterOptions;
  const FilterEl = filterElements[type];

  const handleChange = useCallback(
    (value: FilterValue) => {
      if (loading) return;
      if (col.field) {
        const newFilters = { ...filters, [col.field]: value };
        onchange({ ...values, filters: newFilters }, "filter");
        col.onFilterChange && col.onFilterChange(value);
      }
    },
    [filters, loading]
  );

  return (
    <th
      style={{
        ...col.style,
        ...(col.frozen && { position: "sticky", [col.frozen.pos]: col.frozen.distance, zIndex: 2 }),
      }}
      className={classNames("bg-gray-50 p-2 border-b border-gray-300")}
    >
      {col.filterElement ? (
        col.filterElement
      ) : FilterEl ? (
        <FilterEl
          onChange={handleChange}
          defaultValue={value}
          options={options}
          className={col.filterClassName}
          inputProps={{ disabled: loading, ...col.filterProps }}
        />
      ) : (
        <></>
      )}
    </th>
  );
});

Filter.displayName = "Filter";
