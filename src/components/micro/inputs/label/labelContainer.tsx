"use client";

import { extend } from "@/themes/utils";
import { classNames } from "@/utils";
import { forwardRef } from "react";

type DIV = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type LabelContainerProps = Pick<DIV, "onClick" | "children"> & {
  hasValue: boolean;
  focused?: boolean;
  hideMessage?: boolean;
  label?: string;
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
  return (
    <div className={classNames("flex flex-col gap-0.5 w-full", props.className?.content)} ref={ref}>
      <div
        onClick={props.onClick}
        className={classNames(
          "relative flex items-end border rounded-lg h-14 cursor-text w-full overflow-hidden ",
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
          props.className?.container
        )}
      >
        {props.children}
        <label
          className={classNames(
            "absolute text-base font-medium transition-all ease-in-out cursor-text min-h-5 z-10",
            "-translate-y-1/2 top-1/2 right-4 pointer-events-none",
            "peer-focus:-translate-y-6 peer-focus:text-sm",
            { "-translate-y-6 text-sm": props.hasValue || props.focused },
            props.className?.label
          )}
        >
          {props.label}
        </label>
      </div>
      {!props.hideMessage && (
        <span
          className={classNames(
            "px-2 h-5 text-xs text-start",
            {
              "text-success-500": props.status === "success",
              "text-error-500": props.status === "error",
              "text-warning-500": props.status === "warning",
              "text-gray-400": props.status === "disabled",
              "text-gray-700": props.status === undefined,
            },
            props.className?.message
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
