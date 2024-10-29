import { classNames } from "@/utils";
import { Loader2, X } from "lucide-react";
import { Icon } from "@micro/icons";
import Button from "@micro/buttons/button";
import BasicTextInput from "@inputs/text/basic";

export type HeaderTemplateProps = {
  label?: string;
  className?: string;
  placeholder?: string;
  onClose?: () => void;
  onSearch?: (val: string) => void;
  loading?: boolean;
};

export default function HeaderTemplate(props: HeaderTemplateProps) {
  const { className, label, onSearch, onClose, placeholder, loading } = props;
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
        <Button variant="text" rounded="circle" severity="info" size="xs" onClick={onClose}>
          <X />
        </Button>
      </div>
      <div className={classNames("flex items-center w-full h-12 gap-0 px-2 bg-gray-200 rounded-lg")}>
        <div className="flex items-center justify-center w-6 h-6">
          {loading ? (
            <Loader2 className="animate-spin text-gray-500 w-5" />
          ) : (
            <Icon icon="Search2" className="scale-75 [&_*]:stroke-gray-500" />
          )}
        </div>
        <BasicTextInput
          autoFocus
          placeholder={placeholder}
          className="pr-2"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
