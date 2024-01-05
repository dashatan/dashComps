import { classNames } from "@/utils";
export interface BadgeProps {
  children?: React.ReactNode;
  severity?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "circle" | "wide" | "square";
  withShadow?: boolean;
  className?: string;
}
export default function Badge(props: BadgeProps) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        "text-xs font-semibold rounded-full",
        {
          ...(props.variant === "circle"
            ? {
                "w-2 h-2": props.size === "xs",
                "w-4 h-4": props.size === "sm",
                "w-6 h-6": props.size === "md" || props.size === undefined,
                "w-7 h-7": props.size === "lg",
                "w-8 h-8": props.size === "xl",
              }
            : props.variant === "wide" || props.variant === undefined
            ? {
                "min-w-4 h-2": props.size === "xs",
                "min-w-6 h-4": props.size === "sm",
                "min-w-8 h-6": props.size === "md" || props.size === undefined,
                "min-w-9 h-7": props.size === "lg",
                "min-w-10 h-8": props.size === "xl",
              }
            : {}),

          "bg-primary-600 text-primary-100": props.severity === "primary" || props.severity === undefined,
          "bg-secondary-600 text-secondary-100": props.severity === "secondary",
          "bg-success-600 text-success-200": props.severity === "success",
          "bg-warning-600 text-warning-200": props.severity === "warning",
          "bg-error-600 text-error-100": props.severity === "danger",
          "bg-gray-600 text-gray-100": props.severity === "info",
        },
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
