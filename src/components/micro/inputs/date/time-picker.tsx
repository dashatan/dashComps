import { classNames } from "@/utils";
import BasicNumberInput, { BasicNumberInputProps } from "../number/basic";
import { useEffect, useRef, useState } from "react";

export interface TimeObject {
  hour: number;
  minute: number;
  second: number;
}

export interface TimePickerProps {
  onChange?: (x: { string: string; obj: TimeObject }) => void;
  withSecond?: boolean;
  inputClassName?: string;
  value?: string;
}
export default function TimePicker(props: TimePickerProps) {
  const { inputClassName, onChange } = props;
  const init = { hour: 0, minute: 0, second: 0 };
  const [values, setValues] = useState(init);
  const [values2, setValues2] = useState(init);

  useEffect(() => {
    if (props.value) {
      const v = props.value.split(":");
      setValues({ hour: parseFloat(v[0]), minute: parseFloat(v[1]), second: parseFloat(v[2]) });
      setValues2({ hour: parseFloat(v[0]), minute: parseFloat(v[1]), second: parseFloat(v[2]) });
    } else {
      setValues(init);
      setValues2(init);
    }
  }, [props.value]);

  useEffect(() => {
    const { hour, minute, second } = values;
    onChange && onChange({ string: `${hour}:${minute}:${second}`, obj: values });
  }, [values]);

  function handleChange(val: number, key: keyof typeof values, max: number) {
    const v = val < max ? val : max;
    setValues((x) => ({ ...x, [key]: v }));
    setValues2((x) => ({ ...x, [key]: val }));
  }

  return (
    <div className="flex min-h-[40px] w-full items-center justify-between dir-ltr">
      <Input
        value={values2.hour}
        max={23}
        onChange={(e) => handleChange(e || 0, "hour", 23)}
        className={inputClassName}
      />
      <span className="mx-2 text-2xl font-bold">:</span>
      <Input
        value={values2.minute}
        max={59}
        onChange={(e) => handleChange(e || 0, "minute", 59)}
        className={inputClassName}
      />
      {/* {props.withSecond && (
        <>
          <span className="mx-2 text-2xl font-bold">:</span>
          <Input
            value={values2.second}
            max={59}
            onChange={(e) => handleChange(e || 0, "second", 59)}
            className={inputClassName}
          />
        </>
      )} */}
    </div>
  );
}

function Input(props: BasicNumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <BasicNumberInput
      {...props}
      ref={ref}
      className={classNames(
        "flex w-full flex-col overflow-hidden rounded-md border border-gray-300 text-center dir-ltr",
        props.className,
      )}
      min={0}
      onClick={() => ref.current?.select()}
    />
  );
}
