import { classNames } from "@/utils";
import { TH } from "./TH";
import { Filter } from "./filter-row";
import { useFormContext } from "react-hook-form";
import { ChangeTag, ColumnProps, TableData, TableProps } from "@table/types";
import { debounce } from "lodash-es";
import { useRef } from "react";

export type TableHeaderProps = Pick<TableProps, "actionHeaderProps" | "loading" | "THProps"> & {
  columns?: ColumnProps[];
  onChange: (data: Partial<TableData>, tag: ChangeTag) => void;
};

export default function Header(props: TableHeaderProps) {
  const debounced = useRef(debounce((cb) => cb && cb(), 600)).current;
  const table = useFormContext<TableData>();
  const state = table.getValues();
  const showFilter = table.watch("showFilter") && !props.actionHeaderProps?.hideFilter;
  return (
    <thead
      className={classNames(
        "[&>th:first-child]:first:rounded-tr-md [&>th:last-child]:first:rounded-tl-md [&>th]:last:border-b",
        "sticky top-0 z-[2] border-b border-gray-200",
      )}
    >
      <tr>
        {props.columns?.map((col, i, a) => {
          return (
            <TH
              key={i}
              style={{ ...(i === a.length - 2 && { width: "auto" }) }}
              {...props.THProps}
              col={col}
              loading={props.loading}
              onchange={props.onChange}
            />
          );
        })}
      </tr>
      {showFilter && (
        <tr>
          {props.columns?.map((col, index) => (
            <Filter
              key={index}
              col={col}
              loading={props.loading}
              values={state}
              onchange={(values, tag) => {
                if (!col.noDebounce) {
                  debounced(() => {
                    table.reset(values);
                    props.onChange(values, tag);
                  });
                } else {
                  table.reset(values);
                  props.onChange(values, tag);
                }
              }}
            />
          ))}
        </tr>
      )}
    </thead>
  );
}
