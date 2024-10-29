import { classNames } from "@/utils";
import { useState } from "react";
import { Check } from "lucide-react";

export interface SwitchProps {
  severity?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  active?: boolean;
  onChange?: (active: boolean) => void;
}
export default function Switch(props: SwitchProps) {
  const [active, setActive] = useState(props.active);

  function handleChange() {
    setActive((x) => !x);
    props.onChange && props.onChange(!active);
  }

  return (
    <div
      onClick={handleChange}
      className={classNames(
        "flex items-center rounded-full justify-end h-8 min-w-14",
        "cursor-pointer select-none transition-all",
        {
          "scale-50": props.size === "xs",
          "scale-75": props.size === "sm",
          "scale-100": props.size === "md" || props.size === undefined,
          "scale-125": props.size === "lg",
          "scale-150": props.size === "xl",
          "bg-gray-600": !active,
          ...(active && {
            "bg-primary-600": props.severity === "primary" || props.severity === undefined,
            "bg-secondary-600": props.severity === "secondary",
            "bg-success-600": props.severity === "success",
            "bg-warning-600": props.severity === "warning",
            "bg-error-600": props.severity === "danger",
            "bg-gray-600": props.severity === "info",
          }),
        }
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-center w-6 h-6",
          "text-xs font-semibold rounded-full transition-all",
          {
            "bg-gray-100 scale-75 translate-x-1": !active,
            "scale-100 translate-x-7": active,
            ...(active && {
              "bg-primary-100": props.severity === "primary" || props.severity === undefined,
              "bg-secondary-100": props.severity === "secondary",
              "bg-success-100": props.severity === "success",
              "bg-warning-100": props.severity === "warning",
              "bg-error-100": props.severity === "danger",
            }),
          }
        )}
      >
        <Check
          className={classNames("w-4", {
            "scale-0": !active,
            "text-primary-600": props.severity === "primary" || props.severity === undefined,
            "text-secondary-600": props.severity === "secondary",
            "text-success-600": props.severity === "success",
            "text-warning-600": props.severity === "warning",
            "text-error-600": props.severity === "danger",
            "text-gray-600": props.severity === "info",
          })}
        />
      </div>
    </div>
  );
}
