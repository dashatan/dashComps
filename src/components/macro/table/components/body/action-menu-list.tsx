import { IconName } from "@/components/micro/icons";
import { classNames } from "@/utils";
import { Suspense, lazy } from "react";
import { ActionMenuProps } from "./action-menu";

const Icon = lazy(() => import("@/components/micro/icons/icon"));

export default function ActionMenuList({ onChange, options }: ActionMenuProps) {
  return (
    <div className="z-20 flex flex-col bg-gray-50 min-w-40">
      {options?.map((option, index) => {
        if (option.hide) return <></>;
        return (
          <div
            key={index}
            className={classNames(
              "p-2 border-b last:border-0 font-medium text-base cursor-pointer",
              "flex items-center gap-2",
              "bg-gray-50 text-gray-800 hover:bg-gray-200",
              option.className
            )}
            onClick={() => {
              onChange && onChange(option.value);
            }}
          >
            <span className="w-6 h-6">
              <Suspense fallback={<div className="w-full h-full bg-gray-200 rounded-md"></div>}>
                <Icon icon={option.icon as IconName} className="scale-90" />
              </Suspense>
            </span>
            <span>{option.label}</span>
          </div>
        );
      })}
    </div>
  );
}
