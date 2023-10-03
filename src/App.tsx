import { PrimeReactProvider } from "primereact/api";
import MainPage from "./pages";
import Tailwind from "primereact/passthrough/tailwind";
import { usePassThrough } from "primereact/passthrough";
import "./index.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { classNames } from "primereact/utils";

function App() {
  const pt = usePassThrough(
    Tailwind,
    {
      button: {
        root: {classNames:''},
        label: ({ props }:any) => ({
          className: classNames("flex-1", "duration-200", "font-bold", {
            "hover:underline": props.link,
          }),
        }),
        icon: ({ props }:any) => ({
          className: classNames("mx-0", {
            "mr-2": props.iconPos == "left" && props.label != null,
            "ml-2": props.iconPos == "right" && props.label != null,
            "mb-2": props.iconPos == "top" && props.label != null,
            "mt-2": props.iconPos == "bottom" && props.label != null,
          }),
        }),
        badge: ({ props }:any) => ({
          className: classNames({ "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge }),
        }),
      },
      inputtext: {
        root: ({ props, context }: any) => ({
          className: classNames(
            "m-0",
            "font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg",
            {
              "hover:border-blue-500 ": !context.disabled,
              "opacity-60 select-none pointer-events-none cursor-default": context.disabled,
            },
            {
              "text-lg px-4 py-4": props.size == "large",
              "text-xs px-2 py-2": props.size == "small",
              "p-3 text-base": props.size == null,
            }
          ),
        }),
      },
    },
    { mergeSections: true, mergeProps: true }
  );
  return (
    <PrimeReactProvider value={{ pt }}>
      <MainPage />
    </PrimeReactProvider>
  );
}

export default App;
