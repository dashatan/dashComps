"use client";

import { forwardRef, useEffect, useState } from "react";
import { classNames } from "@/utils";

/* ---------------------------------- Types --------------------------------- */
interface Props {
  onChange?: (value?: string, cleared?: boolean) => void;
  inputProps?: HTMLInputElement;
  value?: string;
  className?: string;
}

/* ------------------------------ Main Function ----------------------------- */
const SimpleText = forwardRef<HTMLInputElement, Props>(({ inputProps, onChange, ...props }: Props, ref) => {
  const [value, setValue] = useState<string | undefined>(props.value);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleChange(val: string, cleared?: boolean) {
    onChange && onChange(val, cleared);
  }

  /* ----------------------------------- JSX ---------------------------------- */
  return (
    <div className="w-full">
      <input
        type="text"
        ref={ref}
        value={value || ""}
        className={classNames(
          "w-full h-full !m-0 !p-0 text-center !text-2xl font-extrabold focus-visible:outline-none",
          props.className
        )}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !value) {
            handleChange("", true);
            return;
          }
        }}
        onChange={(e) => {
          let v = e.target.value.toUpperCase();
          if (v.length > 1) {
            value && handleChange(value, false);
            return;
          }
          if (v === "ا" || v === "آ") v = "الف";
          setValue(v);
          v && handleChange(v, false);
        }}
      />
    </div>
  );
});

SimpleText.displayName = "SimpleText";

export default SimpleText;
