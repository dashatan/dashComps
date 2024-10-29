import { useEffect, useRef, useState } from "react";
import Checkbox from "@inputs/checkbox/checkbox";
import { SelectItem } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";
import EmptyTemplate from "./comps/empty";
import List from "../list";

export type MultiSelectProps = SelectContainerProps & {
  options?: SelectItem[];
  onChange?: (value: (string | number)[]) => void;
  selected?: (string | number)[];
  onReachBottom?: () => void;
  itemTemplate?: (option: any) => React.ReactNode;
  className?: {
    panelBody?: string;
    item?: string;
  };
};

export default function MultiSelect(props: MultiSelectProps) {
  const [selected, setSelected] = useState<any[]>(props.selected || []);
  const [data, setData] = useState(props.options);
  const showChips = selected.length > 0 && props.showChips;
  const selectedOptions = props.options?.filter((x) => selected.includes(x.value));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(props.selected || []);
  }, [props.selected]);

  useEffect(() => {
    setData(props.options);
  }, [props.options]);

  function handleChange(option: SelectItem) {
    let res = [...selected, option.value];
    if (selected.includes(option.value)) res = selected.filter((y) => y !== option.value);
    setSelected(res);
    props.onChange && props.onChange(res);
  }

  function handleSearch(text?: string) {
    if (text) {
      const newData = props.options?.filter((item) => `${item.label}`.includes(text));
      setData(newData);
    } else {
      setData(props.options);
    }
  }

  function handleClear() {
    setSelected([]);
    props.onChange && props.onChange([]);
  }

  return (
    <SelectContainer
      {...props}
      count={selected.length}
      showChips={showChips}
      chips={selectedOptions}
      onRemove={handleChange}
      onClear={handleClear}
      onSearch={handleSearch}
      open={open}
      onOpenChange={(e) => setOpen(e)}
    >
      {data?.length ? (
        <List
          value={data.find((x) => selected.includes(x.value))?.value}
          onChange={handleChange}
          onReachBottom={props.onReachBottom}
          itemTemplate={(option) => {
            const active = selected.includes(option.value);
            return (
              <Checkbox
                title={!props.itemTemplate ? option.label : undefined}
                titleTemplate={props.itemTemplate && props.itemTemplate(option)}
                active={active}
                onChange={() => handleChange(option)}
                className={{ container: "hover:bg-gray-200 rounded-none items-center", title: "text-sm" }}
              />
            );
          }}
          itemClassName={props.className?.item}
          className={props.className?.panelBody}
          data={data}
          loading={props.loading}
        />
      ) : (
        <EmptyTemplate />
      )}
    </SelectContainer>
  );
}
