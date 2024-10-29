import PlateField from "@/features/traffic/comps/table/comps/body/plate";
import TrackerTimeLine from "@/components/macro/tracker/comps/player/timeline";
import { TrackerState } from "@/components/macro/tracker/utils/types";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

export default function TrackerPlayer() {
  const state = useFormContext<TrackerState>();
  const tracks = state.watch("tracks");

  const plateButtonRef = useRef<HTMLDivElement>(null);
  return (
    <section id="player" className="flex w-full">
      <div className="border-s border-gray-300">
        <div className="h-[42px] border-y border-gray-300"></div>
        <div ref={plateButtonRef} className="flex flex-col gap-2 p-2">
          {tracks?.map((track, i) => <PlateField key={i} value={track.plate} />)}
        </div>
      </div>
      <TrackerTimeLine />
    </section>
  );
}
