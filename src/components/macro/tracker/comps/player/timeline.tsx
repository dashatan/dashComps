"use client";

import { Slider } from "@/components/micro/slider";
import { classNames } from "@/utils";
import { useMemo, useRef, useState } from "react";
import { daysDiff, PERSIAN_LOCALE, TEHRAN_TZ } from "@/components/micro/inputs/date/utils/dateFormatPersian";
import { useFormContext } from "react-hook-form";
import { TrackerState } from "@/components/macro/tracker/utils/types";
import { df, getWidthVar } from "@/components/macro/tracker/utils/remap";

export default function TrackerTimeLine() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const state = useFormContext<TrackerState>();
  const activeTimeIndex = state.watch("playerSettings.activeTimeIndex");
  const dates = state.watch("dates");
  const mappedTracks = state.watch("mappedTracks");
  const times = state.watch("times") || [];
  const titleTimes = state.watch("titleTimes") || [];
  const resolution = state.watch("playerSettings.resolution");

  const defaultWidthVar = getWidthVar(daysDiff(dates));
  const [widthVar, setWidthVar] = useState(defaultWidthVar);
  let width = titleTimes.length * widthVar;

  const containerWidth = scrollContainer.current?.clientWidth;
  if (containerWidth && width < containerWidth) width = containerWidth;

  const renderEvents = useMemo(() => {
    return (
      <div
        className="flex flex-col"
        style={{ paddingLeft: widthVar / 2, paddingRight: widthVar / 2, width: `calc(100% - ${widthVar})` }}
      >
        {mappedTracks?.map((track, i) => {
          return (
            <div key={i} className="flex h-10 w-full">
              {track.points?.map((tp, j, a) => {
                const hasEvent = tp.hasEvent;
                return (
                  <div key={j} className="flex w-full items-center justify-center">
                    <div
                      className={classNames("h-1", { "rounded-full bg-primary-600": hasEvent })}
                      style={{ width: widthVar / 60 }}
                    ></div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }, [mappedTracks, widthVar, resolution]);

  return (
    <div ref={scrollContainer} className="relative w-full overflow-x-auto overflow-y-hidden">
      <Slider
        className="w-full cursor-pointer items-start"
        style={{ height: 42 }}
        trackClassName={classNames("bg-transparent")}
        rangeClassName={classNames("bg-transparent")}
        thumbClassName={classNames(
          "time-slider-thumb rounded-none border-none bg-transparent p-0 flex items-start justify-center",
        )}
        thumbProps={{
          children: (
            <div className="flex w-full flex-col items-center justify-start">
              <div className="time-slider-thumb-arrow h-5 w-4 rounded-[4px] bg-primary-600"></div>
              <div
                className="-mt-1 w-0.5 bg-primary-600"
                style={{ height: `${(mappedTracks?.length || 0) * 60 + 24}px` }}
              ></div>
            </div>
          ),
          style: { width: widthVar },
        }}
        min={0}
        max={times.length - 1}
        value={[activeTimeIndex]}
        onValueChange={(val) => {
          state.setValue("playerSettings.activeTimeIndex", val[0]);
        }}
      >
        <div
          className={classNames(
            "pointer-events-auto flex w-full justify-between font-main",
            "absolute left-0 top-0 border-y border-gray-300 bg-gray-100 pt-4 text-xs",
          )}
        >
          {titleTimes?.map((x, i, a) => {
            return (
              <div key={i} className="flex flex-col items-center justify-end" style={{ width: widthVar }}>
                <span>
                  {resolution === 0 &&
                    Intl.DateTimeFormat(PERSIAN_LOCALE, {
                      timeZone: TEHRAN_TZ,
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(x)}
                </span>
                <span className="h-2 w-px bg-gray-400"></span>
              </div>
            );
          })}
        </div>
      </Slider>
      {renderEvents}
    </div>
  );
}
