import FilterTextElement from "./text";
import FilterSelectElement from "./select";
import FilterMultiSelectElement from "./multi-select";
import FilterDateElement from "./date";
import { SelectItem } from "@inputs/select/types";
import FilterPlateElement from "./plate";
import FilterTreeMultiSelectElement from "./tree-multi-select";
import { FilterValue } from "@/components/macro/table/types";

const filterElements = {
  "": undefined,
  text: FilterTextElement,
  date: FilterDateElement,
  select: FilterSelectElement,
  "multi-select": FilterMultiSelectElement,
  tree: FilterTreeMultiSelectElement,
  plate: FilterPlateElement,
};

export type FilterElementsKeys = keyof typeof filterElements;
export interface FilterElementProps {
  onChange?: (value: FilterValue) => void;
  options?: SelectItem[];
  defaultValue?: FilterValue;
  className?: any;
  inputProps?: any;
}

export default filterElements;
