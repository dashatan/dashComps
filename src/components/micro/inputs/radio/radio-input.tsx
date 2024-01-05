import { classNames } from "@/utils";
import { useEffect, useState } from "react";

interface RadioItemProps {
  name: string | number;
  label?: string;
  active?: boolean;
}

export interface RadioInputProps {
  options?: RadioItemProps[];
  active?: RadioItemProps["name"];
  onChange?: ({ value }: { value?: RadioItemProps["name"] }) => void;
}

export default function RadioInput(props: RadioInputProps) {
  const [active, setActive] = useState(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  function handleClick(name: RadioItemProps["name"]) {
    setActive(name);
    props.onChange && props.onChange({ value: name });
  }

  return (
    <div className="flex flex-col gap-4">
      {props.options?.map((option, index) => {
        return (
          <div key={index} onClick={() => handleClick(option.name)}>
            <Radio key={index} active={option.name === active} {...option} />
          </div>
        );
      })}
    </div>
  );
}

function Radio(props: RadioItemProps) {
  return (
    <div
      className={classNames(
        "h-16 w-full rounded-md border cursor-pointer",
        "flex items-center transition-all duration-500",
        {
          "border-primary-500 bg-primary-100": props.active,
          "border-gray-300": !props.active,
        }
      )}
    >
      <div
        className={classNames(
          "w-5 h-5 rounded-full border-2 mx-4",
          "flex items-center justify-center transition-all duration-500",
          {
            "border-primary-500": props.active,
            "border-gray-300": !props.active,
          }
        )}
      >
        <div
          className={classNames("h-3 w-3 bg-primary-500 rounded-full transition-all duration-500", {
            "scale-100": props.active,
            "scale-0": !props.active,
          })}
        ></div>
      </div>
      <span className="text-base font-medium">{props.label}</span>
    </div>
  );
}
