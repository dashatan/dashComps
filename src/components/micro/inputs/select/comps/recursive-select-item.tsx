import { classNames } from "@/utils";
import { TreeSelectItem } from "../types";
import { Icon } from "@/components/micro/icons";
import Checkbox from "../../checkbox/checkbox";
import { flattenData } from "../multiple-tree";
import { useMemo } from "react";

type Props = {
  selected: (number | string)[];
  opened: (number | string)[];
  onClick: (option: TreeSelectItem) => void;
  option: TreeSelectItem;
  onChange: (option: TreeSelectItem, active: boolean) => void;
  depth: number;
  last?: boolean;
  first?: boolean;
};

export function RecursiveSelectItem({ opened, selected, option, onClick, onChange, depth, last }: Props) {
  const hasChildren = !!option.children?.length;
  const allChildren = useMemo(() => (option.children ? flattenData(option.children) : []), [option]);
  const allChildrenChecked = useMemo(
    () => allChildren.filter((x) => x.last).every((x) => selected.includes(x.value)),
    [selected]
  );
  const someChildrenChecked = useMemo(
    () => allChildren.filter((x) => x.last).some((x) => selected.includes(x.value)),
    [selected]
  );
  let active = hasChildren ? allChildrenChecked : selected.includes(option.value);
  let halfChecked = hasChildren && someChildrenChecked && !allChildrenChecked;
  const open = opened.includes(option.value);
  if (hasChildren) {
    active;
  }
  depth++;
  return (
    <li>
      <div
        className={classNames("flex items-center py-2 relative", {
          "cursor-pointer": hasChildren,
        })}
        onClick={(e) => {
          if (!hasChildren) return;
          e.stopPropagation();
          onClick(option);
        }}
      >
        {depth > 1 && <div className="h-px bg-slate-300 w-8" />}
        {depth > 1 && (
          <div
            className={classNames("h-full w-px bg-slate-300 absolute top-0 right-0", {
              "!h-1/2": last,
            })}
          />
        )}
        <span className="min-w-8 w-8 max-w-8">
          {hasChildren && (
            <Icon
              icon="ArrowDown"
              className={classNames("transition-all scale-75 [&_*]:fill-slate-500", { "rotate-90": !open })}
            />
          )}
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            withoutTitle
            className={{ container: "!w-10", iconContainer: "!m-0" }}
            active={active}
            halfChecked={halfChecked}
            onChange={(a) => onChange(option, a)}
          />
        </div>
        <div className={classNames("flex items-center w-full justify-between select-none")}>
          <span>{option.label}</span>
        </div>
      </div>
      {hasChildren && open && (
        <ul className={classNames("flex flex-col px-4 relative", { "pr-9": depth > 1 })}>
          {depth > 1 && !last && <div className={classNames("h-full w-px bg-slate-300 absolute top-0 right-0")} />}
          {option.children?.map((child, index, a) => {
            return (
              <RecursiveSelectItem
                key={index}
                opened={opened}
                depth={depth}
                selected={selected}
                last={index === a.length - 1}
                option={child}
                onChange={onChange}
                onClick={onClick}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}
