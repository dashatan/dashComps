import { Select } from "@inputs/select";
import { FilterElementProps } from ".";

export default function FilterTreeMultiSelectElement(props: FilterElementProps) {
  return (
    <Select.MultiTree
      {...props}
      className={{
        popoverTrigger: "w-full",
        container: "h-10",
        labelContent: "h-10 py-0 text-sm",
        ...props.className,
      }}
      onChange={(val) => {
        props.onChange && props.onChange(val as number[]);
      }}
      options={props.options}
      selected={props.defaultValue}
      labelType="count"
      filter
      {...props.inputProps}
    />
  );
}
