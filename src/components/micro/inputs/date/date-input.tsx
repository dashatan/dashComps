import { Calendar, CalendarProps, DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { classNames } from "@/utils";
import { ReactNode, useEffect, useState } from "react";
import { Icon } from "@/components/micro/icons";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import "./styles.css";
import { words } from "@/utils/wordMap";
import TimePicker, { TimeObject } from "./time-picker";
import dateFormatPersian, { timeFormat } from "./utils/dateFormatPersian";
import { X } from "lucide-react";
import Button, { ButtonProps } from "@micro/buttons/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/micro/overlay/dialog";

export interface DateInputProps extends Omit<CalendarProps, "onChange" | "className" | "value"> {
  label?: string;
  onChange?: (value: number[]) => void;
  value?: number[];
  disable?: boolean;
  withTime?: boolean;
  autoClose?: boolean;
  oneLineLabel?: boolean;
  forceLabel?: string | ReactNode;
  className?: { input?: string; content?: string; calendar?: string };
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
  labelContainerProps?: Omit<LabelContainerProps, "hasValue" | "ref">;
  width?: number | string;
  withoutClear?: boolean;
}

export default function DateInput({ width, ...props }: DateInputProps) {
  const [dateObjects, setDateObjects] = useState<DateObject[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [timeObjects, setTimeObjects] = useState<TimeObject[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const w = words.general;

  useEffect(() => {
    if (props.value) {
      setDates(props.value.map((x) => (x ? dateFormatPersian(x, true) : "")));
      setTimes(props.value.map((x) => (x ? timeFormat(x, true) : "")));
    } else {
      setDates([]);
      setTimes([]);
    }
  }, [props.value]);

  function formatDatesToUnix(dates: DateObject[]) {
    return dates.map((x, i) => {
      const t = timeObjects[i];
      if (t) {
        x.hour = t.hour;
        x.minute = t.minute;
        x.second = t.second;
      }
      return x.toUnix() * 1000;
    });
  }

  function handleSubmit() {
    const unixDates = formatDatesToUnix(dateObjects);
    setTimes(unixDates.map((x) => timeFormat(x, true)));
    setDates(unixDates.map((x) => dateFormatPersian(x, true)));
    props.onChange && props.onChange(unixDates);
    setOpen(false);
  }

  function handleClear(withSubmit?: boolean) {
    setDates([]);
    setDateObjects([]);
    setTimes([]);
    setTimeObjects([]);
    withSubmit && handleSubmit();
  }

  function handleCancelation() {
    setOpen(false);
  }

  function handleDateChange(d: DateObject | DateObject[] | null) {
    let res: DateObject[] = [];
    if (d && !Array.isArray(d)) res.push(d);
    if (d && Array.isArray(d)) res = d;
    setDateObjects(res);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger className="w-full">
        <LabelContainer
          hasValue={false}
          message={props.message}
          status={props.status}
          className={{ container: "!h-auto" }}
          {...props.labelContainerProps}
        >
          {props.oneLineLabel ? (
            <div
              onClick={() => setOpen(true)}
              className={classNames(
                "flex h-14 w-full cursor-pointer items-center justify-start px-4 text-base font-medium",
                "border-gray-300",
                props.className?.input,
              )}
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap pl-2 pt-1">
                {!!props.forceLabel ? props.forceLabel : dates?.length ? dates.join(" , ") : props.label}
              </span>
              {(dates[0] || dates[1]) && !props.withoutClear ? (
                <div
                  className="-me-2 ms-auto rounded-full p-1 transition-all hover:bg-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(true);
                  }}
                >
                  <X className="scale-75" />
                </div>
              ) : (
                <Icon icon="Calendar" className="ms-auto scale-125 [&_*]:fill-gray-700" />
              )}
            </div>
          ) : (
            <div className="flex w-full cursor-pointer flex-col" onClick={(e) => setOpen(true)}>
              <div
                className={classNames(
                  "flex h-14 w-full items-center justify-start px-4",
                  "text-base font-medium",
                  "border-gray-300 [&_*]:fill-gray-700",
                  {
                    "border-b": dates[0] || dates[1],
                  },
                  props.className?.input,
                )}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">{props.label}</span>
                {(dates[0] || dates[1]) && !props.withoutClear ? (
                  <div
                    className="-me-2 ms-auto rounded-full p-1 transition-all hover:bg-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear(true);
                    }}
                  >
                    <X className="scale-75" />
                  </div>
                ) : (
                  <Icon icon="Calendar" className="ms-auto scale-125" />
                )}
              </div>
              {!props.range && dates[0] && (
                <div
                  className={classNames("flex w-full items-stretch justify-between", {
                    "[&>div:first-child]:border-e": props.withTime,
                  })}
                >
                  <Item label={w.date} value={dates[0]} />
                  {props.withTime && <Item label={w.time} value={times[0]} />}
                </div>
              )}
              {props.range && !props.withTime && dates[0] && (
                <>
                  <div className="flex w-full items-stretch justify-between [&>div:first-child]:border-l">
                    <Item label={w.fromDate} value={dates[0]} />
                    <Item label={w.toDate} value={dates[1]} />
                  </div>
                </>
              )}
              {props.range && props.withTime && (
                <>
                  {dates[0] && (
                    <div className="flex w-full items-stretch justify-between [&>div:first-child]:border-l">
                      <Item label={w.fromDate} value={dates[0]} />
                      <Item label={w.fromTime} value={times[0]} />
                    </div>
                  )}
                  {dates[1] && (
                    <div className="flex w-full items-stretch justify-between [&>div:first-child]:border-e [&>div]:border-t">
                      <Item label={w.toDate} value={dates[1]} />
                      <Item label={w.toTime} value={times[1]} />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </LabelContainer>
      </DialogTrigger>
      <DialogContent className="max-h-9/12 w-96">
        <div className="flex h-full flex-col overflow-auto bg-white">
          <div className={classNames("flex flex-col items-center justify-center", props.className?.content)}>
            <Calendar
              {...props}
              value={props.range || props.multiple ? dates : dates[0]}
              onChange={handleDateChange}
              calendar={persian}
              locale={persian_fa}
              className={classNames("!shadow-none", props.className?.calendar)}
              monthYearSeparator=","
              weekDays={["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]}
            />
            {props.withTime && !props.range && (
              <div className="flex w-full flex-col items-start justify-center border-t border-gray-300 p-2 px-8">
                <span className="mb-4 text-sm font-medium">{w.time}</span>
                <TimePicker
                  inputClassName={classNames("!w-10 !h-10 !p-0")}
                  withSecond
                  value={times[0]}
                  onChange={({ obj }) => {
                    setTimeObjects((t) => {
                      t[0] = obj;
                      return t;
                    });
                  }}
                />
              </div>
            )}
            {props.withTime && props.range && (
              <div className="flex w-full items-end justify-between gap-1 border-t border-gray-300 p-2 px-8">
                <div className="flex flex-col">
                  <span className="mb-4 text-sm font-medium">{w.fromTime}</span>
                  <TimePicker
                    inputClassName={classNames("!p-0 !w-8 !h-10")}
                    withSecond
                    value={times[0]}
                    onChange={({ obj }) => {
                      setTimeObjects((t) => {
                        t[0] = obj;
                        return t;
                      });
                    }}
                  />
                </div>
                <Icon icon="ArrowLeft" className="h-10 scale-75 [&_*]:stroke-gray-700" />
                <div className="flex flex-col">
                  <span className="mb-4 text-sm font-medium">{w.toTime}</span>
                  <TimePicker
                    inputClassName={classNames("!p-0 !w-8 !h-10")}
                    withSecond
                    value={times[1]}
                    onChange={({ obj }) => {
                      setTimeObjects((t) => {
                        if (!t[0]) {
                          t[0] = obj;
                        }
                        t[1] = obj;
                        return t;
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="sticky bottom-0 mt-auto flex w-full flex-row-reverse items-center justify-start gap-2 border-t border-gray-300 bg-white p-4">
            <FooterButton
              label={w.ok}
              variant="contained"
              severity="primary"
              className="min-w-32 bg-primary-500 hover:bg-primary-600"
              onClick={handleSubmit}
            />
            <FooterButton
              label={w.cancel}
              variant="contained"
              severity="info"
              className="bg-gray-200 text-gray-500 hover:bg-gray-300"
              onClick={handleCancelation}
            />
            <FooterButton
              className="me-auto"
              label={w.remove}
              variant="text"
              severity="danger"
              onClick={() => handleClear()}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Item(props: { label: string; value: string }) {
  return (
    <div id="item" className="flex h-14 w-full flex-col gap-1 border-gray-300 p-2">
      <span className="text-xs">{props.label}</span>
      <span className="text-base font-medium">{props.value}</span>
    </div>
  );
}

function FooterButton(props: ButtonProps) {
  return <Button {...props} className={classNames("h-12 min-w-24 text-base font-normal", props.className)} />;
}
