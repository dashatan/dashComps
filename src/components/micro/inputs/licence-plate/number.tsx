"use client";

import { classNames } from "@/utils";
import { forwardRef, useEffect, useRef, useState } from "react";

/* ---------------------------------- Types --------------------------------- */
type HtmlInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type NumberProps = Omit<HtmlInputProps, "onChange"> & {
  onFinish: (value: string | number) => void;
  onChange?: (value?: string | number) => void;
};

/* ------------------------------ MainFunction ------------------------------ */
const Comp = forwardRef<HTMLInputElement, NumberProps>(({ onChange, ...props }, ref) => {
  const [value, setValue] = useState(props.value);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  /* -------------------------------- Functions ------------------------------- */
  function handleChange(v: string) {
    var regex = /^[\d*]+$/;
    if (v && !regex.test(v)) return;
    if (v.length === props.maxLength) {
      props.onFinish(v);
      return;
    }
    setValue(v);
    onChange && onChange(v);
  }

  /* ----------------------------------- JSX ---------------------------------- */
  return (
    <div className={classNames("w-full", props.className)}>
      <input
        {...props}
        type="text"
        ref={ref}
        value={value}
        onClick={() => {
          (ref as any)?.current?.select();
        }}
        onChange={(e) => handleChange(e.target.value)}
        className={classNames(
          "m-0 w-full h-full peer !text-3xl font-extrabold",
          "text-gray-800 bg-transparent transition-colors duration-200 appearance-none rounded-lg",
          "placeholder:text-xs",
          "hover:border-input-300 focus:outline-none focus:outline-offset-0 text-center !p-0",
          props.className
        )}
      />
    </div>
  );
});

Comp.displayName = "Number";
export default Comp;
