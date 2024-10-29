import { useEffect, useState } from "react";
import { SelectItem } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";
import EmptyTemplate from "./comps/empty";
import List from "../list";
import { ListItem } from "../list/item";
import { classNames } from "@/utils";

export type SelectProps = Omit<SelectContainerProps, "value"> & {
  options?: SelectItem[];
  value?: string | number;
  defaultValueTitle?: string;
  onChange?: (value?: string | number) => void;
  onReachBottom?: () => void;
  itemTemplate?: (option: any) => React.ReactNode;
  noneVirtualized?: boolean;
  noValueChange?: boolean;
  className?: {
    panelBody?: string;
    panelFooter?: string;
    item?: string;
  };
};

export default function SingleSelect({ options, onChange, onReachBottom, ...props }: SelectProps) {
  const [data, setData] = useState(options);
  const [value, setValue] = useState<string | number | undefined>(props.value);
  const [open, setOpen] = useState(false);
  const option = data?.find((x) => x.value === value);
  const val = option?.label || props.defaultValueTitle;

  useEffect(() => {
    setData(options);
  }, [options]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleChange(option: SelectItem) {
    if (option.disabled) return;
    setOpen(false);
    const newVal = value === option.value ? undefined : option.value;
    if (!props.noValueChange) setValue(newVal);
    onChange && onChange(newVal);
  }

  function handleSearch(text?: string) {
    if (text) {
      const newData = options?.filter((item) => `${item.label}`.includes(text));
      setData(newData);
    } else {
      setData(options);
    }
  }

  function handleClear() {
    onChange && onChange();
  }
  return (
    <SelectContainer
      onSearch={handleSearch}
      onClear={handleClear}
      {...props}
      value={val}
      open={open}
      onOpenChange={(e) => setOpen(e)}
    >
      {data?.length ? (
        !props.noneVirtualized ? (
          <List
            onChange={handleChange}
            onReachBottom={onReachBottom}
            itemTemplate={props.itemTemplate}
            itemClassName={props.className?.item}
            className={props.className?.panelBody}
            data={data}
            value={value}
            loading={props.loading}
          />
        ) : (
          data.map((item, i) => {
            const template = props.itemTemplate ? props.itemTemplate(item) : undefined;
            return (
              <div key={i}>
                <ListItem
                  {...item}
                  active={value === item.value}
                  onChange={() => handleChange(item)}
                  className={classNames(item.className, props.className?.item)}
                  template={template}
                />
              </div>
            );
          })
        )
      ) : (
        <EmptyTemplate />
      )}
    </SelectContainer>
  );
}
