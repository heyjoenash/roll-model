"use client";

import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";

export function DefaultScene() {
  return (
    <>
      <BowlingBall rpm={200} color="#1a1a2e" />
      <ContactShadows
        position={[0, -0.108, 0]}
        opacity={0.35}
        scale={0.8}
        blur={2.5}
      />
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
      />
      <Environment preset="studio" />
    </>
  );
}
