import { classNames } from "@/utils";
import { ReactNode } from "react";

export type LinesListProps = {
  list?: {
    name: string;
    value: ReactNode | string;
  }[];
  indicator?: boolean;
  className?: string;
};

export default function LinesList(props: LinesListProps) {
  return (
    <div className={classNames("flex flex-col gap-4", props.className)}>
      {props.list?.map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {props.indicator && <div className="min-size-2 rounded-sm bg-gray-400" />}
              <div className="text-nowrap text-sm font-medium text-gray-600">{item.name}</div>
            </div>
            <div className="h-px w-full bg-gray-300" />
            <div className="flex items-center justify-center">{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}
