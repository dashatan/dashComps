import BasicTextInput from "@inputs/text/basicTextInput";
import { FilterElementProps } from ".";

export default function FilterTextElement(props: FilterElementProps) {
  return (
    <div>
      <BasicTextInput
        {...props}
        pt={{
          root: { className: "h-10 border !border-gray-300 !bg-gray-100" },
        }}
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value);
        }}
        value={props.defaultValue}
      />
    </div>
  );
}
