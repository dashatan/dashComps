import { classNames } from "@/utils";
import { Plus } from "lucide-react";
import { Icon } from "@/components/micro/icons";
import Button from "@/components/micro/buttons/button";
import BasicTextInput from "../../text/basicTextInput";

export type HeaderTemplateProps = {
  label?: string;
  className?: string;
  placeholder?: string;
  onClear?: () => void;
  onSearch?: (val: string) => void;
};

export default function HeaderTemplate({ className, label, onClear, onSearch, placeholder }: HeaderTemplateProps) {
  return (
    <div
      id="header"
      className={classNames(
        "w-full p-2 flex gap-4 border-b border-gray-200 pb-2",
        {
          "flex-col": label,
          "items-center flex-row-reverse": !label,
        },
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-bold">{label}</span>
        <Button variant="text" rounded="circle" severity="info" size="xs" onClick={onClear}>
          <Plus className="rotate-45 " />
        </Button>
      </div>
      <div className={classNames("flex items-center w-full h-12 gap-0 px-2 bg-gray-200 rounded-lg")}>
        <Icon icon="Search2" className="scale-75" />
        <BasicTextInput
          autoFocus
          placeholder={placeholder}
          style={{ paddingRight: 6 }}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
