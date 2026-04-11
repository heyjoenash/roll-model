"use client";

import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BALL_RADIUS_METERS } from "@/lib/constants";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";

export function DefaultScene() {
  return (
    <>
      <SceneLighting accentColor="#2563eb" />
      <BowlingBall rpm={200} color="#2563eb" />
      <ContactShadows
        position={[0, -BALL_RADIUS_METERS, 0]}
        opacity={0.5}
        scale={0.8}
        blur={2.5}
        far={0.5}
        resolution={256}
        frames={1}
        color="#000000"
      />
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
      />
    </>
  );
}
