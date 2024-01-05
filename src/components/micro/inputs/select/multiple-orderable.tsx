import { classNames } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { GripVertical, RotateCw, X } from "lucide-react";
import Checkbox from "@inputs/checkbox/checkbox";
import { SelectItem, TableHeaderChangeEvent } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";

export type MultiSelectDNDProps = SelectContainerProps & {
  options?: SelectItem[];
  selected?: SelectItem["value"][];
  onChange?: (params: TableHeaderChangeEvent) => void;
  onRefresh?: () => void;
  onClear?: () => void;
  value?: any;
  whitChips?: boolean;
  heading?: string;
  subHeading?: string;
  reorder?: boolean;
  setReorder?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MultiSelectOrderable(props: MultiSelectDNDProps) {
  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();
  const [selected, setSelected] = useState<SelectItem["value"][]>(props.selected || []);
  const [data, setData] = useState(props.options);
  const showChips = selected.length > 0 && props.whitChips;
  const selectedOptions = props.options?.filter((x) => selected.includes(x.value));

  useEffect(() => {
    props.selected && setSelected(props.selected);
  }, [props.selected]);

  useEffect(() => {
    if (props.reorder) {
      setData(props.options);
      props.setReorder && props.setReorder(false);
    }
  }, [props.reorder]);

  function handleSelectChange(option: SelectItem) {
    let res = [...selected, option.value];
    if (selected.includes(option.value)) {
      res = selected.filter((y) => y !== option.value);
    }
    setSelected(res);
    props.onChange && props.onChange({ data, selected: res });
  }

  function handleOrderChange(val?: SelectItem[]) {
    setData(val);
    props.onChange && props.onChange({ data: val, selected });
  }

  function handleDragStart(e: any) {
    dragItem.current = e.target?.id;
  }

  function handleDragEnter(e: any) {
    let d = e.currentTarget?.id;
    if (dragItem.current === d) return;
    dragOverItem.current = d;
    const newData = [...(data || [])];
    const s = newData.findIndex((x) => x.value === dragItem.current);
    d = newData.findIndex((x) => x.value === d);
    const item1 = newData[s];
    newData.splice(s, 1);
    newData.splice(d, 0, item1);
    setData(newData);
  }

  function handleDrop() {
    dragItem.current = null;
    dragOverItem.current = null;
    handleOrderChange(data);
  }

  function HeaderTemplate() {
    return (
      <div className="flex items-center justify-between gap-10 p-2 border-b border-gray-100">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-700">{props.heading}</span>
          <span className="text-xs font-light text-gray-500">{props.subHeading}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <RotateCw className="w-5 cursor-pointer" onClick={() => props.onRefresh && props.onRefresh()} />
        </div>
      </div>
    );
  }

  return (
    <SelectContainer
      {...props}
      showChips={showChips}
      chips={selectedOptions}
      count={selected.length}
      headerTemplate={<HeaderTemplate />}
    >
      <div className="relative flex flex-col w-full h-full p-2 rounded-md text-gray-70">
        {data?.map((item) => {
          const active = selected.includes(item.value);
          const hidden = dragItem.current === item.value;
          return (
            <div
              id={`${item.value}`}
              key={item.value}
              draggable
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDrop}
              className={classNames("flex items-center [&_span]:hover:opacity-100 hover:bg-slate-100 rounded-md h-10", {
                "opacity-0": hidden,
              })}
            >
              <span className="transition-all opacity-100 cursor-grab">
                <GripVertical className="text-gray-300" />
              </span>
              <Checkbox
                title={item.label}
                active={active}
                onChange={() => handleSelectChange(item)}
                className={{
                  container: "!rounded-lg !items-center gap-2 !px-2 !bg-transparent",
                  titleContainer: "!p-0",
                  title: "text-sm !font-medium",
                  iconContainer: "!m-0 !min-w-6 !w-6 !h-6",
                  icon: "!w-3 !h-3",
                }}
              />
            </div>
          );
        })}
      </div>
    </SelectContainer>
  );
}
