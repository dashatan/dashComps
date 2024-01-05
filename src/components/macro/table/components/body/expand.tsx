import Button from "@/components/micro/buttons/button";
import { Icon } from "@/components/micro/icons";
import { useFormContext, useWatch } from "react-hook-form";
import { BodyElementProps, TableData } from "../../types";
import { classNames } from "@/utils";

export default function ExpandButton({ key }: BodyElementProps & { key: string | number }) {
  const table = useFormContext<TableData>();
  const state = useWatch<TableData>();
  const { expandedRows } = state;
  const expanded = !!expandedRows && !!key && expandedRows[key];

  function handleClick() {
    if (!key) return;
    let newExpandedRows = { ...(expandedRows || {}) };
    if (expanded) delete newExpandedRows[key];
    else newExpandedRows[key] = true;
    table.setValue("expandedRows", newExpandedRows);
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Button severity="info" size="sm" className="w-10 h-10 bg-slate-200" onClick={handleClick}>
        <Icon icon="ArrowDown" className={classNames("scale-[0.8] [&_*]:fill-slate-500", { "rotate-180": expanded })} />
      </Button>
    </div>
  );
}
