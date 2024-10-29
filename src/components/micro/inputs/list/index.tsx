import { classNames } from "@/utils";
import { ListItem } from "./item";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { SelectItem } from "../select/types";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

export type ListProps = {
  onChange?: (option: SelectItem) => void;
  onReachBottom?: () => void;
  itemTemplate?: (option: SelectItem) => React.ReactNode;
  data?: SelectItem[];
  className?: string;
  itemClassName?: string;
  value?: string | number;
  loading?: boolean;
};

export default function List(props: ListProps) {
  const { value, onChange, onReachBottom, className, data, loading, itemTemplate, itemClassName } = props;
  const activeEl = useRef<HTMLDivElement | null>(null);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const active = data?.findIndex((x) => x.value === value);

  return (
    <ul className={classNames("flex flex-col h-60 overflow-y-auto w-full", className)}>
      <Virtuoso
        data={!loading ? data : [...(data || []), { value: "loading", label: "loading" }]}
        ref={virtuoso}
        initialTopMostItemIndex={{ index: active !== undefined && active >= 0 ? active : 0, align: "end" }}
        endReached={() => !loading && onReachBottom && onReachBottom()}
        style={{ height: "100%" }}
        itemContent={(index, option) => {
          const active = value === option.value;
          if (option.value === "loading") {
            return (
              <li className="flex items-center justify-center p-4 bg-gray-100">
                <Loader2 className="text-gray-400 animate-spin" />
              </li>
            );
          }
          return (
            <div key={index} ref={(el) => active && (activeEl.current = el)}>
              {itemTemplate ? (
                itemTemplate(option)
              ) : (
                <ListItem
                  {...option}
                  onChange={() => onChange && onChange(option)}
                  active={active}
                  className={classNames(option.className, itemClassName)}
                />
              )}
            </div>
          );
        }}
      />
    </ul>
  );
}
