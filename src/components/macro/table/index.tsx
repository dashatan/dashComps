import { FormProvider, useForm } from "react-hook-form";
import { TableData, TableProps, constants } from "./types";
import Table from "./table";

export default function TableElement(props: TableProps) {
  const table = useForm<TableData>({ defaultValues: props.defaultValues || constants });

  return (
    <FormProvider {...table}>
      <Table {...props} />
    </FormProvider>
  );
}
