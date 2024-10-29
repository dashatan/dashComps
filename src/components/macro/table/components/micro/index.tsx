import { ColorType, getColorClass } from "@/components/micro/badge/color";
import { Icon, IconName } from "@/components/micro/icons";
import dateFormatPersian, { timeFormat } from "@/components/micro/inputs/date/utils/dateFormatPersian";
import { classNames } from "@/utils";
import { words } from "@/utils/words";
import { Minus } from "lucide-react";

export function TextItem({ text, prefixText }: { text?: string | number; prefixText?: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      {!text ? (
        <Minus className="text-gray-400" />
      ) : (
        <>
          <span>{text}</span>
          <span>{prefixText}</span>
        </>
      )}
    </div>
  );
}

export function LinkButton({ text, icon }: { text: string; icon: IconName }) {
  return (
    <div className="flex h-10 items-center gap-2 bg-gray-100 px-2">
      <span className="w-6">
        <Icon icon={icon} />
      </span>
      <div className="h-full w-px bg-gray-300" />
      <span className="w-full text-sm font-medium">{text}</span>
    </div>
  );
}

export function ColorDot({ color }: { color?: ColorType }) {
  return <span className={classNames("h-2 w-2 rounded-sm", getColorClass(color))} />;
}

export function NumberField({ value, prefix }: { value?: number; prefix?: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span>{Math.round(value || 0)}</span>
      <span>{prefix}</span>
    </div>
  );
}

export function DateElement({ val, className }: { val?: number | null; className?: string }) {
  if (!val) return <div>{words.UNCERTAIN}</div>;
  const date = dateFormatPersian(val);
  const time = timeFormat(val);
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      <span className="w-20 border-e border-slate-300 pl-2 text-left">{time}</span>
      <span className="">{date}</span>
    </div>
  );
}

export function NoContent() {
  return (
    <div className="flex items-center justify-center">
      <Minus className="text-gray-400" />
    </div>
  );
}

export function CentredHeader(props: DIV) {
  return <div {...props} className={classNames("flex w-full items-center justify-center")} />;
}
