"use client";

import { OrbitControls } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";

export function DefaultScene() {
  return (
    <>
      <SceneLighting />
      <BowlingBall rpm={200} color="#1a1a2e" />
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
      />
    </>
  );
}
