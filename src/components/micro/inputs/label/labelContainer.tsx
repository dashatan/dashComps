"use client";

import { classNames } from "@/utils";
import { forwardRef } from "react";

type DIV = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type LabelContainerProps = Pick<DIV, "onClick" | "children"> & {
  hasValue: boolean;
  focused?: boolean;
  showMessage?: boolean;
  label?: string;
  labelSize?: "xs" | "sm";
  status?: "primary" | "secondary" | "success" | "error" | "warning" | "disabled";
  fillType?: "fill" | "stroke";
  message?: React.ReactNode | string;
  className?: {
    content?: string;
    container?: string;
    label?: string;
    message?: string;
  };
};
const LabelContainer = forwardRef<HTMLDivElement, LabelContainerProps>((props, ref) => {
  const focused = props.hasValue || props.focused;
  return (
    <div className={classNames("flex w-full flex-col gap-0.5", props.className?.content)} ref={ref}>
      <div
        onClick={props.onClick}
        className={classNames(
          "relative flex h-14 w-full cursor-text items-end overflow-hidden rounded-lg border",
          "bg-gray-100",
          {
            "border-primary-500 text-primary-500": props.status === "primary",
            "border-secondary-500 text-secondary-500": props.status === "secondary",
            "border-success-500 text-success-500": props.status === "success",
            "border-error-500 text-error-500": props.status === "error",
            "[&_*]:!stroke-error-500": props.status === "error" && ["stroke", undefined].includes(props.fillType),
            "[&_*]:!fill-error-500": props.status === "error" && props.fillType == "fill",
            "border-warning-500 text-warning-500": props.status === "warning",
            "border-gray-100 text-gray-400": props.status === "disabled",
            "border-gray-300 text-gray-700": props.status === undefined,
          },
          props.className?.container,
        )}
      >
        {props.children}
        <label
          className={classNames(
            "absolute z-10 min-h-5 cursor-text text-base font-medium transition-all ease-linear",
            "pointer-events-none right-4 top-1/2 -translate-y-1/2",
            "peer-focus:-translate-y-6 peer-focus:text-sm",
            {
              "text-sm": ["sm", undefined].includes(props.labelSize) && !focused,
              "text-xs": ["sm", undefined].includes(props.labelSize) && focused,
              "s text-[11px]": props.labelSize === "xs" && !focused,
              "text-[10px]": props.labelSize === "xs" && focused,
              "-translate-y-6": focused,
            },
            props.className?.label,
          )}
        >
          {props.label}
        </label>
      </div>
      {(props.message || props.showMessage) && (
        <span
          className={classNames(
            "h-5 px-2 text-start text-xs",
            {
              "text-success-500": props.status === "success",
              "text-error-500": props.status === "error",
              "text-warning-500": props.status === "warning",
              "text-gray-400": props.status === "disabled",
              "text-gray-700": props.status === undefined,
            },
            props.className?.message,
          )}
        >
          {props.message}
        </span>
      )}
    </div>
  );
});

LabelContainer.displayName = "LabelContainer";

export default LabelContainer;
