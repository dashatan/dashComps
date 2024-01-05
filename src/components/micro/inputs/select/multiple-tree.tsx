import { classNames } from "@/utils";
import { useState } from "react";
import { SelectItem, TreeSelectItem } from "./types";
import { RecursiveSelectItem } from "./comps/recursive-select-item";
import SelectContainer, { SelectContainerProps } from "./container";

export type MultiSelectTreeProps = SelectContainerProps & {
  options?: TreeSelectItem[];
  onChange?: (event: { value: any }) => void;
  value?: any;
  selected?: any[];
  className?: {
    panelBody?: string;
  };
};

export default function MultiSelectTree(props: MultiSelectTreeProps) {
  const [selected, setSelected] = useState<(number | string)[]>(props.selected || []);
  const [opened, setOpened] = useState<(number | string)[]>(props.selected || [0]);
  const [data, setData] = useState<TreeSelectItem[] | undefined>(props.options);
  const showChips = selected.length > 0 && props.showChips;
  const flatData = flattenData(props.options || []);
  const selectedOptions = flatData?.filter((x) => selected.includes(x.value));

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
    props.onChange && props.onChange({ value: newSelected });
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
    if (text) {
      const newData = props.options?.flatMap((option) => searchChildren(text, option));
      setData(newData);
    } else {
      setData(props.options);
    }
    function searchChildren(text: string, option: TreeSelectItem) {
      let hasText = `${option.label}`.includes(text);
      if (hasText) return option;
      if (!hasText && option.children?.length) {
        const children = option.children.flatMap((child) => searchChildren(text, child));
        const res: TreeSelectItem = { ...option, children };
        if (!children?.length) return [];
        else return res;
      }
      return [];
    }
  }

  function handleClear() {
    setSelected([]);
    props.onChange && props.onChange({ value: [] });
  }

  let depth = 0;
  return (
    <SelectContainer
      {...props}
      onRemove={handleChange}
      onRemoveAll={() => setSelected([])}
      count={selected.length}
      chips={selectedOptions}
      showChips={showChips}
      onClear={handleClear}
      onSearch={handleSearch}
    >
      <ul
        className={classNames(
          "flex flex-col max-h-[350px] min-h-[350px] overflow-y-auto w-full",
          props.className?.panelBody
        )}
      >
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

export function flattenData(data: TreeSelectItem[]) {
  const newData: (SelectItem & { parentId?: string | number; last?: boolean })[] = [];
  for (const option of data) {
    const o = { ...option, last: !option.children?.length };
    delete o.children;
    newData.push(o);
    recursive(option);
  }
  function recursive(option: TreeSelectItem) {
    if (!option.children?.length) return;
    for (const child of option.children) {
      const c = { ...child, parentId: option.value, last: !child.children?.length };
      delete c.children;
      newData.push(c);
      if (child.children?.length) recursive(child);
    }
  }
  return newData;
}
