import { Select } from "@inputs/select";
import { FilterElementProps } from ".";

export default function FilterMultiSelectElement(props: FilterElementProps) {
  return (
    <Select.Multi
      {...props}
      className={{
        popoverTrigger: "w-full",
        container: "h-10",
        labelContent: "h-10 py-0 text-sm",
        ...props.className,
      }}
      onChange={(val) => {
        props.onChange && props.onChange(val);
      }}
      options={props.options}
      selected={props.defaultValue}
      labelType="count"
      fitContent
      filter
      {...props.inputProps}
    />
  );
}
