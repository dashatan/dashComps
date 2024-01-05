import FilterTextElement from "./text";
import FilterSelectElement from "./select";
import FilterMultiSelectElement from "./multi-select";
import FilterDateElement from "./date";
import { SelectItem } from "@inputs/select/types";

const filterElements = {
  text: FilterTextElement,
  date: FilterDateElement,
  select: FilterSelectElement,
  "multi-select": FilterMultiSelectElement,
  "": undefined,
};

export type FilterElementsKeys = keyof typeof filterElements;
export interface FilterElementProps {
  onChange?: (value: string) => void;
  options?: SelectItem[];
  defaultValue?: string;
  className?: any;
  inputProps?: any;
}

export default filterElements;
