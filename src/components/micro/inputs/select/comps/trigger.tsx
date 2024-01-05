import { classNames } from "@/utils";
import LabelContainer, { LabelContainerProps } from "../../label/labelContainer";

import Badge from "@/components/micro/badge/badge";
import { Plus, X } from "lucide-react";
import { Icon } from "@/components/micro/icons";
import Chip from "@/components/micro/chips/chip";
import { SelectItem } from "../types";

export type TriggerTemplateProps = Pick<LabelContainerProps, "message" | "status" | "label" | "className"> & {
  count?: number;
  showChips?: boolean;
  chips?: SelectItem[];
  onRemove?: (option: SelectItem) => void;
  onRemoveAll?: () => void;
  className?: { labelContent?: string };
  labelType?: "label" | "count";
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
        container: classNames("flex-col h-auto", className?.container),
      }}
      fillType="fill"
    >
      <div
        className={classNames(
          "flex items-center w-full justify-between py-4 px-2 cursor-pointer h-14",
          className?.labelContent
        )}
      >
        {floatLabel ? (
          <>
            <span className={classNames("flex items-center h-full px-2 pt-4 cursor-pointer", { "!pt-0": !label })}>
              {value}
            </span>
            <Icon icon="ArrowDown" className="[&_*]:fill-gray-600 scale-75" />
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
                        props.onRemoveAll && props.onRemoveAll();
                      }}
                    >
                      <Badge size="md">
                        <div className="flex dir-ltr px-2.5">
                          <X className="w-3 min-w-3" />
                          <span className="text-[11px] mt-[5px]">{props.count}</span>
                        </div>
                      </Badge>
                    </div>
                  )}
                  <Icon icon="ArrowDown" className="[&_*]:fill-gray-600 scale-75" />
                </div>
              </>
            )}
            {labelType === "count" && (
              <>
                <span className="font-medium">{props.count ? `${props.count} مورد` : ""}</span>
                <Icon icon="ArrowDown" className="[&_*]:fill-gray-600 scale-75" />
              </>
            )}
          </>
        )}
      </div>
      <div
        className={classNames("flex flex-wrap items-center gap-2 w-full px-4 py-2", "border-t cursor-default", {
          hidden: !props.showChips,
        })}
      >
        {props.chips?.slice(0, chipsCountLimit || 3).map((option, index) => {
          return (
            <Chip
              key={index}
              label={option.label}
              onRemove={(e) => {
                e.stopPropagation();
                props.onRemove && props.onRemove(option);
              }}
            />
          );
        })}
        {!!props.chips?.length && props.chips?.length > (chipsCountLimit || 3) && (
          <Badge size="md" severity="info">
            <div className="flex dir-ltr">
              <Plus className="w-3 min-w-3" />
              <span className="text-xs mt-[5.5px]">{props.chips?.length - (chipsCountLimit || 3)}</span>
            </div>
          </Badge>
        )}
      </div>
    </LabelContainer>
  );
}
