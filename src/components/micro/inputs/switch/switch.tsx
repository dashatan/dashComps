import { classNames } from "@/utils";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export interface SwitchProps {
  severity?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  active?: boolean;
  onChange?: (active: boolean) => void;
}
export default function Switch(props: SwitchProps) {
  const [active, setActive] = useState(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  function handleChange() {
    setActive((x) => !x);
    props.onChange && props.onChange(!active);
  }

  return (
    <div
      onClick={handleChange}
      className={classNames("flex items-center rounded-full justify-end cursor-pointer select-none transition-all", {
        "h-4 min-w-6 max-w-6 p-0.5": props.size === "xs",
        "h-5 min-w-9 max-w-8": props.size === "sm",
        "h-6 min-w-11 max-w-11": props.size === "md" || props.size === undefined,
        "h-9 min-w-16 max-w-16": props.size === "lg",
        "h-10 min-w-20 max-w-20": props.size === "xl",
        "bg-slate-400": !active,
        ...(active && {
          "bg-primary-600": props.severity === "primary" || props.severity === undefined,
          "bg-secondary-600": props.severity === "secondary",
          "bg-success-600": props.severity === "success",
          "bg-warning-600": props.severity === "warning",
          "bg-error-600": props.severity === "danger",
          "bg-gray-600": props.severity === "info",
        }),
      })}
    >
      <div
        className={classNames("flex items-center justify-center", "text-xs font-semibold rounded-full transition-all", {
          "w-3 h-3": props.size === "xs",
          "w-4 h-4 ": props.size === "sm",
          "w-5 h-5": props.size === "md" || props.size === undefined,
          "w-7 h-7": props.size === "lg",
          "w-8 h-8": props.size === "xl",
          "bg-gray-100 scale-[0.68]": !active,
          "scale-100": active,
          ...(active && {
            "translate-x-2": props.size === "xs",
            "translate-x-[18px]": props.size === "sm",
            "translate-x-[22px] scale-90": props.size === "md" || props.size === undefined,
            "translate-x-8": props.size === "lg",
            "translate-x-11": props.size === "xl",
            "bg-primary-100": props.severity === "primary" || props.severity === undefined,
            "bg-secondary-100": props.severity === "secondary",
            "bg-success-100": props.severity === "success",
            "bg-warning-100": props.severity === "warning",
            "bg-error-100": props.severity === "danger",
          }),
          ...(!active && {
            "translate-x-0": props.size === "xs",
            "translate-x-1": props.size === "sm",
            "translate-x-[2px] ": props.size === "md" || props.size === undefined,
            "translate-x-1  ": props.size === "lg",
            "translate-x-1   ": props.size === "xl",
          }),
        })}
      >
        <Check
          className={classNames({
            ...(active && {
              "w-2": props.size === "xs",
              "w-3": props.size === "sm",
              "w-4": props.size === "md" || props.size === undefined,
              "w-5": props.size === "lg",
              "w-6": props.size === "xl",
            }),
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
