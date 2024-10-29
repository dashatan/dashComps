import { FilterElementsKeys } from "./components/filter";
import { ActionHeaderProps } from "./components/header/action-header";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { SelectItem } from "@/components/micro/inputs/select/types";
import { PlateInputValue } from "@/features/traffic/comps/search/license-plate";
import { ActionFiltersProps } from "./components/header/action-filters";
import { TableRowProps } from "./components/body/table-row";
import { THProps } from "./components/header/TH";
import { TDProps } from "./components/body/TD";

export const constants = {
  rows: 10,
  page: 0,
  offset: 0,
  first: 1,
  expandedRows: {},
};

export type TableProps = {
  columns?: ColumnProps[];
  data?: any[];
  defaultValues?: TableData;
  loading?: boolean;
  showActionHeader?: boolean;
  showActionFilters?: boolean;
  showFooterPagination?: boolean;
  expandOnNewRow?: boolean;
  totalSelected?: number;
  totalRecords?: number;
  dataKey?: string | number;
  actionHeaderProps?: Partial<ActionHeaderProps>;
  actionFilterProps?: Partial<ActionFiltersProps>;
  THProps?: Partial<THProps>;
  TDProps?: Partial<TDProps>;
  rowProps?: Partial<TableRowProps>;
  className?: { table?: string; l1?: string; l2?: string; l3?: string };
  onTableChange?: (data: TableData | { [key: string]: string }, tag: ChangeTag) => void;
  rowExpansionTemplate?: (data: any) => React.ReactNode;
  sidePanelTemplate?: (data: any) => React.ReactNode;
  rightClickMenu?: (data: any) => React.ReactNode;
};

export type ColumnBodyOptions = {
  column: ColumnProps;
  field: string;
  rowIndex: number;
  props?: any;
  frozenRow?: boolean;
};

export type BodyElementProps = {
  data?: any;
  options?: ColumnBodyOptions;
};

export type ColumnProps = {
  style?: React.CSSProperties;
  className?: string;
  field?: string;
  id?: string | number;
  sortable?: boolean;
  defaultInactive?: boolean;
  noDebounce?: boolean;
  filter?: boolean;
  filterProps?: any;
  filterOptions?: SelectItem[];
  filterClassName?: string | object;
  filterElement?: React.ReactNode;
  filterChips?: (value?: FilterValue) => React.ReactNode;
  filterChipsLabel?: string;
  filterElementType?: FilterElementsKeys;
  header?: string | React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  body?: React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  bodyElement?: (props: BodyElementProps) => JSX.Element;
  onFilterChange?: (value: FilterValue) => void;
  frozen?: {
    distance: number;
    pos: "left" | "right";
  };
  excludeExpand?: {
    pos: "left" | "right";
  };
};

/* --------------------------------- Filter --------------------------------- */
export type TableData = {
  first?: number;
  rows?: number;
  offset?: number;
  page?: number;
  totalRecords?: number;
  selected?: (string | number)[];
  selectAll?: boolean;
  sortField?: string;
  sortOrder?: 1 | 0 | -1 | null;
  searchField?: string;
  searchText?: string;
  showFilter?: boolean;
  showFilterChips?: boolean;
  activeColumns?: string[];
  filters?: { [key: string]: FilterValue | undefined };
  expandedRows?: any;
  sidePanelData?: any;
};

export type TableContext = {
  state: TableData;
  setState: TableSetState;
};

export type TableContextType = UseFormReturn<TableData, any, FieldValues>;
export type ChangeTag = "order" | "sort" | "filter" | "pagination" | "rows" | "loading";
export type TableSetState = React.Dispatch<React.SetStateAction<TableData>>;
export type FilterValue = string | number | (string | number)[] | PlateInputValue;
