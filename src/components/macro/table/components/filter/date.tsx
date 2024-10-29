import DateInput from "@inputs/date/date-input";
import { FilterElementProps } from ".";

export default function FilterDateElement(props: FilterElementProps) {
  return (
    <DateInput
      oneLineLabel
      className={{ input: "!h-10" }}
      onChange={(value) => {
        value && props.onChange && props.onChange(value);
      }}
      value={props.defaultValue as number[]}
      {...props.inputProps}
    />
  );
}
