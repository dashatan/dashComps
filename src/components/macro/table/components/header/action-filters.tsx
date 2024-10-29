import { useFormContext } from "react-hook-form";
import Chip from "@/components/micro/chips/chip";
import { ColumnProps, FilterValue, TableData, TableProps } from "@/components/macro/table/types";

export type ActionFiltersProps = {
  columns?: ColumnProps[];
  onChange?: TableProps["onTableChange"];
  excludes?: string[];
  sort?: string[];
  templates?: { name: string; template: (value?: FilterValue) => React.ReactNode }[];
};

export default function ActionFilters(props: ActionFiltersProps) {
  const { sort, excludes, templates } = props;
  const table = useFormContext<TableData>();
  const filters = table.watch("filters");
  const state = table.getValues();
  let items = filters ? Object.keys(filters) : [];
  if (sort) {
    items = items.sort((a, b) => (sort.includes(a) ? -1 : sort.includes(b) ? 1 : 0));
  }

  return (
    <div className="flex gap-2 p-4 border-b border-gray-200 w-full min-h-[68px] overflow-x-auto">
      {filters &&
        items.map((x) => {
          const val = filters[x];
          if (!val || (excludes && excludes.includes(x))) return <></>;
          const col = props.columns?.find((y) => y.field === x);
          const template = templates?.find((t) => t.name === x);
          let El;
          if (col?.filterChips) {
            El = col.filterChips(val);
          } else if (template?.template) {
            El = template.template(val);
          } else {
            const label = col?.filterChipsLabel || (col?.header as string);
            El = (
              <Chip
                label={`${label ? label + ": " : ""}${val}`}
                onRemove={() => {
                  const newFilters = { ...filters, [x]: undefined };
                  const newState = { ...state, filters: newFilters };
                  table.setValue("filters", newFilters);
                  props.onChange && props.onChange(newState, "filter");
                }}
              />
            );
          }
          return El;
        })}
    </div>
  );
}
