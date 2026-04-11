"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

interface SceneLightingProps {
  accentColor?: string;
}

/**
 * Studio-quality lighting via Lightformer-based Environment.
 * No HDRI files, no CDN, no network requests — fully self-contained.
 * The accent Lightformer + directional light shift color to match content.
 */
export function SceneLighting({ accentColor = "#b0b0ff" }: SceneLightingProps) {
  const accentLightRef = useRef<THREE.DirectionalLight>(null);
  const targetColor = useRef(new THREE.Color(accentColor));
  const currentColor = useRef(new THREE.Color(accentColor));
  const lerpedHex = useRef(accentColor);

  // Update target when prop changes
  targetColor.current.set(accentColor);

  // Smooth color transition — ~2 seconds to settle (Stripe Press "lerp, never snap")
  useFrame(() => {
    currentColor.current.lerp(targetColor.current, 0.03);
    lerpedHex.current = "#" + currentColor.current.getHexString();
    if (accentLightRef.current) {
      accentLightRef.current.color.copy(currentColor.current);
    }
  });

  return (
    <>
      {/* Lightformer environment — renders into internal cube camera */}
      <Environment resolution={256}>
        {/* Key light — large softbox, top-right */}
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[2, 3, 2]}
          scale={[3, 2, 1]}
          rotation-y={Math.PI / 4}
          color="#ffffff"
        />
        {/* Fill light — large, dim, opposite side */}
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[-3, 1, -1]}
          scale={[4, 3, 1]}
          rotation-y={-Math.PI / 4}
          color="#e8e8ff"
        />
        {/* Rim/accent light — dynamic color from content */}
        <Lightformer
          form="circle"
          intensity={3.0}
          position={[-2, 2, -3]}
          scale={1.5}
          color={lerpedHex.current}
        />
        {/* Bottom fill — prevents pitch-black underside */}
        <Lightformer
          form="rect"
          intensity={0.3}
          position={[0, -3, 0]}
          rotation-x={Math.PI / 2}
          scale={[5, 5, 1]}
          color="#1a1a2e"
        />
        {/* Top ambient softbox */}
        <Lightformer
          form="ring"
          intensity={1.0}
          position={[0, 4, 0]}
          rotation-x={-Math.PI / 2}
          scale={3}
          color="#ffffff"
        />
      </Environment>

      {/* Direct lights for specular highlights and shadow casting */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-near={0.1}
        shadow-bias={-0.0005}
      />
      {/* Accent directional — lerps color to match active content */}
      <directionalLight
        ref={accentLightRef}
        position={[-2, 3, -1]}
        intensity={0.3}
      />
    </>
  );
}
