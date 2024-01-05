import { classNames } from "@/utils";
import { Icon } from "../../icons";
import BasicNumberInput from "../number/basic";
import { useEffect, useRef, useState } from "react";
import { InputNumberProps } from "primereact/inputnumber";

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
    <div className="flex items-center justify-between min-h-[40px] dir-ltr">
      <Input
        value={values2.hour}
        max={23}
        onChange={(e) => handleChange(e.value || 0, "hour", 23)}
        {...{ inputClassName }}
      />
      <span className="mx-2 text-2xl font-bold">:</span>
      <Input
        value={values2.minute}
        max={59}
        onChange={(e) => handleChange(e.value || 0, "minute", 59)}
        {...{ inputClassName }}
      />
      {props.withSecond && (
        <>
          <span className="mx-2 text-2xl font-bold">:</span>
          <Input
            value={values2.second}
            max={59}
            onChange={(e) => handleChange(e.value || 0, "second", 59)}
            {...{ inputClassName }}
          />
        </>
      )}
    </div>
  );
}

function Input(props: InputNumberProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <BasicNumberInput
      ref={ref}
      {...props}
      className="flex flex-col overflow-hidden border border-gray-300 rounded-md dir-ltr"
      inputClassName={classNames("order-2 text-center", props.inputClassName)}
      //   showButtons
      unstyled
      buttonLayout="vertical"
      useGrouping={false}
      min={0}
      incrementButtonClassName={classNames("bg-gray-200 text-gray-700 h-6 order-1")}
      decrementButtonClassName={classNames("bg-gray-100 text-gray-700 h-6 order-3")}
      incrementButtonIcon={<Icon icon="Plus" className="scale-50" />}
      decrementButtonIcon={<Icon icon="Minus" className="scale-50" />}
      onClick={(e) => ref.current?.select()}
    />
  );
}
