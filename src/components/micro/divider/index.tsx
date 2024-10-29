import { classNames } from "@/utils";

export function Divider(props: DIV) {
  return <div {...props} className={classNames("my-4 min-h-px w-full bg-slate-200", props.className)} />;
}
