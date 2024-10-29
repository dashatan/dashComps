import { classNames } from "@/utils";
import { ReactNode } from "react";

export type TableListProps = {
  header: {
    value?: ReactNode | string;
  }[];
  list?: {
    name: ReactNode | string;
    value: ReactNode | string;
  }[];
  indicator?: boolean;
  className?: string;
};

export default function TableList(props: TableListProps) {
  return (
    <div className={classNames("flex flex-col overflow-hidden rounded-md border border-gray-300", props.className)}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-gray-200 p-4">
        <div>{props.header[0].value}</div>
        <div>{props.header[1].value}</div>
      </div>
      {props.list?.map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-between border-b border-gray-300 p-4 last:border-b-0">
            <div>{item.name}</div>
            <div>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}
