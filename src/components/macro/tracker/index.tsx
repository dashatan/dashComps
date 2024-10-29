import TrackerContainer from "@/components/macro/tracker/comps";
import { playerSettings } from "@/components/macro/tracker/utils/constants";
import { TrackerProps, TrackerState } from "@/components/macro/tracker/utils/types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./styles.css";

export default function TrackerProvider({ dates, tracks }: TrackerProps) {
  const state = useForm<TrackerState>({
    defaultValues: {
      playerSettings,
      showSettings: false,
      dates,
      tracks,
    },
  });

  useEffect(() => {
    dates && state.setValue("dates", dates);
    tracks && state.setValue("tracks", tracks);
  }, [dates, tracks]);

  return (
    <FormProvider {...state}>
      <TrackerContainer />
    </FormProvider>
  );
}
