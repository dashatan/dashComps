import { classNames } from "@/utils";
import { forwardRef } from "react";
import Button from "../buttons/button";
import { Cross, Plus } from "lucide-react";

export interface ChipProps extends DIV {
  label?: string;
  name?: string;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        "flex items-center justify-between gap-4 p-1 rounded-md min-w-fit",
        "bg-slate-200 text-gray-600 text-xs overflow-hidden text-ellipsis",
        props.className
      )}
    >
      <span>{props.label}</span>
      <Button
        variant="contained"
        size="xs"
        severity="info"
        rounded="circle"
        className="w-5 min-w-5 h-5 !p-0"
        onClick={props.onRemove}
      >
        <Plus className="rotate-45 w-4 min-w-4" />
      </Button>
    </div>
  );
});
Chip.displayName = "Chip";
export default Chip;
