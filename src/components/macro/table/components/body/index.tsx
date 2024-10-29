import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/micro/context-menu";
import EmptyTemplate from "./empty";
import TableRow from "./table-row";
import TD from "./TD";
import { useFormContext } from "react-hook-form";
import { ColumnProps, TableData, TableProps, constants } from "@/components/macro/table/types";

export type TableBodyProps = Pick<
  TableProps,
  "data" | "dataKey" | "rowExpansionTemplate" | "rightClickMenu" | "loading" | "rowProps" | "expandOnNewRow"
> & {
  columns?: ColumnProps[];
};

export default function Body(props: TableBodyProps) {
  const table = useFormContext<TableData>();
  const expandedRows = table.watch("expandedRows");
  const mockRows = Array.from(new Array(constants.rows)).map((x, i) => ({ id: i + 1 }));
  const data = props.loading ? mockRows : props.data;
  const noResult = !props.loading && !data?.length;
  return (
    <tbody>
      {noResult ? (
        <tr>
          <td colSpan={props.columns?.length}>
            <EmptyTemplate />
          </td>
        </tr>
      ) : (
        data?.map((item: any, index: number) => {
          const dataKey = item && props.dataKey ? item[props.dataKey] : undefined;
          const expanded = !!dataKey && !!expandedRows && !!expandedRows[dataKey] && !props.loading;
          if (expanded && props.rowExpansionTemplate && !props.expandOnNewRow) {
            const rightExcludeCols = props.columns?.filter((x) => x.excludeExpand?.pos === "right");
            const leftExcludeCols = props.columns?.filter((x) => x.excludeExpand?.pos === "left");
            const normalCols = props.columns?.filter((x) => !x.frozen && !x.excludeExpand);
            return (
              <tr key={index} className="bg-gray-50">
                {(rightExcludeCols || []).map((col, i) => (
                  <TD
                    key={`right${i}`}
                    col={col}
                    data={item}
                    rowIndex={index}
                    loading={props.loading}
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
                    loading={props.loading}
                    className="align-top"
                  />
                ))}
              </tr>
            );
          }
          return props.rightClickMenu && !props.loading ? (
            <>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <TableRow
                    key={index}
                    data={item}
                    index={index}
                    columns={props.columns}
                    loading={props.loading}
                    expanded={expanded}
                    {...props.rowProps}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent>{props.rightClickMenu(item)}</ContextMenuContent>
              </ContextMenu>
              {expanded && props.rowExpansionTemplate && props.expandOnNewRow && (
                <tr key={index} className="bg-gray-50">
                  <td className="border-b border-slate-300" colSpan={props.columns?.length}>
                    {props.rowExpansionTemplate(item)}
                  </td>
                </tr>
              )}
            </>
          ) : (
            <>
              <TableRow
                key={index}
                data={item}
                index={index}
                columns={props.columns}
                loading={props.loading}
                expanded={expanded}
                {...props.rowProps}
              />
              {expanded && props.rowExpansionTemplate && props.expandOnNewRow && (
                <tr key={index} className="bg-gray-50">
                  <td className="border-b border-slate-300" colSpan={props.columns?.length}>
                    {props.rowExpansionTemplate(item)}
                  </td>
                </tr>
              )}
            </>
          );
        })
      )}
    </tbody>
  );
}
