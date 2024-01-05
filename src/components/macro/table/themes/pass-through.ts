"use client";

import { DataTablePassThroughOptions } from "primereact/datatable";
import { classNames } from "@/utils";

export const tablePT: DataTablePassThroughOptions = {
  emptyMessage: { color: "red" },
  table: { className: "w-full border-separate border-spacing-y-0" },

  column: {
    sortIcon: { className: classNames("mx-2 text-gray-700") },
    headerCell: ({ context, props }: any) => ({
      className: classNames(
        "text-right border-t border-b border-gray-100 font-semibold first:border-r last:border-l",
        "transition duration-200 text-gray-700 bg-gray-100",
        context?.size === "small" ? "p-2" : context?.size === "large" ? "p-5" : "py-2 px-4", // Size
        context.sorted ? "bg-gray-200" : "", // Sort
        {
          "sticky z-[1]": props.frozen || props.frozen === "", // Frozen Columns
          "border-x border-y": context?.showGridlines,
          "overflow-hidden space-nowrap border-y relative bg-clip-padding": context.resizable, // Resizable
          "cursor-pointer": props.sortable, // Sortable
        }
      ),
    }),
    bodyCell: ({ props, context }: any) => ({
      className: classNames(
        "bg-transparent text-gray-700 text-right !border-r-0 !border-l-0 !rounded-none !border-b py-0 px-4",
        {
          "sticky bg-inherit": props?.frozen || props?.frozen === "", // Frozen Columns
          "border-x border-y": context.showGridlines,
        }
      ),
    }),
    filterMenuButton: ({ context }: any) => ({
      className: classNames(
        "inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative mx-2",
        "w-8 h-8 rounded-full",
        "transition-all duration-300",
        " hover:bg-gray-200", // Hover
        {
          "bg-gray-200": context.active,
        }
      ),
    }),
  },
  headerRow: { className: "[&>th:first-child]:rounded-r-md [&>th:last-child]:rounded-l-md" },
  bodyRow: ({ context }: any) => ({
    className: classNames("hover:bg-gray-100 [&>td]:last:!border-none", {
      "cursor-pointer": context.selectable,
      "hover:bg-gray-300/20 hover:text-gray-600": context.selectable && !context.selected, // Hover
    }),
  }),
  paginator: {
    root: {
      className: classNames(
        "flex items-center justify-start flex-wrap dir-ltr",
        "bg-gray-200 text-gray-700 border-0 px-4 py-2 rounded-md"
      ),
    },
    pageButton: ({ context }: any) => ({
      className: classNames(
        "relative inline-flex items-center justify-center user-none overflow-hidden leading-none",
        "border-0 text-gray-700 w-10 h-10 rounded-full",
        "transition duration-200",
        {
          "bg-gray-300": context.active,
        }
      ),
    }),
    prevPageButton: ({ context }: any) => ({
      className: classNames(
        "relative inline-flex items-center justify-center user-none overflow-hidden leading-none",
        "border-0 text-gray-700 w-12 h-12 m-1 rounded-md",
        "transition duration-200",
        {
          "cursor-default pointer-events-none opacity-60": context.disabled,
        }
      ),
    }),
    nextPageButton: ({ context }: any) => ({
      className: classNames(
        "relative inline-flex items-center justify-center user-none overflow-hidden leading-none",
        "border-0 text-gray-700 w-12 h-12 m-1 rounded-md",
        "transition duration-200",
        {
          "cursor-default pointer-events-none opacity-60": context.disabled,
        }
      ),
    }),
    firstPageButton: ({ context }: any) => ({
      className: classNames(
        "relative inline-flex items-center justify-center user-none overflow-hidden leading-none",
        "border-0 text-gray-700 w-12 h-12 m-1 rounded-md",
        "transition duration-200",
        {
          "cursor-default pointer-events-none opacity-60": context.disabled,
        }
      ),
    }),
    lastPageButton: ({ context }: any) => ({
      className: classNames(
        "relative inline-flex items-center justify-center user-none overflow-hidden leading-none",
        "border-0 text-gray-700 w-12 h-12 m-1 rounded-md",
        "transition duration-200",
        {
          "cursor-default pointer-events-none opacity-60": context.disabled,
        }
      ),
    }),
  },
};
