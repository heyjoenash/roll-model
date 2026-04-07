"use client";

import { useEffect } from "react";
import { useScene } from "@/lib/scene-context";

export function SceneSetter({ scene }: { scene: string }) {
  const { setActiveScene } = useScene();

  useEffect(() => {
    setActiveScene(scene);
    return () => setActiveScene("default");
  }, [scene, setActiveScene]);

  return null;
}
