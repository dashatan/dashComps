"use client";

import { classNames } from "@/utils";
import { Icon, IconName } from "../icons";

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  severity?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  rounded?: "sm" | "md" | "lg" | "full" | "circle";
  icon?: React.ReactNode;
  label?: string;
  colorFill?: boolean;
}

export default function Button(props: ButtonProps) {
  const { severity, variant, size, rounded } = props;
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={classNames(
        "items-center cursor-pointer flex justify-center overflow-hidden relative select-none text-center align-bottom",
        "transition-all",

        // Severity
        {
          // Primary
          //  contained
          "text-primary-50 bg-primary-600 hover:bg-primary-700 [&_svg_*]:fill-primary-50 [&_svg_*]:stroke-primary-50":
            ["primary", undefined].includes(severity) && ["contained", undefined].includes(variant),
          //  outlined
          "text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-600 [&_*]:fill-primary-600":
            ["primary", undefined].includes(severity) && variant === "outlined",
          //  text
          "text-primary-600 bg-transparent hover:bg-primary-50 [&_*]:fill-primary-600":
            ["primary", undefined].includes(severity) && variant === "text",

          // Secondary
          //  contained
          "text-secondary-50 bg-secondary-600 hover:bg-secondary-700 [&_*]:fill-secondary-50":
            severity === "secondary" && ["contained", undefined].includes(variant),
          //  outlined
          "text-secondary-600 bg-secondary-50 hover:bg-secondary-100 border border-secondary-600 [&_*]:fill-secondary-600":
            severity === "secondary" && variant === "outlined",
          //  text
          "text-secondary-600 bg-transparent hover:bg-secondary-50 [&_*]:fill-secondary-600":
            severity === "secondary" && variant === "text",

          // Success
          //  contained
          "text-success-50 bg-success-600 hover:bg-success-700 [&_*]:fill-success-50":
            severity === "success" && ["contained", undefined].includes(variant),
          //  outlined
          "text-success-600 bg-success-50 hover:bg-success-100 border border-success-600 [&_*]:fill-success-600":
            severity === "success" && variant === "outlined",
          //  text
          "text-success-600 bg-transparent hover:bg-success-50 [&_*]:fill-success-600":
            severity === "success" && variant === "text",

          // Warning
          //  contained
          "text-warning-50 bg-warning-600 hover:bg-warning-700 [&_*]:fill-warning-50":
            severity === "warning" && ["contained", undefined].includes(variant),
          //  outlined
          "text-warning-600 bg-warning-50 hover:bg-warning-100 border border-warning-600 [&_*]:fill-warning-600":
            severity === "warning" && variant === "outlined",
          //  text
          "text-warning-600 bg-transparent hover:bg-warning-50 [&_*]:fill-warning-600":
            severity === "warning" && variant === "text",

          // Danger
          //  contained
          "text-error-50 bg-error-600 hover:bg-error-700 [&_*]:fill-error-50":
            severity === "danger" && variant === "contained",
          //  outlined
          "text-error-600 bg-error-50 hover:bg-error-100 border border-error-600 [&_*]:fill-error-600":
            severity === "danger" && variant === "outlined",
          //  text
          "text-error-600 bg-transparent hover:bg-error-50 [&_*]:fill-error-600":
            severity === "danger" && variant === "text",

          // Info
          //  contained
          "text-gray-50 bg-gray-600 hover:bg-gray-500 [&_*]:fill-gray-50":
            severity === "info" && variant === "contained",
          //  outlined
          "text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 [&_*]:fill-gray-600":
            severity === "info" && variant === "outlined",
          //  text
          "text-gray-600 bg-transparent hover:bg-gray-50 [&_*]:fill-gray-600":
            severity === "info" && variant === "text",
        },

        // Size
        {
          ...(rounded !== "circle"
            ? {
                "text-base px-4 py-2": size === undefined || size === "md",
                "text-sm py-1 px-2": size === "sm",
                "text-xs py-0.5 px-1": size === "xs",
                "text-lg py-3 px-6": size === "lg",
                "text-lg py-4 px-8": size === "xl",
              }
            : {
                "text-base p-3": size === undefined || size === "md",
                "text-sm p-2 asp": size === "sm",
                "text-xs p-1": size === "xs",
                "text-lg p-4": size === "lg",
                "text-lg p-5": size === "xl",
              }),
        },
        // radius
        {
          "rounded-md": rounded === "md" || rounded === undefined,
          "rounded-lg": rounded === "lg",
          "rounded-sm": rounded === "sm",
          "rounded-full": rounded === "full",
          "rounded-full aspect-square": rounded === "circle",
        },
        { "opacity-60 pointer-events-none cursor-default": props.disabled },
        props.className
      )}
    >
      {props.children}
      {props.icon && <div className="">{props.icon}</div>}
      {props.label && <div className="font-bold">{props.label}</div>}
    </button>
  );
}
