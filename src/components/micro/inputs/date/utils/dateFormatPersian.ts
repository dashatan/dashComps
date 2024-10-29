export const PERSIAN_LOCALE = "fa-IR-u-nu-latn";
export const TEHRAN_TZ = "Asia/Tehran";

export default function dateFormatPersian(date?: number | Date, noTimezone?: boolean) {
  if (!date || (typeof date !== "number" && !(date instanceof Date))) return "";
  return Intl.DateTimeFormat(PERSIAN_LOCALE, {
    dateStyle: "short",
    timeZone: !noTimezone ? TEHRAN_TZ : undefined,
  }).format(date);
}

export function timeFormat(date?: number | Date, noTimezone?: boolean) {
  if (!date || (typeof date !== "number" && !(date instanceof Date))) return "";
  return Intl.DateTimeFormat(PERSIAN_LOCALE, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: !noTimezone ? TEHRAN_TZ : undefined,
  }).format(date);
}

export function addDays(date: string | Date | number, days: number) {
  var result = newTehranTZDate(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subDays(date: string | Date | number, days: number) {
  var result = newTehranTZDate(date);
  result.setDate(result.getDate() - days);
  return result;
}

export function subHours(date: string | Date | number, hours: number) {
  var result = newTehranTZDate(date);
  result.setTime(result.getTime() - hours * 3600000);
  return result;
}

export function daysAgo(date?: Date) {
  if (!date) return undefined;
  const d = new Date();
  const now = changeTimezone(d, TEHRAN_TZ);
  let Difference_In_Time = now.getTime() - date.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

export function daysDiff(dates?: (number | Date)[]) {
  if (!dates) return undefined;
  const from = newTehranTZDate(dates[0]);
  const to = newTehranTZDate(dates[1]);
  let Difference_In_Time = to.getTime() - from.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

export function changeTimezone(date: Date, tz: string) {
  var invDate = new Date(
    date.toLocaleString("en-US", {
      timeZone: tz,
    }),
  );

  var diff = date.getTime() - invDate.getTime();

  return new Date(date.getTime() - diff);
}

export function newTehranTZDate(defaultDate?: number | Date | string) {
  const date = defaultDate ? new Date(defaultDate) : new Date();
  var invDate = new Date(
    date.toLocaleString("en-US", {
      timeZone: TEHRAN_TZ,
    }),
  );

  var diff = date.getTime() - invDate.getTime();

  return new Date(date.getTime() - diff);
}

export function timeSecondClear(date?: number | Date | string) {
  let d = newTehranTZDate(date);
  d.setSeconds(0);
  return d;
}
export function timeHourClear(date?: number | Date | string) {
  let d = newTehranTZDate(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
}
