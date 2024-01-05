import Button from "@/components/micro/buttons/button";
import { IconName } from "@/components/micro/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/micro/overlay/popover";
import { MoreVertical } from "lucide-react";
import { classNames } from "@/utils";
import { Suspense, lazy, useState } from "react";

const Icon = lazy(() => import("@/components/micro/icons/icon"));

export interface ActionMenuProps {
  options?: { label: string; value: string; icon: IconName; className?: string; hide?: boolean }[];
  onChange?: (value: string) => void;
}

export default function ActionMenu({ onChange, options }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-full">
      <Popover open={open} onOpenChange={(e) => setOpen(e)}>
        <PopoverTrigger>
          <Button severity="info" className="bg-slate-200 h-10 w-10 !p-0">
            <MoreVertical className="w-5 text-slate-500 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
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
                    setOpen(false);
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
