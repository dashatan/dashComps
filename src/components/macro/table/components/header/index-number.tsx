import { useFormContext } from "react-hook-form";
import { BodyElementProps, TableData, constants } from "@table/types";

export default function IndexNumber({ options }: BodyElementProps) {
  const table = useFormContext<TableData>();
  const state = table.getValues();
  const { page, rows } = state;
  const { rowIndex } = options || {};
  if (rowIndex === undefined) return <></>;
  const index = rowIndex + 1;
  const res = index + (page || 0) * (rows || constants.rows);
  return <div className="flex w-full items-center justify-center">{res}</div>;
}
