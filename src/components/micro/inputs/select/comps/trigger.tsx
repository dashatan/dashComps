import { classNames } from "@/utils";
import LabelContainer, { LabelContainerProps } from "@inputs/label/labelContainer";
import Badge from "@/components/micro/badge/badge";
import { Plus, X } from "lucide-react";
import { Icon, IconName } from "@/components/micro/icons";
import Chip from "@/components/micro/chips/chip";
import { SelectItem } from "../types";
import { PopoverProps } from "@radix-ui/react-popover";

export type TriggerTemplateProps = Pick<LabelContainerProps, "message" | "status" | "label" | "className"> &
  Pick<PopoverProps, "open" | "onOpenChange"> & {
    count?: number;
    showChips?: boolean;
    chips?: SelectItem[];
    onRemove?: (option: SelectItem) => void;
    onClear?: () => void;
    className?: { labelContent?: string };
    labelType?: "label" | "count";
    icon?: IconName;
    iconClassName?: string;
    chipsCountLimit?: number;
    value?: string;
    labelTemplate?: React.ReactNode;
  };

export default function TriggerTemplate(props: TriggerTemplateProps) {
  const { className, message, status, label, value, labelType, chipsCountLimit } = props;
  const floatLabel = !!value;
  return (
    <LabelContainer
      {...props}
      message={message}
      hasValue={!!value}
      status={status}
      label={floatLabel ? label : undefined}
      className={{
        ...className,
        container: classNames("h-auto flex-col", className?.container),
      }}
      fillType="fill"
    >
      <div
        className={classNames(
          "flex h-14 w-full cursor-pointer items-center justify-between px-2 py-4",
          className?.labelContent,
        )}
      >
        {floatLabel ? (
          <>
            <span className={classNames("flex h-full cursor-pointer items-center px-2 pt-4", { "!pt-0": !label })}>
              {value}
            </span>
            <Icon icon={props.icon || "ArrowDown"} className={props.iconClassName || "scale-75 [&_*]:fill-gray-600"} />
          </>
        ) : (
          <>
            {[undefined, "label"].includes(labelType) && (
              <>
                <span className="text-base font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  {!!props.count && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onClear && props.onClear();
                      }}
                    >
                      <Badge size="md">
                        <div className="flex px-2.5 dir-ltr">
                          <X className="w-3 min-w-3" />
                          <span className="mt-[5px] text-[11px]">{props.count}</span>
                        </div>
                      </Badge>
                    </div>
                  )}
                  <Icon
                    icon={props.icon || "ArrowDown"}
                    className={props.iconClassName || "scale-75 [&_*]:fill-gray-600"}
                  />
                </div>
              </>
            )}
            {labelType === "count" && (
              <>
                <span className="font-medium">{props.count ? `${props.count} مورد` : ""}</span>
                <Icon
                  icon={props.icon || "ArrowDown"}
                  className={props.iconClassName || "scale-75 [&_*]:fill-gray-600"}
                />
              </>
            )}
          </>
        )}
      </div>
      <div
        className={classNames("flex w-full flex-wrap items-center gap-2 px-4 py-2", "cursor-default border-t", {
          hidden: !props.showChips || props.open || !props.chips?.length,
        })}
      >
        {props.chips?.slice(0, chipsCountLimit || 3).map((option, index) => {
          return <Chip key={index} label={option.label} onRemove={() => props.onRemove && props.onRemove(option)} />;
        })}
        {!!props.chips?.length && props.chips?.length > (chipsCountLimit || 3) && (
          <Badge size="md" severity="info">
            <div className="flex dir-ltr">
              <Plus className="w-3 min-w-3" />
              <span className="mt-[5.5px] text-xs">{props.chips?.length - (chipsCountLimit || 3)}</span>
            </div>
          </Badge>
        )}
      </div>
    </LabelContainer>
  );
}
