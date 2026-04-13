"use client";

import { useScene } from "@/lib/scene-context";
import { RevRateScene } from "@/components/3d/scenes/rev-rate-scene";
import { DefaultScene } from "@/components/3d/scenes/default-scene";
import { PrototypeScene } from "@/components/3d/scenes/prototype-scene";

export function SceneSwitcher() {
  const { activeScene } = useScene();

  switch (activeScene) {
    case "rev-rate":
      return <RevRateScene />;
    case "prototype":
      return <PrototypeScene />;
    default:
      return <DefaultScene />;
  }
}
