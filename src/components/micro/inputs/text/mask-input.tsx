import { useRef } from "react";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import { InputMask, InputMaskProps } from "primereact/inputmask";

export interface MaskInputProps extends InputMaskProps {
  id?: string;
  label?: string;
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
}

export default function MaskInput(props: MaskInputProps) {
  const ref = useRef<InputMask>(null);
  return (
    <LabelContainer
      label={props.label}
      hasValue={!!props.value}
      onClick={() => ref.current?.focus()}
      message={props.message}
      status={props.status}
    >
      <InputMask ref={ref} {...props} />
    </LabelContainer>
  );
}
