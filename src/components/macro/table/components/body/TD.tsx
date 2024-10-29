import { classNames } from "@/utils";
import SkeletonField from "./skeleton";
import { ColumnProps } from "@/components/macro/table/types";
import { memo } from "react";

export interface TDProps {
  loading?: boolean;
  data: any;
  rowIndex: number;
  col: ColumnProps;
  children?: React.ReactNode;
  className?: string;
}

const TD = memo(function TD({ data, rowIndex, col, loading, children, className }: TDProps) {
  const showSkeleton = loading && (col.body || col.bodyElement);
  let { body } = col;
  let Body = <></>;
  if (showSkeleton) {
    Body = <SkeletonField />;
  } else if (typeof body === "string") {
    Body = <span>{body}</span>;
  } else if (body) {
    Body = (body as any)(data);
  } else if (col.bodyElement) {
    const El = col.bodyElement;
    Body = <El data={data} options={{ column: El.prototype, field: col.field || "", rowIndex: rowIndex }} />;
  }
  return (
    <td
      className={classNames(
        "overflow-hidden border-b border-slate-300",
        {
          "pointer-events-none": loading,
        },
        className,
      )}
      style={{
        ...(col.frozen && { position: "sticky", [col.frozen.pos]: col.frozen.distance, zIndex: 1 }),
      }}
    >
      {children || (
        <div className={classNames("px-4 py-4 text-right text-base font-medium text-gray-700", "w-full")}>{Body}</div>
      )}
    </td>
  );
});

export default TD;
