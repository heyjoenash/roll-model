"use client";

import { LathePin } from "./lathe-pin";
import { PIN_POSITIONS } from "./pin-profile";

export interface PinDeckProps {
  // Array of pin numbers (1-10) to highlight in gold
  highlight?: number[];
  // Array of pin numbers (1-10) to dim (semi-transparent)
  dim?: number[];
  // Override color for all non-highlighted pins
  color?: string;
  // Hide pins entirely (e.g., for "fallen" state)
  hidden?: number[];
}

export function PinDeck({
  highlight = [],
  dim = [],
  color = "#ffffff",
  hidden = [],
}: PinDeckProps) {
  return (
    <group>
      {PIN_POSITIONS.map((pos, idx) => {
        const pinNumber = idx + 1;
        if (hidden.includes(pinNumber)) return null;
        return (
          <group key={pinNumber} position={pos}>
            <LathePin
              color={color}
              highlight={highlight.includes(pinNumber)}
              dim={dim.includes(pinNumber)}
            />
          </group>
        );
      })}
    </group>
  );
}
