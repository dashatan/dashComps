import { classNames } from "@/utils";
import { PopoverContentProps } from "@radix-ui/react-popover";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@micro/overlay/popover";
import { LabelContainerProps } from "@inputs/label/labelContainer";
import TriggerTemplate, { TriggerTemplateProps } from "./comps/trigger";
import HeaderTemplate, { HeaderTemplateProps } from "./comps/header";
import { useRef } from "react";

export type SelectContainerProps = Pick<LabelContainerProps, "status" | "message"> &
  TriggerTemplateProps &
  Pick<HeaderTemplateProps, "onSearch"> &
  Pick<PopoverContentProps, "align"> & {
    count?: number;
    label?: string;
    value?: string;
    filter?: boolean;
    loading?: boolean;
    fitContent?: boolean;
    disabled?: boolean;
    fixedContent?: boolean;
    searchInputPlaceholder?: string;
    width?: number | string;
    children?: React.ReactNode;
    headerTemplate?: React.ReactNode;
    className?: {
      popoverTrigger?: string;
      popoverContent?: string;
      panelRoot?: string;
      panelHeader?: string;
    };
  };

export default function SelectContainer(props: SelectContainerProps) {
  const ref = useRef<any>(null);
  const body = (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      {props.disabled ? (
        <div style={{ width: props.width }}>
          {props.labelTemplate || (
            <TriggerTemplate
              {...props}
              className={{
                ...props.className,
                container: classNames(props.className?.container, "pointer-events-none cursor-pointer opacity-50"),
              }}
            />
          )}
        </div>
      ) : (
        <PopoverTrigger ref={ref} className={props.className?.popoverTrigger} style={{ width: props.width }}>
          {props.labelTemplate || <TriggerTemplate {...props} />}
        </PopoverTrigger>
      )}
      <PopoverContent
        className={classNames(props.className?.popoverContent, { "absolute top-16": props.fixedContent })}
        style={{ width: props.width || (!props.fitContent ? ref.current?.clientWidth : undefined) }}
        align={props.align || "start"}
      >
        <div
          className={classNames(
            "overflow-hidden rounded-lg border border-gray-300 bg-gray-100",
            props.className?.panelRoot,
          )}
        >
          {props.headerTemplate}
          {props.filter && (
            <HeaderTemplate
              className={props.className?.panelHeader}
              label={props.label}
              onClose={() => props.onOpenChange && props.onOpenChange(false)}
              onSearch={props.onSearch}
              placeholder={props.searchInputPlaceholder}
              loading={props.loading}
            />
          )}
          {props.children}
        </div>
      </PopoverContent>
    </Popover>
  );
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      {props.fixedContent ? (
        <div className="relative">
          <PopoverAnchor>
            <div className="absolute top-0 z-50 h-2 w-2"></div>
          </PopoverAnchor>
          {body}
        </div>
      ) : (
        body
      )}
    </Popover>
  );
}
