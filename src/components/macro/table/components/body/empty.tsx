import { Icon } from "@/components/micro/icons";
import { H2 } from "@/components/micro/typography";
import { SearchX } from "lucide-react";

export default function EmptyTemplate() {
  return (
    <div className="w-full min-h-96 flex flex-col items-center justify-center">
      <div className="p-10 rounded-full flex">
        <Icon icon="NoResult" />
      </div>
      <span className="text-gray-500 text-xl font-semibold">متاسفانه نتیجه‌ای یافت نشد...</span>
    </div>
  );
}
