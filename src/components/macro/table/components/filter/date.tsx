import DateInput from "@inputs/date/date-input";
import { FilterElementProps } from ".";

export default function FilterDateElement(props: FilterElementProps) {
  return (
    <div>
      <DateInput
        {...props}
        oneLineLabel
        className={{ input: "!h-10" }}
        labelContainerProps={{ hideMessage: true }}
        onChange={(value) => {
          value && props.onChange && props.onChange(value.toString());
        }}
        value={props.defaultValue ? [new Date(props.defaultValue)] : []}
      />
    </div>
  );
}
