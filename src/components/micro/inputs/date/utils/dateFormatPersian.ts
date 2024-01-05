export default function dateFormatPersian(date?: number | Date) {
  if (!date) return "";
  return Intl.DateTimeFormat("fa-IR-u-nu-latn", { dateStyle: "short" }).format(date);
}

export function timeFormat(date?: number | Date) {
  if (!date) return "";
  return Intl.DateTimeFormat("fa-IR-u-nu-latn", { hour: "numeric", minute: "numeric", second: "numeric" }).format(date);
}

export function addDays(date: string, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toString();
}

export const PERSIAN_LOCALE = "fa-IR-u-nu-latn";
