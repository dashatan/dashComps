import { classNames } from "@/utils";
import SkeletonField from "./skeleton";
import { ColumnProps } from "../../types";
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
  const showSkeleton = loading && col.body && col.field;
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
      className={classNames("border-b border-slate-300 bg-gray-50 overflow-hidden", className)}
      style={{
        ...(col.frozen && { position: "sticky", [col.frozen.pos]: col.frozen.distance, zIndex: 1 }),
      }}
    >
      {children || (
        <div
          className={classNames("text-gray-700 text-right py-4 px-4 text-base font-medium cursor-default", " w-full")}
        >
          {Body}
        </div>
      )}
    </td>
  );
});

export default TD;
