import { forwardRef, useEffect, useState } from "react";
import { HtmlInputProps } from "../text/basic";
import { classNames } from "@/utils";

export type BasicNumberInputProps = Omit<HtmlInputProps, "onChange" | "max"> & {
  onChange?: (val?: number) => void;
  max?: number;
};
const BasicNumberInput = forwardRef<HTMLInputElement, BasicNumberInputProps>((props, ref) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleChange(v?: string) {
    const val = v ? parseInt(v) : undefined;
    if (props.max && val !== undefined && val > props.max) {
      return;
    }
    setValue(val);
    props.onChange && props.onChange(val);
  }
  return (
    <input
      {...props}
      ref={ref}
      type="number"
      onChange={(e) => handleChange(e.target.value)}
      value={value === undefined ? "" : value}
      className={classNames(
        "text-base font-medium text-gray-700 dir-ltr",
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        props.className,
      )}
    />
  );
});

BasicNumberInput.displayName = "BasicNumberInput";

export default BasicNumberInput;
