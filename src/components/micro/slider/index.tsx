"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { classNames } from "@/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    thumbClassName?: string;
    thumbProps?: SliderPrimitive.SliderThumbProps;
    trackClassName?: string;
    rangeClassName?: string;
  }
>(({ className, thumbClassName, trackClassName, rangeClassName, thumbProps, ...props }, ref) => {
  const thumbClass = classNames(
    "block h-5 w-5 rounded-full border-2 bg-slate-600 cursor-pointer",
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    thumbClassName,
  );
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={classNames("relative flex w-full cursor-pointer touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className={classNames(
          "relative h-2 w-full grow overflow-hidden rounded-full bg-slate-300 transition-all",
          trackClassName,
        )}
      >
        <SliderPrimitive.Range className={classNames("absolute h-full bg-slate-600", rangeClassName)} />
      </SliderPrimitive.Track>
      {props.children}
      <SliderPrimitive.Thumb {...thumbProps} className={thumbClass} />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
