import { useEffect, useState } from "react";
import { Toast, resolveValue } from "react-hot-toast";
import { classNames } from "@/utils";
import { Check } from "lucide-react";

export default function SuccessToast({ toast }: { toast: Toast }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={classNames(
        "flex items-start justify-between bg-success-50 transition-all",
        "relative max-w-80 gap-2 overflow-hidden rounded-t-md p-4",
        {
          "translate-y-8 scale-75 opacity-0": !toast.visible,
        },
      )}
    >
      <Check className="text-success-500" />
      <span className="font-semibold text-success-500">{resolveValue(toast.message, toast)}</span>
      <div className="flex items-center gap-2">
        <div
          className="absolute bottom-0 right-0 h-1 bg-success-300 transition-all ease-linear"
          style={{ width: mounted ? "100%" : 0, transitionDuration: `5000ms` }}
        ></div>
      </div>
    </div>
  );
}
