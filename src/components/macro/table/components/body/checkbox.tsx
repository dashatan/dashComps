import { TableData } from "@/components/macro/table/types";
import Checkbox from "@/components/micro/inputs/checkbox/checkbox";
import { useFormContext, useWatch } from "react-hook-form";

export namespace TableCheckbox {
  export function SelectAll({
    ids,
    onChange,
  }: {
    ids?: (number | string)[];
    onChange?: (selected: (number | string)[]) => void;
  }) {
    const table = useFormContext<TableData>();
    const { selectAll, selected } = useWatch<TableData>();
    const pageIsSelected = !!ids?.length && ids?.every((x) => selected?.includes(x));

    return (
      <div className="relative me-0 flex items-center rounded-md p-2">
        <Checkbox
          withoutTitle
          className={{ iconContainer: "!m-0", container: "justify-center !bg-transparent" }}
          onChange={(active) => {
            table.setValue("selectAll", false);
            if (active && ids) {
              const newSelected = [...(selected || []), ...ids.filter((x) => !selected?.includes(x))];
              table.setValue("selected", newSelected);
              onChange && onChange(newSelected);
            } else {
              const newSelected = selected?.filter((x) => !ids?.includes(x));
              table.setValue("selected", newSelected);
              newSelected && onChange && onChange(newSelected);
            }
          }}
          active={selectAll || pageIsSelected}
        />
      </div>
    );
  }
  export function SelectOne({
    value,
    onChange,
  }: {
    value: string | number;
    onChange?: (selected: (number | string)[]) => void;
  }) {
    const table = useFormContext<TableData>();
    const { selectAll, selected } = useWatch<TableData>();

    return (
      <Checkbox
        withoutTitle
        className={{ iconContainer: "!m-0", container: "justify-center !bg-transparent" }}
        active={selectAll || selected?.includes(value)}
        onChange={() => {
          let newSelected = [...(selected || [])];
          if (newSelected.includes(value)) {
            newSelected = newSelected.filter((x) => x !== value);
          } else {
            newSelected = [...newSelected, value];
          }
          table.setValue("selected", newSelected);
          onChange && onChange(newSelected);
        }}
      />
    );
  }
}
