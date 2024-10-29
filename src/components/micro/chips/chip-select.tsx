import { classNames } from "@/utils";
import { Check, X } from "lucide-react";

export type ChipSelectProps = {
  text?: string | number;
  val?: string | number | any;
  active: boolean;
  disabled?: boolean;
  onSelect: (val?: string | number | any) => void;
  className?: string;
  iconClassName?: string;
};

export default function ChipSelect(props: ChipSelectProps) {
  return (
    <div
      className={classNames(
        "flex h-8 min-w-8 items-center justify-center gap-1 px-4",
        "cursor-pointer rounded-full border text-sm font-semibold",
        "relative select-none",
        {
          "border-gray-500 text-gray-500 hover:bg-primary-100": !props.active,
          "border-primary-600 bg-primary-50": props.active,
          "border-gray-300 bg-gray-50 text-gray-400": props.disabled,
        },
        props.className,
      )}
      onClick={() => {
        if (props.disabled) return;
        props.onSelect(props.val);
      }}
    >
      <span className="absolute right-1 flex items-center justify-center rounded-full">
        {props.active && <Check className={classNames("w-3.5 text-primary-600", props.iconClassName)} />}
      </span>
      <span className="px-1">{props.text}</span>
    </div>
  );
}
