import { SelectItem } from "primereact/selectitem";
import { InputTypes } from "./input-renderer";

export interface Input<Name, Field> {
  name: Name;
  label?: string;
  options?: SelectItem[];
  type: InputTypes;
  defaultValue?: any;
  props?: any;
  getValue?: (e: any) => any;
  onChange?: ({ field, value }: { field: Field; value: any }) => void;
}
