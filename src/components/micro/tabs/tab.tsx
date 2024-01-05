"use client";

import { classNames } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  tabs?: { header?: string; content?: any }[];
  activeTab?: number;
  className?: { container?: string; tab?: string };
  onChange?: (index: number) => void;
  disabled?: boolean;
}

export default function Tabs(props: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    props.onChange && props.onChange(active);
  }, [active]);

  useEffect(() => {
    props.activeTab && setActive(props.activeTab);
  }, [props.activeTab]);

  return (
    <div
      className={classNames(
        "flex items-center transition-all duration-300 relative",
        "w-full border-b border-gray-300",
        props.className?.container
      )}
    >
      {props.tabs?.map((tab, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              !props.disabled && setActive(index);
            }}
            className={classNames(
              "transition-colors p-4 bottom-px relative",
              {
                "text-primary-800": active === index,
                "text-gray-400": active !== index && props.disabled,
                "cursor-default": props.disabled,
                "cursor-pointer": !props.disabled,
              },
              props.className?.tab
            )}
          >
            <div
              className={classNames(
                "absolute left-0 w-full h-1 -bottom-0.5 bg-primary-800 rounded-t-full",
                "opacity-0 transition-all duration-300",
                {
                  "opacity-100": active === index,
                }
              )}
            />
            {tab.header}
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
