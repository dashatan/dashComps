import Marquee from "@/components/micro/typography/marquee";
import { classNames } from "@/utils";
import { ReactNode } from "react";

export type ButtonListProps = {
  list?: {
    name: string;
    value: ReactNode | string;
  }[];
  indicator?: boolean;
  className?: string;
};

export default function ButtonsList(props: ButtonListProps) {
  return (
    <div className={classNames("flex flex-col gap-4", props.className)}>
      {props.list?.map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {props.indicator && <div className="size-2 rounded-sm bg-gray-400" />}
              <div className="text-sm font-medium text-gray-600">{item.name}</div>
            </div>
            <Marquee className="flex min-h-10 min-w-40 max-w-40 items-center justify-center overflow-hidden rounded border border-gray-300 text-center">
              {item.value}
            </Marquee>
          </div>
        );
      })}
    </div>
  );
}
