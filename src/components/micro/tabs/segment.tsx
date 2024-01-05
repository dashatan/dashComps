"use client";

import { classNames } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  tabs?: { header: string; content?: any }[];
  className?: { container?: string; tab?: string };
  onChange?: (index?: number) => void;
}

export default function Segments(props: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    props.onChange && props.onChange(active);
  }, [active, props]);

  return (
    <div
      className={classNames(
        "flex items-center bg-gray-100 rounded-lg p-1 gap-1 transition-all",
        "text-xs",
        "min-h-[28px] min-w-[80px]",
        props.className?.container
      )}
    >
      {props.tabs?.map((tab, index) => {
        return (
          <div
            key={index}
            onClick={() => setActive(index)}
            className={classNames(
              "rounded-md h-full cursor-pointer transition-colors p-2",
              "min-w-[48px] min-h-[10px]",
              {
                "bg-gray-50": active === index,
                "text-gray-500": active !== index,
              },
              props.className?.tab
            )}
          >
            {tab.header}
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
