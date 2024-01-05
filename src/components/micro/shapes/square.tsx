import { classNames } from "@/utils";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status?: "ok" | "warning" | "danger" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Square(props: Props) {
  return (
    <div
      {...props}
      className={classNames(
        "hover:scale-110 transition-all ease-in-out cursor-pointer",
        {
          "bg-warning-700": props.status === "warning",
          "bg-error-700": props.status === "danger",
          "bg-primary-700": props.status === "ok" || props.status === undefined,
          "bg-gray-300": props.status === "none",
        },
        {
          "h-2 w-2 rounded-sm": props.size === "xs",
          "h-3 w-3 rounded-md": props.size === "sm",
          "h-4 w-4 rounded-md": props.size === "md" || props.size === undefined,
          "h-5 w-5 rounded-md": props.size === "lg",
          "h-6 w-6 rounded-md": props.size === "xl",
          "h-7 w-7 rounded-md": props.size === "2xl",
        },
        props.className
      )}
    />
  );
}
