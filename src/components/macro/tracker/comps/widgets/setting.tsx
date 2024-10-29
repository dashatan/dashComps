import { X } from "lucide-react";
import Switch from "@/components/micro/inputs/switch/switch";
import DateInput from "@/components/micro/inputs/date/date-input";
import { useFormContext, useWatch } from "react-hook-form";
import { TrackerState } from "@/components/macro/tracker/utils/types";

export default function TrackerSetting() {
  const state = useFormContext<TrackerState>();
  const { playerSettings, dates } = useWatch<TrackerState>();

  return (
    <div className="animate-fade animate-duration-300 absolute left-5 top-5 z-50 flex w-80 flex-col overflow-auto rounded-md bg-gray-50 p-4 dir-rtl">
      <div id="header" className="mb-4 flex h-10 w-full items-center justify-between border-b border-gray-200 pb-2">
        <span className="flex h-6 items-start text-lg font-bold text-gray-500">تنظیمات</span>
        <div
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            state.setValue("showSettings", false);
          }}
        >
          <X className="w-5 text-gray-500" />
        </div>
      </div>

      <div id="body" className="flex flex-col gap-4">
        {/* ------------------------------- time range ------------------------------- */}
        <div className="flex w-full items-center justify-between gap-2">
          <span className="whitespace-nowrap font-semibold text-gray-500">تعیین بازه زمانی:</span>
          <DateInput
            className={{ input: "h-10 w-full bg-gray-50 text-[11px]" }}
            width={160}
            oneLineLabel
            range
            value={dates}
            onChange={(value) => state.setValue("dates", value)}
          />
        </div>

        {/* ------------------------------ follow count ------------------------------ */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">تعداد دنباله ها:</span>
          <input
            min={"0"}
            max={"20"}
            className="h-10 w-20 rounded-md border border-gray-300 px-2 text-gray-700"
            onChange={(e) => state.setValue("playerSettings.traceCount", parseFloat(e.target.value))}
            type="number"
            value={playerSettings?.traceCount}
          />
        </div>

        {/* ---------------------------------- zoom ---------------------------------- */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">میزان زوم:</span>
          <input
            min={"0"}
            max={"20"}
            className="h-10 w-20 rounded-md border border-gray-300 px-2 text-gray-700"
            onChange={(e) => state.setValue("playerSettings.zoom", parseFloat(e.target.value))}
            type={"text"}
            value={playerSettings?.zoom}
          />
        </div>

        {/* -------------------------------- auto zoom ------------------------------- */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">زوم خودکار:</span>
          <Switch active={playerSettings?.autoZoom} onChange={(a) => state.setValue("playerSettings.autoZoom", a)} />
        </div>

        {/* ---------------------------- show whole route ---------------------------- */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">نمایش کل مسیر:</span>
          <Switch
            active={playerSettings?.showAllRoutes}
            onChange={(a) => state.setValue("playerSettings.showAllRoutes", a)}
          />
        </div>

        {/* ------------------------------- show space ------------------------------- */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">پیش نمایش فضای پیمایش:</span>
          <Switch active={playerSettings?.showSpace} onChange={(a) => state.setValue("playerSettings.showSpace", a)} />
        </div>

        {/* -------------------------------- auto move ------------------------------- */}
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-500">جابه‌جایی نقشه با متحرک:</span>
          <Switch active={playerSettings?.autoMove} onChange={(a) => state.setValue("playerSettings.autoMove", a)} />
        </div>
      </div>
    </div>
  );
}
