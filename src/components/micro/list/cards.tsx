import { classNames } from "@/utils";
import { ArrowLeft, ArrowLeft2 } from "iconsax-react";
import { ReactNode } from "react";

export type CardsListProps = {
  list?: {
    name: ReactNode | string;
    value: ReactNode | string;
  }[];
  indicator?: boolean;
  className?: string;
};

export default function CardsList(props: CardsListProps) {
  return (
    <div className={classNames("flex flex-col gap-4", props.className)}>
      {props.list?.map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-between gap-2 rounded-md border border-gray-300 p-4">
            <div className="flex items-center gap-2">
              {props.indicator && <div className="min-size-2 rounded-sm bg-gray-400" />}
              <div className="text-nowrap text-sm font-medium text-gray-600">{item.name}</div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center justify-end">{item.value}</div>
              <ArrowLeft2 />
            </div>
          </div>
        );
      })}
    </div>
  );
}
