export type TableHeaderChangeEvent = {
  selected?: SelectItem["value"][];
  data?: SelectItem[];
};

export type SelectItem = {
  label?: string;
  value: string | number;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  disabled?: boolean;
};

export type TreeSelectItem = SelectItem & {
  children?: TreeSelectItem[];
};
export type FlatTreeSelectItem = SelectItem & {
  parentId?: string | number;
};
