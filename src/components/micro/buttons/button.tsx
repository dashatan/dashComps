"use client";

import { classNames } from "@/utils";

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text" | "icon";
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
        "relative flex cursor-pointer select-none items-center justify-center overflow-hidden text-center align-bottom",
        "transition-all",

        // Severity
        {
          // Primary
          //  contained
          "bg-primary-600 text-primary-50 hover:bg-primary-700 [&_svg_*]:fill-primary-50 [&_svg_*]:stroke-primary-50":
            ["primary", undefined].includes(severity) && ["contained", undefined].includes(variant),
          //  outlined
          "border border-primary-600 bg-primary-50 text-primary-600 hover:bg-primary-100 [&_*]:fill-primary-600":
            ["primary", undefined].includes(severity) && variant === "outlined",
          //  text
          "bg-transparent text-primary-600 hover:bg-primary-50 [&_*]:fill-primary-600":
            ["primary", undefined].includes(severity) && variant === "text",
          //  icon
          "bg-transparent text-primary-600 hover:bg-primary-50":
            ["primary", undefined].includes(severity) && variant === "icon",

          // Secondary
          //  contained
          "bg-secondary-600 text-secondary-50 hover:bg-secondary-700 [&_*]:fill-secondary-50":
            severity === "secondary" && ["contained", undefined].includes(variant),
          //  outlined
          "border border-secondary-600 bg-secondary-50 text-secondary-600 hover:bg-secondary-100 [&_*]:fill-secondary-600":
            severity === "secondary" && variant === "outlined",
          //  text
          "bg-transparent text-secondary-600 hover:bg-secondary-50 [&_*]:fill-secondary-600":
            severity === "secondary" && variant === "text",
          //  icon
          "bg-transparent text-secondary-600 hover:bg-secondary-50": severity === "secondary" && variant === "icon",

          // Success
          //  contained
          "bg-success-600 text-success-50 hover:bg-success-700 [&_*]:fill-success-50":
            severity === "success" && ["contained", undefined].includes(variant),
          //  outlined
          "border border-success-600 bg-success-50 text-success-600 hover:bg-success-100 [&_*]:fill-success-600":
            severity === "success" && variant === "outlined",
          //  text
          "bg-transparent text-success-600 hover:bg-success-50 [&_*]:fill-success-600":
            severity === "success" && variant === "text",
          //  icon
          "bg-transparent text-success-600 hover:bg-success-50": severity === "success" && variant === "icon",

          // Warning
          //  contained
          "bg-warning-600 text-warning-50 hover:bg-warning-700 [&_*]:fill-warning-50":
            severity === "warning" && ["contained", undefined].includes(variant),
          //  outlined
          "border border-warning-600 bg-warning-50 text-warning-600 hover:bg-warning-100 [&_*]:fill-warning-600":
            severity === "warning" && variant === "outlined",
          //  text
          "bg-transparent text-warning-600 hover:bg-warning-50 [&_*]:fill-warning-600":
            severity === "warning" && variant === "text",
          //  icon
          "bg-transparent text-warning-600 hover:bg-warning-50": severity === "warning" && variant === "icon",

          // Danger
          //  contained
          "bg-error-600 text-error-50 hover:bg-error-700 [&_*]:fill-error-50":
            severity === "danger" && variant === "contained",
          //  outlined
          "border border-error-600 bg-error-50 text-error-600 hover:bg-error-100 [&_*]:fill-error-600":
            severity === "danger" && variant === "outlined",
          //  text
          "bg-transparent text-error-600 hover:bg-error-50 [&_*]:fill-error-600":
            severity === "danger" && variant === "text",
          //  icon
          "bg-transparent text-error-600 hover:bg-error-50": severity === "danger" && variant === "icon",

          // Info
          //  contained
          "bg-gray-600 text-gray-50 hover:bg-gray-700 [&_*]:fill-gray-50":
            severity === "info" && variant === "contained",
          //  outlined
          "border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 [&_*]:fill-gray-600":
            severity === "info" && variant === "outlined",
          //  text
          "bg-transparent text-gray-600 hover:bg-gray-50 [&_*]:fill-gray-600":
            severity === "info" && variant === "text",
          //  icon
          "bg-transparent text-gray-600 hover:bg-gray-50": severity === "info" && variant === "icon",
        },

        // Size
        {
          ...(rounded !== "circle"
            ? {
                "px-4 py-2 text-base": size === undefined || size === "md",
                "px-2 py-1 text-sm": size === "sm",
                "px-1 py-0.5 text-xs": size === "xs",
                "px-6 py-3 text-lg": size === "lg",
                "px-8 py-4 text-lg": size === "xl",
              }
            : {
                "p-3 text-base": size === undefined || size === "md",
                "asp p-2 text-sm": size === "sm",
                "p-1 text-xs": size === "xs",
                "p-4 text-lg": size === "lg",
                "p-5 text-lg": size === "xl",
              }),
        },
        // radius
        {
          "rounded-md": rounded === "md" || rounded === undefined,
          "rounded-lg": rounded === "lg",
          "rounded-sm": rounded === "sm",
          "rounded-full": rounded === "full",
          "aspect-square rounded-full": rounded === "circle",
        },
        { "pointer-events-none cursor-default opacity-60": props.disabled },
        { "p-0": variant === "icon" },
        props.className,
      )}
    >
      {props.children}
      {props.icon && <div className="">{props.icon}</div>}
      {props.label && <div className="font-bold">{props.label}</div>}
    </button>
  );
}
