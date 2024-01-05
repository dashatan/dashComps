import { Calendar, CalendarProps, DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { classNames } from "@/utils";
import { useEffect, useState } from "react";
import { Icon } from "@/components/micro/icons";
import { Dialog } from "primereact/dialog";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import "./styles.css";
import Button from "../../buttons/button";
import { words } from "@/utils/wordMap";
import TimePicker, { TimeObject } from "./time-picker";
import dateFormatPersian, { timeFormat } from "./utils/dateFormatPersian";

export interface DateInputProps extends Omit<CalendarProps, "onChange" | "className"> {
  label?: string;
  onChange?: (value?: Date[]) => void;
  value?: Date[];
  disable?: boolean;
  withTime?: boolean;
  autoClose?: boolean;
  oneLineLabel?: boolean;
  className?: { input?: string; content?: string; calendar?: string };
  status?: LabelContainerProps["status"];
  message?: LabelContainerProps["message"];
  labelContainerProps?: Omit<LabelContainerProps, "hasValue" | "ref">;
  width?: number | string;
}

export default function DateInput({ width, ...props }: DateInputProps) {
  const [dateObjects, setDateObjects] = useState<DateObject[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [timeObjects, setTimeObjects] = useState<TimeObject[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const w = words.general;

  function formatDates(dates: DateObject[]) {
    return dates.map((x, i) => {
      const t = timeObjects[i];
      if (t) {
        x.hour = t.hour;
        x.minute = t.minute;
        x.second = t.second;
      }
      return x.toDate();
    });
  }

  useEffect(() => {
    if (props.value) {
      setDates(props.value.map((x) => (x instanceof Date ? dateFormatPersian(x) : "")));
      setTimes(props.value.map((x) => (x instanceof Date ? timeFormat(x) : "")));
    }
  }, [props.value]);

  return (
    <div className="w-full" style={{ width }}>
      <LabelContainer
        hasValue={false}
        message={props.message}
        status={props.status}
        className={{ container: "!h-auto" }}
        {...props.labelContainerProps}
      >
        {props.oneLineLabel ? (
          <div
            onClick={(e) => setOpen(true)}
            className={classNames(
              "flex items-center justify-start w-full h-14 px-4 cursor-pointer font-medium text-base",
              "[&_*]:fill-gray-700 border-gray-300",
              props.className?.input
            )}
          >
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {dates?.length ? dates.join(", ") : props.label}
            </span>
            <Icon icon="Calendar" className="mr-auto scale-125" />
          </div>
        ) : (
          <div className="flex flex-col w-full cursor-pointer " onClick={(e) => setOpen(true)}>
            <div
              className={classNames(
                "flex items-center justify-start w-full h-14 px-4",
                "font-medium text-base",
                "[&_*]:fill-gray-700 border-gray-300",
                {
                  "border-b": dates[0] || dates[1],
                },
                props.className?.input
              )}
            >
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">{props.label}</span>
              <Icon icon="Calendar" className="mr-auto scale-125" />
            </div>
            {!props.range && dates[0] && (
              <div
                className={classNames("flex items-stretch justify-between w-full", {
                  "[&>div:first-child]:border-l": props.withTime,
                })}
              >
                <Item label={w.date} value={dates[0]} />
                {props.withTime && <Item label={w.time} value={times[0]} />}
              </div>
            )}
            {props.range && !props.withTime && dates[0] && (
              <>
                <div className="flex items-stretch justify-between w-full [&>div:first-child]:border-l">
                  <Item label={w.fromDate} value={dates[0]} />
                  <Item label={w.toDate} value={dates[1]} />
                </div>
              </>
            )}
            {props.range && props.withTime && (
              <>
                {dates[0] && (
                  <div className="flex items-stretch justify-between w-full [&>div:first-child]:border-l">
                    <Item label={w.fromDate} value={dates[0]} />
                    <Item label={w.fromTime} value={times[0]} />
                  </div>
                )}
                {dates[1] && (
                  <div className="flex items-stretch justify-between w-full [&>div:first-child]:border-l [&>div]:border-t">
                    <Item label={w.toDate} value={dates[1]} />
                    <Item label={w.toTime} value={times[1]} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </LabelContainer>
      <Dialog
        onHide={() => setOpen(false)}
        visible={open}
        dismissableMask
        header={props.label}
        headerClassName="!rounded-t-2xl border-b "
        contentClassName="!p-0 !rounded-b-2xl"
        className="!max-w-[350px]"
      >
        <div
          className={classNames(
            "flex flex-col items-center justify-center w-[350px] min-h-[350px]",
            props.className?.content
          )}
        >
          <Calendar
            {...props}
            value={props.range || props.multiple ? dates : dates[0]}
            onChange={(d) => {
              let res: DateObject[] = [];
              if (d && !Array.isArray(d)) res.push(d);
              if (d && Array.isArray(d)) res = d;
              setDateObjects(res);
            }}
            calendar={persian}
            locale={persian_fa}
            className={classNames("!shadow-none", props.className?.calendar)}
            monthYearSeparator=","
            weekDays={["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]}
          />
          {props.withTime && !props.range && (
            <div className="flex flex-col items-start justify-center w-full p-2 px-8 border-t border-gray-300">
              <span className="mb-4 text-sm font-medium ">{w.time}</span>
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
            <div className="flex items-end justify-center w-full gap-1 p-2 px-8 border-t border-gray-300">
              <div className="flex flex-col">
                <span className="mb-4 text-sm font-medium ">{w.fromTime}</span>
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
              <Icon icon="ArrowLeft" className="h-10 [&_*]:stroke-gray-700 scale-75" />
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
        <div className="flex items-center justify-start w-full gap-2 p-4 mt-4 border-t border-gray-300">
          <Button
            label={w.ok}
            variant="text"
            onClick={() => {
              const final = formatDates(dateObjects);
              setTimes(final.map((x) => timeFormat(x)));
              setDates(final.map((x) => dateFormatPersian(x)));
              props.onChange && props.onChange(final);
              setOpen(false);
            }}
          />
          <Button
            label={w.cancel}
            variant="text"
            severity="info"
            onClick={() => {
              setOpen(false);
            }}
          />
          <Button
            className="mr-auto"
            label={w.remove}
            variant="text"
            severity="danger"
            onClick={() => {
              setDates([]);
              setDateObjects([]);
              setTimes([]);
              setTimeObjects([]);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

function Item(props: { label: string; value: string }) {
  return (
    <div id="item" className="flex flex-col w-full gap-1 p-2 border-gray-300 h-14">
      <span className="text-xs">{props.label}</span>
      <span className="text-base font-medium">{props.value}</span>
    </div>
  );
}
