import Button from "@/components/micro/buttons/button";
import { IconName } from "@/components/micro/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/micro/overlay/popover";
import { MoreVertical } from "lucide-react";
import { lazy, ReactNode, useState } from "react";
import ActionMenuList from "./action-menu-list";

const Icon = lazy(() => import("@/components/micro/icons/icon"));

export interface ActionMenuProps {
  options?: { label: string; value: string; icon: IconName; className?: string; hide?: boolean }[];
  onChange?: (value: string) => void;
  triggerTemplate?: ReactNode;
}

export default function ActionMenu({ onChange, options, triggerTemplate }: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-center">
      <Popover open={open} onOpenChange={(e) => setOpen(e)}>
        <PopoverTrigger>
          {triggerTemplate || (
            <Button severity="info" className="h-10 w-10 bg-slate-200 !p-0">
              <MoreVertical className="w-5 text-slate-500" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent align="end">
          <ActionMenuList
            options={options}
            onChange={(e) => {
              setOpen(false);
              onChange && onChange(e);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
