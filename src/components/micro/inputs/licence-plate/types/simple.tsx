import { classNames } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { PlateInputValue } from "..";
import SimpleText from "../simple-text";

/* ---------------------------------- Types --------------------------------- */

export type SimplePlateInputProps = {
  onChange: (val: PlateInputValue) => void;
  values?: PlateInputValue;
  colorCode?: string;
  clear?: boolean;
  onClear?: (clear: boolean) => void;
};

/* ------------------------------ Main Function ----------------------------- */
export default function SimplePlate({ onChange, ...props }: SimplePlateInputProps) {
  const ref = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<PlateInputValue>(props.values || {});

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    if (props.clear) {
      setValues({});
      props.onClear && props.onClear(false);
    }
  }, [props.clear]);

  useEffect(() => {
    if (props.values) {
      setValues(props.values);
    }
  }, [props.values]);

  /* -------------------------------- Functions ------------------------------- */
  function handleFinish(key: keyof PlateInputValue, val?: string, nextRef?: HTMLInputElement | null) {
    nextRef?.select();
    const newVal = { ...values, [key]: val };
    setValues(newVal);
    onChange(newVal);
  }

  /* ----------------------------------- JSX ---------------------------------- */
  return (
    <div className={classNames("flex w-[335px] overflow-hidden", "border border-gray-800 h-full rounded-lg dir-ltr")}>
      {Array.from(new Array(8)).map((_, x) => {
        return (
          <div key={x} className="flex h-full w-full border-r border-gray-200">
            <SimpleText
              ref={(r) => (ref.current[x + 1] = r)}
              value={(values as any)[`p${x + 1}`]}
              onChange={(val, cleared) => {
                handleFinish(
                  `p${x + 1}` as any,
                  val,
                  cleared === true ? ref.current[x] : cleared === false ? ref.current[x + 2] : undefined
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
