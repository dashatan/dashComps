import dateFormatPersian, { timeFormat } from "@/components/micro/inputs/date/utils/dateFormatPersian";

export default function DateField(val?: number | null) {
  if (!val) return <>-</>;
  const date = dateFormatPersian(val);
  const time = timeFormat(val);
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 border-e border-slate-300 pl-2 text-left">{time}</span>
      <span className="">{date}</span>
    </div>
  );
}
