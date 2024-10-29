"use client";

import { classNames } from "@/utils";
import { Circle } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  tabs?: { header?: string; content?: ReactNode }[];
  activeTab?: number;
  className?: { container?: string; tab?: string };
  withoutIndicator?: boolean;
  onChange?: (index: number) => void;
}

export default function Segments(props: Props) {
  const [active, setActive] = useState(props.activeTab || 0);

  useEffect(() => {
    props.onChange && props.onChange(active);
  }, [active]);

  return (
    <div
      className={classNames(
        "flex h-14 w-full items-center overflow-hidden rounded-lg border border-gray-300 transition-all",
        props.className?.container,
      )}
    >
      {props.tabs?.map((tab, index) => {
        return (
          <div
            key={index}
            onClick={() => setActive(index)}
            className={classNames(
              "relative flex h-full w-full cursor-pointer select-none items-center",
              "justify-center text-nowrap text-xs font-medium text-gray-700 transition-all",
              // "border-s border-gray-300",
              {
                "bg-gray-100 font-bold": active === index,
                "border-none": index === 0,
              },
              props.className?.tab,
            )}
          >
            {!props.withoutIndicator && (
              <Circle
                className={classNames("absolute right-1 ms-1 w-2 fill-gray-700 opacity-0 transition-all", {
                  "opacity-100": active === index,
                })}
              />
            )}

            {tab.header}
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
