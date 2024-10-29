import { classNames } from "@/utils";
import { forwardRef, useEffect, useState } from "react";

export type HtmlInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const BasicTextInput = forwardRef<HTMLInputElement, HtmlInputProps>((props, ref) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <input
      {...props}
      ref={ref}
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
      className={classNames(
        "h-full w-full bg-transparent focus-visible:outline-none",
        "text-base font-medium text-gray-700",
        props.className,
      )}
    />
  );
});

BasicTextInput.displayName = "BasicTextInput";

export default BasicTextInput;
