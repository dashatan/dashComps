"use client";

import { Slider } from "@/components/micro/slider";
import { classNames } from "@/utils";
import { useRef, useState } from "react";
import { PERSIAN_LOCALE, TEHRAN_TZ } from "@/components/micro/inputs/date/utils/dateFormatPersian";
import { useFormContext } from "react-hook-form";
import { TrackerState } from "@/components/macro/tracker/utils/types";

export default function TrackerTotalTimeLine() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const state = useFormContext<TrackerState>();
  const activeTotalTimeIndex = state.watch("playerSettings.activeTotalTimeIndex");
  const totalTimes = state.watch("totalTimes") || [];
  const totalTitleTimes = state.watch("totalTitleTimes") || [];

  const [widthVar] = useState(70);
  let width = totalTitleTimes.length * widthVar;

  const containerWidth = scrollContainer.current?.clientWidth;
  if (containerWidth && width < containerWidth) width = containerWidth;

  return (
    <div
      className={classNames(
        "order-5 me-auto h-10 overflow-x-auto overflow-y-hidden rounded-md border border-gray-200 bg-gray-100 dir-ltr",
      )}
    >
      <div ref={scrollContainer} className="relative" style={{ width }}>
        <Slider
          className="cursor-pointer items-start"
          style={{ width, maxWidth: width, height: 42 }}
          trackClassName={classNames("bg-transparent")}
          rangeClassName={classNames("bg-transparent")}
          thumbClassName={classNames(
            "time-slider-thumb rounded-none border-none bg-transparent p-0 flex items-start justify-center",
          )}
          thumbProps={{
            children: (
              <div
                className="flex flex-col items-center justify-start bg-gray-400 opacity-50"
                style={{ width: widthVar, height: 42 }}
              >
                <div className="h-full w-px bg-gray-800 opacity-50"></div>
              </div>
            ),
            style: { width: widthVar },
          }}
          min={0}
          max={totalTimes.length - 1}
          value={[activeTotalTimeIndex]}
          onValueChange={(val) => {
            state.setValue("playerSettings.activeTotalTimeIndex", val[0]);
          }}
        >
          <div
            className={classNames(
              "pointer-events-auto flex w-full justify-start font-main",
              "absolute left-0 top-0 pt-2.5 text-xs",
            )}
          >
            {totalTitleTimes?.map((x, i, a) => {
              return (
                <div key={i} className="flex flex-col items-center justify-end dir-ltr" style={{ width: widthVar }}>
                  <span>
                    {Intl.DateTimeFormat(PERSIAN_LOCALE, {
                      timeZone: TEHRAN_TZ,
                      year: "numeric",
                      month: "2-digit",
                    }).format(x)}
                  </span>
                  <span className="h-2 w-px bg-gray-400"></span>
                </div>
              );
            })}
          </div>
        </Slider>
      </div>
    </div>
  );
}
