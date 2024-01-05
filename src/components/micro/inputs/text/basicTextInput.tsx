import { InputText, InputTextProps } from "primereact/inputtext";
import { forwardRef, useEffect, useState } from "react";

const BasicTextInput = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <InputText
      ref={ref}
      {...props}
      className={"bg-transparent " + props.className}
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
    />
  );
});

BasicTextInput.displayName = "BasicTextInput";

export default BasicTextInput;
