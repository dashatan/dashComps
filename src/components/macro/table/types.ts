import { FilterElementsKeys } from "./components/filter";
import { ActionHeaderProps } from "./components/header/action-header";
import { UseFormReturn } from "react-hook-form";
import { SelectItem } from "@/components/micro/inputs/select/types";

export const constants = {
  rows: 10,
  page: 0,
  offset: 0,
  first: 1,
  expandedRows: {},
};

export type TableBaseProps = {
  columns?: ColumnProps[];
  onTableChange?: (data: TableData | { [key: string]: string }, tag: ChangeTag) => void;
  showActionHeader?: boolean;
  defaultValues?: TableData;
  showFooterPagination?: boolean;
  actionHeaderProps?: Partial<ActionHeaderProps>;
  loading?: boolean;
  totalSelected?: number;
  totalRecords?: number;
  rowExpansionTemplate?: (data: any) => React.ReactNode;
  data?: any[];
  dataKey?: string | number;
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
  field?: string;
  sortable?: boolean;
  noDebounce?: boolean;
  filter?: boolean;
  filterProps?: any;
  filterOptions?: SelectItem[];
  filterClassName?: string | object;
  filterElement?: React.ReactNode;
  filterElementType?: FilterElementsKeys;
  header?: string | React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  body?: React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  bodyElement?: (props: BodyElementProps) => JSX.Element;
  onFilterChange?: (value: string | number | string[] | number[]) => void;
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
  activeColumns?: string[];
  filters?: { [key: string]: string | number | undefined | string[] | number[] };
  expandedRows?: any;
};

export type TableContext = {
  state: TableData;
  setState: TableSetState;
};

export type TableProps = TableBaseProps;
export type TableContextType = UseFormReturn<TableData, any, undefined>;
export type ChangeTag = "order" | "sort" | "filter" | "pagination" | "rows" | "loading";
export type TableSetState = React.Dispatch<React.SetStateAction<TableData>>;
