import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-simple-map-screenshoter";
import { useAppSelector } from "@/store/hooks";
import { useFormContext } from "react-hook-form";
import { carMarkerSvg } from "../icons/car";
import { carIconClassName, pointClassName, polylineClassName } from "../../utils/classes";
import { Track, TrackerState, TrackPoint } from "@/components/macro/tracker/utils/types";
import { CENTER_COORD } from "@/components/macro/tracker/utils/constants";
import { df } from "@/components/macro/tracker/utils/remap";
import { colors, ColorType, getColor } from "@/components/micro/badge/color";

export default function TrackerMap() {
  const tileUrl = useAppSelector((state) => state.root.app.tileUrl);
  const state = useFormContext<TrackerState>();
  const baseTracks = state.watch("tracks") || [];
  const mappedTracks = state.watch("mappedTracks") || [];
  const activeTimeIndex = state.watch("playerSettings.activeTimeIndex");
  const traceCount = state.watch("playerSettings.traceCount");

  const mapInitialized = useRef(false);
  const [map, setMap] = useState<L.Map>();
  const mapContainer = useRef(null);

  const tracks = useMemo(() => {
    return mappedTracks?.map((track, index) => {
      const start = activeTimeIndex - traceCount < 0 ? 0 : activeTimeIndex - traceCount;
      const points = track.points.filter((x) => x.latLng).slice(start, activeTimeIndex + 1);
      return { ...track, points };
    });
  }, [activeTimeIndex]);

  const center: Point = baseTracks ? baseTracks[0]?.points[0]?.latLng : CENTER_COORD;
  useEffect(() => {
    if (!center) return;
    !mapInitialized.current && mapInitialize();
  }, [center]);

  useEffect(() => {
    if (!map || !tracks.length) return;
    drawLine(map, tracks);
    return () => {
      map.eachLayer((layer: any) => {
        if (!layer) return;
        if (layer._url) return;
        map.removeLayer(layer);
      });
    };
  }, [tracks, map]);

  function mapInitialize() {
    let initialMap = L.map("tracker-map", {
      center,
      zoom: 7,
      zoomControl: false,
    });
    L.tileLayer(tileUrl || "").addTo(initialMap);

    setMap(initialMap);
    mapInitialized.current = true;
  }

  function drawLine(map: L.Map, tracks: Track[]) {
    tracks.forEach((track, trackIndex) => {
      const points = track.points;
      const coords = points.map((x) => x.latLng);
      const color = colors[trackIndex];
      var polyline = L.polyline(coords, { weight: 4, className: polylineClassName(color) }).addTo(map);

      points.forEach(function (point, i) {
        if (i < points.length - 1) {
          const marker = L.circleMarker(point.latLng, {
            radius: 1,
            weight: 10,
            className: pointClassName(color),
          }).addTo(map);
          marker.bindTooltip(() => makeTooltip(point));
        }
      });

      const endPoint = coords[coords.length - 1];
      const point = points[points.length - 1];
      const angle = point.angle;

      if (endPoint) {
        const arrowIcon = createCarIcon(angle, point, getColor(color));
        const carMarker = L.marker(endPoint, { icon: arrowIcon }).addTo(map);
        carMarker.bindTooltip(() => makeTooltip(point));
      }
    });
  }

  function createCarIcon(angle: number, point?: TrackPoint, color?: ColorType) {
    return L.divIcon({
      className: "",
      iconSize: [16, 16],
      html: `<div class="${carIconClassName(color)} ${point?.assumed && ""}" style="transform: rotate(${angle}deg)">${carMarkerSvg}</div>`,
    });
  }

  return <div ref={mapContainer} id="tracker-map" className="z-10 h-full w-full"></div>;
}

function makeTooltip(point: TrackPoint) {
  return `<div class="flex flex-col font-main dir-rtl gap-2 p-2">
            <div class="flex gap-2">
              <span class="text-sm text-gray-700 font-semibold">استان: </span>
              <span>${point.province}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-sm text-gray-700 font-semibold">محور: </span>
              <span>${point.road}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-sm text-gray-700 font-semibold">زمان تردد: </span>
              <span class="dir-ltr">${df.format(point.time)}</span>
            </div>
          </div>`;
}
