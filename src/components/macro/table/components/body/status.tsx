import { Dot } from "lucide-react";
import { classNames } from "@/utils";
import { ReactNode } from "react";

export interface StatusBoxProps {
  text: string | ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

export default function StatusBox(props: StatusBoxProps) {
  return (
    <div
      className={classNames("flex items-center justify-center", { "cursor-pointer": props.onClick })}
      onClick={props.onClick}
    >
      <div
        className={classNames(
          "relative flex h-10 min-w-28 items-center whitespace-nowrap rounded-md border px-4 text-center text-sm font-medium",
          {
            "border-primary-200 bg-primary-50 [&_*]:fill-primary-300 [&_*]:stroke-primary-400":
              props.color === "primary",
            "border-secondary-200 bg-secondary-50 [&_*]:fill-secondary-300 [&_*]:stroke-secondary-400":
              props.color === "secondary",
            "border-success-200 bg-success-50 [&_*]:fill-success-300 [&_*]:stroke-success-400":
              props.color === "success",
            "border-error-200 bg-error-50 [&_*]:fill-error-300 [&_*]:stroke-error-400": props.color === "error",
            "border-warning-200 bg-warning-50 [&_*]:fill-warning-300 [&_*]:stroke-warning-400":
              props.color === "warning",
            "border-slate-200 bg-slate-100 [&_*]:fill-slate-300 [&_*]:stroke-slate-400": [undefined, "info"].includes(
              props.color,
            ),
          },
          props.className,
        )}
      >
        {props.onClick && (
          <Dot
            className={classNames("absolute right-1 scale-[2]", {
              "text-primary-400": props.color === "primary",
              "text-secondary-400": props.color === "secondary",
              "text-success-400": props.color === "success",
              "text-error-400": props.color === "error",
              "text-warning-400": props.color === "warning",
              "text-slate-400": [undefined, "info"].includes(props.color),
            })}
          />
        )}
        <span className={classNames("right-0 w-full", props.textClassName)}>{props.text}</span>
        {props.icon}
      </div>
    </div>
  );
}
