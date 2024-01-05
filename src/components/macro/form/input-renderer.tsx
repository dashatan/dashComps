import DateInput from "@/components/micro/inputs/date/date-input";
import NumberInput from "@/components/micro/inputs/number/number-input";
import RadioInput from "@/components/micro/inputs/radio/radio-input";
import MaskInput from "@/components/micro/inputs/text/mask-input";
import TextInput from "@/components/micro/inputs/text/textInput";
import { Input } from "./types";
import { Controller, UseFormReturn } from "react-hook-form";
import TextareaInput from "@/components/micro/inputs/text/textareaInput";
import { Select } from "@/components/micro/inputs/select";

export const inputTypes = {
  text: TextInput,
  textarea: TextareaInput,
  mask: MaskInput,
  number: NumberInput,
  select: Select.Single,
  date: DateInput,
  radio: RadioInput,
};
export type InputTypes = keyof typeof inputTypes;
const valueTypes = [(e: any) => e.target.value, (e: any) => e.value, (e: any) => e];
const valueTypesIndexes: { [key: string]: number } = { text: 0, mask: 0, number: 1, select: 2, date: 1, textarea: 0 };

export function InputRenderer({ input, form }: { input: Input<any, any>; form: UseFormReturn<any> }) {
  const { name, label, type, getValue, options } = input;
  const valueType = valueTypesIndexes[type] !== undefined ? valueTypesIndexes[type] : 1;
  const inputValue = getValue || valueTypes[valueType];
  const props = input.props ? input.props : {};
  const Comp = inputTypes[type];
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={input.defaultValue}
      render={({ field, fieldState }) => {
        if (fieldState.error?.message) {
          // console.log(fieldState.error?.message, props?.message);
        }
        return (
          <Comp
            label={label}
            value={field.value}
            onChange={(e: any) => {
              if (input.onChange) {
                input.onChange({ field, value: inputValue(e) });
                return;
              }
              field.onChange(inputValue(e));
            }}
            {...props}
            status={fieldState.error?.message ? "error" : undefined}
            options={options || props.options}
            message={fieldState.error?.message || props?.message}
          />
        );
      }}
    />
  );
}
