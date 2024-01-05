"use client";

import { InputTextProps } from "primereact/inputtext";
import { forwardRef, useEffect, useState } from "react";
import { plateLetters } from "./letters";
import { Popover, PopoverAnchor, PopoverContent } from "../../overlay/popover";
import LettersBox from "./letters-box";
import { classNames } from "@/utils";

/* -------------------------------- Initials -------------------------------- */
const { englishLetters, persianLetters, symbolLetters } = plateLetters;
const letters = [...englishLetters, ...persianLetters, ...symbolLetters];

/* ---------------------------------- Types --------------------------------- */
interface Props {
  onFinish: (value: string, colorCode?: string) => void;
  onChange?: (value?: number) => void;
  inputProps?: InputTextProps;
  value?: string;
  className?: string;
}

/* ------------------------------ Main Function ----------------------------- */
const Text = forwardRef<HTMLInputElement, Props>(({ inputProps, onFinish, ...props }: Props, ref) => {
  const [value, setValue] = useState<string | undefined>(props.value);
  const [open, setOpen] = useState(false);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleFinish(val: string) {
    onFinish(val);
  }

  /* ----------------------------------- JSX ---------------------------------- */
  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <PopoverAnchor className="w-full h-full">
          <input
            type="text"
            ref={ref}
            value={value}
            className={classNames(
              "w-full h-full m-0 p-0 text-center text-3xl font-extrabold focus-visible:outline-none",
              props.className
            )}
            onFocus={() => setOpen(true)}
            // onClick={() => inputRef?.current?.select()}
            onChange={(e) => {
              let v = e.target.value.toUpperCase();
              if (v === "ا" || v === "آ") v = "الف";
              if (!letters.map((x) => x.letter).includes(v)) v = "";
              setValue(v);
              v && handleFinish(v);
            }}
          />
        </PopoverAnchor>
        <PopoverContent className="-left-[150px] absolute">
          <LettersBox
            onChange={(val, colorCode) => {
              setValue(val);
              onFinish(val, colorCode);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

Text.displayName = "Text";

export default Text;
