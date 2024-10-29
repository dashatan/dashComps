import { classNames } from "@/utils";

export default function Skeleton(props: DIV) {
  return <div {...props} className={classNames("h-10 bg-gray-100 w-full rounded-lg", props.className)}></div>;
}
