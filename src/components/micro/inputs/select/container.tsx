import { classNames } from "@/utils";
import { PopoverContentProps, PopoverProps } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@micro/overlay/popover";
import { LabelContainerProps } from "@inputs/label/labelContainer";
import TriggerTemplate, { TriggerTemplateProps } from "./comps/trigger";
import HeaderTemplate, { HeaderTemplateProps } from "./comps/header";
import { useRef } from "react";

export type SelectContainerProps = Pick<LabelContainerProps, "hideMessage" | "status" | "message"> &
  TriggerTemplateProps &
  Pick<HeaderTemplateProps, "onSearch" | "onClear"> &
  Pick<PopoverProps, "open" | "onOpenChange"> &
  Pick<PopoverContentProps, "align"> & {
    count?: number;
    label?: string;
    value?: string;
    filter?: boolean;
    loading?: boolean;
    open?: boolean;
    searchInputPlaceholder?: string;
    width?: number | string;
    fitContent?: boolean;
    children?: React.ReactNode;
    headerTemplate?: React.ReactNode;
    className?: {
      popoverTrigger?: string;
      popoverContent?: string;
      panelRoot?: string;
      panelHeader?: string;
    };
  };

export default function SelectContainer({ width, fitContent, ...props }: SelectContainerProps) {
  const ref = useRef<any>(null);
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger ref={ref} className={classNames("", props.className?.popoverTrigger)} style={{ width }}>
        {props.labelTemplate || <TriggerTemplate {...props} />}
      </PopoverTrigger>
      <PopoverContent
        className={classNames("", props.className?.popoverContent)}
        style={{ width: width || !fitContent ? ref.current?.clientWidth : undefined }}
        align={props.align || "start"}
      >
        <div
          className={classNames(
            "border border-gray-200 bg-gray-50 rounded-lg overflow-hidden",
            props.className?.panelRoot
          )}
        >
          {props.headerTemplate}
          {props.filter && (
            <HeaderTemplate
              className={props.className?.panelHeader}
              label={props.label}
              onClear={props.onClear}
              onSearch={props.onSearch}
              placeholder={props.searchInputPlaceholder}
            />
          )}
          {props.children}
        </div>
      </PopoverContent>
    </Popover>
  );
}
