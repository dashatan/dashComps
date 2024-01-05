import dateFormatPersian, { timeFormat } from "@/components/micro/inputs/date/utils/dateFormatPersian";

export default function DateField(val?: string | null) {
  if (!val) return <>-</>;
  const date = dateFormatPersian(new Date(val));
  const time = timeFormat(new Date(val));
  return (
    <div className="flex items-center gap-2">
      <span className="border-l border-slate-300 pl-2 w-20 text-left">{time}</span>
      <span className="">{date}</span>
    </div>
  );
}
