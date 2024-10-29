import { classNames } from "@/utils";
import { words } from "@/utils/words";

export default function StatusElement({ text }: { text?: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-1 dir-ltr">
      <span>
        {text === "ok"
          ? words.ACCEPTABLE
          : text === "warning"
            ? words.WARNING
            : text === "critical"
              ? words.CRITICAL
              : ""}
      </span>
      <span
        className={classNames("h-2 w-2 rounded-full", {
          "bg-success-500": text === "ok",
          "bg-warning-500": text === "warning",
          "bg-error-500": text === "critical",
        })}
      />
    </div>
  );
}
