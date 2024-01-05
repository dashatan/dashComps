"use client";

import type { HTMLAttributes } from "react";
import { useMemo } from "react";
import { icons } from "./icons";
import { classNames } from "@/utils";

export type IconName = keyof typeof icons;

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  className?: string;
  rotate?: number;
  fill?: boolean;
}

export const Icon = ({ icon, rotate, color, className, ...rest }: Props) => {
  const SvgIcon = useMemo(() => icons[icon], [icon]);
  if (!SvgIcon) return null;

  return (
    <div
      {...rest}
      className={classNames("flex justify-center items-center", { "[&_*]:fill-gray-500": rest.fill }, className)}
      aria-label={icon}
      role="img"
    >
      <SvgIcon />
    </div>
  );
};

export default Icon;
