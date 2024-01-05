import { memo, useEffect, useRef, useState } from "react";
import orderColumns from "./utils/order-columns";
import ActionHeader from "./components/header/action-header";
import { classNames } from "@/utils";
import { useFormContext } from "react-hook-form";
import { ChangeTag, ColumnProps, TableData, TableProps, constants } from "./types";
import { TH } from "./components/header/TH";
import { Filter } from "./components/header/filter-row";
import { debounce } from "lodash-es";
import { Pagination } from "./components/header/pagination";
import TableRow from "./components/body/table-row";
import TD from "./components/body/TD";
import { useResizeDetector } from "react-resize-detector";
import EmptyTemplate from "./components/body/empty";

export default memo(function Table(props: TableProps) {
  /* -------------------------------- Variables ------------------------------- */
  const debounced = useRef(debounce((cb) => cb && cb(), 600)).current;
  const { ref } = useResizeDetector();
  const table = useFormContext<TableData>();
  const showFilter = table.watch("showFilter");
  const expandedRows = table.watch("expandedRows");
  const activeCols = table.watch("activeColumns");
  const { onTableChange } = props;
  const state = table.getValues();
  const initialActiveColumns = activeCols || props.columns?.flatMap((x) => (x.field ? (x.field as string) : []));
  const orderedColumns = orderColumns(props.columns || [], initialActiveColumns || []);
  const [activeColumns, setActiveColumns] = useState<string[] | undefined>(initialActiveColumns);
  const [columns, setColumns] = useState<ColumnProps[] | undefined>(orderedColumns);
  const mockRows = Array.from(new Array(constants.rows)).map((x, i) => ({ id: i + 1 }));
  const loading = props.loading;
  const data = loading ? mockRows : props.data;
  const noResult = !loading && !data?.length;

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    if (props.columns && initialActiveColumns) {
      setColumns(orderColumns(props.columns, activeColumns || initialActiveColumns));
    }
  }, [props.columns]);

  useEffect(() => {
    table.setValue("totalRecords", props.totalRecords);
  }, [props.totalRecords]);

  /* -------------------------------- Functions ------------------------------- */

  function handleOrder({ activeColumns }: TableData) {
    if (props.loading) return;
    setActiveColumns(activeColumns);
    const newColumns = orderColumns(props.columns || [], activeColumns || []);
    setColumns(newColumns);
    handleChange({ ...table.getValues(), activeColumns }, "order");
  }

  function handleChange(data: Partial<TableData>, tag: ChangeTag) {
    if (loading) return;
    onTableChange && onTableChange(data, tag);
  }

  /* ----------------------------------- JSX ---------------------------------- */

  return (
    <div className="flex flex-col w-full h-full">
      {props.showActionHeader && (
        <div className="sticky top-0 z-10 w-full mb-4 bg-gray-50">
          <ActionHeader
            {...props.actionHeaderProps}
            columns={props.columns}
            activeColumns={activeColumns}
            onOrderChange={handleOrder}
            onChange={handleChange}
            loading={loading}
          />
        </div>
      )}
      <div ref={ref} className="max-h-full mx-4 overflow-auto border border-gray-300 rounded-md">
        <table className="w-full border-separate border-spacing-0">
          <thead
            className={classNames(
              "[&>th:first-child]:first:rounded-tr-md [&>th:last-child]:first:rounded-tl-md [&>th]:last:border-b",
              "sticky top-0 z-[2] border-slate-300 border-b "
            )}
          >
            <tr>
              {columns?.map((col, index) => {
                return (
                  <TH
                    key={index}
                    col={col}
                    loading={loading}
                    onchange={(values, tag) => {
                      handleChange(values, tag);
                    }}
                  />
                );
              })}
            </tr>
            {showFilter && (
              <tr>
                {columns?.map((col, index) => (
                  <Filter
                    key={index}
                    col={col}
                    loading={loading}
                    values={state}
                    onchange={(values, tag) => {
                      if (!col.noDebounce) {
                        debounced(() => {
                          table.reset(values);
                          handleChange(values, tag);
                        });
                      } else {
                        table.reset(values);
                        handleChange(values, tag);
                      }
                    }}
                  />
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {noResult ? (
              <tr>
                <td colSpan={columns?.length}>
                  <EmptyTemplate />
                </td>
              </tr>
            ) : (
              data?.map((item: any, index: number) => {
                const dataKey = item && props.dataKey ? item[props.dataKey] : undefined;
                const expanded = !!dataKey && !!expandedRows && !!expandedRows[dataKey];
                if (expanded && props.rowExpansionTemplate) {
                  const rightExcludeCols = columns?.filter((x) => x.excludeExpand?.pos === "right");
                  const leftExcludeCols = columns?.filter((x) => x.excludeExpand?.pos === "left");
                  const normalCols = columns?.filter((x) => !x.frozen && !x.excludeExpand);
                  return (
                    <tr key={index} className="bg-gray-50 [&_td]:hover:!bg-gray-100 transition-all">
                      {(rightExcludeCols || []).map((col, i) => (
                        <TD
                          key={`right${i}`}
                          col={col}
                          data={item}
                          rowIndex={index}
                          loading={loading}
                          className="align-top"
                        />
                      ))}
                      <td className="border-b border-slate-300" colSpan={normalCols?.length}>
                        {props.rowExpansionTemplate(item)}
                      </td>
                      {(leftExcludeCols || []).map((col, i) => (
                        <TD
                          key={`right${i}`}
                          col={col}
                          data={item}
                          rowIndex={index}
                          loading={loading}
                          className="align-top"
                        />
                      ))}
                    </tr>
                  );
                }
                return (
                  <TableRow
                    key={index}
                    data={item}
                    index={index}
                    columns={columns}
                    loading={loading}
                    expanded={expanded}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {props.showFooterPagination && (
        <div className="flex flex-row-reverse items-center gap-2 p-4">
          <Pagination loading={loading} values={state} onchange={handleChange} />
        </div>
      )}
    </div>
  );
});
