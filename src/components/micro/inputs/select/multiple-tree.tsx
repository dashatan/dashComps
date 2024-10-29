import { classNames, nestedSearch } from "@/utils";
import { useEffect, useState } from "react";
import { TreeSelectItem } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";
import { RecursiveSelectItem } from "./comps/recursive-select-item";
import { flattenData } from "./utils";

export type MultiSelectTreeProps = SelectContainerProps & {
  options?: TreeSelectItem[];
  onChange?: (value: (string | number)[]) => void;
  selected?: (string | number)[];
  className?: {
    panelBody?: string;
  };
};

export default function MultiSelectTree(props: MultiSelectTreeProps) {
  const [selected, setSelected] = useState<(number | string)[]>(props.selected || []);
  const [opened, setOpened] = useState<(number | string)[]>(props.selected || [0]);
  const [data, setData] = useState<TreeSelectItem[] | undefined>(props.options);
  const [open, setOpen] = useState(false);
  const showChips = selected.length > 0 && props.showChips;
  const flatData = flattenData(props.options || []);
  const selectedOptions = flatData?.filter((x) => selected.includes(x.value) && x.parentId);

  useEffect(() => {
    setData(props.options);
  }, [props.options]);

  useEffect(() => {
    setSelected(props.selected || []);
  }, [props.selected]);

  function handleChange(option: TreeSelectItem, active?: boolean) {
    const hasChildren = option.children?.length;
    let newSelected = [...selected];
    if (active) {
      if (!hasChildren) {
        if (!newSelected.includes(option.value)) newSelected.push(option.value);
      } else newSelected = selectChildren(option, newSelected);
    } else {
      newSelected = selected.filter((y) => y !== option.value);
      newSelected = deselectChildren(option, newSelected);
    }
    setSelected(newSelected);
    props.onChange && props.onChange(newSelected);
  }

  function selectChildren(option: TreeSelectItem, selected: (number | string)[]) {
    if (option.children?.length) {
      for (const child of option.children) {
        if (!child.children?.length) {
          if (!selected.includes(child.value)) selected.push(child.value);
        } else selectChildren(child, selected);
      }
    }
    return selected;
  }

  function deselectChildren(option: TreeSelectItem, selected: (number | string)[]) {
    let newSelected = [...selected];
    if (option.children?.length) {
      for (const child of option.children) {
        newSelected = newSelected.filter((x) => x !== child.value);
        newSelected = deselectChildren(child, newSelected);
      }
    }
    return newSelected;
  }

  function handleClick(option: TreeSelectItem) {
    if (opened.includes(option.value)) {
      setOpened((x) => x.filter((y) => y !== option.value));
    } else {
      setOpened((x) => [...x, option.value]);
    }
  }

  function handleSearch(text?: string) {
    if (!props.options) return;
    const newData = nestedSearch(props.options, "label", text);
    setData(newData);
  }

  function handleClear() {
    setSelected([]);
    props.onChange && props.onChange([]);
  }

  let depth = 0;
  return (
    <SelectContainer
      {...props}
      count={selected.length}
      chips={selectedOptions}
      showChips={showChips}
      onClear={handleClear}
      onSearch={handleSearch}
      onRemove={handleChange}
      open={open}
      onOpenChange={(e) => setOpen(e)}
    >
      <ul className={classNames("flex max-h-60 min-h-60 w-full flex-col overflow-y-auto", props.className?.panelBody)}>
        {data?.map((option, index, a) => {
          return (
            <RecursiveSelectItem
              key={index}
              depth={depth}
              opened={opened}
              selected={selected}
              last={index === a.length - 1}
              option={option}
              onChange={handleChange}
              onClick={handleClick}
            />
          );
        })}
      </ul>
    </SelectContainer>
  );
}
