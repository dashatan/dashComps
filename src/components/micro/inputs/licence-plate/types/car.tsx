import Image from "next/image";
import iranFlag from "@/assets/images/iran-flag.png";
import { classNames } from "@/utils";
import Number from "../number";
import Text from "../text";
import { Icon } from "@/components/micro/icons";
import { useEffect, useRef, useState } from "react";
import { PlateInputValue } from "..";
import { plateLetters } from "../letters";

/* ---------------------------------- Types --------------------------------- */
export type CarPlateInputValue = {
  p1?: number;
  p2?: string;
  p3?: number;
  p4?: number;
};

export type CarPlateInputProps = {
  onChange: (val: PlateInputValue) => void;
  values?: PlateInputValue;
  colorCode?: string;
  clear?: boolean;
  onClear?: (clear: boolean) => void;
};

/* ------------------------------ Main Function ----------------------------- */
export default function CarPlate({ onChange, ...props }: CarPlateInputProps) {
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<CarPlateInputValue>(normalizeFrom(props.values || {}));
  const [colorCode, setColorCode] = useState<string | undefined>(props.colorCode);
  const bg = colorCode && colors[colorCode] ? colors[colorCode] : "";
  const bgLight = colorCode && colors[`${colorCode}-light`] ? colors[`${colorCode}-light`] : "bg-gray-100";
  const iconClass = colorCode && iconColors[colorCode] ? iconColors[colorCode] : "";
  const borderClass = colorCode && borderColors[colorCode] ? borderColors[colorCode] : "";

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    if (props.clear) {
      setValues({});
      setColorCode(undefined);
      props.onClear && props.onClear(false);
    }
  }, [props.clear]);

  useEffect(() => {
    if (props.values) {
      setValues(normalizeFrom(props.values));
      const code = plateLetters.persianLetters.find((x) => x.letter === props.values?.p3)?.colorCode;
      setColorCode(code);
    }
  }, [props.values]);

  /* -------------------------------- Functions ------------------------------- */
  function handleFinish(
    key: keyof CarPlateInputValue,
    val: string | number,
    nextRef?: React.RefObject<HTMLInputElement>
  ) {
    nextRef?.current?.select();
    const newVal = { ...values, [key]: val };
    setValues(newVal);
    onChange(normalizeTo(newVal));
  }

  function handleChange(key: keyof CarPlateInputValue, val?: string | number) {
    const newVal = { ...values, [key]: val };
    setValues(newVal);
    onChange(normalizeTo(newVal));
  }

  /* ----------------------------------- JSX ---------------------------------- */
  return (
    <div
      className={classNames("flex w-[335px] overflow-hidden", "border border-gray-800 h-full rounded-lg dir-ltr", bg)}
    >
      <div className="h-full bg-primary-900 text-gray-100 flex items-center justify-center flex-col gap-1 w-[38px]">
        <img src={iranFlag.src} alt="" width={26} />
        <div className="flex flex-col text-[9px] dir-ltr font-bold">
          <span>I.R.</span>
          <span className="-mt-1">IRAN</span>
        </div>
      </div>

      <div className="flex h-full w-[75px]">
        <Number
          ref={ref1}
          value={values.p1}
          maxLength={2}
          className={bg}
          onFinish={(val) => handleFinish("p1", val, ref2)}
          onChange={(val) => handleChange("p1", val)}
        />
      </div>

      <div className={classNames("flex h-full w-[68px]", bgLight)}>
        <Text
          ref={ref2}
          value={values.p2}
          className={classNames(bgLight, "transition-none cursor-pointer")}
          onFinish={(val, code) => {
            handleFinish("p2", val, ref3);
            setColorCode(code);
          }}
        />
      </div>

      <div className="flex h-full w-[90px]">
        <Number
          value={values.p3}
          className={bg}
          ref={ref3}
          maxLength={3}
          onFinish={(val) => handleFinish("p3", val, ref4)}
          onChange={(val) => handleChange("p3", val)}
        />
      </div>

      <div className={classNames("flex h-full border-l w-[64px]", borderClass)}>
        <div className="h-full flex flex-col">
          <Icon icon="IranPlate" className={classNames("h-6", iconClass)} />
          <Number
            ref={ref4}
            value={values.p4}
            className={bg}
            maxLength={2}
            onFinish={(val) => handleFinish("p4", val)}
            onChange={(val) => handleChange("p4", val)}
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Classes -------------------------------- */
const colors: { [key: string]: string } = {
  police: "bg-plate-police-bg text-plate-police-text",
  "police-light": "bg-plate-police-light text-plate-police-text",
  taxi: "bg-plate-taxi-bg text-plate-taxi-text",
  "taxi-light": "bg-plate-taxi-light text-plate-taxi-text",
  army: "bg-plate-army-bg text-plate-army-text",
  "army-light": "bg-plate-army-light text-plate-army-text",
  navy: "bg-plate-navy-bg text-plate-navy-text",
  "navy-light": "bg-plate-navy-light text-plate-navy-text",
  protocol: "bg-plate-protocol-bg text-plate-protocol-text",
  "protocol-light": "bg-plate-protocol-light text-plate-protocol-text",
  service: "bg-plate-service-bg text-plate-service-text",
  "service-light": "bg-plate-service-light text-plate-service-text",
};
const iconColors: { [key: string]: string } = {
  police: "[&_*]:stroke-plate-police-text",
  taxi: "[&_*]:stroke-plate-taxi-text",
  army: "[&_*]:stroke-plate-army-text",
  navy: "[&_*]:stroke-plate-navy-text",
  protocol: "[&_*]:stroke-plate-protocol-text",
  service: "[&_*]:stroke-plate-service-text",
};
const borderColors: { [key: string]: string } = {
  police: "border-plate-police-text",
  taxi: "border-plate-taxi-text",
  army: "border-plate-army-text",
  navy: "border-plate-navy-text",
  protocol: "border-plate-protocol-text",
  service: "border-plate-service-text",
};

/* ---------------------------------- Utils --------------------------------- */
function normalizeFrom(values: PlateInputValue) {
  const { p1, p2, p3, p4, p5, p6, p7, p8 } = values;
  const res: CarPlateInputValue = {
    p1:
      `${(p1 && parseInt(p1)) || ""}${(p2 && parseInt(p2)) || ""}` !== ""
        ? parseInt(`${p1 || ""}${p2 || ""}`)
        : undefined,
    p2: p3 && !parseInt(p3) ? p3 : undefined,
    p3:
      `${(p3 && parseInt(p3)) || ""}${(p4 && parseInt(p4)) || ""}${(p5 && parseInt(p5)) || ""}` !== ""
        ? parseInt(`${p4 || ""}${p5 || ""}${p6 || ""}`)
        : undefined,
    p4:
      `${(p7 && parseInt(p7)) || ""}${(p8 && parseInt(p8)) || ""}` !== ""
        ? parseInt(`${p7 || ""}${p8 || ""}`)
        : undefined,
  };
  return res;
}
function normalizeTo(values: CarPlateInputValue) {
  const { p1, p2, p3, p4 } = values;
  const res: PlateInputValue = {
    p1: p1 ? `${p1}`[0] : undefined,
    p2: p1 ? `${p1}`[1] : undefined,
    p3: p2,
    p4: p3 ? `${p3}`[0] : undefined,
    p5: p3 ? `${p3}`[1] : undefined,
    p6: p3 ? `${p3}`[2] : undefined,
    p7: p4 ? `${p4}`[0] : undefined,
    p8: p4 ? `${p4}`[1] : undefined,
  };
  return res;
}
