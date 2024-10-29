import { classNames } from "@/utils";
import { SelectItem } from "../select/types";
import { ReactNode } from "react";

export type ListItemProps = SelectItem & {
  active: boolean;
  onChange: (value?: string | number) => void;
  template?: ReactNode;
};

export function ListItem({ label, value, onChange, active, className, disabled, template }: ListItemProps) {
  return (
    <li
      className={classNames(
        "p-4 cursor-pointer font-medium text-gray-600 w-full list-none",
        {
          "bg-primary-100": active,
          "bg-gray-100 hover:bg-gray-200": !active,
          "bg-gray-100 hover:bg-gray-100 text-gray-400": disabled,
        },
        className
      )}
      onClick={() => onChange(active ? undefined : value)}
    >
      {template || label}
    </li>
  );
}
