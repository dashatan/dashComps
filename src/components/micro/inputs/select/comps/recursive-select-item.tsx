import { classNames } from "@/utils";
import { TreeSelectItem } from "../types";
import { Icon } from "@/components/micro/icons";
import { flattenData } from "../utils";
import Checkbox from "@inputs/checkbox/checkbox";

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
  const allChildren = option.children ? flattenData(option.children) : [];
  const allChildrenChecked = allChildren.filter((x) => x.last).every((x) => selected.includes(x.value));
  const someChildrenChecked = allChildren.filter((x) => x.last).some((x) => selected.includes(x.value));
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
        className={classNames("relative flex items-center py-2 hover:bg-gray-200", {
          "cursor-pointer": true,
        })}
        onClick={(e) => {
          e.stopPropagation();
          onClick(option);
        }}
      >
        {depth > 1 && <div className="h-px w-8 bg-slate-300" />}
        {depth > 1 && (
          <div
            className={classNames("absolute right-0 top-0 h-full w-px bg-slate-300", {
              "!h-1/2": last,
            })}
          />
        )}
        <span
          className="w-8 min-w-8 max-w-8"
          onClick={(e) => {
            if (!hasChildren) return;
            e.stopPropagation();
            onClick(option);
          }}
        >
          {hasChildren && (
            <Icon
              icon="ArrowDown"
              className={classNames("scale-75 transition-all [&_*]:fill-slate-500", { "rotate-90": !open })}
            />
          )}
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            withoutTitle
            className={{
              container: "me-3 w-auto bg-gray-100",
              iconContainer: "m-0 flex",
            }}
            active={active}
            halfChecked={halfChecked}
            onChange={(a) => onChange(option, a)}
          />
        </div>
        <div className={classNames("flex w-full select-none items-center justify-between")}>
          <span>{option.label}</span>
        </div>
      </div>
      {hasChildren && open && (
        <ul className={classNames("relative flex flex-col px-4", { "pr-9": depth > 1 })}>
          {depth > 1 && !last && <div className={classNames("absolute right-0 top-0 h-full w-px bg-slate-300")} />}
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
