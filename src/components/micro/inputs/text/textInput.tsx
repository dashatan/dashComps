import { InputTextProps } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import BasicTextInput from "./basicTextInput";

export interface TextInputProps extends InputTextProps {
  id?: string;
  label?: string;
  labelclassname?: LabelContainerProps["className"];
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
  suffix?: React.ReactNode;
}

export default function TextInput(props: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <LabelContainer
      label={props.label}
      hasValue={!!value}
      onClick={() => ref.current?.focus()}
      message={props.message}
      status={props.status ? props.status : focused ? "primary" : undefined}
      className={props.labelclassname}
    >
      <BasicTextInput
        ref={ref}
        {...props}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {props.suffix}
    </LabelContainer>
  );
}
