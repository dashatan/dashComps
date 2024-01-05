import { classNames } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { SelectItem } from "./types";
import SelectContainer, { SelectContainerProps } from "./container";
import EmptyTemplate from "./comps/empty";

export type SelectProps = Omit<SelectContainerProps, "value"> & {
  options?: SelectItem[];
  value?: string | number;
  defaultValueTitle?: string;
  onChange?: (value?: string | number) => void;
  onReachBottom?: () => void;
  itemTemplate?: (option: any) => React.ReactNode;
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

  function handleChange(value?: string | number) {
    setOpen(false);
    setValue(value);
    onChange && onChange(value);
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
      {...props}
      onSearch={handleSearch}
      onClear={handleClear}
      value={val}
      open={open}
      onOpenChange={(e) => setOpen(e)}
    >
      {data?.length ? (
        <Items
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
        <EmptyTemplate />
      )}
    </SelectContainer>
  );
}

function Item({
  label,
  value,
  onChange,
  active,
  className,
}: SelectItem & { onChange: (value?: string | number) => void; active: boolean }) {
  return (
    <li
      className={classNames(
        "p-4 cursor-pointer font-medium text-gray-600",
        {
          "bg-primary-100": active,
          "bg-gray-50 hover:bg-gray-200": !active,
        },
        className
      )}
      onClick={() => onChange(active ? undefined : value)}
    >
      {label}
    </li>
  );
}

function Items({
  value,
  onChange,
  onReachBottom,
  className,
  data,
  loading,
  itemTemplate,
  itemClassName,
}: {
  onChange: (value?: string | number) => void;
  onReachBottom?: () => void;
  itemTemplate?: (option: SelectItem) => React.ReactNode;
  data?: SelectItem[];
  className?: string;
  itemClassName?: string;
  value?: string | number;
  loading?: boolean;
}) {
  const activeEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeEl.current?.scrollIntoView({ block: "nearest" });
  }, [activeEl]);

  function handleScroll(e: any) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottom = scrollHeight - scrollTop === clientHeight;
    if (bottom && !loading) {
      onReachBottom && onReachBottom();
    }
  }

  return (
    <ul onScroll={handleScroll} className={classNames("flex flex-col max-h-80 overflow-y-auto w-full", className)}>
      {data?.map((option, index) => {
        const active = value === option.value;
        return (
          <div key={index} ref={(el) => active && (activeEl.current = el)}>
            {itemTemplate ? (
              itemTemplate(option)
            ) : (
              <Item
                {...option}
                onChange={onChange}
                active={active}
                className={classNames(option.className, itemClassName)}
              />
            )}
          </div>
        );
      })}
      {loading && (
        <li className="flex items-center justify-center p-4 bg-gray-50">
          <Loader2 className="text-gray-400 animate-spin" />
        </li>
      )}
    </ul>
  );
}
