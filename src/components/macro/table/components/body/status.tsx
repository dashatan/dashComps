import { Circle, CircleDot, Dot } from "lucide-react";
import { classNames } from "@/utils";

export interface StatusBoxProps {
  text: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  onClick?: () => void;
}

export default function StatusBox(props: StatusBoxProps) {
  return (
    <div
      className={classNames("flex items-center justify-center", { "cursor-pointer": props.onClick })}
      onClick={props.onClick}
    >
      <div
        className={classNames(
          "h-10 px-4 min-w-28 text-sm font-medium border rounded-md flex items-center  text-center whitespace-nowrap relative",
          {
            "bg-primary-50 border-primary-100": props.color === "primary",
            "bg-secondary-50 border-secondary-100": props.color === "secondary",
            "bg-success-50 border-success-100": props.color === "success",
            "bg-error-50 border-error-100": props.color === "error",
            "bg-warning-50 border-warning-100": props.color === "warning",
            "bg-slate-100 border-slate-200": [undefined, "info"].includes(props.color),
          }
        )}
      >
        {props.onClick && (
          <Dot
            className={classNames("scale-[2] absolute right-1", {
              "text-primary-400": props.color === "primary",
              "text-secondary-400": props.color === "secondary",
              "text-success-400": props.color === "success",
              "text-error-400": props.color === "error",
              "text-warning-400": props.color === "warning",
              "text-slate-400": [undefined, "info"].includes(props.color),
            })}
          />
        )}
        <span className="w-full right-0">{props.text}</span>
      </div>
    </div>
  );
}
