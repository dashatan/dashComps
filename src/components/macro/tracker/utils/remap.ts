import { breakTimes, removeDuplicatesByProperty } from "@/components/macro/tracker/utils";
import { BreakTimeKeys, Track, TrackerState, TrackPoint } from "@/components/macro/tracker/utils/types";
import { addDays, daysDiff, PERSIAN_LOCALE } from "@/components/micro/inputs/date/utils/dateFormatPersian";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const df = Intl.DateTimeFormat(PERSIAN_LOCALE, { dateStyle: "short", timeStyle: "short" });

export function useTrackerRemap() {
  const state = useFormContext<TrackerState>();
  const resolution = state.watch("playerSettings.resolution");
  const dates = state.watch("dates");
  const tracks = state.watch("tracks");
  const activeTotalTimeIndex = state.watch("playerSettings.activeTotalTimeIndex");
  const activeTimeIndex = state.watch("playerSettings.activeTimeIndex");

  const diff = useMemo(() => daysDiff(dates), [dates]);

  const totalTimes = useMemo(() => makeTotalTimes(dates), [dates]);
  const totalTitleTimes = useMemo(() => makeTotalTitleTimes(dates), [dates]);

  const timelineDates = useMemo(
    () => [totalTimes[activeTotalTimeIndex], totalTimes[activeTotalTimeIndex + 1]],
    [activeTotalTimeIndex],
  );
  const times = useMemo(() => makeTimes(timelineDates), [resolution, activeTotalTimeIndex, diff]);
  const titleTimes = useMemo(
    () => makeTitleTimes(resolution, timelineDates, diff),
    [resolution, activeTotalTimeIndex, diff],
  );
  const mappedTracks = useMemo(() => {
    const r = remapTracks(times, tracks);

    return r;
  }, [times, tracks]);

  useEffect(() => {
    if (activeTimeIndex === times.length) {
      state.setValue("playerSettings.activeTimeIndex", 0);
      state.setValue("playerSettings.activeTotalTimeIndex", activeTotalTimeIndex + 1);
    }
  }, [activeTimeIndex]);

  useEffect(() => {
    state.setValue("times", times);
  }, [times]);
  useEffect(() => {
    state.setValue("titleTimes", titleTimes);
  }, [titleTimes]);

  useEffect(() => {
    state.setValue("totalTimes", totalTimes);
  }, [totalTimes]);
  useEffect(() => {
    state.setValue("totalTitleTimes", totalTitleTimes);
  }, [totalTitleTimes]);

  useEffect(() => {
    state.setValue("mappedTracks", mappedTracks);
  }, [mappedTracks]);
}

export function remapTracks(times: number[], tracks?: Track[]) {
  const newTracks = tracks?.map((track, i) => {
    let points = removeDuplicatesByProperty<TrackPoint>(track.points, "time");
    let flag = 0;
    let flaggedPoint = points[flag];
    let flaggedTime = flaggedPoint?.time;

    const newPoints = times?.map((time, j) => {
      let hasEvent = false;
      let assumed = true;
      let stepSize = 1;
      const trigger = points.find((x) => x.time === time);

      if (trigger) {
        flag = flag + 1;
        flaggedPoint = trigger;
        flaggedTime = flaggedPoint?.time;
        stepSize = flaggedPoint?.stepSize || 1;
        hasEvent = true;
        assumed = false;
      }

      return { hasEvent, assumed, ...flaggedPoint, time };
    });
    return { ...track, points: newPoints };
  });
  return newTracks;
}

// times that represent of track points on timeline
export function makeTimes(dates?: number[]) {
  const times = breakTimes({ dates: dates || [], into: "minutes" });
  return times;
}
// times that represent of total date range availabel
export function makeTotalTimes(dates?: number[]) {
  const times = breakTimes({ dates: dates || [], into: "days" });
  return times;
}

// times that display the indicators of times on timeline
export function makeTitleTimes(resolution: number, dates?: number[], diff?: number) {
  const availableDateRange = getAvailableDateRange(resolution, dates, diff);
  const availableDateRangeDiff = daysDiff(availableDateRange);
  const breakPoint = getTotalTitleTimesBreakPoint(availableDateRangeDiff);
  const times = breakTimes({ dates: availableDateRange || [], into: "hours" });
  return times;
}

// times that display the indicators of times on total timeline
export function makeTotalTitleTimes(dates?: number[]) {
  const availableDateRangeDiff = daysDiff(dates);
  const breakPoint = getTotalTitleTimesBreakPoint(availableDateRangeDiff);
  const times = breakTimes({ dates: dates || [], into: breakPoint });
  return times;
}

export function getAvailableDateRange(resolution: number, dates?: number[], diff?: number) {
  if (!dates || !diff) return dates;
  if (resolution === 0 && diff > 2) return [dates[0], addDays(dates[0], 1).getTime()];
  if (resolution === 1 && diff > 60) return [dates[0], addDays(dates[0], 60).getTime()];
  if (resolution === 2 && diff > 365) return [dates[0], addDays(dates[0], 365).getTime()];
  return dates;
}

export function getTimesBreakPoint(diff?: number): BreakTimeKeys {
  if (!diff) return "days";
  if (diff <= 2) return "minutes";
  if (diff <= 60) return "hours";
  return "days";
}

export function getTitleTimesBreakPoint(diff?: number): BreakTimeKeys {
  if (!diff) return "months";
  if (diff <= 2) return "hours";
  if (diff <= 60) return "days";
  return "months";
}
export function getTotalTitleTimesBreakPoint(diff?: number): BreakTimeKeys {
  if (!diff) return "days";
  if (diff <= 15) return "days";
  if (diff <= 150) return "months";
  return "months";
}

export function getWidthVar(diff?: number): number {
  if (!diff) return 30;
  if (diff <= 2) return 60;
  if (diff <= 60) return 30;
  return 30;
}
