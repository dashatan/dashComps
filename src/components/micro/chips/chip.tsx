import { classNames } from "@/utils";
import { forwardRef } from "react";
import { X } from "lucide-react";

export interface ChipProps extends DIV {
  label?: string;
  name?: string;
  template?: React.ReactNode;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        "flex items-center justify-between gap-2 p-1.5 rounded-[4px] min-w-fit min-h-7",
        "bg-slate-200 text-gray-600 text-xs",
        props.className
      )}
    >
      <span>{props.label}</span>
      {props.template}
      <div
        className="w-4 h-4 bg-slate-500 text-slate-50 rounded-full cursor-pointer flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          props.onRemove && props.onRemove();
        }}
      >
        <X className="w-3" />
      </div>
    </div>
  );
});
Chip.displayName = "Chip";
export default Chip;
