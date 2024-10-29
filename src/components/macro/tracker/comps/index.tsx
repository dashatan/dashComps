import { useFormContext } from "react-hook-form";
import TrackerSetting from "@/components/macro/tracker/comps/widgets/setting";
import dynamic from "next/dynamic";
import TrackerControls from "@/components/macro/tracker/comps/controls";
import TrackerPlayer from "@/components/macro/tracker/comps/player";
import { TrackerState } from "@/components/macro/tracker/utils/types";
import { useTrackerRemap } from "@/components/macro/tracker/utils/remap";
const TrackerMap = dynamic(() => import("@/components/macro/tracker/comps/map"), { loading: () => <></>, ssr: false });

export default function TrackerContainer() {
  const state = useFormContext<TrackerState>();
  const showSettings = state.watch("showSettings");
  useTrackerRemap();

  return (
    <div className="relative h-full w-full dir-ltr">
      <TrackerMap />
      {showSettings && <TrackerSetting />}
      <div className="absolute bottom-8 left-8 z-10 flex w-[calc(100%_-_64px)] flex-col gap-4 rounded-lg border border-gray-300 bg-white pt-4">
        <TrackerControls />
        <TrackerPlayer />
      </div>
    </div>
  );
}
