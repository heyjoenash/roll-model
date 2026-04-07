"use client";

import { useControls } from "leva";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";

export function RevRateScene() {
  const { rpm, showAxis, ballColor } = useControls("Rev Rate", {
    rpm: { value: 400, min: 150, max: 650, step: 10, label: "RPM" },
    showAxis: { value: false, label: "Show Axis" },
    ballColor: { value: "#1a1a2e", label: "Ball Color" },
  });

  return (
    <>
      <BowlingBall rpm={rpm} showAxis={showAxis} color={ballColor} />
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
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
      <Environment preset="studio" />
    </>
  );
}
