"use client";

import { useEffect, useRef, useState } from "react";

export default function MapMain() {
  const initialized = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !initialized.current) {
      initialize();
    }
  }, []);

  async function initialize() {
    const L = await import("leaflet");
    await import("leaflet/dist/leaflet.css" as any);
    const map = L.map("map-main").setView([35.6892, 51.389], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    initialized.current = true;
  }
  return <div id="map-main" className="w-full h-full flex p-4 z-10"></div>;
}
