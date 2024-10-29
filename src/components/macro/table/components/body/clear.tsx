import { useFormContext } from "react-hook-form";
import Button from "@/components/micro/buttons/button";
import { X } from "lucide-react";
import { TableData, constants } from "@/components/macro/table/types";

export default function ClearTable({ onChange }: { onChange?: (data: TableData) => void }) {
  const table = useFormContext<TableData>();
  const totalRecords = table.watch("totalRecords");

  function handleClick() {
    const newData: TableData = { ...constants, showFilter: true, totalRecords };
    table.reset(newData);
    onChange && onChange(newData);
  }
  return (
    <div className="flex items-center justify-center w-full">
      <Button severity="info" size="sm" className="w-10 h-10 bg-slate-200" onClick={handleClick}>
        <X className="w-5 text-slate-500" />
      </Button>
    </div>
  );
}
