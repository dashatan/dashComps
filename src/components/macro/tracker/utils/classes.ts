import { classNames } from "@/utils";

export const polylineClassName = (color?: string) =>
  classNames({
    "stroke-red-500": color === "red",
    "stroke-green-500": color === "green",
    "stroke-blue-500": color === "blue",
    "stroke-yellow-500": color === "yellow",
    "stroke-white": color === "white",
    "stroke-black": color === "black",
    "stroke-gray-300": color === "silver",
  });
export const pointClassName = (color?: string) =>
  classNames({
    "stroke-red-800": color === "red",
    "stroke-green-800": color === "green",
    "stroke-blue-800": color === "blue",
    "stroke-yellow-800": color === "yellow",
    "stroke-white": color === "white",
    "stroke-black": color === "black",
    "stroke-gray-500": color === "silver",
  });
export const carIconClassName = (color?: string) =>
  classNames("absolute -top-1/2 -left-1/2", {
    "[&_svg]:fill-red-800": color === "red",
    "[&_svg]:fill-green-800": color === "green",
    "[&_svg]:fill-blue-800": color === "blue",
    "[&_svg]:fill-yellow-800": color === "yellow",
    "[&_svg]:fill-white": color === "white",
    "[&_svg]:fill-black": color === "black",
    "[&_svg]:fill-gray-500": color === "silver",
  });

export const actionButtonClassNames = classNames(
  "min-w-10 min-h-10 border border-gray-300 rounded-md bg-gray-50",
  "hover:bg-gray-100 flex justify-center items-center cursor-pointer",
);
