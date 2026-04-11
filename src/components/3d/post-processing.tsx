"use client";

import {
  EffectComposer,
  N8AO,
  Bloom,
  Vignette,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      {/* AO — adds depth to finger holes, ground contact */}
      <N8AO
        aoRadius={0.08}
        distanceFalloff={0.5}
        intensity={2.0}
        quality="medium"
        halfRes
      />
      {/* Bloom — clearcoat specular highlights glow softly */}
      <Bloom
        mipmapBlur
        intensity={0.4}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
        radius={0.6}
      />
      {/* Vignette — subtle edge darkening frames the ball */}
      <Vignette offset={0.3} darkness={0.6} eskil={false} />
      {/* AgX tone mapping — filmic look, better hue preservation */}
      <ToneMapping mode={ToneMappingMode.AGX} />
      {/* SMAA — software AA compatible with N8AO (replaces hardware MSAA) */}
      <SMAA />
    </EffectComposer>
  );
}
