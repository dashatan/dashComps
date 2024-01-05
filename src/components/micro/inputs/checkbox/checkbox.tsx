import { classNames } from "@/utils";
import { forwardRef, useEffect, useState } from "react";
import { Check, Loader2, Minus } from "lucide-react";

interface CheckboxProps {
  title?: string;
  subTitle?: string;
  active?: boolean;
  halfChecked?: boolean;
  withoutTitle?: boolean;
  withoutBg?: boolean;
  onChange?: (active: boolean) => void;
  className?: {
    container?: string;
    icon?: string;
    iconContainer?: string;
    titleContainer?: string;
    title?: string;
    subTitle?: string;
  };
  disabled?: boolean;
  loading?: boolean;
}
const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
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
      onClick={handleClick}
      className={classNames(
        "w-full rounded-lg cursor-pointer select-none",
        "flex items-start transition-all duration-100",
        {
          "bg-slate-100": active && !props.withoutBg,
          "!cursor-default": props.disabled,
        },
        props.className?.container
      )}
    >
      <div
        className={classNames(
          "h-7 min-w-7 rounded-lg border m-4",
          "flex items-center justify-center transition-all duration-100",
          {
            "border-primary-600 bg-primary-600": active || props.halfChecked,
            "border-gray-300": !active,
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
          <Minus className={classNames("w-3 text-white", props.className?.icon)} />
        ) : (
          <Check
            className={classNames(
              "h-4 w-4 transition-all duration-100",
              {
                "scale-110 text-slate-100": active,
                "scale-0 text-primary-600": !active,
                "opacity-50": props.disabled,
              },
              props.className?.icon
            )}
          />
        )}
      </div>
      {!props.withoutTitle && (
        <div className={classNames("flex flex-col py-4", props.className?.titleContainer)}>
          <span className={classNames("text-base font-semibold", props.className?.title)}>{props.title}</span>
          <span className={classNames("text-sm font-normal text-gray-600", props.className?.subTitle)}>
            {props.subTitle}
          </span>
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";
export default Checkbox;
