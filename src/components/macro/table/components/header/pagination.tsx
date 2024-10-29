import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { memo } from "react";
import { ChangeTag, TableData, constants } from "@table/types";
import { useFormContext, useWatch } from "react-hook-form";
import { Icon } from "@/components/micro/icons";
import { classNames } from "@/utils";

export interface PaginationProps {
  values?: TableData;
  onchange: (values: TableData, tag: ChangeTag) => void;
  loading?: boolean;
}
export const Pagination = memo(({ onchange, loading }: PaginationProps) => {
  const table = useFormContext<TableData>();
  const { first, totalRecords, rows } = useWatch<TableData>();

  const handleChange = (e: PaginatorPageChangeEvent) => {
    if (loading) return;
    const { first, page, rows } = e;
    const offset = (page || constants.page) * (rows || constants.rows);
    const newState = { ...table.getValues(), first, page, rows, offset };
    table.reset(newState);
    onchange(newState, "filter");
  };

  return (
    <Paginator
      first={first || constants.first}
      rows={rows || constants.rows}
      totalRecords={totalRecords}
      pageLinkSize={5}
      className="h-14 dir-ltr"
      onPageChange={handleChange}
      nextPageLinkIcon={<Icon icon="ArrowDown" className="-rotate-90 scale-75 [&_*]:fill-gray-500" />}
      prevPageLinkIcon={<Icon icon="ArrowDown" className="rotate-90 scale-75 [&_*]:fill-gray-500" />}
      lastPageLinkIcon={<DoubleArrow className="rotate-180" />}
      firstPageLinkIcon={<DoubleArrow />}
    />
  );
});

Pagination.displayName = "Pagination";

function DoubleArrow(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div {...props} className={classNames("flex items-center justify-center [&_*]:fill-gray-500", props.className)}>
      <Icon icon="ArrowDown" className="-mr-4 rotate-90 scale-75" />
      <Icon icon="ArrowDown" className="rotate-90 scale-75" />
    </div>
  );
}
