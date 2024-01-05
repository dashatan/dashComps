import Button from "@/components/micro/buttons/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  message?: string;
  timer?: number;
  onUndo?: () => void;
  onClose?: () => void;
}

export default function Undo(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-md p-4 gap-2 relative overflow-hidden">
      <span className="font-semibold text-gray-100">{props.message}</span>
      <div className="flex gap-2 items-center">
        <Button variant="text" label="بازگردانی" onClick={props.onUndo} />
        <X className="w-10 cursor-pointer text-gray-100" onClick={props.onClose} />
        {props.timer && (
          <div
            className="bg-primary-400 h-1 transition-all ease-linear absolute bottom-0 left-0"
            style={{ width: mounted ? "100%" : 0, transitionDuration: `${props.timer}ms` }}
          ></div>
        )}
      </div>
    </div>
  );
}
