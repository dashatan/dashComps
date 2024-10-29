import Button from "@/components/micro/buttons/button";
import { Icon } from "@/components/micro/icons";
import { useFormContext, useWatch } from "react-hook-form";
import { classNames } from "@/utils";
import { BodyElementProps, TableData } from "@/components/macro/table/types";
import dateFormatPersian, { timeFormat } from "@/components/micro/inputs/date/utils/dateFormatPersian";

export default function ExpandButton({
  key,
  className,
}: BodyElementProps & { key: string | number; className?: string }) {
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
    <div className="flex w-full items-center justify-center">
      <Button severity="info" size="sm" className="h-10 w-10 bg-slate-200" onClick={handleClick}>
        <Icon
          icon="ArrowDown"
          className={classNames("scale-[0.8] [&_*]:fill-slate-500", { "rotate-180": expanded }, className)}
        />
      </Button>
    </div>
  );
}

export function DividerHor(props: DIV) {
  return <div {...props} className={classNames("h-full w-px bg-gray-300", props.className)} />;
}

export function Section(props: DIV) {
  return (
    <div className="h-full w-full" {...props}>
      <div className="flex items-start gap-2 p-4">
        <span className="whitespace-nowrap text-gray-500">{props.title} :</span>
        {props.children}
      </div>
    </div>
  );
}

export function DateField(val?: number | null) {
  if (!val) return <>-</>;
  const date = dateFormatPersian(val);
  const time = timeFormat(val);
  return (
    <div className="flex h-7 items-center gap-2">
      <span className="text-left">{time}</span>
      <DividerHor />
      <span className="">{date}</span>
    </div>
  );
}
