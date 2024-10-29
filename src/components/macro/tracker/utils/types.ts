import { playerSettings } from "@/components/macro/tracker/utils/constants";

export type TrackerProps = {
  dates?: number[];
  tracks?: Track[];
};

export type TrackerState = {
  playerSettings: typeof playerSettings;
  showSettings?: boolean;
  activeTime?: number;
  dates?: number[];
  times?: number[];
  totalTimes?: number[];
  titleTimes?: number[];
  totalTitleTimes?: number[];
  tracks?: Track[];
  mappedTracks?: Track[];
};

export type TrackPoint = {
  latLng: Point;
  angle: number;
  time: number;
  road?: string;
  province?: string;
  image?: string;
  color?: string;
  assumed?: boolean;
  hasEvent?: boolean;
  stepSize?: number;
};

export type Track = {
  plate: PlateInputValue;
  points: TrackPoint[];
};

export type BreakTimeKeys = "minutes" | "hours" | "days" | "weeks" | "months";

export type TrackerGeoType = {
  geometry: {
    geometries: {
      coordinates: number[] | number[][];
      type: "Point" | "LineString";
    }[];
    type: string;
  };
  properties: {
    color: string;
    id: string;
    isInterpolated: number;
    time: number;
  };
  type: string;
};

export type Event = {
  startTime?: number;
  endTime?: number;
  className?: string;
};

export type PlayerProps = {
  dates: number[];
  eventsGroup?: ((Event | undefined)[] | undefined)[];
  speed: number;
  onChange: (data: { timeIndex: number }) => void;
};

type PlateInputValue = {
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
