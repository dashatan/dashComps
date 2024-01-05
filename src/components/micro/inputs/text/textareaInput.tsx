import { useEffect, useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";

export interface TextareaInputProps extends InputTextareaProps {
  id?: string;
  label?: string;
  labelclassname?: LabelContainerProps["className"];
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
}

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
      hasValue={!!value}
      onClick={() => ref.current?.focus()}
      message={props.message}
      status={props.status}
      focused={focused}
      className={{
        ...{
          container: "!h-auto overflow-hidden pt-7 pb-2",
          label: "top-7",
        },
        ...props.labelclassname,
      }}
    >
      <InputTextarea
        ref={ref}
        {...props}
        className="w-full min-h-28 px-4 pb-4"
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </LabelContainer>
  );
}
