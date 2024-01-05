import { useRef, useState } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import BasicNumberInput from "./basic";
import { InputNumberProps } from "primereact/inputnumber";

export interface NumberInputProps extends InputNumberProps {
  id?: string;
  label?: string;
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
}

export default function NumberInput(props: NumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  return (
    <LabelContainer
      label={props.label}
      message={props.message}
      status={props.status}
      hasValue={!!props.value}
      onClick={() => ref.current?.focus()}
      focused={focused}
    >
      <BasicNumberInput inputRef={ref} {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </LabelContainer>
  );
}
