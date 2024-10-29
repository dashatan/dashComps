"use client";

import { classNames } from "@/utils";
import { ReactNode, useEffect, useState } from "react";

export type Tab = {
  header?: string;
  name?: string;
  content?: string | number | ReactNode;
};

export type TabsProps = {
  tabs?: Tab[];
  activeTab?: number;
  className?: { container?: string; tab?: string };
  onChange?: (index: number) => void;
  disabled?: boolean;
  sideElements?: ReactNode;
};

export default function Tabs(props: TabsProps) {
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
        "relative flex items-center transition-all duration-300",
        "w-full border-b border-gray-300",
        props.className?.container,
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
              "relative bottom-px p-4 font-semibold transition-all",
              {
                "text-gray-900": active === index,
                "text-gray-400": active !== index,
                "text-gray-200": active !== index && props.disabled,
                "cursor-default": props.disabled,
                "cursor-pointer": !props.disabled,
              },
              props.className?.tab,
            )}
          >
            <div
              className={classNames(
                "absolute -bottom-0.5 left-0 h-1 w-full rounded-t-full bg-primary-500",
                "opacity-0 transition-all duration-300",
                {
                  "opacity-100": active === index,
                },
              )}
            />
            {tab.header}
            {tab.content}
          </div>
        );
      })}
      {props.sideElements && <div className="ms-auto">{props.sideElements}</div>}
    </div>
  );
}
