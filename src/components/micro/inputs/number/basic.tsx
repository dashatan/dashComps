import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { forwardRef } from "react";

const BasicNumberInput = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  return <InputNumber {...props} inputStyle={{ direction: "ltr" }} />;
});

BasicNumberInput.displayName = "BasicNumberInput";

export default BasicNumberInput;
