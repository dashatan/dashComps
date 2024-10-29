import { classNames } from "@/utils";
import { ReactNode, useEffect, useState } from "react";

interface RadioItemProps {
  name: string | number;
  label?: string;
  active?: boolean;
  icon?: ReactNode;
}

export interface RadioInputProps {
  options?: RadioItemProps[];
  active?: RadioItemProps["name"];
  value?: RadioItemProps["name"];
  onChange?: (value?: RadioItemProps["name"]) => void;
  direction?: "horizontal" | "vertical";
}

export default function RadioInput(props: RadioInputProps) {
  const val = props.active || props.value;
  const [active, setActive] = useState(val);

  useEffect(() => {
    setActive(val);
  }, [val]);

  function handleClick(name: RadioItemProps["name"]) {
    setActive(name);
    props.onChange && props.onChange(name);
  }

  return (
    <div className={classNames("flex flex-col gap-4 p-4", { "flex-row": props.direction === "horizontal" })}>
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
        "flex items-center transition-all duration-300 gap-4 p-4",
        {
          "border-primary-500 bg-primary-100": props.active,
          "border-gray-300": !props.active,
        }
      )}
    >
      <div
        className={classNames(
          "w-5 h-5 rounded-full border-2 relative",
          "flex items-center justify-center transition-all duration-300",
          {
            "border-primary-500": props.active,
            "border-gray-300": !props.active,
          }
        )}
      >
        <div
          className={classNames("bg-primary-500 rounded-full transition-all duration-300", {
            "opacity-100": props.active,
            "opacity-0": !props.active,
          })}
          style={{ width: "60%", height: "60%" }}
        ></div>
      </div>
      <span className="text-base font-medium">{props.label}</span>
      <span>{props.icon}</span>
    </div>
  );
}
