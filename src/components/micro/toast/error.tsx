import { useEffect, useState } from "react";
import { Toast, resolveValue } from "react-hot-toast";
import { Icon } from "../icons";

export default function ErrorToast({ toast }: { toast: Toast }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-center justify-between bg-error-50 rounded-t-md p-4 gap-2 relative overflow-hidden">
      <Icon icon="Danger" className="[&_*]:fill-error-500 " />
      <span className="font-semibold text-error-500">{resolveValue(toast.message, toast)}</span>
      <div className="flex gap-2 items-center">
        <div
          className="bg-error-300 h-1 transition-all ease-linear absolute bottom-0 right-0"
          style={{ width: mounted ? "100%" : 0, transitionDuration: `3800ms` }}
        ></div>
      </div>
    </div>
  );
}
