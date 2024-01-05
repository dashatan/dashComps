import { Select } from "@inputs/select";
import { FilterElementProps } from ".";

export default function FilterSelectElement(props: FilterElementProps) {
  return (
    <Select.Single
      {...props}
      hideMessage
      onChange={(e) => props.onChange && props.onChange(e as string)}
      value={props.defaultValue}
      className={{
        popoverTrigger: "w-full",
        popoverContent: "!max-w-60",
        container: "!h-10",
        labelContent: "!h-10 !py-0 !text-sm font-medium whitespace-nowrap",
      }}
      {...props.inputProps}
    />
  );
}
