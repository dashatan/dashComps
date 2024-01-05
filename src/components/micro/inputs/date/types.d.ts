interface DateInputProps {
  label?: string;
  placeholder?: string;
  defaultValues?: string[];
  required?: boolean;
  range?: boolean;
  isGregorian?: boolean;
  withoutClear?: boolean;
  onChange?: (dates?: string[]) => void;
  styles?: {
    inputWrapper?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  disable?: boolean;
  customView?: (props: any) => React.ReactNode;
  withDefault?: boolean;
}
