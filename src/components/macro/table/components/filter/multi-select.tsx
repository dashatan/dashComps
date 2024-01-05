import { Select } from "@inputs/select";
import { FilterElementProps } from ".";

export default function FilterMultiSelectElement(props: FilterElementProps) {
  return (
    <Select.Multi
      {...props}
      className={{
        popoverTrigger: "w-full",
        container: "!h-10",
        labelContent: "!h-10 !py-0 text-sm",
        ...props.className,
      }}
      onChange={(e) => props.onChange && props.onChange(e.value.join(","))}
      options={props.options}
      selected={typeof props.defaultValue === "string" ? props.defaultValue?.split(",") : undefined}
      labelType="count"
      filter
      hideMessage
      {...props.inputProps}
    />
  );
}
