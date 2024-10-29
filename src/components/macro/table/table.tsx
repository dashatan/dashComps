import { memo, useEffect, useState } from "react";
import orderColumns from "./utils/order-columns";
import ActionHeader from "./components/header/action-header";
import { useFormContext } from "react-hook-form";
import { ChangeTag, ColumnProps, TableData, TableProps } from "./types";
import { Pagination } from "./components/header/pagination";
import { useResizeDetector } from "react-resize-detector";
import ActionFilters from "./components/header/action-filters";
import Body from "./components/body";
import Header from "./components/header";
import { classNames } from "@/utils";

export default memo(function Table(props: TableProps) {
  /* -------------------------------- Variables ------------------------------- */

  const { ref } = useResizeDetector();
  const table = useFormContext<TableData>();
  const activeCols = table.watch("activeColumns");
  const sidePanelData = table.watch("sidePanelData");
  const { onTableChange } = props;
  const state = table.getValues();
  const initialActiveColumns =
    activeCols ||
    props.columns?.flatMap((x) => {
      return !x.defaultInactive && x.field ? (x.field as string) : [];
    });
  const orderedColumns = orderColumns(props.columns || [], initialActiveColumns || []);
  const [activeColumns, setActiveColumns] = useState<string[] | undefined>(initialActiveColumns);
  const [columns, setColumns] = useState<ColumnProps[] | undefined>(orderedColumns);
  const loading = props.loading;

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    if (sidePanelData && loading) {
      table.setValue("sidePanelData", undefined);
    }
  }, [loading]);

  useEffect(() => {
    if (props.columns && initialActiveColumns) {
      setColumns(orderColumns(props.columns, activeColumns || initialActiveColumns));
    }
  }, [props.columns]);

  useEffect(() => {
    table.setValue("totalRecords", props.totalRecords);
  }, [props.totalRecords]);

  useEffect(() => {
    table.setValue("selected", props.defaultValues?.selected);
  }, [props.defaultValues?.selected]);

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
    <div className={classNames("flex h-full w-full flex-col", props.className?.l1)}>
      {props.showActionHeader && (
        <ActionHeader
          {...props.actionHeaderProps}
          columns={props.columns}
          activeColumns={activeColumns}
          onOrderChange={handleOrder}
          onChange={handleChange}
          loading={loading}
        />
      )}
      {props.showActionFilters && state.showFilterChips && (
        <ActionFilters columns={props.columns} onChange={handleChange} {...props.actionFilterProps} />
      )}
      <div className={classNames("my-4 flex overflow-hidden", props.className?.l2)}>
        <div
          ref={ref}
          className={classNames(
            "mx-4 max-h-full w-full overflow-auto rounded-md border border-gray-300",
            props.className?.l3,
          )}
        >
          <table className={classNames("w-full border-separate border-spacing-0", props.className?.table)}>
            <Header
              onChange={handleChange}
              actionHeaderProps={props.actionHeaderProps}
              columns={columns}
              loading={props.loading}
              THProps={props.THProps}
            />
            <Body
              columns={columns}
              data={props.data}
              dataKey={props.dataKey}
              loading={props.loading}
              rightClickMenu={props.rightClickMenu}
              rowExpansionTemplate={props.rowExpansionTemplate}
              rowProps={props.rowProps}
              expandOnNewRow={props.expandOnNewRow}
            />
          </table>
        </div>
        {sidePanelData && props.sidePanelTemplate && props.sidePanelTemplate(sidePanelData)}
      </div>
      {props.showFooterPagination && (
        <div className="flex flex-row-reverse items-center gap-2 px-4 pb-4">
          <Pagination loading={loading} values={state} onchange={handleChange} />
        </div>
      )}
    </div>
  );
});
