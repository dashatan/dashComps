import { classNames } from "@/utils";
import { X } from "lucide-react";

export type ChipRemoveProps = {
  val: string | number;
  valName?: string | number;
  active: boolean;
  onRemove?: (val: string | number, Key?: string | number) => void;
};

export default function ChipRemove({ active, val, valName, onRemove }: ChipRemoveProps) {
  return (
    <div
      className={classNames(
        "flex h-8 min-w-8 items-center justify-center gap-2 px-1",
        "cursor-pointer rounded-full border",
        "select-none text-sm font-semibold",
        {
          "border-gray-500 bg-gray-100": !active,
          "border-primary-600 bg-primary-50": active,
        },
      )}
    >
      <span className="px-2">{val}</span>
      {active && (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary-200"
          onClick={() => onRemove && onRemove(val, valName)}
        >
          <X className="w-5 text-primary-600" />
        </span>
      )}
    </div>
  );
}
