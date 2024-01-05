import { classNames } from "@/utils";
import { useState } from "react";
import { Icon } from "@/components/micro/icons";
import { Dialog } from "primereact/dialog";
import { words } from "@/utils/wordMap";
import MapMain from "./map-main";
import LabelContainer, { LabelContainerProps } from "../label/labelContainer";
import MapSidebar from "./sidebar";

export type mapInputProps = {
  label?: string;
  onChange?: (value?: Date[]) => void;
  value?: Date[];
  disable?: boolean;
  autoClose?: boolean;
  className?: { input?: string; content?: string; calendar?: string };
  labelContainerProps?: Omit<LabelContainerProps, "hasValue" | "ref">;
  width?: string | number;
};

export default function MapInput({ width, ...props }: mapInputProps) {
  const [open, setOpen] = useState(false);
  const w = words.general;

  return (
    <div className="w-full" style={{ width }}>
      <LabelContainer hasValue={false} className={{ container: "!h-auto" }} {...props.labelContainerProps}>
        <div className="flex flex-col w-full cursor-pointer " onClick={(e) => setOpen(true)}>
          <div
            className={classNames(
              "flex items-center justify-start w-full h-14 px-4",
              "font-medium text-base",
              "[&_*]:fill-gray-700 border-gray-300",

              props.className?.input
            )}
          >
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">{props.label}</span>
            <Icon icon="ArrowDown" className="mr-auto scale-75" />
          </div>
        </div>
      </LabelContainer>
      <Dialog
        onHide={() => setOpen(false)}
        visible={open}
        dismissableMask
        header={props.label}
        headerClassName="!rounded-t-2xl border-b"
        contentClassName="!rounded-b-2xl !p-0"
        className="h-[90%] max-w-[90%] !aspect-video !w-auto"
      >
        <div className={classNames("w-full h-full relative", props.className?.content)}>
          <MapMain />
          <MapSidebar />
        </div>
      </Dialog>
    </div>
  );
}
