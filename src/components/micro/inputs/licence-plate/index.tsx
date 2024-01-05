"use client";

import { useState } from "react";
import { X } from "lucide-react";
import CarPlate from "./types/car";
import MotorcyclePlate from "./types/motorcycle";
import ProtocolPlate from "./types/protocol";
import SimplePlate from "./types/simple";

/* ---------------------------------- Types --------------------------------- */
export type PlateInputValue = {
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
  p5?: string;
  p6?: string;
  p7?: string;
  p8?: string;
  p9?: string;
};

export type PlateInputProps = {
  withClear?: boolean;
  onChange?: (val?: PlateInputValue) => void;
  value?: PlateInputValue;
  type: "car" | "motorcycle" | "protocol" | "simple";
};

export default function PlateInput({ value, onChange, withClear, type }: PlateInputProps) {
  function handleChange(val?: PlateInputValue) {
    onChange && onChange(val);
  }

  function Plate() {
    switch (type) {
      case "motorcycle":
        return <MotorcyclePlate values={value} onChange={handleChange} />;
      case "protocol":
        return <ProtocolPlate values={value} onChange={handleChange} />;
      case "simple":
        return <SimplePlate values={value} onChange={handleChange} />;
      default:
        return <CarPlate values={value} onChange={handleChange} />;
    }
  }

  /* ----------------------------------- Jsx ---------------------------------- */
  return (
    <div className="flex items-stretch gap-2 h-[68px] flex-row-reverse">
      {withClear && (
        <div
          className="bg-gray-200 h-full w-8 flex items-center justify-center rounded-md border border-gray-300 cursor-pointer"
          onClick={() => handleChange()}
        >
          <X className="w-5" />
        </div>
      )}
      <Plate />
    </div>
  );
}
