import { classNames } from "@/utils";
import { colorWords } from "@/utils/wordMap";

export default function ColorField({ color }: { color?: ColorType }) {
  return (
    <div className="flex items-center justify-center">
      <div className={classNames("bg- h-6 w-6 rounded-full border-2 border-gray-700", getColorClass(color))}></div>
    </div>
  );
}

const colorsObj = {
  teal: "",
  orange: "",
  lime: "",
  indigo: "",
  red: "",
  pink: "",
  blue: "",
  green: "",
  yellow: "",
  white: "",
  gray: "",
  black: "",
};
export const colors = Object.keys(colorsObj);

export type ColorType = keyof typeof colorsObj;

export function getColor(text?: string): ColorType | undefined {
  if (!text) return;
  return colors.find((x) => x === text || x === colorWords[text]) as ColorType;
}

export function getColorClass(color?: ColorType) {
  return {
    "bg-blue-500": color === "blue" || color === colorWords.blue,
    "bg-red-500": color === "red" || color === colorWords.red,
    "bg-green-500": color === "green" || color === colorWords.green,
    "bg-yellow-500": color === "yellow" || color === colorWords.yellow,
    "bg-white": color === "white" || color === colorWords.white,
    "bg-gray-300": color === "gray" || color === colorWords.silver || color === undefined,
    "bg-black": color === "black" || color === colorWords.black,
    "bg-orange-500": color === "orange",
    "bg-lime-500": color === "lime",
    "bg-pink-500": color === "pink",
    "bg-teal-500": color === "teal",
    "bg-indigo-500": color === "indigo",
  };
}
