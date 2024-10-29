import { actionButtonClassNames } from "@/components/macro/tracker/utils/classes";
import { PERSIAN_LOCALE, TEHRAN_TZ } from "@/components/micro/inputs/date/utils/dateFormatPersian";
import { classNames } from "@/utils";
import { Pause, Play, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/micro/slider";
import { useFormContext } from "react-hook-form";
import { TrackerState } from "@/components/macro/tracker/utils/types";
import TrackerTotalTimeLine from "@/components/macro/tracker/comps/player/total-timeline";

export default function TrackerControls() {
  const state = useFormContext<TrackerState>();
  const speed = state.watch("playerSettings.speed");
  const activeTimeIndex = state.watch("playerSettings.activeTimeIndex");
  const showSettings = state.watch("showSettings");
  const times = state.watch("times") || [];

  const DateButtonRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const settingButtonRef = useRef<HTMLDivElement>(null);
  const activeTime = times[activeTimeIndex];

  const [play, setPlay] = useState<boolean>();

  useEffect(() => {
    let i = activeTimeIndex;
    if (!play) return;
    const interval = setInterval(() => {
      i = i + (speed > 10 ? speed : 1);
      const newTimeIndex = i < times.length ? i : times.length;

      state.setValue("playerSettings.activeTimeIndex", newTimeIndex);
    }, 100 / speed);
    return () => {
      clearInterval(interval);
    };
  }, [play, speed, times]);

  return (
    <section id="control" className="flex w-full select-none items-center gap-2 px-4">
      <div
        ref={playButtonRef}
        className={classNames(actionButtonClassNames, "order-1")}
        onClick={() => setPlay((x) => !x)}
      >
        {!play ? (
          <Play className="w-4 fill-gray-600 text-gray-600" />
        ) : (
          <Pause className="w-4 fill-gray-600 text-gray-600" />
        )}
      </div>
      <div
        ref={DateButtonRef}
        className={classNames(actionButtonClassNames, "order-2 min-w-32 px-2 font-main text-xs")}
      >
        {Intl.DateTimeFormat(PERSIAN_LOCALE, {
          timeZone: TEHRAN_TZ,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(activeTime)}
      </div>
      <div className={classNames(actionButtonClassNames, "order-3 flex min-w-48 gap-2 px-2 font-main text-xs")}>
        <span>1x</span>
        <Slider
          min={1}
          max={1000}
          step={1}
          defaultValue={[speed]}
          onValueChange={(val) => state.setValue("playerSettings.speed", val[0])}
          className="w-full"
        />
        <span>1000x</span>
      </div>
      <div
        ref={settingButtonRef}
        className={classNames(actionButtonClassNames, "order-4")}
        onClick={() => state.setValue("showSettings", !showSettings)}
      >
        <Settings className="w-5" />
      </div>
      <TrackerTotalTimeLine />
    </section>
  );
}
