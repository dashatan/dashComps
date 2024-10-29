import { classNames } from "@/utils";
import { ReactNode } from "react";
import { Icon, IconName } from "../icons";

export type GridProps = {
  children?: ReactNode;
  className?: { l1?: string; l2?: string };
};

export function Grid({ className, children }: GridProps) {
  return (
    <div className={classNames("flex h-full w-full items-start justify-center desktop:max-h-256", className?.l1)}>
      <div className={classNames("grid h-full w-full max-w-screen-desktop-lg grid-cols-4 gap-4 p-4", className?.l2)}>
        {children}
      </div>
    </div>
  );
}
export function Box(props: DIV) {
  return (
    <div
      {...props}
      className={classNames(
        "col-span-4 flex min-h-100 w-full flex-col overflow-hidden",
        "rounded-3xl border border-gray-200 bg-gray-50 p-4 desktop:min-h-76",
        props.className,
      )}
    />
  );
}

export function Title(props: {
  Icon?: ReactNode;
  icon?: IconName;
  text?: string;
  subText?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300">
        {props.icon && <Icon icon={props.icon} />}
        {props.Icon}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-800">{props.text}</span>
          {props.subText && (
            <span className="text-sm font-semibold text-gray-500">
              {"( "}
              {props.subText}
              {" )"}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-400">{props.subtitle}</div>
      </div>
    </div>
  );
}
