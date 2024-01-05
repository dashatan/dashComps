import { Icon } from "@/components/micro/icons";

export default function EmptyTemplate() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-full flex  h-10 mb-2">
        <Icon icon="NoResult" className="scale-[0.3]" />
      </div>
      <span className="text-gray-500 text-sm font-semibold my-4">متاسفانه نتیجه‌ای یافت نشد...</span>
    </div>
  );
}
