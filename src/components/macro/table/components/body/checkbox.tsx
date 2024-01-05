import Checkbox from "@/components/micro/inputs/checkbox/checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import { TableData } from "../../types";
import { Icon } from "@/components/micro/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/micro/overlay/popover";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export namespace TableCheckbox {
  export function SelectAll({ ids }: { ids?: (number | string)[] }) {
    const [open, setOpen] = useState(false);
    const table = useFormContext<TableData>();
    const { selectAll, selected } = useWatch<TableData>();
    const pageIsSelected = ids?.every((x) => selected?.includes(x));

    return (
      <div className="flex items-center rounded-md p-2 relative ml-0">
        <Checkbox
          withoutTitle
          className={{ iconContainer: "!m-0", container: "!bg-transparent justify-center" }}
          onChange={(active) => {
            table.setValue("selectAll", false);
            if (active && ids)
              table.setValue("selected", [...(selected || []), ...ids.filter((x) => !selected?.includes(x))]);
            else
              table.setValue(
                "selected",
                selected?.filter((x) => !ids?.includes(x))
              );
          }}
          active={selectAll || pageIsSelected}
        />
        <Popover open={open} onOpenChange={(e) => setOpen(e)}>
          <PopoverTrigger>
            <div className="h-5 w-5 rounded-full hover:bg-gray-200 flex items-center justify-center absolute top-1/2 -translate-y-1/2">
              <Icon icon="ArrowDown" className="scale-75" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="border-none">
            <div className="w-32 bg-gray-50 rounded-lg border border-gray-300 flex flex-col text-xs overflow-hidden select-none">
              <div
                className="p-2 flex items-center gap-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  table.setValue("selectAll", true);
                  table.setValue("selected", []);
                  setOpen(false);
                }}
              >
                <div className="w-5 h-5 bg-primary-600 border border-primary-600 rounded-md flex items-center justify-center">
                  <Check className="text-gray-50 w-3" />
                </div>
                <span>انتخاب همه</span>
              </div>
              <div
                className="p-2 flex items-center gap-2  cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  table.setValue("selectAll", false);
                  table.setValue("selected", []);
                  setOpen(false);
                }}
              >
                <div className="w-5 h-5 bg-gray-50 border border-gray-300 rounded-md flex items-center justify-center">
                  <Plus className="text-gray-600 rotate-45" />
                </div>
                <span>لغو انتخاب همه</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
  export function SelectOne({ value }: { value: string | number }) {
    const table = useFormContext<TableData>();
    const { selectAll, selected } = useWatch<TableData>();

    return (
      <Checkbox
        withoutTitle
        className={{ iconContainer: "!m-0", container: "!bg-transparent justify-center" }}
        active={selectAll || selected?.includes(value)}
        onChange={() => {
          let newSelected = [...(selected || [])];
          if (newSelected.includes(value)) {
            newSelected = newSelected.filter((x) => x !== value);
          } else {
            newSelected = [...newSelected, value];
          }
          table.setValue("selected", newSelected);
        }}
      />
    );
  }
}
