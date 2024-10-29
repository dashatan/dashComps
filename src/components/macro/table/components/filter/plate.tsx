import PlateInput, { PlateInputValue } from "@/features/traffic/comps/search/license-plate";
import { FilterElementProps } from ".";

export default function FilterPlateElement(props: FilterElementProps) {
  return (
    <div className="w-full px-2">
      <PlateInput
        type="car"
        className={{
          root: "h-10 w-44",
          car: {
            root: "rounded-[4px]",
            flag: {
              root: "flex flex-col justify-between pt-1 text-left w-auto px-1",
              image: "min-w-4",
              text: "text-[6px]",
            },
            icon: "h-5 scale-[0.8]",
          },
          numberInput: "text-base",
          textInput: "text-base",
        }}
        value={props.defaultValue as PlateInputValue}
        onChange={(val) => val && props.onChange && props.onChange(val)}
      />
    </div>
  );
}
