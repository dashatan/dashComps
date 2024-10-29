import DateInput from "@inputs/date/date-input";
import RadioInput from "@inputs/radio/radio-input";
import TextInput from "@inputs//text";
import { Input } from "./types";
import { Controller, UseFormReturn } from "react-hook-form";
import TextareaInput from "@inputs/text/textarea";
import { Select } from "@inputs/select";
import NumberInput from "@inputs/number";
import Switch from "@/components/micro/inputs/switch/switch";
import PasswordInput from "@/components/micro/inputs/text/password";
import WeightInput from "@/components/micro/inputs/weight";

export const inputTypes = {
  text: TextInput,
  password: PasswordInput,
  textarea: TextareaInput,
  weight: WeightInput,
  number: NumberInput,
  select: Select.Single,
  multi: Select.Multi,
  tree: Select.MultiTree,
  date: DateInput,
  radio: RadioInput,
  switch: Switch,
};
export type InputTypes = keyof typeof inputTypes;

export function InputRenderer({ input, form }: { input: Input<any, any>; form: UseFormReturn<any> }) {
  const { name, label, type, getValue, options } = input;

  const props = input.props ? input.props : {};
  const Comp = inputTypes[type];
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={input.defaultValue}
      render={({ field, fieldState }) => {
        return (
          <Comp
            label={label}
            value={field.value}
            onChange={(response: any) => {
              const value = getValue ? getValue(response) : response;
              if (input.onChange) input.onChange({ field, value });
              else field.onChange(value);
            }}
            {...props}
            options={options || props.options}
            status={fieldState.error?.message ? "error" : undefined}
            message={fieldState.error?.message || props?.message}
          />
        );
      }}
    />
  );
}
