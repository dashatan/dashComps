import { Icon } from "@/components/micro/icons";
import { SortOrder } from "primereact/datatable";
import { classNames } from "@/utils";
import { useState } from "react";
export interface SortIconProps {
  sorted?: boolean;
  sortOrder?: SortOrder;
  onChange?: (sortOrder: number) => void;
  loading?: boolean;
}
export default function SortIcon({ sorted, sortOrder, onChange, loading }: SortIconProps) {
  const [order, setOrder] = useState(0);

  function handleChange(val: number) {
    if (loading) return;
    let res = val;
    if (order === val) res = 0;
    setOrder(res);
    onChange && onChange(res);
  }

  return (
    <div className="flex flex-col items-center justify-center w-6 h-6 px-6">
      <Icon
        icon="ArrowUp"
        className={classNames("w-5 h-5 scale-75 -mb-1.5", {
          "[&_*]:fill-gray-400": !sorted || sortOrder !== -1,
          "[&_*]:fill-gray-700": sorted && sortOrder == -1,
        })}
        // onClick={() => handleChange(1)}
      />
      <Icon
        icon="ArrowDown"
        className={classNames("w-5 h-5 scale-75 -mt-1", {
          "[&_*]:fill-gray-400": !sorted || sortOrder !== 1,
          "[&_*]:fill-gray-700": sorted && sortOrder === 1,
        })}
        // onClick={() => handleChange(1)}
      />
    </div>
  );
}
