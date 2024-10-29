import { useEffect, useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import { classNames } from "@/utils";

export type HtmlTextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type TextareaInputProps = Omit<HtmlTextareaProps, "onChange"> & {
  id?: string;
  label?: string;
  labelClassName?: LabelContainerProps["className"];
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
  onChange?: (val: string) => void;
};

export default function TextareaInput(props: TextareaInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <LabelContainer
      label={props.label}
      hasValue={!!value || focused}
      onClick={() => ref.current?.focus()}
      message={props.message}
      status={props.status ? props.status : focused ? "primary" : undefined}
      focused={focused}
      className={{
        ...{
          container: "!h-auto overflow-hidden pt-7",
          label: "top-7",
        },
        ...props.labelClassName,
      }}
    >
      <textarea
        {...props}
        ref={ref}
        className={classNames(
          "min-h-28 w-full bg-transparent px-4 pb-4 text-base font-medium text-gray-700",
          props.className,
        )}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </LabelContainer>
  );
}
