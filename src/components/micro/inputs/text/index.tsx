import { useEffect, useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import BasicTextInput, { HtmlInputProps } from "./basic";

export type TextInputProps = Omit<HtmlInputProps, "onChange"> & {
  id?: string;
  label?: string;
  labelClassName?: LabelContainerProps["className"];
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
  suffix?: React.ReactNode;
  onChange?: (val: string) => void;
};

export default function TextInput(props: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
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
      className={props.labelClassName}
    >
      <BasicTextInput
        {...props}
        ref={ref}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="px-4 pt-4"
      />
      {props.suffix}
    </LabelContainer>
  );
}
