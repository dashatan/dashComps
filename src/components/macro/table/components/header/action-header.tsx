import { classNames } from "@/utils";
import Button from "@/components/micro/buttons/button";
import { Icon } from "@/components/micro/icons";
import Badge from "@/components/micro/badge/badge";
import { Settings } from "lucide-react";
import { orderColumnsWithoutHide } from "../../utils/order-columns";
import { memo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ColumnProps, TableData, TableProps, constants } from "../../types";
import { Pagination } from "./pagination";
import { SelectItem, TableHeaderChangeEvent } from "@/components/micro/inputs/select/types";
import { Select } from "@/components/micro/inputs/select";

export interface ActionHeaderProps {
  bulkActionsOptions?: (SelectItem & { onChange?: (value: any, table?: any) => void })[];
  firstExtraElements?: React.ReactNode;
  secondExtraElements?: React.ReactNode;
  totalSelected?: number;
  columns?: ColumnProps[];
  activeColumns?: string[];
  onOrderChange?: (data: TableData) => void;
  onChange?: TableProps["onTableChange"];
  loading?: boolean;
  hideBulkActions?: boolean;
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
    <div className="flex flex-row-reverse flex-wrap items-center justify-between w-full px-4 border-t border-b border-gray-200">
      <div className="flex flex-row-reverse flex-wrap items-center gap-2">
        <Pagination
          loading={props.loading}
          values={state}
          onchange={(data, tag) => props.onChange && props.onChange(data, tag)}
        />
        <Select.Single
          hideMessage
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
            hideMessage
            label="اقدام گروهی"
            options={props.bulkActionsOptions}
            fitContent
            itemTemplate={(option) => {
              return (
                <li
                  className={classNames(
                    "flex items-center gap-2 p-2 border-b border-gray-200",
                    "hover:bg-gray-100 text-gray-600 cursor-pointer text-sm font-medium ",
                    option.className
                  )}
                  onClick={() => option.onChange && option.onChange(option.value, table)}
                >
                  <span className="flex justify-center w-8 scale-75">{option.icon}</span>
                  <span>{option.label}</span>
                </li>
              );
            }}
          />
        )}
        <Select.MultiOrderable
          options={columnsOptions}
          hideMessage
          labelTemplate={
            <Button variant="outlined" severity="info" className="h-14 w-14 [&_*]:fill-none">
              <Settings className="w-6 h-6 text-gray-700" />
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
        />

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
        {props.firstExtraElements}
      </div>
      <div className="flex items-center h-full">
        <div className="flex items-center justify-center w-20 h-20 border-l border-gray-200">
          {totalSelected ? (
            <Badge>
              <span className="px-2 mt-1">{totalSelected}</span>
            </Badge>
          ) : (
            <></>
          )}
        </div>
        {props.secondExtraElements}
      </div>
    </div>
  );
}

const ActionHeader = memo(ActionHeaderFunction);
export default ActionHeader;
