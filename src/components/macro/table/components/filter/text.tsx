import BasicTextInput from "@/components/micro/inputs/text/basic";
import { FilterElementProps } from ".";

export default function FilterTextElement(props: FilterElementProps) {
  return (
    <BasicTextInput
      {...props}
      className="h-10 bg-gray-100 border border-gray-300 focus-visible:border-primary-500 rounded-lg px-4"
      onChange={(e) => {
        props.onChange && props.onChange(e.target.value);
      }}
      value={props.defaultValue as string}
      defaultValue={props.defaultValue as string}
    />
  );
}
