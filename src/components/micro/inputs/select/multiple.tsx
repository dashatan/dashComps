import { classNames } from "@/utils";
import { useEffect, useRef, useState } from "react";
import Checkbox from "@inputs/checkbox/checkbox";
import { SelectItem } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";
import EmptyTemplate from "./comps/empty";

export type MultiSelectProps = SelectContainerProps & {
  options?: SelectItem[];
  onChange?: (event: { value: any }) => void;
  value?: any;
  selected?: any[];
  className?: {
    panelBody?: string;
  };
};

export default function MultiSelect(props: MultiSelectProps) {
  const optionsContainer = useRef<HTMLDivElement>(null);
  const selectedItems = useRef<(HTMLDivElement | undefined)[]>([]);
  const [selected, setSelected] = useState<any[]>(props.selected || []);
  const [data, setData] = useState(props.options);
  const showChips = selected.length > 0 && props.showChips;
  const selectedOptions = props.options?.filter((x) => selected.includes(x.value));

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
    props.onChange && props.onChange({ value: res });
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
    props.onChange && props.onChange({ value: [] });
  }
  return (
    <SelectContainer
      {...props}
      count={selected.length}
      showChips={showChips}
      chips={selectedOptions}
      onRemove={handleChange}
      onRemoveAll={() => setSelected([])}
      onClear={handleClear}
      onSearch={handleSearch}
    >
      <div
        ref={optionsContainer}
        className={classNames("flex flex-col max-h-80 min-h-20 overflow-y-auto w-full", props.className?.panelBody)}
      >
        {data?.length ? (
          data?.map((option, index) => {
            const active = selected.includes(option.value);
            return (
              <Checkbox
                key={index}
                ref={(el) => (el ? (selectedItems.current[index] = active ? el : undefined) : undefined)}
                title={option.label}
                active={active}
                onChange={() => handleChange(option)}
                className={{ container: "hover:bg-gray-200 rounded-none items-center", title: "text-sm" }}
              />
            );
          })
        ) : (
          <EmptyTemplate />
        )}
      </div>
    </SelectContainer>
  );
}
