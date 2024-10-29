import BasicTextInput, { HtmlInputProps } from "@/components/micro/inputs/text/basic";
import { ReactNode } from "react";

export type PrefixedTextInputProps = Pick<HtmlInputProps, "type" | "min" | "max"> & {
  label?: string;
  prefix?: string | ReactNode;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export default function PrefixedTextInput(props: PrefixedTextInputProps) {
  return (
    <div>
      <span className="text-xs">{props.label}</span>
      <div className="flex h-10 min-w-32 overflow-hidden rounded-md border border-gray-300">
        <div>
          <BasicTextInput
            value={props.value}
            onChange={(e) => props.onChange && props.onChange(e.target.value)}
            className="px-2"
            type={props.type}
            min={props.min}
            max={props.max}
          />
        </div>
        <div className="flex h-full min-w-10 items-center justify-center border-s border-gray-300 bg-gray-200 text-xs">
          {props.prefix}
        </div>
      </div>
    </div>
  );
}
