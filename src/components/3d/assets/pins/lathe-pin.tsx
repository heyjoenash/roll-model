"use client";

import { PIN_PROFILE } from "./pin-profile";

interface LathePinProps {
  color?: string;
  highlight?: boolean;
  dim?: boolean;
}

export function LathePin({
  color = "#ffffff",
  highlight = false,
  dim = false,
}: LathePinProps) {
  const effectiveColor = highlight ? "#fbbf24" : color;
  const opacity = dim ? 0.35 : 1.0;

  return (
    <mesh castShadow>
      <latheGeometry args={[PIN_PROFILE, 32]} />
      <meshPhysicalMaterial
        color={effectiveColor}
        roughness={0.35}
        metalness={0.0}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        transparent={dim}
        opacity={opacity}
      />
    </mesh>
  );
}
