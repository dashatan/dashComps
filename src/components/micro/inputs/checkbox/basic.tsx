import { classNames } from "@/utils";
import { forwardRef, useEffect, useState } from "react";
import { Check, Loader2, Minus } from "lucide-react";

export interface BasicCheckboxProps {
  active?: boolean;
  halfChecked?: boolean;
  onChange?: (active: boolean) => void;
  className?: {
    icon?: string;
    iconContainer?: string;
  };
  disabled?: boolean;
  loading?: boolean;
}
const CheckboxBasic = forwardRef<HTMLDivElement, BasicCheckboxProps>((props, ref) => {
  const [active, setActive] = useState(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  function handleClick() {
    if (props.disabled) return;
    setActive((x) => !x);
    props.onChange && props.onChange(!active);
  }

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      className={classNames(
        "h-7 min-w-7 rounded-lg border m-4 cursor-pointer",
        "flex items-center justify-center transition-all duration-100",
        {
          "border-primary-600 bg-primary-600": active || props.halfChecked,
          "border-gray-300": !active && !props.halfChecked,
          "bg-gray-200 border-gray-300 cursor-default": props.disabled,
        },
        props.className?.iconContainer
      )}
    >
      {props.loading ? (
        <Loader2
          className={classNames(
            "h-4 w-4 animate-spin",
            {
              "text-white": active,
              "text-primary-600": !active,
            },
            props.className?.icon
          )}
        />
      ) : props.halfChecked ? (
        <Minus className={classNames("w-4 text-white", props.className?.icon)} />
      ) : (
        <Check
          className={classNames(
            "h-4 w-4 transition-all duration-100",
            {
              "scale-110 text-slate-100": active,
              "scale-0 text-primary-600": !active,
              "text-gray-600": props.disabled,
            },
            props.className?.icon
          )}
        />
      )}
    </div>
  );
});

CheckboxBasic.displayName = "CheckboxBasic";
export default CheckboxBasic;
