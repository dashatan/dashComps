import { classNames } from "@/utils";
import Button from "@/components/micro/buttons/button";
import { Icon } from "@/components/micro/icons";
import Badge from "@/components/micro/badge/badge";
import { Settings, X } from "lucide-react";
import { memo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pagination } from "./pagination";
import { SelectItem, TableHeaderChangeEvent } from "@/components/micro/inputs/select/types";
import { Select } from "@/components/micro/inputs/select";
import { SelectProps } from "@/components/micro/inputs/select/single";
import { ColumnProps, TableData, TableProps, constants } from "@/components/macro/table/types";
import { orderColumnsWithoutHide } from "@/components/macro/table/utils/order-columns";

export interface ActionHeaderProps {
  bulkActionsOptions?: (SelectItem & { onChange?: (value: any, table?: any) => void })[];
  bulActionsProps?: SelectProps;
  firstExtraElements?: React.ReactNode;
  secondExtraElements?: React.ReactNode;
  totalSelected?: number;
  columns?: ColumnProps[];
  activeColumns?: string[];
  onOrderChange?: (data: TableData) => void;
  onChange?: TableProps["onTableChange"];
  loading?: boolean;
  hideBulkActions?: boolean;
  hideFilter?: boolean;
}

function ActionHeaderFunction(props: ActionHeaderProps) {
  const { onChange, onOrderChange } = props;
  const table = useFormContext<TableData>();
  const state = table.getValues();
  const [reorder, setReorder] = useState(false);
  const { selected, selectAll, totalRecords, rows } = useWatch<TableData>();
  const totalSelected = selectAll ? totalRecords : selected?.length;

  function handleColumnsOrder({ data, selected }: TableHeaderChangeEvent) {
    const activeColumns = data?.flatMap((x) => (selected?.includes(x.value) ? (x.value as string) : []));
    onOrderChange && onOrderChange({ activeColumns });
  }
  function handleRefresh() {
    setReorder(true);
    onOrderChange && onOrderChange({ activeColumns: props.columns?.flatMap((x) => x.field || []) });
  }

  const columnsOptions = orderColumnsWithoutHide(props.columns || [], props.activeColumns || []).flatMap((x) => {
    if (!x.field) return [];
    return { label: x.header as string, value: x.field as string };
  });

  function handleRows(rows: number) {
    const newState = { ...state, rows };
    onChange && onChange(newState, "rows");
    table.setValue("rows", rows);
  }

  return (
    <div className="flex w-full flex-row-reverse flex-wrap items-center justify-between border-b border-t border-gray-200 px-4">
      <div className="flex flex-row-reverse flex-wrap items-center gap-2">
        <Pagination
          loading={props.loading}
          values={state}
          onchange={(data, tag) => props.onChange && props.onChange(data, tag)}
        />
        <Select.Single
          className={{ item: "!p-2" }}
          label="تعداد نمایش"
          value={rows || constants.rows}
          width={130}
          onChange={(e) => e && handleRows(e as number)}
          options={[
            { label: "5 مورد", value: 5, title: "5" },
            { label: "10 مورد", value: 10, title: "10" },
            { label: "15 مورد", value: 15, title: "15" },
            { label: "20 مورد", value: 20, title: "20" },
            { label: "50 مورد", value: 50, title: "50" },
            { label: "100 مورد", value: 100, title: "100" },
            { label: "1000 مورد", value: 1000, title: "1000" },
          ]}
        />

        {!props.hideBulkActions && (
          <Select.Single
            {...props.bulActionsProps}
            label="اقدام گروهی"
            options={props.bulkActionsOptions}
            fitContent
            noneVirtualized
            noValueChange
            className={{ item: "p-0" }}
            itemTemplate={(option) => {
              return (
                <li
                  className={classNames(
                    "flex items-center gap-2 border-b border-gray-200 p-2",
                    "cursor-pointer text-sm font-medium text-gray-600 hover:bg-gray-200",
                    option.className,
                  )}
                  onClick={() => option.onChange && option.onChange(option.value, table)}
                >
                  <span className="flex w-8 scale-75 justify-center">{option.icon}</span>
                  <span>{option.label}</span>
                </li>
              );
            }}
          />
        )}
        <Select.MultiOrderable
          options={columnsOptions}
          labelTemplate={
            <Button variant="outlined" severity="info" className="h-14 w-14 [&_*]:fill-none">
              <Settings className="h-6 w-6 text-gray-700" />
            </Button>
          }
          onChange={handleColumnsOrder}
          onRefresh={handleRefresh}
          selected={props.activeColumns}
          heading="تنظیمات جدول"
          subHeading="ترتیب و نمایش ستون ها"
          fitContent
          reorder={reorder}
          setReorder={setReorder}
          className={{ popoverContent: "min-w-56" }}
        />

        {!props.hideFilter && (
          <Button
            variant="outlined"
            severity="info"
            className="h-14 w-14 [&_*]:fill-none"
            onClick={() => {
              onChange && onChange({ ...state, showFilter: !state.showFilter }, "filter");
              table.setValue("showFilter", !state.showFilter);
            }}
          >
            <Icon icon="Search2" className="[&_*]:stroke-gray-700" />
          </Button>
        )}
        {props.firstExtraElements}
      </div>
      <div className="flex items-center">
        <div className="flex h-20 w-20 items-center justify-center border-e border-gray-200">
          <div onClick={() => table.setValue("selected", [])}>
            <Badge
              className={classNames("min-w-11 cursor-pointer justify-center pl-1 pr-2", {
                "bg-gray-400 opacity-60": !totalSelected,
              })}
            >
              <span className="me-px mt-[1px]">{totalSelected || 0}</span>
              <X className="w-3.5" />
            </Badge>
          </div>
        </div>
        {props.secondExtraElements}
      </div>
    </div>
  );
}

const ActionHeader = memo(ActionHeaderFunction);
export default ActionHeader;
