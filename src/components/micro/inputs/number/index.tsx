import { ReactNode, useEffect, useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import BasicNumberInput, { BasicNumberInputProps } from "./basic";
import { classNames } from "@/utils";
import Button from "@/components/micro/buttons/button";
import { Minus, Plus } from "lucide-react";

export type NumberInputProps = Partial<LabelContainerProps> &
  Omit<BasicNumberInputProps, "step" | "value" | "prefix"> & {
    step?: number;
    value?: number;
    inputClassName?: string;
    prefix?: ReactNode;
  };

export default function NumberInput(props: NumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const hasValue = ![undefined, NaN].includes(value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <LabelContainer
      label={props.label}
      labelSize={props.labelSize}
      message={props.message}
      status={props.status}
      hasValue={hasValue}
      onClick={() => ref.current?.focus()}
      focused={focused}
    >
      <div className="flex h-full w-full select-none items-center">
        <BasicNumberInput
          {...props}
          prefix=""
          ref={ref}
          className={classNames("h-full w-full px-4 pt-4 text-sm dir-ltr", props.inputClassName)}
          value={value}
          onChange={(val) => {
            setValue(val);
            props.onChange && props.onChange(val);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <div className="h-full min-w-px" />
        {props.prefix}
        <div className="flex h-full min-w-9 flex-col overflow-hidden">
          <CountButton
            onMouseDown={() => {
              const newValue = (value || 0) + (props.step || 1);
              setValue(newValue);
              props.onChange && props.onChange(newValue);
            }}
          >
            <Plus className="w-3 text-gray-500" />
          </CountButton>
          <div className="h-px w-full bg-gray-300" />
          <CountButton
            onMouseDown={() => {
              const newValue = value ? value - (props.step || 1) : 0;
              setValue(newValue);
              props.onChange && props.onChange(newValue);
            }}
          >
            <Minus className="w-3 text-gray-500" />
          </CountButton>
        </div>
      </div>
    </LabelContainer>
  );
}

function CountButton(props: DIV) {
  return (
    <div
      {...props}
      className={classNames(
        "flex h-full w-full cursor-pointer items-center justify-center bg-gray-200 text-gray-800 hover:bg-gray-300",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
