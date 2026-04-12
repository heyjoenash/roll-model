# Roll Model: Complete Interaction Blueprint

> The production bible for every 3D scene across all 12 chapters and 53 sections.
> Every future Claude Code session uses this document to build the exact right experience.

---

## Shared Assets Reference

Before the per-section blueprints, here are the reusable assets and their capabilities:

### The Ball
- Sphere with clearcoat material, finger holes, configurable color
- Spin animation driven by RPM parameter
- Visible axis line (toggleable)
- Axis tilt and rotation configurable
- Track flare rings (toggleable)
- Pin dot marker (colored dot on surface)

### The Lane
- Textured plane, 60ft proportional (scaled to scene units)
- Foul line, approach dots, lane dots (7ft), arrows (15ft)
- 39-board surface with numbered board lines (toggleable)
- Oil pattern overlay (semi-transparent colored heatmap)
- Three zones: heads (0-20ft), midlane (20-40ft), backends (40-60ft)
- Gutters on each side

### The Pins
- 10 mesh instances in equilateral triangle formation
- Each pin individually addressable (can stand, fall, highlight, color-code)
- Pin numbers overlaid or on hover
- 12-inch center-to-center spacing
- Can show fallen state (tilted/scattered positions)

### The Figure (Simple Bowler)
- Capsule torso, sphere head, cylinder limbs, sphere joints
- Articulated: shoulder, elbow, wrist, hip, knee, ankle joints
- Can hold ball in hand mesh
- Forward spine tilt angle (configurable 0-110 degrees)
- Lateral spine tilt (configurable)
- Knee bend at slide (configurable)
- Balance arm extension
- Trail leg position
- Can animate through approach steps

### Color Language (Consistent Across All Scenes)
- **Blue (#3b82f6)**: Skid phase / cold / controlled
- **Yellow/Amber (#f59e0b)**: Hook phase / transition / caution
- **Green (#22c55e)**: Roll phase / good / correct
- **Red (#ef4444)**: Error / aggressive / hot
- **Purple (#a855f7)**: Elite / two-handed / special
- **White/Gray**: Neutral / reference lines
- **Orange (#f97316)**: Pin action / energy transfer

---

## Chapter 1: The Basics

---

### 1.1 The Lane

#### What the user sees on load
Overhead (bird's-eye) view of a full 60ft lane, slightly angled (15 degrees from directly above) so the perspective gives depth. The lane stretches from approach area at the bottom to pin deck at the top. Foul line is prominent. Lane markings (arrows, dots) glow subtly. Pins visible at the far end as small white shapes. Gutters visible on both sides. Dark ambient lighting with the lane surface warmly lit, like a bowling alley at night.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Show Board Numbers | Toggle | on/off | off | Overlays board numbers 1-39 across the lane width |
| Highlight Board | Slider | 1-39 | 20 | Highlights a single board in bright yellow across the full 60ft |
| Show Zones | Toggle | on/off | off | Colors the three zones: heads (blue), midlane (yellow), backends (green) |
| Show Markings | Dropdown | All / Arrows Only / Dots Only / None | All | Which lane markings are visible |

#### SceneCues (in content order)
1. **"See it: The full 60 feet"** -- Camera pulls back to show the entire lane from approach to pin deck. Board 20 highlighted. Params: `{ highlightBoard: 20, showZones: false, showBoardNumbers: true }`
2. **"See it: The three zones"** -- Lane lights up in three color zones: heads blue (0-20ft), midlane yellow (20-40ft), backends green (40-60ft). Params: `{ showZones: true, showBoardNumbers: false }`
3. **"See it: Where you aim"** -- Camera zooms to the arrows at 15ft. All 7 arrows glow, with the 2nd arrow (board 10) pulsing brighter. Params: `{ showMarkings: "Arrows Only", highlightBoard: 10, cameraZoom: "arrows" }`

#### Key Animation
When "Show Zones" is enabled, the three colored zones fade in sequentially -- heads first (blue wash), then midlane (yellow wash), then backends (green wash) -- creating a visual timeline of the ball's journey. The transitions pulse gently to show the ball would travel through them in order.

#### The "Aha" Moment
Dragging the "Highlight Board" slider from 1 to 39 and watching a single bright line sweep across the lane width. The user suddenly realizes how narrow each board is -- barely an inch -- and that bowlers aim for specific boards 60 feet away. The visual contrast between the tiny board width and the enormous 60ft distance creates instant appreciation for the precision required.

---

### 1.2 The Pins

#### What the user sees on load
Looking down at the pin deck from a slightly elevated angle (about 30 degrees above horizontal, from the bowler's perspective). All 10 pins standing in their triangle formation. Each pin has a subtle number floating above it (1-10). Warm spotlight from above. The ball is NOT in this scene -- it's purely about the pin arrangement.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Highlight Row | Dropdown | None / Row 1 / Row 2 / Row 3 / Row 4 | None | Colors the selected row differently |
| Show Spacing | Toggle | on/off | off | Shows 12" measurement lines between adjacent pins |
| Pin Style | Dropdown | Standing / Numbered / X-Ray | Standing | X-Ray shows center of gravity dot at 5.78" |

#### SceneCues (in content order)
1. **"See it: The triangle"** -- Camera rotates to directly overhead, showing the perfect equilateral triangle. 36-inch measurement lines appear on each side. Params: `{ cameraAngle: "overhead", showSpacing: true }`
2. **"See it: Row by row"** -- Rows light up one at a time from front to back: pin 1 (gold), row 2 (2-3, blue), row 3 (4-5-6, green), row 4 (7-8-9-10, red). Params: `{ highlightRow: "animated-sequence" }`
3. **"See it: Where strikes happen"** -- Pins 1, 3, 5, 9 (the ball's direct contact path for a right-hander) glow orange. The remaining pins dim to gray. Params: `{ highlightPins: [1,3,5,9], dimOthers: true }`

#### Key Animation
When the user hovers over or taps any pin, it wobbles slightly and its number + weight (3 lbs 6-10 oz) appears. The wobble demonstrates how little force is needed to topple a pin -- it tips at only 9-11 degrees.

#### The "Aha" Moment
The "Where strikes happen" SceneCue reveals that the ball only directly touches 4 of 10 pins. The other 6 pins are knocked down by chain reactions (pin-to-pin collisions). This is the moment the user realizes bowling isn't about hitting all the pins -- it's about hitting the right 4 pins and letting physics do the rest.

---

### 1.3 How Scoring Works

#### What the user sees on load
A stylized 3D scorecard floating in space, showing frames 1-10 as boxes with the standard score layout. The scorecard is clean and empty. Below it, a simplified side-view lane with a ball and pins, ready for animated demonstrations. Dark background with the scorecard warmly lit.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Scenario | Dropdown | Strike / Spare / Open / Turkey / Perfect Game | Strike | Which scoring scenario to demonstrate |
| Frame | Slider | 1-10 | 1 | Which frame is active (for step-by-step) |
| Play Animation | Button | -- | -- | Plays the scoring animation for current scenario |

#### SceneCues (in content order)
1. **"See it: How a strike scores"** -- The scorecard animates: frame 1 shows X, then waits. Frame 2 shows 7/, and suddenly frame 1 fills in as 20 (10+7+3). The "waiting for future balls" concept becomes visual. Params: `{ scenario: "Strike", autoPlay: true }`
2. **"See it: Why spares matter"** -- Side-by-side comparison: left card shows spare+8, right card shows open frame (8,1). The spare card shows 18, the open shows 9. The 9-pin difference pulses. Params: `{ scenario: "Spare", showComparison: true }`
3. **"See it: The perfect 300"** -- Rapid-fire animation: 12 X marks fill in, running score climbs: 30, 60, 90... 270, 300. The final 300 glows gold. Params: `{ scenario: "Perfect Game", autoPlay: true }`

#### Key Animation
When a strike is scored, the frame box glows but the score stays blank with a "?" until the next two balls are thrown. As each subsequent ball is thrown, previous frames retroactively fill in their scores. The "chain of waiting" -- where one strike depends on two future balls -- creates a cascading fill effect.

#### The "Aha" Moment
The Turkey (3 consecutive strikes) animation. The user watches the first frame stay blank through 3 shots, then suddenly score 30. The realization that a single frame can score 30 -- three times the apparent maximum of 10 -- reveals why strikes are so valuable and why bowling scoring feels different from simply adding up knocked-down pins.

---

### 1.4 Board Numbering

#### What the user sees on load
Top-down view of the lane, zoomed into a section showing approximately 20 feet of lane width. All 39 boards are visible as thin vertical strips running the length of the lane. Board 20 (center) is highlighted. The arrows at 15ft are visible as reference anchors. Gutters visible on both edges.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Highlight Board | Slider | 1-39 | 20 | Highlights a single board in yellow |
| Show Arrows | Toggle | on/off | on | Shows the 7 arrows with their board numbers |
| Perspective | Dropdown | Right-Handed / Left-Handed | Right-Handed | Flips the numbering convention |
| Board Width Exaggeration | Slider | 1x-5x | 1x | Widens boards for visibility (educational mode) |

#### SceneCues (in content order)
1. **"See it: How narrow boards really are"** -- The "Board Width Exaggeration" slider animates from 5x (wide, easy to see) down to 1x (actual size -- barely visible). Params: `{ boardWidthExaggeration: 1, highlightBoard: 10 }`
2. **"See it: Arrow-to-board connection"** -- Each arrow glows with its board number: 5, 10, 15, 20, 25, 30, 35. Lines connect each arrow to its board number at the foul line. Params: `{ showArrows: true, showArrowLabels: true }`
3. **"See it: The track area"** -- Boards 8-12 on both sides glow warm orange, showing where most bowling balls travel. Params: `{ highlightRange: [8,12], highlightColor: "orange" }`

#### Key Animation
As the Highlight Board slider moves, a bright vertical stripe sweeps across the lane. At each arrow position (5, 10, 15, 20, 25, 30, 35), the stripe briefly pulses and the arrow above it glows, creating a clear visual connection between the board numbering system and the physical arrows.

#### The "Aha" Moment
The Board Width Exaggeration slider. At 5x, boards look like wide planks and "board 10" seems like a big target. At 1x actual size, each board is barely an inch -- a pencil width. The user viscerally understands that "move 2 boards left" means moving less than 2 inches, and bowlers make these microscopic adjustments to change where the ball arrives 60 feet away.

---

## Chapter 2: The Ball

---

### 2.1 Coverstock Types

#### What the user sees on load
A single bowling ball at center frame, slowly rotating on a pedestal (like a jewelry display). The ball has a glossy plastic appearance. Studio-style lighting with soft reflections. The ball fills about 60% of the viewport. Camera at a 3/4 angle (slightly above and to the side).

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Coverstock | Dropdown | Plastic / Urethane / Reactive Solid / Reactive Pearl / Reactive Hybrid | Plastic | Changes the ball's surface material and appearance |
| Show Motion Preview | Toggle | on/off | off | Shows a ghosted trajectory arc below the ball indicating typical hook shape |
| Rotate Speed | Slider | 0-2 | 0.5 | How fast the display rotation is |

#### SceneCues (in content order)
1. **"See it: Glossy plastic spare ball"** -- Ball becomes mirror-shiny, almost chrome-like. The motion preview shows a nearly straight line. Params: `{ coverstock: "Plastic", showMotionPreview: true }`
2. **"See it: Matte solid reactive"** -- Ball surface becomes completely dull/flat with no reflections. The motion preview shows a strong, smooth arc. Params: `{ coverstock: "Reactive Solid", showMotionPreview: true }`
3. **"See it: Pearlescent reactive"** -- Ball surface gains a visible shimmer/sparkle effect (mica particles). The motion preview shows a long straight section then a sharp angular snap. Params: `{ coverstock: "Reactive Pearl", showMotionPreview: true }`

#### Key Animation
When switching between coverstocks, the ball surface material transitions with a dissolve effect. The key visual contrast: Plastic reflects light like glass. Solid reactive absorbs light like sandpaper. Pearl reactive sparkles like glitter. The motion preview arc simultaneously morphs to show how surface affects trajectory.

#### The "Aha" Moment
Toggling "Show Motion Preview" on and rapidly switching between Plastic (straight line), Solid Reactive (smooth arc), and Pearl Reactive (skid-snap angle). Seeing three completely different ball paths from three balls that look identical in shape and size -- the only difference is the surface. The user realizes the coverstock IS the ball's personality.

---

### 2.2 Core Design

#### What the user sees on load
A bowling ball cut in half (cross-section), revealing the internal core structure. The outer shell is translucent, and the core is solid and colored distinctly (orange for the core, gray for the filler, translucent blue for the coverstock). A symmetric pear-shaped core is shown. Camera at a 3/4 view, slightly above.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Core Type | Dropdown | Symmetric / Asymmetric | Symmetric | Switches between core shapes |
| Cutaway Amount | Slider | 0%-100% | 50% | How much of the ball shell is cut away (0% = whole ball, 100% = core only) |
| Show Axis | Toggle | on/off | on | Shows the primary rotation axis through the core |
| Spin | Toggle | on/off | off | Spins the cutaway ball slowly to show 3D shape |

#### SceneCues (in content order)
1. **"See it: Symmetric core"** -- A smooth, uniform core shape (light bulb or pear shape). The axis line passes through the center of symmetry. Params: `{ coreType: "Symmetric", cutawayAmount: 60, showAxis: true }`
2. **"See it: Asymmetric core"** -- The core gains an extra protrusion (mass bias). The shape is clearly uneven. A second axis appears showing the preferred spin axis (PSA). Params: `{ coreType: "Asymmetric", cutawayAmount: 60, showAxis: true }`
3. **"See it: Just the core"** -- Cutaway goes to 100%, leaving only the core floating in space. The user can see the entire 3D shape. Params: `{ cutawayAmount: 100, spin: true }`

#### Key Animation
When switching from Symmetric to Asymmetric, the core morphs smoothly -- a protrusion grows out of one side, making the shape visibly uneven. The rotation axis shifts as this happens, showing how the mass distribution changes the ball's natural spin behavior.

#### The "Aha" Moment
Enabling "Spin" with the Asymmetric core at 100% cutaway. The exposed core rotates, and because of its uneven mass, the rotation appears to wobble slightly. The user can see that this irregularly-shaped chunk of dense material INSIDE the ball is what makes it change direction on the lane. The invisible thing inside creates the visible hook.

---

### 2.3 RG & Differential

#### What the user sees on load
A bowling ball spinning in place, with a color-coded visualization of its mass distribution. Warm colors (red/orange) near the center show concentrated mass (low RG), cool colors (blue) near the shell show distributed mass (high RG). The ball spins at moderate speed. A ring around the ball shows the current "RG orbit" -- the effective radius of gyration.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| RG Value | Slider | 2.460-2.800 | 2.540 | Shifts mass distribution visualization (center vs shell) |
| Differential | Slider | 0.010-0.060 | 0.035 | Changes flare ring spacing on the ball |
| Show Flare Rings | Toggle | on/off | on | Shows track migration rings on ball surface |
| Show Mass Heatmap | Toggle | on/off | on | Color-coded mass distribution |

#### SceneCues (in content order)
1. **"See it: Low RG -- mass near center"** -- RG drops to 2.460. The ball's mass heatmap concentrates red at the core. The ball revs up visibly faster. Params: `{ rgValue: 2.460, showMassHeatmap: true }`
2. **"See it: High RG -- mass near shell"** -- RG jumps to 2.800. Mass shifts outward (blue ring near shell). The ball revs up more slowly, maintaining skid. Params: `{ rgValue: 2.800, showMassHeatmap: true }`
3. **"See it: High differential = massive flare"** -- Differential cranks to 0.060. Flare rings on the ball spread wide apart (6+ inches). Params: `{ differential: 0.060, showFlareRings: true }`

#### Key Animation
As the RG slider moves, the mass distribution visualization shifts in real time -- red (concentrated mass) migrates from center (low RG) to periphery (high RG). Simultaneously, the ball's spin-up speed visibly changes. Low RG: the ball reaches full spin quickly. High RG: the ball takes longer to get going, like a figure skater extending their arms to slow a spin.

#### The "Aha" Moment
Moving the RG slider all the way low (2.460), then all the way high (2.800), and watching the spin-up speed change dramatically. Low RG = fast rev-up = early hook. High RG = slow rev-up = late hook. The physics becomes intuitive: mass near the center spins easily (like pulling arms in), mass at the shell resists spinning (like spreading arms out). It's the figure skater analogy made visual.

---

### 2.4 Ball Motion: Skid-Hook-Roll

#### What the user sees on load
Overhead view of the full lane. A bowling ball sits at the foul line, ready to travel. The lane is divided into three color zones: blue (skid, 0-20ft), yellow (hook, 20-40ft), green (roll, 40-60ft). The ball is static, waiting for the animation to start.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Ball Speed (mph) | Slider | 12-22 | 17 | How fast the ball travels |
| Rev Rate (RPM) | Slider | 150-600 | 350 | How fast the ball spins |
| Surface | Dropdown | Polished / 2000 Grit / 1000 Grit / 500 Grit | 2000 Grit | Ball surface prep |
| Play | Button | -- | -- | Launches the ball animation |
| Show Phase Labels | Toggle | on/off | on | Labels each phase on the lane |

#### SceneCues (in content order)
1. **"See it: The classic three phases"** -- Ball launches at 17mph/350RPM on 2000 grit. It slides straight through blue zone, curves through yellow zone, and rolls straight through green zone to pins. Params: `{ speed: 17, rpm: 350, surface: "2000 Grit", autoPlay: true }`
2. **"See it: Speed dominant -- all skid, no hook"** -- Speed cranks to 22mph, RPM drops to 200. The ball barely curves, the blue zone extends nearly to the pins. Params: `{ speed: 22, rpm: 200, surface: "Polished", autoPlay: true }`
3. **"See it: Rev dominant -- early hook monster"** -- Speed drops to 14mph, RPM jumps to 550, surface goes to 500 grit. The ball hooks almost immediately, the yellow zone starts at 10 feet. Params: `{ speed: 14, rpm: 550, surface: "500 Grit", autoPlay: true }`

#### Key Animation
The ball travels down the lane in real time (scaled), and as it enters each phase, the corresponding zone on the lane glows brighter. The ball itself changes color as it transitions: blue glow during skid, yellow glow during hook, green glow during roll. The breakpoint -- where the ball changes direction -- is marked with a bright diamond on the lane surface.

#### The "Aha" Moment
The dual sliders for Speed and RPM. Moving speed up while keeping RPM constant pushes the breakpoint further and further down the lane. Moving RPM up while keeping speed constant pulls the breakpoint closer. The user discovers that ball motion is a RELATIONSHIP between two variables, not a single setting. This is the "speed-to-rev ratio" made tangible.

---

### 2.5 Surface Preparation

#### What the user sees on load
Extreme close-up of a bowling ball surface (like looking through a magnifying glass). The surface texture is visible -- you can see the microscopic roughness pattern. The ball slowly rotates behind the "lens" so different parts of the surface scroll past. A small trajectory preview arc floats to the side.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Grit Level | Slider | 500-5000 (+ Polish) | 2000 | Changes visible surface roughness and trajectory shape |
| Show Trajectory | Toggle | on/off | on | Shows the ball path shape for current grit |
| Surface View | Dropdown | Close-Up / Full Ball / Side-by-Side | Close-Up | How the surface is displayed |

#### SceneCues (in content order)
1. **"See it: 500 grit -- sandpaper rough"** -- Surface shows deep scratches and visible texture lines. Trajectory shows early, smooth arc. Params: `{ grit: 500, showTrajectory: true }`
2. **"See it: Polished -- glass smooth"** -- Surface becomes mirror-shiny with no visible texture. Trajectory shows long straight line then sharp angular snap. Params: `{ grit: "Polish", showTrajectory: true }`
3. **"See it: Same ball, different surface"** -- Side-by-side view shows the same ball at 500 grit (left) and Polished (right), with their respective trajectories below. Params: `{ surfaceView: "Side-by-Side", gritLeft: 500, gritRight: "Polish" }`

#### Key Animation
As the Grit slider moves continuously from 500 to Polish, the surface texture smooths out in real time AND the trajectory arc simultaneously changes shape. 500: early smooth arc. 1000: moderate arc. 2000: balanced. 3000+: long and angular. Polish: extreme skid-snap. The two changing simultaneously makes the cause-and-effect relationship undeniable.

#### The "Aha" Moment
The continuous grit slider. As the user drags from 500 to Polish, they watch the surface go from rough to smooth AND the trajectory morph from "early smooth arc" to "long skid, sharp snap." The same ball, just by changing its surface, produces a completely different motion shape. This is the cheapest, fastest adjustment a bowler can make -- and the scene proves why pro shops always ask "what surface do you want?"

---

### 2.6 Weight & Drilling

#### What the user sees on load
A bowling ball from the grip side (looking down at finger holes). The ball has visible markers: the Pin (colored dot), CG (small circle), and finger/thumb holes. The ball rotates slowly. Subtle measurement lines show the relationships between these reference points.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Show Markers | Dropdown | All / Pin Only / CG Only / None | All | Which reference markers are visible |
| Layout | Dropdown | Pin Up / Pin Down / Pin Over Bridge | Pin Up | Changes pin position relative to finger holes |
| Pin-to-PAP Distance | Slider | 1-6.75 inches | 3.375 | Distance from pin to positive axis point |
| Show PAP | Toggle | on/off | off | Shows the bowler's positive axis point |

#### SceneCues (in content order)
1. **"See it: Pin up layout"** -- Pin dot moves above the finger holes. A text label shows "More length, stronger backend snap." Params: `{ layout: "Pin Up", showMarkers: "All" }`
2. **"See it: Pin down layout"** -- Pin dot moves below the finger holes. Label shows "Earlier roll, smoother motion." Params: `{ layout: "Pin Down", showMarkers: "All" }`
3. **"See it: Maximum flare distance"** -- Pin-to-PAP slider animates to 3.375 inches. PAP marker appears, and the distance line between Pin and PAP pulses. Label: "Maximum core instability = maximum flare." Params: `{ pinToPAP: 3.375, showPAP: true }`

#### Key Animation
When switching between layouts (Pin Up / Down / Over Bridge), the pin marker smoothly animates to its new position on the ball surface, and a ghosted trajectory arc below morphs to show the resulting ball motion shape. The visual connection between marker placement and ball behavior is immediate.

#### The "Aha" Moment
The Pin-to-PAP slider. At 1 inch (pin close to PAP), the flare visualization shows tight, closely-spaced rings -- controlled, early motion. At 3.375 inches, the rings spread wide apart -- maximum flare, maximum aggression. At 6.75 inches, the rings tighten again -- long and smooth. The user discovers that the distance between a dot and an invisible reference point on their ball's surface determines everything about how the ball moves. Drilling layout is the "tuning dial" of bowling ball performance.

---

## Chapter 3: The Approach

---

### 3.1 Stance & Setup

#### What the user sees on load
Side view of the simple bowler figure standing at the approach dots, in ready position. The figure holds the ball at chest height with both hands. The posture is upright with slight knee flex. Approach dots are visible on the ground. The foul line is visible ahead. Camera is at a perfect 90-degree side view.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Ball Height | Dropdown | Chest / Waist / Thigh | Chest | Where the figure holds the ball |
| Knee Flex | Slider | 0-30 degrees | 10 | Slight knee bend in stance |
| Starting Board | Slider | 15-35 | 20 | Which board the figure stands on (shown on ground) |
| View | Dropdown | Side / Behind / 3/4 | Side | Camera angle |

#### SceneCues (in content order)
1. **"See it: Standard setup"** -- Figure at board 20, ball at chest height, knees slightly flexed. Reference lines show ball directly under chin. Params: `{ ballHeight: "Chest", kneeFlex: 10, startingBoard: 20 }`
2. **"See it: Ball height affects timing"** -- Ball drops from chest to thigh. A clock icon shows the swing getting shorter/faster. Params: `{ ballHeight: "Thigh", showTimingIndicator: true }`
3. **"See it: Find your distance"** -- Figure walks forward to foul line, turns around, takes 4.5 steps back, turns to face pins. The approach distance is marked. Params: `{ showApproachMeasurement: true }`

#### Key Animation
The ball height dropdown triggers a smooth animation of the figure adjusting its hold position. As the ball moves lower, a pendulum arc visualization appears showing the shorter/faster swing that results. Higher hold = longer pendulum = slower timing. Lower hold = shorter pendulum = faster timing.

#### The "Aha" Moment
The ball height change with the pendulum visualization. The user sees that where you START holding the ball determines the entire tempo of your swing. Chest height creates a long, slow arc. Thigh height creates a short, quick one. This single setup decision cascades through the entire delivery.

---

### 3.2 The 4-Step Approach

#### What the user sees on load
Side view of the bowler figure at the approach area, ready to begin. Four numbered footprint markers (1-2-3-4) are laid out on the approach surface, showing where each step will land. The ball is held in starting position. A timeline bar appears at the bottom of the scene showing the 4-step sequence.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play / Pause | Button | -- | -- | Plays the 4-step animation |
| Step Speed | Slider | 0.25x-2x | 1x | Animation playback speed |
| Current Step | Slider | 0-4 | 0 | Scrub through steps manually (0=start, 4=release) |
| Show Ball Position | Toggle | on/off | on | Shows the ball's position at each step |
| Show Timing Labels | Toggle | on/off | on | Labels: "Out, Down, Back, Through" |

#### SceneCues (in content order)
1. **"See it: The full 4-step approach"** -- Animated walkthrough at 0.5x speed. Each step lights up its footprint marker and shows the ball position. Params: `{ autoPlay: true, stepSpeed: 0.5, showTimingLabels: true }`
2. **"See it: Step 1 -- pushaway"** -- Freezes at step 1. Ball and right foot move together. Label: "Ball and foot move simultaneously." Params: `{ currentStep: 1 }`
3. **"See it: Step 3 -- peak backswing"** -- Freezes at step 3. Ball is at its highest point behind the bowler. Label: "Ball at top as step completes." Params: `{ currentStep: 3 }`

#### Key Animation
The figure walks through the 4-step approach with the ball moving in sync. At each step, a "checkpoint" circle appears showing whether the ball is in the correct position relative to the feet. The timing bar at the bottom fills progressively: pushaway, downswing, backswing, forward swing/release.

#### The "Aha" Moment
The scrubbing slider. The user can drag through the approach frame by frame and see the EXACT relationship between feet and ball at every moment. Step 1: ball goes out, right foot moves. Step 2: ball is down, left foot moves. Step 3: ball is back, right foot moves. Step 4: ball comes through, left foot slides. The synchronization becomes visible, not just described.

---

### 3.3 The 5-Step Approach

#### What the user sees on load
Same side view as 4-step, but now with 5 numbered footprint markers. The first marker is half-sized (showing the trigger step is shorter). A small "vs 4-step" toggle appears in the corner for comparison.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play / Pause | Button | -- | -- | Plays the 5-step animation |
| Step Speed | Slider | 0.25x-2x | 1x | Animation playback speed |
| Current Step | Slider | 0-5 | 0 | Scrub through steps |
| Compare to 4-Step | Toggle | on/off | off | Shows a ghost figure doing 4-step alongside |

#### SceneCues (in content order)
1. **"See it: The trigger step"** -- Freezes on step 1. The half-length step is highlighted. Label: "This short step just gets you moving." Params: `{ currentStep: 1 }`
2. **"See it: 5-step vs 4-step side by side"** -- Two figures walk in parallel: green (5-step) and blue (4-step). The pushaway happens one step later in the 5-step. Params: `{ compareTo4Step: true, autoPlay: true, stepSpeed: 0.5 }`

#### Key Animation
When comparison mode is on, two figures walk side by side. The 5-step figure starts its ball movement one step later. Both arrive at the foul line at the same time, but the 5-step figure has slightly more forward momentum (shown as a speed indicator).

#### The "Aha" Moment
The side-by-side comparison. The user sees that the 5-step approach isn't "one extra step" -- it's the same 4-step approach with a tiny momentum-starter prepended. Steps 2-5 of the 5-step ARE steps 1-4 of the 4-step. The trigger step is just a "go" signal for the body, and it generates slightly more speed.

---

### 3.4 Timing

#### What the user sees on load
Side view of the bowler figure, with two synchronized timelines displayed: one for FEET (steps) and one for BALL (swing). The timelines run horizontally at the bottom of the scene. Both are color-coded: green where they sync, red where they diverge. The figure is frozen in starting position.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Timing | Dropdown | Early (Roller) / Matched (Neutral) / Late (Leverage) | Matched | Which timing pattern to demonstrate |
| Play | Button | -- | -- | Plays the animation |
| Speed | Slider | 0.25x-2x | 0.5x | Playback speed |
| Show Timelines | Toggle | on/off | on | Shows the dual timeline bars |

#### SceneCues (in content order)
1. **"See it: Perfect matched timing"** -- Ball and feet arrive at the foul line together. Both timelines are green the whole way. The figure is balanced at release. Params: `{ timing: "Matched", autoPlay: true, speed: 0.5 }`
2. **"See it: Early timing problem"** -- Ball arrives before the feet. The ball timeline races ahead (turns red). The figure's shoulders close before release. Params: `{ timing: "Early (Roller)", autoPlay: true }`
3. **"See it: Late timing problem"** -- Feet arrive before the ball. The feet timeline races ahead (turns red). The figure yanks the ball to catch up. Params: `{ timing: "Late (Leverage)", autoPlay: true }`

#### Key Animation
The dual timelines advance simultaneously. In "Matched" timing, both bars fill at the same rate -- green all the way. In "Early" timing, the ball bar races ahead (turns red). In "Late" timing, the feet bar races ahead (turns red). The figure's body language changes dramatically: balanced (matched), closed/tight (early), or yanking/stumbling (late).

#### The "Aha" Moment
Switching between all three timing modes in rapid succession. The user sees the same figure make the same general movements, but tiny differences in synchronization produce completely different outcomes. Matched: smooth, balanced, accurate. Early: tight, pulled left. Late: yanked, lofted, inaccurate. Timing isn't about speed -- it's about synchronization.

---

### 3.5 Drift

#### What the user sees on load
Top-down (directly overhead) view of the approach area and first few feet of the lane. The bowler figure is shown from above as a simple shape (circle for head, rectangle for shoulders). Approach dots are visible. A dotted line shows the intended walk path (straight toward the target). The figure is at the starting position.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Drift Amount | Slider | -6 to +6 boards | 0 | How many boards the figure drifts during approach |
| Show Walk Path | Toggle | on/off | on | Shows the actual path taken |
| Consistency | Dropdown | Consistent / Inconsistent | Consistent | Whether drift is repeatable or random |
| Play | Button | -- | -- | Walks the figure through approach |

#### SceneCues (in content order)
1. **"See it: Zero drift (straight walk)"** -- Figure walks in a perfectly straight line from starting board to slide board. Start and finish are on the same board. Params: `{ driftAmount: 0, autoPlay: true }`
2. **"See it: Intentional drift (pros do this)"** -- Figure starts on board 20 but consistently finishes on board 24, 10 out of 10 times. This is NOT a problem. Params: `{ driftAmount: 4, consistency: "Consistent", showMultipleShots: true }`
3. **"See it: Inconsistent drift (the real problem)"** -- Figure walks 5 times, ending on boards 22, 19, 25, 20, 23. The paths scatter wildly. THIS is a problem. Params: `{ driftAmount: "random", consistency: "Inconsistent", showMultipleShots: true }`

#### Key Animation
In "Consistent" mode, 5 approach paths are drawn as parallel lines, all shifting the same direction by the same amount. In "Inconsistent" mode, 5 paths are drawn scattering in different directions. The scatter pattern makes the problem immediately visible.

#### The "Aha" Moment
The "Inconsistent" drift visualization. Five walk paths that look like pick-up sticks scattered on the approach. Each one goes to a different board, which means each shot has a different angle to the target. The user realizes drift itself isn't bad -- INCONSISTENT drift is what kills accuracy. Many pros drift 4-6 boards intentionally and consistently.

---

## Chapter 4: The Swing

---

### 4.1 The Pushaway

#### What the user sees on load
Side view close-up of the bowler figure from waist up, in stance position. The ball is held at chest height. A dotted arc line shows where the pushaway should go (forward and slightly down). The figure's arm is highlighted.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Pushaway Direction | Dropdown | Correct (Forward-Down) / Too Far Right / Too Far Left | Correct | Direction of the pushaway |
| Starting Height | Dropdown | High (Chest) / Medium (Waist) / Low (Thigh) | High (Chest) | Where the ball starts |
| Play | Button | -- | -- | Animates the pushaway motion |
| Show Arc Path | Toggle | on/off | on | Shows the intended path |

#### SceneCues (in content order)
1. **"See it: Clean pushaway"** -- Ball moves forward and slightly down, initiating the pendulum. The arm extends smoothly. Params: `{ pushawayDirection: "Correct", autoPlay: true }`
2. **"See it: Pushed too far right"** -- Ball goes right of the body. A red warning path shows the ball will wrap behind the body in backswing. Params: `{ pushawayDirection: "Too Far Right", autoPlay: true }`

#### Key Animation
The pushaway animation shows the ball traveling along the arc path. When correct, the path is green. When the direction is wrong, the path turns red and continues into the backswing showing how the error cascades -- a rightward push causes the ball to wrap behind the back.

#### The "Aha" Moment
Seeing the "Too Far Right" pushaway cascade into the backswing. The ball wraps behind the bowler's back, creating a crooked swing plane. One small directional error at the START of the swing ruins the ENTIRE swing path. The pushaway is the launch pad -- aim it wrong and everything that follows is off.

---

### 4.2 The Backswing

#### What the user sees on load
Side view of the bowler figure at the peak of the backswing (step 3 in 4-step). The ball is behind and above the bowler. A height measurement line shows how high the ball is relative to the bowler's body. The figure is frozen in this position.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Backswing Height | Slider | Belt / Shoulder / Above Head | Shoulder | How high the ball goes |
| Show Speed Indicator | Toggle | on/off | on | Shows resulting ball speed potential |
| Forward Spine Tilt | Slider | 30-60 degrees | 47 | Figure's forward lean at backswing peak |
| Play Full Swing | Button | -- | -- | Animates from backswing through release |

#### SceneCues (in content order)
1. **"See it: Low backswing (belt level)"** -- Ball barely rises behind the bowler. Speed indicator shows "Lower Speed." Params: `{ backswingHeight: "Belt", showSpeedIndicator: true }`
2. **"See it: High backswing (above head)"** -- Ball rises well above the bowler's head. Speed indicator shows "Higher Speed." More forward spine tilt compensates. Params: `{ backswingHeight: "Above Head", forwardSpineTilt: 55 }`

#### Key Animation
The height slider animates the figure smoothly between backswing heights. A "potential energy" bar fills up as the ball goes higher -- more height = more gravitational energy = more speed on the forward swing. The forward spine tilt automatically adjusts to maintain balance as backswing height changes.

#### The "Aha" Moment
The potential energy bar. The user slides backswing height from belt to above-head and watches the energy bar fill up. Then they press "Play Full Swing" at each height and see the ball arrive at release with noticeably different speeds. Backswing height IS ball speed. The higher the backswing, the more gravity accelerates the ball forward. It's a pendulum -- the higher you pull it back, the faster it swings forward.

---

### 4.3 The Forward Swing

#### What the user sees on load
Side view of the bowler figure at the top of the backswing, about to begin the forward swing. A glowing arc path shows the trajectory the ball will follow from backswing through release. The slide foot is about to begin its slide.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play | Button | -- | -- | Animates the forward swing through release |
| Speed | Slider | 0.25x-2x | 0.5x | Playback speed |
| Show Release Point | Toggle | on/off | on | Marks the exact point where ball leaves the hand (at the ankle) |
| Show Trail Leg | Toggle | on/off | on | Shows the trail leg sweeping behind |

#### SceneCues (in content order)
1. **"See it: Ball through the slot"** -- The ball swings forward, passing close to the slide foot ankle. The "slot" (the narrow gap between body and leg) is highlighted. Params: `{ autoPlay: true, speed: 0.3, showReleasePoint: true }`
2. **"See it: Release at the ankle"** -- Freeze at release. The ball is exactly at the ankle of the slide foot. A circle highlights this convergence point. Params: `{ freezeAtRelease: true }`

#### Key Animation
The forward swing animation shows the ball descending in a smooth arc, accelerating as it drops. At the exact moment the slide foot stops at the foul line, the ball reaches the bottom of the arc at the ankle -- this convergence is the release point, highlighted with a bright flash.

#### The "Aha" Moment
The "Release at the ankle" freeze frame. The user sees everything converging at one point: the slide foot has stopped, the ball is at the lowest point of the arc, the hand is at the ankle, and the figure is balanced. This is THE moment of bowling -- everything before was preparation, everything after is follow-through. All the complex mechanics exist to create this one instant of perfect convergence.

---

### 4.4 Free vs Muscled Swing

#### What the user sees on load
Two bowler figures side by side: left (green, labeled "Free") and right (red, labeled "Muscled"). Both are at the start of the backswing. The free swing figure's arm is relaxed (slight curve). The muscled figure's arm is tense (straight, rigid).

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play | Button | -- | -- | Both figures animate simultaneously |
| Speed | Slider | 0.25x-2x | 0.5x | Playback speed |
| Show Consistency Dots | Toggle | on/off | off | Shows 5 release points for each -- free has tight cluster, muscled is scattered |
| View | Dropdown | Side / Behind | Side | Camera angle |

#### SceneCues (in content order)
1. **"See it: Free armswing -- smooth pendulum"** -- The green figure swings like a pendulum: smooth, even arc, no jerking. The ball speed is consistent. Params: `{ autoPlay: true, speed: 0.5 }`
2. **"See it: Muscled swing -- forced and jerky"** -- The red figure's arm tenses, the arc is uneven with a visible "hitch." The ball speed varies. Params: `{ autoPlay: true, speed: 0.5 }`
3. **"See it: Consistency test"** -- Both figures perform 5 shots. The free swing produces 5 near-identical arcs (green lines overlap). The muscled swing produces 5 scattered arcs (red lines splay). Params: `{ showConsistencyDots: true, showMultipleShots: true }`

#### Key Animation
The free swing traces a perfect smooth arc (pendulum curve) in green. The muscled swing traces a jerky, angular path in red with visible acceleration changes. When "Show Consistency Dots" is on, multiple shot overlays reveal: free swing release points cluster tightly, muscled release points scatter.

#### The "Aha" Moment
The consistency test with 5 overlaid shots. The free swing produces virtually identical arcs (they stack on top of each other). The muscled swing produces 5 different arcs that look like they came from 5 different bowlers. Gravity is constant -- muscles are not. That's why the free armswing is taught: not because it's "better" per se, but because it's REPEATABLE.

---

### 4.5 Swing Plane

#### What the user sees on load
Behind-the-bowler view. The figure is mid-approach with the ball at the top of the backswing. A glowing line shows the swing plane -- the path the ball takes from backswing through release. The spine/head is visible as a reference centerline. The ball is at the 12 o'clock position behind the figure.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Swing Plane | Dropdown | Straight / Inside-Out / Outside-In (Wrap) | Straight | Which swing plane to show |
| Play | Button | -- | -- | Animates the swing |
| Show Plane Line | Toggle | on/off | on | Shows the full swing path as a traced line |

#### SceneCues (in content order)
1. **"See it: Straight plane (ideal)"** -- Ball travels straight back and straight forward. The plane line is a single straight green line behind the body. Params: `{ swingPlane: "Straight", autoPlay: true }`
2. **"See it: Inside-out (slight -- common with pros)"** -- Ball starts close to body, goes slightly outside in backswing, returns inside at release. A gentle curve, highlighted in yellow. Params: `{ swingPlane: "Inside-Out", autoPlay: true }`
3. **"See it: Wrapping (outside-in -- common fault)"** -- Ball wraps behind the body. The plane line shows a dramatic S-curve in red. Params: `{ swingPlane: "Outside-In (Wrap)", autoPlay: true }`

#### Key Animation
From behind, the ball traces its path as a glowing trail. Straight: the trail is a vertical line. Inside-out: a gentle outward bow. Wrap: the trail goes behind the body (the figure's torso blocks the ball at one point, which is the problem). The color grades from green (desirable) to red (problematic).

#### The "Aha" Moment
The "Wrap" animation viewed from behind. The user watches the ball disappear behind the bowler's body during the backswing. The trail line shows it going off to the right (behind the back), then whipping back left. This S-curve path is completely unpredictable -- the ball could end up anywhere. The user instantly sees why the pushaway direction matters: push the ball right, it wraps behind you.

---

## Chapter 5: The Release

---

### 5.1 Wrist Position

#### What the user sees on load
Extreme close-up of the bowler figure's hand and wrist holding the bowling ball from the side. The wrist is in "straight/firm" position. The ball is at the bottom of the swing arc (release point). The figure's forearm, wrist, and fingers are clearly visible. Finger holes are visible.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Wrist Position | Dropdown | Cupped / Straight / Broken | Straight | Wrist angle |
| Show Axis Line | Toggle | on/off | on | Shows the resulting ball axis |
| Show Rev Indicator | Toggle | on/off | on | Shows relative rev rate potential |
| Animate Release | Button | -- | -- | Shows the release sequence (thumb exits, wrist rotates, fingers exit) |

#### SceneCues (in content order)
1. **"See it: Cupped wrist -- maximum revs"** -- Wrist bends upward (back of hand toward forearm). Rev indicator shoots to maximum. Axis shows strong tilt. Params: `{ wristPosition: "Cupped", showRevIndicator: true }`
2. **"See it: Broken wrist -- weakest release"** -- Wrist collapses downward. Rev indicator drops to minimum. Label: "Thumb exits AFTER fingers -- worst possible release." Params: `{ wristPosition: "Broken", showRevIndicator: true }`
3. **"See it: The release sequence"** -- Slow-motion animation: thumb exits first, weight transfers to fingers, wrist rotates, fingers exit and impart spin. Params: `{ wristPosition: "Cupped", animateRelease: true }`

#### Key Animation
The release sequence in ultra-slow motion: (1) thumb slides out of the ball, (2) the ball's weight transfers to the two fingers, (3) the wrist rotates, (4) the fingers lift and exit, imparting spin. In the Cupped position, this sequence is clean and powerful. In the Broken position, the sequence reverses -- fingers exit first, producing no spin.

#### The "Aha" Moment
The release sequence animation in Cupped vs Broken wrist. In Cupped: clean thumb-exit, powerful finger lift, ball launches with heavy spin. In Broken: the sequence is reversed -- fingers slip off first, thumb jams, ball drops onto the lane with almost no spin. The user sees that the wrist angle determines the SEQUENCE of events in the release, not just the angle. The right sequence creates revolutions. The wrong sequence kills them.

---

### 5.2 Rev Rate

**(Already built -- reference: content/the-release/rev-rate.mdx)**

#### What the user sees on load
The bowling ball spinning in place on a dark background with studio lighting. The axis line is visible. The ball spins at the default RPM (350). The Leva panel shows the RPM slider.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| RPM | Slider | 100-700 | 350 | Ball rotation speed |
| Show Axis | Toggle | on/off | true | Axis line visibility |
| Ball Color | Color Picker | -- | #2563eb | Ball color |

#### SceneCues (in content order)
1. **"See it: Gentle 150 RPM roll"** -- Params: `{ rpm: 150, showAxis: true, ballColor: "#22c55e" }`
2. **"See it: Aggressive 600 RPM hook"** -- Params: `{ rpm: 600, showAxis: true, ballColor: "#ef4444" }`
3. **"See it: Svensson's 600 RPM"** -- Params: `{ rpm: 600, showAxis: true, ballColor: "#a855f7" }`
4. **"See it: The sweet spot -- 350 RPM tweener"** -- Params: `{ rpm: 350, showAxis: false, ballColor: "#2563eb" }`

#### Key Animation
The ball spins at the specified RPM. At low RPMs you can track individual features on the surface. At high RPMs the surface becomes a blur. The axis line tilts based on current settings.

#### The "Aha" Moment
Dragging the RPM slider from 150 to 600 in one motion. At 150 RPM the ball is lazily turning -- you can see every detail on the surface. At 600 RPM the ball is a blur of spinning color. The visceral visual difference between a beginner's rev rate and an elite two-hander's makes the concept immediately tangible.

---

### 5.3 Axis Tilt

#### What the user sees on load
The bowling ball spinning in place with a prominent axis line (a bright rod passing through the ball). The axis is tilted at 15 degrees (typical). The ball spins at 400 RPM. Camera is at a slight angle so the tilt is clearly visible against the horizontal lane surface (shown as a reference plane below the ball).

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Axis Tilt | Slider | 0-90 degrees | 15 | Angle of axis from horizontal |
| RPM | Slider | 200-600 | 400 | Spin speed |
| Show Reference Plane | Toggle | on/off | on | Horizontal plane showing the lane surface |
| Show Motion Preview | Toggle | on/off | off | Shows resulting ball path shape on a mini-lane |

#### SceneCues (in content order)
1. **"See it: Zero tilt -- full rolling contact"** -- Axis is perfectly horizontal. The ball rolls like a car tire, with maximum lane contact. Motion preview shows early, strong hook. Params: `{ axisTilt: 0, showMotionPreview: true }`
2. **"See it: 90 degree tilt -- the spinner"** -- Axis points straight up. The ball spins like a top (helicopter). It barely contacts the lane. Motion preview shows almost no hook. Params: `{ axisTilt: 90, showMotionPreview: true }`
3. **"See it: The sweet spot -- 15 degree tilt"** -- A moderate tilt. The ball has good contact but also stores energy for the backend. Params: `{ axisTilt: 15, showMotionPreview: true }`

#### Key Animation
As the tilt slider moves, the axis line rotates in real time. At 0 degrees, the ball rolls with full lane contact (a "contact ring" at the equator glows bright). As tilt increases, the contact ring shrinks and moves toward the bottom of the ball. At 90 degrees, the ball is spinning like a top with minimal contact -- the contact ring is a tiny point at the very bottom.

#### The "Aha" Moment
The contact ring visualization. At 0 tilt, a wide band around the ball's equator glows -- that's the part touching the lane. Maximum friction. As tilt increases, that band shrinks to a thin line, then a point. The user sees that axis tilt literally controls HOW MUCH of the ball touches the lane surface. More contact = more friction = more hook. Less contact = less friction = less hook. The geometry is undeniable.

---

### 5.4 Axis Rotation

#### What the user sees on load
Top-down view of the ball spinning, with an arrow showing the direction of rotation. The ball sits on a mini-lane surface (showing about 10 feet of lane width). A direction-of-travel arrow points "up" (toward the pins). The rotation arrow shows the current axis rotation angle. At 0 degrees, the ball rolls perfectly end-over-end. At 90 degrees, the ball has pure side spin.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Axis Rotation | Slider | 0-90 degrees | 45 | Direction of spin relative to travel |
| Show Travel Direction | Toggle | on/off | on | Arrow showing ball's forward path |
| Show Spin Direction | Toggle | on/off | on | Arrow showing rotation direction |
| Show Hook Potential | Toggle | on/off | on | Indicator bar showing hook potential |

#### SceneCues (in content order)
1. **"See it: 0 degrees -- end over end, no hook"** -- Ball rolls straight forward like a wheel. Spin arrow points in same direction as travel. Hook potential: zero. Params: `{ axisRotation: 0, showHookPotential: true }`
2. **"See it: 90 degrees -- pure side spin, maximum hook"** -- Ball has pure side rotation. Spin arrow is perpendicular to travel. Hook potential: maximum. Params: `{ axisRotation: 90, showHookPotential: true }`
3. **"See it: 45 degrees -- the versatile middle"** -- Balanced between forward roll and side spin. Most bowlers fall here. Params: `{ axisRotation: 45, showHookPotential: true }`

#### Key Animation
The ball rotates in real time on the mini-lane. Two arrows extend from the ball: one showing travel direction (always pointing at pins), one showing spin direction (rotating based on the slider). As axis rotation increases from 0 to 90, the spin arrow rotates from parallel-to-travel to perpendicular-to-travel. A small trail shows the predicted ball path curving more as rotation increases.

#### The "Aha" Moment
Rapidly sliding Axis Rotation from 0 to 90 degrees and watching the predicted ball path on the mini-lane change from perfectly straight to dramatically curved. The user sees that axis rotation is simply the ANGLE between where the ball is going and how it's spinning. When those match (0 degrees), no hook. When they're perpendicular (90 degrees), maximum hook. It's the same ball, same speed, same RPM -- the only difference is the direction of the spin.

---

### 5.5 One-Handed vs Two-Handed

#### What the user sees on load
Two bowler figures side by side at the release point, viewed from a 3/4 angle (slightly behind and to the side). Left figure: one-handed release (moderate spine tilt, thumb in ball, single-arm swing). Right figure: two-handed release (extreme spine tilt, no thumb, both hands on ball until just before release). Both are frozen at the moment just before release.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play Release | Button | -- | -- | Both figures release simultaneously |
| Speed | Slider | 0.25x-2x | 0.5x | Playback speed |
| Show Rev Rate | Toggle | on/off | on | Shows RPM counter for each figure |
| Show Spine Angle | Toggle | on/off | off | Shows forward spine tilt angle measurement |
| View | Dropdown | Side / Behind / 3/4 | 3/4 | Camera angle |

#### SceneCues (in content order)
1. **"See it: One-handed release"** -- Left figure performs release. Thumb exits, fingers lift. RPM counter shows ~350. Spine tilt reads ~40 degrees. Params: `{ focusFigure: "one-handed", autoPlay: true, showRevRate: true, showSpineAngle: true }`
2. **"See it: Two-handed release"** -- Right figure releases. Support hand peels away, dominant hand rips through. RPM counter shows ~550. Spine tilt reads ~80 degrees. Params: `{ focusFigure: "two-handed", autoPlay: true, showRevRate: true, showSpineAngle: true }`

#### Key Animation
Both releases play in slow motion. The key visual differences are exaggerated: the two-handed figure bends nearly horizontal (80+ degrees of forward spine tilt), while the one-handed figure stays more upright (~40 degrees). The RPM counters tick up after release: ~350 for one-hand, ~550 for two-hand.

#### The "Aha" Moment
The spine angle measurement. When "Show Spine Angle" is on, a protractor overlay shows the one-handed bowler at ~40 degrees forward tilt and the two-handed bowler at ~80 degrees. The two-hander is essentially bowing to the lane. This extreme body position -- which looks uncomfortable -- is the mechanical reason two-handers generate 50%+ more revolutions. More body = more leverage = more spin. The tradeoff: much more lower back stress (the injury comparison becomes visceral).

---

### 5.6 Follow-Through

#### What the user sees on load
Side view of three bowler figures at the foul line, each frozen in a different follow-through position. Left: "Handshake" (thumb up, hand toward target). Center: "Palm Up" (hand flat, palm facing ceiling). Right: "Helicopter" (hand rotated over, palm down). Each figure has a colored label.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Follow-Through Type | Dropdown | Handshake / Palm Up / Helicopter | Handshake | Which follow-through to highlight |
| Show Ball Result | Toggle | on/off | on | Shows the resulting ball motion type |
| Animate | Button | -- | -- | Plays the release through follow-through |

#### SceneCues (in content order)
1. **"See it: The handshake -- standard hook"** -- Hand ends in handshake position (thumb at 11 o'clock). Ball result: medium to strong hook arc. Params: `{ followThroughType: "Handshake", showBallResult: true }`
2. **"See it: Palm up -- straight ball for spares"** -- Hand ends palm-up. Ball result: nearly straight path. Params: `{ followThroughType: "Palm Up", showBallResult: true }`
3. **"See it: Helicopter -- the spinner"** -- Hand rotates completely over. Ball result: high axis tilt, spinning like a top, minimal hook. Params: `{ followThroughType: "Helicopter", showBallResult: true }`

#### Key Animation
The hand position at follow-through is shown with a glowing outline, and a small ball above each figure's hand shows the resulting spin: Handshake = forward-rolling with side spin, Palm Up = end-over-end roll, Helicopter = spinning like a top. The mini-ball's spin direction makes the connection between hand position and ball behavior instant.

#### The "Aha" Moment
The "Show Ball Result" toggle shows three completely different ball paths from what appears to be a very subtle hand position change. The Handshake follow-through produces a hook. The Palm Up produces a straight ball. The Helicopter produces a spinner. The user realizes the follow-through REVEALS what the hand did at release -- it's diagnostic, not just cosmetic. A coach can look at your follow-through and know exactly what your ball will do.

---

## Chapter 6: Ball Motion Down the Lane

---

### 6.1 The Three Phases

#### What the user sees on load
Overhead view of the full lane with a ball at the foul line. The lane is divided into three color zones: blue (Skid, 0-20ft), yellow/amber (Hook, 20-40ft), green (Roll, 40-60ft). Phase labels float above each zone. The ball is ready to animate its journey.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Ball Speed (mph) | Slider | 12-22 | 17 | Travel speed |
| Rev Rate (RPM) | Slider | 150-600 | 350 | Spin speed |
| Axis Tilt | Slider | 0-45 | 15 | Axis tilt angle |
| Play | Button | -- | -- | Launches ball animation |
| Show Phase Boundaries | Toggle | on/off | on | Vertical lines marking phase transitions |

#### SceneCues (in content order)
1. **"See it: Textbook three-phase motion"** -- Ball launches at 17mph/350RPM/15 tilt. Clear skid (straight), hook (curves), roll (straightens toward pins). Params: `{ speed: 17, rpm: 350, axisTilt: 15, autoPlay: true }`
2. **"See it: Extended skid -- polished pearl on heavy oil"** -- Skid phase extends to 35ft. Hook is late and sharp. Roll is short. Params: `{ speed: 19, rpm: 400, axisTilt: 25, skidExtension: true, autoPlay: true }`
3. **"See it: Early hook -- sanded solid on dry lanes"** -- Skid phase ends at 10ft. Ball hooks almost immediately. Long roll phase. Params: `{ speed: 15, rpm: 350, axisTilt: 5, earlyHook: true, autoPlay: true }`

#### Key Animation
The ball travels down the lane and changes color as it enters each phase: glowing blue during skid, amber during hook, green during roll. The phase transition points are marked with a bright flash on the lane surface. The ball's spinning animation changes too: during skid it spins on its delivery axis; during hook it visibly shifts; during roll it's end-over-end.

#### The "Aha" Moment
Adjusting speed and RPM sliders and watching the phase boundary lines MOVE on the lane. High speed pushes the hook phase further down the lane. High RPM pulls it closer. The user discovers that the three phases aren't fixed at 20-40-60 feet -- they're dynamic, shifting based on the bowler's inputs. Every combination of speed/RPM/tilt creates a different three-phase story.

---

### 6.2 Speed & Rev Rate Interaction

#### What the user sees on load
Overhead lane view with a 2D graph overlaid in the corner showing Speed (X-axis) vs Rev Rate (Y-axis). A dot on the graph shows the current settings. Three zones on the graph are color-coded: blue (speed dominant), green (matched), purple (rev dominant). The lane shows the resulting ball path.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Ball Speed (mph) | Slider | 12-22 | 17 | Ball speed |
| Rev Rate (RPM) | Slider | 150-600 | 350 | Spin rate |
| Show Dominance Zone | Toggle | on/off | on | Colors the graph zones |
| Play | Button | -- | -- | Launches ball |
| Show Breakpoint Marker | Toggle | on/off | on | Diamond at breakpoint position |

#### SceneCues (in content order)
1. **"See it: Speed dominant (fast, low revs)"** -- 22mph, 200RPM. The ball barely hooks. Breakpoint is very late. Graph dot is in blue zone. Params: `{ speed: 22, rpm: 200, autoPlay: true }`
2. **"See it: Rev dominant (slow, high revs)"** -- 14mph, 550RPM. The ball hooks violently and early. Breakpoint is very early. Graph dot is in purple zone. Params: `{ speed: 14, rpm: 550, autoPlay: true }`
3. **"See it: Perfectly matched"** -- 17mph, 350RPM. Balanced hook shape. Graph dot is in green zone center. Params: `{ speed: 17, rpm: 350, autoPlay: true }`

#### Key Animation
As either slider moves, the graph dot moves in real time, crossing between speed-dominant, matched, and rev-dominant zones. Simultaneously, the ball path on the lane morphs: shallow arc (speed dominant), balanced arc (matched), extreme hook (rev dominant). The breakpoint diamond slides up and down the lane.

#### The "Aha" Moment
Holding RPM constant at 350 and sweeping speed from 12 to 22 mph. The user watches the breakpoint marker slide from 25 feet (way too early) to 55 feet (way too late). Then doing the opposite: holding speed at 17 and sweeping RPM from 150 to 600. The breakpoint moves the opposite direction. The relationship is an inverse see-saw: speed pushes the breakpoint back, revs pull it forward. Finding YOUR sweet spot is about balancing the see-saw.

---

### 6.3 Breakpoint

#### What the user sees on load
Overhead lane view with the ball path traced as a curve. The breakpoint is marked with a bright diamond icon on the lane where the ball changes direction most sharply. Board numbers are visible. The breakpoint board number is displayed as a large label.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Pattern Length | Slider | 32-48 feet | 40 | Oil pattern length |
| Show Rule of 31 | Toggle | on/off | on | Shows calculation: Pattern Length - 31 = Exit Board |
| Show Multiple Lines | Toggle | on/off | off | Shows 3 different ball paths converging at the breakpoint |
| Play | Button | -- | -- | Animates ball to breakpoint and beyond |

#### SceneCues (in content order)
1. **"See it: House shot breakpoint (40ft pattern)"** -- Breakpoint at board 9. The diamond marker sits near the track area. Params: `{ patternLength: 40, showRuleOf31: true, autoPlay: true }`
2. **"See it: Short pattern breakpoint (34ft Wolf)"** -- Breakpoint at board 3, dangerously close to the gutter. Params: `{ patternLength: 34, showRuleOf31: true, autoPlay: true }`
3. **"See it: Long pattern breakpoint (47ft Badger)"** -- Breakpoint at board 16, deep inside the lane. Params: `{ patternLength: 47, showRuleOf31: true, autoPlay: true }`

#### Key Animation
As the Pattern Length slider moves, the oil pattern overlay on the lane extends or contracts, and the breakpoint diamond slides along the lane. Short patterns push the breakpoint toward the gutter. Long patterns push it toward the center. The ball path animation adjusts to show how the different breakpoint positions create different angles into the pocket.

#### The "Aha" Moment
Sweeping the Pattern Length slider from 34 to 48 feet and watching the breakpoint diamond move from board 3 (gutter edge) to board 17 (near center). On a 34-foot pattern, the ball is breaking at the gutter's edge -- no room for error. On a 47-foot pattern, the breakpoint is almost at the lane center. The user instantly understands why short patterns play "outside" (near the gutter) and long patterns play "inside" (toward center). The Rule of 31 isn't abstract math -- it's a visual map of where to play.

---

### 6.4 Total Hook

#### What the user sees on load
Overhead lane view showing 3-4 overlaid ball paths with different total hook amounts. Each path is a different color and labeled with its total hook in boards. The paths fan out from the same general release point but arrive at the pocket from different angles.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Total Hook (boards) | Slider | 0-25 | 12 | Boards of lateral movement from foul line to pins |
| Show Entry Angle | Toggle | on/off | on | Shows the resulting entry angle in degrees |
| Ball Style | Dropdown | Straight / Slight Hook / Medium / Strong / Extreme | Medium | Preset hook shapes |

#### SceneCues (in content order)
1. **"See it: Straight ball -- zero hook"** -- Ball goes from board 18 straight to the pocket. Entry angle: ~2 degrees. Params: `{ totalHook: 0, showEntryAngle: true }`
2. **"See it: Moderate hook -- 12 boards"** -- Ball starts at board 18, hooks to board 8 at breakpoint, returns to board 17.5 at pins. Entry angle: ~4.5 degrees. Params: `{ totalHook: 12, showEntryAngle: true }`
3. **"See it: Power hook -- 20+ boards"** -- Ball starts at board 25, hooks to board 5, sweeps back to 17.5. Entry angle: ~6 degrees (optimal). Params: `{ totalHook: 22, showEntryAngle: true }`

#### Key Animation
As the Total Hook slider moves, a single ball path on the lane morphs in real time. The path gets wider (more lateral movement) as hook increases. The entry angle indicator increases correspondingly. The key visual: more hook = wider path = steeper entry angle = bigger pocket.

#### The "Aha" Moment
The entry angle indicator. At 0 boards of hook: 2 degrees entry angle. At 12 boards: 4.5 degrees. At 22 boards: 6 degrees (optimal). The user sees that hook isn't about looking cool -- it's about ENTRY ANGLE. The entire point of hooking the ball is to arrive at the pins at 6 degrees instead of 2 degrees. That seemingly small angle difference determines whether the pocket is 2 inches wide (low angle) or 7 inches wide (6 degrees).

---

### 6.5 Loft

#### What the user sees on load
Side view of the bowler figure at the foul line, releasing the ball. The ball arcs through the air before landing on the lane surface. A measurement line shows the loft distance (horizontal distance from foul line to where the ball first contacts the lane). The foul line is prominent. Lane dots at 7 feet provide a distance reference.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Loft Distance | Slider | 0.5-6 feet | 1.5 | How far past foul line the ball lands |
| Show Impact Point | Toggle | on/off | on | Marks where ball contacts lane |
| Show Oil Pattern Start | Toggle | on/off | off | Shows where the oil begins (at foul line) |

#### SceneCues (in content order)
1. **"See it: Standard loft (1-2 feet)"** -- Ball lands gently just past the foul line. Normal delivery. Params: `{ loftDistance: 1.5, showImpactPoint: true }`
2. **"See it: Heavy loft (5 feet) -- skipping the heads"** -- Ball arcs well past the foul line, landing near the lane dots. The section of oil it skipped is highlighted in gray. Params: `{ loftDistance: 5, showOilPatternStart: true }`
3. **"See it: Drop shot (6 inches) -- immediate engagement"** -- Ball barely leaves the hand before hitting the lane. It immediately encounters friction. Params: `{ loftDistance: 0.5, showOilPatternStart: true }`

#### Key Animation
The ball traces an arc through the air (parabolic trajectory) from the bowler's hand to the lane surface. A "splash" effect marks landing. The loft slider changes the arc height and distance in real time. When "Show Oil Pattern Start" is on, the oil is shown starting at the foul line -- any loft distance means the ball SKIPS over that much oil, effectively shortening the pattern.

#### The "Aha" Moment
Enabling "Show Oil Pattern Start" and sliding loft from 0.5 to 6 feet. The user watches the ball skip over more and more of the oiled section. At 6 feet of loft, the ball bypasses the first 6 feet of oil entirely. This is why loft is a TOOL, not just a side effect: on heavy oil, intentionally lofting the ball past the heads lets you skip the thickest oil and get your ball to hook sooner. It's not just "how high did you throw it" -- it's strategic pattern manipulation.

---

## Chapter 7: The Lane (Conditions)

---

### 7.1 Oil Pattern Basics

#### What the user sees on load
Overhead lane view with a semi-transparent blue/teal oil overlay showing the oil pattern. The overlay is darker where oil is heavier (center) and lighter/absent where it's dry (outside boards). A cross-section view is available showing oil depth from left to right at a specific distance down the lane.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| View | Dropdown | Overhead / Cross-Section / Both | Overhead | How the pattern is displayed |
| Distance (for cross-section) | Slider | 5-45 feet | 20 | Where the cross-section slice is taken |
| Show Volume | Toggle | on/off | off | Shows total oil volume in mL |
| Highlight Friction Zones | Toggle | on/off | off | Colors zones by friction level: blue (oily/low friction), red (dry/high friction) |

#### SceneCues (in content order)
1. **"See it: Oil is invisible on a real lane"** -- Oil overlay fades away completely. The lane looks bare and identical everywhere. Then it fades back in, revealing the hidden pattern. Params: `{ showOilFadeAnimation: true }`
2. **"See it: Heavy center, dry outside"** -- Cross-section at 20ft shows dramatic difference: tall blue bars in center, nothing on outside boards. Params: `{ view: "Cross-Section", distance: 20, highlightFrictionZones: true }`
3. **"See it: Why the ball hooks"** -- Ball path overlay shows: ball skids on heavy oil center, then hits dry outside boards and suddenly grips. The friction differential IS the hook. Params: `{ highlightFrictionZones: true, showBallPath: true }`

#### Key Animation
The "oil is invisible" reveal. The oil overlay fades in like thermal imaging, showing the hidden landscape beneath the lane's uniform surface. The center boards glow deep blue (heavy oil), the outside boards glow warm red (dry/friction), and the transition zone shows a gradient. This reveals the invisible battlefield that determines ball behavior.

#### The "Aha" Moment
The friction zone visualization with ball path overlay. The ball travels straight through the blue (oily) center zone -- no hook possible, the ball is sliding on what is essentially an ice rink. Then it exits the oil and hits the red (dry) zone. Friction instantly spikes. The ball grabs and hooks. The user sees that a bowling ball doesn't hook because the bowler spins it -- it hooks because it LEAVES THE OIL. The oil pattern IS the ball motion. The bowler just rides the pattern.

---

### 7.2 House Shot

#### What the user sees on load
Overhead lane view with the house shot oil pattern displayed. The distinctive "crown" shape is visible: extremely heavy oil in the center (boards 10-30), virtually nothing on the outside (boards 1-7). The ratio "10:1" is displayed prominently. A ball path shows the typical line played on a house shot.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Show Miss Room | Toggle | on/off | off | Shows what happens when you miss left or right |
| Oil Ratio | Slider | 3:1-12:1 | 10:1 | Adjusts the center-to-outside oil ratio |
| Show "Walls" | Toggle | on/off | off | Highlights the friction walls on outside boards |

#### SceneCues (in content order)
1. **"See it: The forgiving house shot"** -- Ball takes the ideal line, strikes. Params: `{ showMissRoom: false, oilRatio: "10:1" }`
2. **"See it: Miss outside -- the wall saves you"** -- Ball drifts toward the gutter, hits dry boards, hooks back hard to the pocket. Strike anyway. The "wall" glows red. Params: `{ showMissRoom: true, missDirection: "outside" }`
3. **"See it: Miss inside -- the oil holds you"** -- Ball drifts inside, slides on heavy oil, holds its line to the pocket. Strike anyway. Params: `{ showMissRoom: true, missDirection: "inside" }`

#### Key Animation
Three ball paths animate sequentially: (1) perfect line = strike, (2) miss outside = the dry boards hook it back = strike, (3) miss inside = the heavy oil holds it straight = strike. The house shot gives you a 6-8 board "miss room" where errors correct themselves.

#### The "Aha" Moment
Watching all three paths end at the pocket despite starting on completely different boards. The house shot's 10:1 ratio creates invisible "bumper lanes" that funnel errant shots back to the pocket. The user realizes that scoring 200+ on a house shot means less than they thought -- the lane is helping. This is why sport shots (later section) are so much harder: the assistance disappears.

---

### 7.3 PBA Patterns

#### What the user sees on load
Overhead lane view showing one PBA animal pattern (default: Cheetah, the shortest/easiest). A dropdown selector lets the user switch between all 10 PBA patterns. Each pattern shows its distinctive oil distribution, length, and name. The pattern name is displayed large.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Pattern | Dropdown | Wolf / Cheetah / Viper / Chameleon / Bear / Scorpion / Dragon / Badger / Shark / Bat | Cheetah | Which PBA pattern to display |
| Show Ideal Line | Toggle | on/off | on | Shows the recommended ball path for this pattern |
| Show Breakpoint | Toggle | on/off | on | Shows Rule of 31 breakpoint |
| Compare to House | Toggle | on/off | off | Overlays house shot for comparison |

#### SceneCues (in content order)
1. **"See it: Cheetah (35ft) -- the highest-scoring PBA pattern"** -- Short pattern, dry outside. Ball plays close to the gutter. Breakpoint at board 4. Params: `{ pattern: "Cheetah", showIdealLine: true, showBreakpoint: true }`
2. **"See it: Bear (41ft) -- the flat pattern"** -- Near-1:1 ratio. No walls. Every miss goes exactly where you miss. Params: `{ pattern: "Bear", showIdealLine: true, compareToHouse: true }`
3. **"See it: Badger (47ft) -- the longest pattern"** -- Oil extends almost to the pins. Ball must play deep inside. Breakpoint at board 16. Params: `{ pattern: "Badger", showIdealLine: true, showBreakpoint: true }`

#### Key Animation
When switching between patterns, the oil overlay morphs smoothly from one shape to the next. The pattern length extends or contracts, the oil distribution shifts. The ideal ball path line simultaneously adjusts: short patterns = play outside near the gutter, long patterns = play deep inside. The breakpoint diamond moves correspondingly.

#### The "Aha" Moment
Enabling "Compare to House" and switching between patterns. The house shot's massive 10:1 ratio with its wide "walls" is overlaid in gray. The PBA pattern's much flatter, lower-ratio distribution sits on top. The difference is stark: the house shot has huge dry zones creating miss room. The PBA pattern's oil extends further outside, eliminating the walls. The user sees why pros score 20-40 pins lower on sport conditions -- the safety net vanishes.

---

### 7.4 Sport Shots

#### What the user sees on load
Side-by-side overhead view: left lane shows a house shot (10:1 ratio), right lane shows a sport shot (3:1 ratio). Both lanes have the same ball path starting position. The contrast in oil distribution is immediately visible.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Sport Ratio | Slider | 1:1-4:1 | 3:1 | Side-to-side oil ratio for the sport pattern |
| Show Miss Test | Toggle | on/off | off | Shows what happens when you miss 3 boards right on each |
| Classification | Dropdown | Standard (8:1+) / Challenge (4:1-8:1) / Sport (under 4:1) | Sport | USBC classification |

#### SceneCues (in content order)
1. **"See it: House shot miss = still strikes"** -- Miss 3 boards right on house shot. The wall catches it. Strike. Params: `{ showMissTest: true, classification: "Standard" }`
2. **"See it: Sport shot miss = gutter"** -- Same 3-board miss on sport shot. No wall. Ball goes to the gutter. Params: `{ showMissTest: true, classification: "Sport" }`

#### Key Animation
Both lanes animate simultaneously. On the house shot, the ball misses 3 boards right, hits the dry outside, and hooks back aggressively into the pocket -- strike. On the sport shot, the same miss hits boards with nearly equal oil, doesn't get any extra friction, and slides into the gutter.

#### The "Aha" Moment
The split-screen miss test. The EXACT SAME miss -- 3 boards to the right -- produces a strike on a house shot and a gutter ball on a sport shot. The user understands in one visual that bowling difficulty is determined by the lane condition, not (only) the bowler's skill. A 200-average league bowler might average 160 on sport conditions, not because they forgot how to bowl, but because the lane stopped helping them.

---

### 7.5 Lane Transition

#### What the user sees on load
Overhead lane view showing the oil pattern in its "fresh" state. A timeline slider at the bottom represents games 1-6. The oil pattern is bright and well-defined. The ball path is consistent shot after shot.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Game Number | Slider | 1-6 | 1 | How many games have been played (how much transition) |
| Show Track Area | Toggle | on/off | on | Highlights boards 8-12 where most balls travel |
| Show Carrydown | Toggle | on/off | off | Shows oil pushed past the pattern end |
| Play Time-Lapse | Button | -- | -- | Animates from game 1 to game 6 |

#### SceneCues (in content order)
1. **"See it: Fresh oil -- game 1"** -- Pattern is pristine. Oil is even and bright. Ball hooks predictably. Params: `{ gameNumber: 1 }`
2. **"See it: Game 4 -- the track area is drying"** -- Track area (boards 8-12) has visibly less oil. Ball hooks earlier and more in that zone. Carrydown extends past the pattern. Params: `{ gameNumber: 4, showTrackArea: true, showCarrydown: true }`
3. **"See it: Full time-lapse"** -- Rapid animation from game 1 to 6. The oil visibly erodes in the track area while building up past the pattern end. Params: `{ autoPlayTimeLapse: true }`

#### Key Animation
The time-lapse is the star. The oil pattern -- initially uniform and bright -- degrades progressively. The track area (boards 8-12) dims first (oil removal). Simultaneously, a faint blue glow extends PAST the original pattern end (carrydown). By game 6, the track area is nearly bare, and the carrydown extends 5-8 feet past the pattern. The ball's reaction changes each game: hooks more through the track area but less at the breakpoint.

#### The "Aha" Moment
The time-lapse played at full speed. The user watches the oil landscape transform from a clear, designed pattern into a worn, asymmetric mess over 6 games. The track area hollows out while oil builds up past the pattern end. The dual process -- oil LEAVING the track area while ARRIVING past the breakpoint -- is the reason bowlers must constantly adjust. The lane is a living surface that changes with every shot.

---

### 7.6 Lane Surfaces

#### What the user sees on load
Split view: left shows a wooden lane surface with visible grain pattern (maple heads, pine midlane). Right shows a smooth synthetic lane surface. A bowling ball sits on each surface, ready to roll.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Surface | Dropdown | Wood / Synthetic / Split View | Split View | Which surface to display |
| Show Ball Motion Comparison | Toggle | on/off | on | Shows ball path shape on each surface |
| Show Friction Values | Toggle | on/off | off | Displays friction coefficients |

#### SceneCues (in content order)
1. **"See it: Wood -- smooth arcing motion"** -- Ball on wood shows a gradual, continuous curve. Friction: 0.15-0.18. Params: `{ surface: "Wood", showBallMotionComparison: true, showFrictionValues: true }`
2. **"See it: Synthetic -- skid-snap"** -- Ball on synthetic skids long, then snaps sharply. Friction: 0.12-0.16. Params: `{ surface: "Synthetic", showBallMotionComparison: true, showFrictionValues: true }`

#### Key Animation
Both balls launch simultaneously. On wood, the ball begins curving early and traces a smooth arc -- like a gentle curve in a road. On synthetic, the ball skids longer (lower friction) then snaps harder (the friction "cliff" is steeper). The two paths clearly differ in shape despite the same ball and bowler inputs.

#### The "Aha" Moment
The side-by-side ball paths. Same ball, same throw, completely different motion shapes. Wood = smooth continuous arc. Synthetic = long straight skid then sharp angular break. The user understands that the lane surface type fundamentally changes ball behavior, and why bowlers who travel between centers with different surfaces must adjust their game.

---

## Chapter 8: The Strike

---

### 8.1 The Pocket

#### What the user sees on load
Close-up overhead view of the pin deck. The 10 pins are standing. A glowing line shows the ideal ball path entering the "pocket" -- the gap between pins 1 and 3 (for a right-hander). Board 17.5 is highlighted. The entry angle line is drawn at 6 degrees.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Hand | Dropdown | Right-Handed / Left-Handed | Right-Handed | Switches pocket location (1-3 vs 1-2) |
| Entry Board | Slider | 15-20 | 17.5 | Where the ball center is at head pin contact |
| Show Entry Line | Toggle | on/off | on | Shows the ball's approach angle |

#### SceneCues (in content order)
1. **"See it: The 1-3 pocket (right-hander)"** -- The gap between pins 1 and 3 glows gold. Board 17.5 is marked. Params: `{ hand: "Right-Handed", entryBoard: 17.5 }`
2. **"See it: The 1-2 pocket (left-hander)"** -- View flips. Pocket is between pins 1 and 2 on the left side. Params: `{ hand: "Left-Handed" }`
3. **"See it: Brooklyn -- the wrong pocket"** -- Ball crosses over to the wrong side of the head pin. The "wrong" pocket flashes red. Params: `{ showBrooklyn: true }`

#### Key Animation
The ball path line pulses from the breakpoint area through the pin deck, entering the pocket at exactly board 17.5. Pin 1 glows on one side, pin 3 on the other, and the gap between them pulses gold -- this is the sweet spot, and it's only about 7 inches wide.

#### The "Aha" Moment
The Entry Board slider. At 17.5 (optimal), the ball enters perfectly between pins 1 and 3. Sliding to 18.5 (just one board off), the ball hits too much of the head pin -- the pocket miss is dramatic. Sliding to 16.5, the ball catches the head pin light -- another bad result. The user sees that the "pocket" is a target about 1 inch wide at a distance of 60 feet. The precision required is astounding.

---

### 8.2 Entry Angle

#### What the user sees on load
Overhead view of the pin deck with the ball approaching at the default 4-degree entry angle. A large protractor overlay shows the angle between the ball's path and the board lines. The angle reads "4.0 degrees." The pocket is highlighted.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Entry Angle | Slider | 1-8 degrees | 4 | Angle of ball entering the pocket |
| Show Strike Zone Width | Toggle | on/off | on | Shows how wide the strike zone is at this angle |
| Show Ball Path | Toggle | on/off | on | Shows the ball's approach trajectory |

#### SceneCues (in content order)
1. **"See it: 2 degrees -- beginner straight ball"** -- Shallow angle. Strike zone is narrow (shown as a thin green band on pins 1-3). Params: `{ entryAngle: 2, showStrikeZoneWidth: true }`
2. **"See it: 6 degrees -- optimal"** -- Steep angle. Strike zone is wide (shown as a thick green band). Params: `{ entryAngle: 6, showStrikeZoneWidth: true }`
3. **"See it: The pocket gets BIGGER at 6 degrees"** -- Animated comparison: 2 degrees (narrow green band) transitions to 6 degrees (wide green band). The band literally triples in width. Params: `{ animateAngleComparison: true }`

#### Key Animation
The strike zone is visualized as a green band on the head pin surface -- the "acceptable" contact window. At 2 degrees, this band is about 1 inch. At 6 degrees, it expands to about 3 inches. The band width changes in real time as the slider moves. The protractor angle updates simultaneously.

#### The "Aha" Moment
The animated comparison between 2 and 6 degrees. The strike zone (green band on the head pin) literally TRIPLES in width. At 2 degrees, the bowler needs to hit a 1-inch window. At 6 degrees, the window is 3 inches. Same ball, same pocket, but the entry angle makes the target three times easier to hit. THIS is why hooking the ball matters -- not for style, but because it widens the strike zone from a razor's edge to a reasonable target.

---

### 8.3 Pin Action

#### What the user sees on load
Close-up overhead view of the pin deck with the ball approaching the pocket. All 10 pins are standing. The scene is paused just before impact. Pin numbers are visible. Color-coded chain reaction indicators are ready to show: green chain (1>2>4>7), red chain (3>6>10), blue chain (5>8), direct (9).

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play Impact | Button | -- | -- | Plays the strike animation |
| Speed | Slider | 0.1x-2x | 0.3x | Playback speed (slow motion for chain reactions) |
| Show Chain Colors | Toggle | on/off | on | Color-codes each pin chain reaction |
| Highlight Ball Path | Toggle | on/off | on | Shows which 4 pins the ball directly touches |

#### SceneCues (in content order)
1. **"See it: The ball only hits 4 pins"** -- Ball enters pocket. Only pins 1, 3, 5, 9 are directly contacted (glow orange). The other 6 stay standing momentarily. Params: `{ autoPlay: true, speed: 0.1, highlightBallPath: true }`
2. **"See it: The chain reactions"** -- Full slow-motion strike. Green chain: 1 sends 2 into 4 into 7. Red chain: 3 sends 6 into 10. Blue chain: 5 sends 8. Each chain lights up in sequence. Params: `{ autoPlay: true, speed: 0.2, showChainColors: true }`
3. **"See it: The messenger"** -- A pin (2-pin) flies across the deck to clip the 10-pin. The messenger's path is traced in orange. Params: `{ showMessenger: true, speed: 0.3 }`

#### Key Animation
Ultra-slow-motion strike sequence. The ball enters the pocket and contacts pin 1 (flash). Pin 1 flies left into pin 2 (green flash). Pin 3 is driven right (red flash). Pin 5 gets hit (blue flash). Pin 9 is last direct contact. Then the chain reactions cascade: 2 hits 4, 4 hits 7. 3 hits 6, 6 hits 10. 5 hits 8. Each chain has its own color, and each pin-to-pin collision flashes.

#### The "Aha" Moment
The ultra-slow-motion view at 0.1x speed with chain colors enabled. The user watches the entire chain reaction unfold over several seconds. They see pin 1 get hit and send pin 2 flying left. Pin 2 crashes into pin 4. Pin 4 sweeps into pin 7. Each step is a separate collision event with visible cause and effect. The user realizes a strike is not a single event -- it's a precisely orchestrated CHAIN REACTION. The ball starts the first domino; geometry and physics do the rest.

---

### 8.4 Speed at the Pins

#### What the user sees on load
Side view of the pin deck with a ball approaching from the left. A speedometer display shows the ball's speed. Pins are standing. The speed reads 17 mph (optimal).

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Speed at Pins (mph) | Slider | 12-22 | 17 | Ball speed when reaching the pins |
| Play Impact | Button | -- | -- | Shows the impact result |
| Show Deflection | Toggle | on/off | on | Shows how much the ball deflects after hitting pin 1 |

#### SceneCues (in content order)
1. **"See it: Too slow (13 mph)"** -- Ball enters pocket but deflects heavily. It pushes weakly through the deck. The 10-pin stays standing (flat 10). Params: `{ speed: 13, autoPlay: true, showDeflection: true }`
2. **"See it: Optimal (17 mph)"** -- Ball drives through the deck with minimal deflection. All pins scatter. Clean strike. Params: `{ speed: 17, autoPlay: true, showDeflection: true }`
3. **"See it: Too fast (21 mph)"** -- Ball blasts through too quickly. Pins fly but the ball has already passed. The 10-pin still stands (different leave). Params: `{ speed: 21, autoPlay: true, showDeflection: true }`

#### Key Animation
The deflection arrow shows the ball's post-impact path. At slow speeds, the ball deflects dramatically to the left -- it lacks the momentum to drive straight through. At optimal speed, minimal deflection -- the ball stays on the 1-3-5-9 path. At too-fast speeds, the ball flies through but pins scatter chaotically instead of in controlled chains.

#### The "Aha" Moment
The deflection visualization at different speeds. At 13 mph, the ball enters the pocket and gets knocked sideways by the head pin -- it DEFLECTS rather than drives through. The 5-pin and 9-pin are never properly contacted. At 17 mph, the ball barely budges off course -- it has enough mass and velocity to drive straight through the 1-3-5-9 path. Speed isn't about power -- it's about DEFLECTION RESISTANCE. The ball needs enough momentum to stay on course through four pin impacts.

---

### 8.5 Common Pin Leaves

#### What the user sees on load
Overhead pin deck view with all 10 pins standing. A dropdown menu lets the user select different common leaves. Each leave shows which pins remain standing and a brief explanation of what went wrong.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Leave Type | Dropdown | Flat 10 / Ringing 10 / Solid 8 / 7-10 Split / Baby Split (3-10) / Washout / Bucket / Greek Church | Flat 10 | Which leave to display |
| Show What Went Wrong | Toggle | on/off | on | Shows the ball path and physics explanation |
| Animate | Button | -- | -- | Plays the shot that produced this leave |

#### SceneCues (in content order)
1. **"See it: The dreaded flat 10"** -- Ball enters pocket weakly. The 6-pin lays down in the channel instead of carrying the 10-pin. The lone 10-pin stands. Params: `{ leaveType: "Flat 10", showWhatWentWrong: true }`
2. **"See it: The ringing 10"** -- Ball enters with TOO MUCH energy. The 6-pin wraps AROUND the 10-pin, spinning it in place. Params: `{ leaveType: "Ringing 10", showWhatWentWrong: true }`
3. **"See it: The impossible 7-10 split"** -- Ball hits the head pin dead center. Pin 1 flies straight back. No lateral action. Pins 7 and 10 stand alone at the corners. Params: `{ leaveType: "7-10 Split", showWhatWentWrong: true }`

#### Key Animation
For each leave, the shot plays in slow motion showing exactly why the pins were left. For the flat 10: the 6-pin is driven at the wrong angle and falls into the gutter channel BEFORE reaching the 10-pin. For the ringing 10: the 6-pin contacts the 10-pin but wraps around it, causing it to spin instead of fall. The difference between these two 10-pin leaves tells the bowler completely different things about their shot.

#### The "Aha" Moment
The flat 10 vs ringing 10 comparison. Both leave the same pin (10) standing, but for opposite reasons. Flat 10: too little energy, the 6-pin falls short. Ringing 10: too much energy, the 6-pin wraps around. The user learns that pin leaves are DIAGNOSTIC -- they tell you what went wrong. The 10-pin isn't just "still standing" -- HOW it was left reveals whether you need more power or less.

---

### 8.6 The Perfect Game

#### What the user sees on load
The scorecard from section 1.3 returns, but now with a full lane view behind it. The scorecard is empty. A "Play" button will trigger a rapid-fire 12-strike animation. The mood is dramatic -- darker lighting, spotlight on the lane.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play Perfect Game | Button | -- | -- | Animates 12 consecutive strikes |
| Show Consistency Bands | Toggle | on/off | off | Shows how tight the variation must be between shots |
| Speed | Slider | 0.5x-3x | 1x | Animation speed |

#### SceneCues (in content order)
1. **"See it: 12 consecutive strikes"** -- All 12 strikes animate rapidly. Score climbs: 30, 60, 90... 300. Gold explosion at 300. Params: `{ autoPlay: true, speed: 1.5 }`
2. **"See it: The consistency required"** -- 12 ball paths overlay on the lane. They must all land within 1-2 boards of each other. The tolerance band is shown -- it's incredibly narrow. Params: `{ showConsistencyBands: true }`

#### Key Animation
Twelve ball paths draw themselves on the lane in rapid succession, each one nearly identical to the last. The paths stack on top of each other, forming a narrow corridor from foul line to pocket. At the end, the corridor glows -- this is the "repeatability zone" a bowler must stay within for 12 consecutive shots. The tolerance: about 1-2 boards at the arrows, +/- 0.5 mph speed, identical release every time.

#### The "Aha" Moment
The consistency bands. Twelve overlaid ball paths that look like a single path until you zoom in -- then you see the tiny variations. The corridor is about 2 boards wide at the arrows (roughly 2 inches) and narrows to less than 1 board at the breakpoint. The user realizes a 300 game isn't about power or flashy hooks -- it's about doing EXACTLY the same thing 12 times in a row, within a margin of error smaller than the width of your finger.

---

## Chapter 9: Spares

---

### 9.1 Why Spares Matter

#### What the user sees on load
Two scorecards side by side. Left card: a bowler who strikes 50% and spares 60%. Right card: a bowler who strikes 40% but spares 90%. The right card has the higher total score, despite fewer strikes.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Strike Rate | Slider | 20%-70% | 40% | Percentage of first balls that strike |
| Spare Rate | Slider | 40%-100% | 70% | Percentage of non-strike frames where spare is converted |
| Show Estimated Average | Toggle | on/off | on | Shows the resulting average score |
| Compare Mode | Toggle | on/off | on | Shows two scorecards with different rates |

#### SceneCues (in content order)
1. **"See it: Spare conversion = 10 bonus pins"** -- A single spare frame animates: spare (10 + next ball bonus) vs open frame (just the pins knocked down). The 10-pin difference is highlighted. Params: `{ showSingleSpareValue: true }`
2. **"See it: +1 spare per game = +10 average"** -- Two scorecards: one converting 6 spares, one converting 7. The one-spare difference produces a ~10-pin average improvement. Params: `{ compareMode: true, spareRateDelta: 10 }`

#### Key Animation
The estimated average display updates in real time as sliders move. Increasing spare rate from 60% to 80% while keeping strike rate constant shows the average jump from ~160 to ~190. The spare rate slider has a more dramatic effect on score than the strike rate slider for bowlers below 200 average.

#### The "Aha" Moment
Moving the spare rate slider from 60% to 90% with a fixed 40% strike rate. The estimated average jumps from about 160 to about 195 -- a 35-pin improvement from spares alone, without throwing a single additional strike. The user discovers that spare conversion is the highest-leverage skill in bowling. It's not sexy, but it's the fastest path from 160 to 200.

---

### 9.2 The 3-6-9 System

#### What the user sees on load
Overhead lane view showing the bowler's feet position at the approach dots and the ball path to the pocket (strike line). The target arrow (at 15ft) is highlighted. The view shows the approach area and full lane.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Target Pin | Dropdown | Strike / 2-pin / 4-pin / 7-pin / 3-pin / 6-pin / 10-pin | Strike | Which spare to shoot |
| Show Foot Movement | Toggle | on/off | on | Shows the board offset from strike position |
| Show Arrow (fixed) | Toggle | on/off | on | Shows that the arrow target doesn't change |

#### SceneCues (in content order)
1. **"See it: Strike line (reference)"** -- Normal strike line. Feet at board 20, target at 2nd arrow. Params: `{ targetPin: "Strike", showFootMovement: true }`
2. **"See it: 7-pin spare -- move 9 boards right"** -- Feet shift 9 boards right. Same arrow target. Ball path angles across to the 7-pin on the far left. Params: `{ targetPin: "7-pin", showFootMovement: true, showArrow: true }`
3. **"See it: 10-pin spare -- move 9 boards left"** -- Feet shift 9 boards left. Same arrow target. Ball path crosses the lane to the 10-pin on the far right. Params: `{ targetPin: "10-pin", showFootMovement: true, showArrow: true }`

#### Key Animation
The feet markers slide along the approach dots while the arrow target stays fixed. For each spare, a new ball path line draws from the new foot position, through the same arrow, to the target pin. The "3" (one row), "6" (two rows), "9" (three rows) movement amounts are labeled at the feet.

#### The "Aha" Moment
Switching rapidly between different pin targets and watching the feet slide 3, 6, or 9 boards while the arrow target NEVER MOVES. The entire system is elegantly simple: same target, different starting position, different angle. The user discovers that spare shooting is just geometry -- move your feet to change the angle, keep the same target to maintain consistency. One system handles every spare.

---

### 9.3 Corner Pin Spares

#### What the user sees on load
Overhead lane view showing the 10-pin standing alone on the far right of the pin deck. The bowler's feet are positioned far left on the approach. A diagonal line shows the cross-lane angle. A spare ball (plastic, shown as a lighter color) is used.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Corner Pin | Dropdown | 10-pin / 7-pin | 10-pin | Which corner pin |
| Show Angle | Toggle | on/off | on | Shows the cross-lane diagonal |
| Show Target Window | Toggle | on/off | on | Shows how wide the margin of error is |
| Ball Type | Dropdown | Plastic (Straight) / Reactive (Hook) | Plastic | Which ball is used |

#### SceneCues (in content order)
1. **"See it: Cross-lane angle for the 10-pin"** -- Ball travels diagonally across the entire lane. The angle creates the maximum possible target window. Params: `{ cornerPin: "10-pin", showAngle: true, showTargetWindow: true, ballType: "Plastic" }`
2. **"See it: Why plastic for corner pins"** -- Two paths overlay: plastic ball (straight, predictable) vs reactive ball (hooks unpredictably across dry boards). Params: `{ showBothBallTypes: true }`

#### Key Animation
The plastic ball path is a clean, straight diagonal line. The reactive ball path starts similarly but hooks unexpectedly at the backend, potentially missing the pin. The target window visualization shows: the diagonal cross-lane angle gives you the widest margin of error because you're approaching the pin from the maximum distance.

#### The "Aha" Moment
The two-ball comparison. The plastic ball takes a straight, predictable path to the 10-pin. The reactive ball takes what starts as the same path but then hooks off course because it encounters friction on the dry outside boards. The user understands why nearly every pro carries a plastic spare ball: when shooting corner pins across dry boards, you want ZERO hook. Predictability beats power.

---

### 9.4 Split Conversions

#### What the user sees on load
The pin deck with a 3-10 baby split displayed. The two pins stand alone with a gap between them. A ball path shows the difficult angle needed to clip both pins. The conversion probability is displayed.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Split Type | Dropdown | Baby Split (3-10) / 4-5 / 7-10 / Big Four (4-6-7-10) / Greek Church | Baby Split (3-10) | Which split to display |
| Show Conversion Path | Toggle | on/off | on | Shows the ball path needed to convert |
| Show Probability | Toggle | on/off | on | Shows approximate conversion probability |

#### SceneCues (in content order)
1. **"See it: Baby split -- makeable"** -- Ball path shows clipping the 3-pin at just the right angle to deflect it into the 10-pin. Probability: ~40%. Params: `{ splitType: "Baby Split (3-10)", showConversionPath: true, showProbability: true }`
2. **"See it: 7-10 split -- nearly impossible"** -- Ball path shows you can only hit one pin. The other is 36 inches away with nothing between them. Probability: <1%. Params: `{ splitType: "7-10", showConversionPath: true, showProbability: true }`

#### Key Animation
For the baby split, the conversion path animates: ball clips the 3-pin at its edge, the 3-pin flies across and contacts the 10-pin. The margin of error is shown as a tiny green zone on the 3-pin. For the 7-10, both pins stand at opposite corners of the deck with nothing between them -- the visual impossibility is immediate.

#### The "Aha" Moment
The 7-10 split. Two pins standing at opposite corners of the deck, 36 inches apart, with NOTHING between them. The ball can only contact one pin at a time. The only conversion method: hit one pin so hard it bounces off the side wall and crosses the entire deck to get the other. The visual instantly explains why the 7-10 is iconic -- it's not just hard, it's geometrically hostile.

---

## Chapter 10: Equipment Strategy

---

### 10.1 Choosing Your First Ball

#### What the user sees on load
Two bowling balls side by side on pedestals: a plastic ball (high gloss, labeled "Spare/Beginner") and a reactive ball (matte, labeled "Strike Ball"). The lane behind them shows each ball's typical motion path.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Ball Type | Dropdown | Plastic / Urethane / Reactive | Plastic | Which ball to examine |
| Show Motion on Lane | Toggle | on/off | on | Shows the ball path for this type |
| Show Price Range | Toggle | on/off | off | Shows approximate cost tier |

#### SceneCues (in content order)
1. **"See it: Plastic -- straight and predictable"** -- Ball path on lane is nearly straight. Good for learning fundamentals and spare shooting. Params: `{ ballType: "Plastic", showMotionOnLane: true }`
2. **"See it: Reactive -- your first hook ball"** -- Ball path shows a moderate hook. The curve increases scoring potential. Params: `{ ballType: "Reactive", showMotionOnLane: true }`

#### Key Animation
Switching between ball types morphs both the ball's surface appearance AND the lane path simultaneously. The connection between surface and motion is reinforced every time you switch.

#### The "Aha" Moment
The visual difference in ball paths. The plastic ball goes straight -- safe, predictable, but limited. The reactive ball hooks -- unpredictable at first but with 3x the strike potential. The user sees why the recommendation is always "get a custom-drilled reactive ball AND a plastic spare ball." They serve completely different purposes.

---

### 10.2 Building an Arsenal

#### What the user sees on load
A ball rack displaying 6 balls in Storm's recommended slot system. Each ball is in a different color representing its reaction type. Labels show: Strong/Smooth, Strong/Sharp, Medium/Smooth (Benchmark), Medium/Sharp, Weak/Smooth, Weak/Sharp. The background is a pro shop aesthetic.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Arsenal Size | Slider | 1-6 | 3 | How many balls in the collection |
| Highlight Slot | Dropdown | None / 1-6 | None | Which slot to focus on |
| Show Lane Condition Match | Toggle | on/off | off | Shows which oil condition each ball is for |

#### SceneCues (in content order)
1. **"See it: The beginner's 2-ball arsenal"** -- Only 2 balls displayed: a benchmark reactive (Slot 3) and a plastic spare ball (Slot 6). Params: `{ arsenalSize: 2, highlightSlot: "3" }`
2. **"See it: The league bowler's 4-ball arsenal"** -- 4 balls: strong, benchmark, weaker reactive, and spare ball. Each mapped to a condition. Params: `{ arsenalSize: 4, showLaneConditionMatch: true }`
3. **"See it: Full 6-ball tournament arsenal"** -- All 6 slots filled. A spectrum from "heavy oil bruiser" to "dry lane finesse" to "plastic spare." Params: `{ arsenalSize: 6, showLaneConditionMatch: true }`

#### Key Animation
When "Show Lane Condition Match" is enabled, an oil pattern overview appears behind each ball. Heavy oil patterns pair with the strong balls. Dry conditions pair with the weak balls. The visual creates a clear "matching game" between equipment and conditions.

#### The "Aha" Moment
Seeing the full 6-ball spectrum mapped to conditions. Each ball sits above its ideal oil pattern. The user realizes an arsenal isn't about collecting cool balls -- it's a TOOLKIT where each ball is a specialized tool for a specific condition. Like a golfer choosing between a driver and a pitching wedge, a bowler chooses between their heavy-oil bruiser and their dry-lane finesse ball based on what the lanes demand.

---

### 10.3 Matching Ball to Oil

#### What the user sees on load
Split view: left side shows an oil pattern selector (dropdown of different conditions). Right side shows the lane with the selected oil pattern and a ball. The ball's behavior on the lane changes based on how well it matches the condition.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Oil Condition | Dropdown | Heavy / Medium-Heavy / Medium / Light-Medium / Dry | Medium | Lane condition |
| Ball Type | Dropdown | Solid Reactive / Hybrid / Pearl / Urethane / Plastic | Hybrid | Ball coverstock type |
| Surface Grit | Slider | 500-4000 (+ Polish) | 2000 | Ball surface preparation |
| Play | Button | -- | -- | Shows ball reaction on selected condition |

#### SceneCues (in content order)
1. **"See it: Right ball, right condition"** -- Medium oil with a hybrid reactive at 2000 grit. Ball hooks perfectly through the pattern. Params: `{ oilCondition: "Medium", ballType: "Hybrid", surfaceGrit: 2000, autoPlay: true }`
2. **"See it: Wrong ball -- too aggressive for dry"** -- Dry lanes with a sanded solid reactive. Ball hooks off the lane immediately. Params: `{ oilCondition: "Dry", ballType: "Solid Reactive", surfaceGrit: 500, autoPlay: true }`
3. **"See it: Wrong ball -- too weak for heavy oil"** -- Heavy oil with a polished pearl. Ball slides straight and never hooks. Params: `{ oilCondition: "Heavy", ballType: "Pearl", surfaceGrit: "Polish", autoPlay: true }`

#### Key Animation
The ball launches on the lane and the result is immediately visible. Matched ball: controlled, predictable arc into the pocket. Too aggressive: ball hooks off the lane in the first 15 feet. Too weak: ball slides straight into the gutter without ever gripping. The mismatch between ball and condition produces dramatically bad results.

#### The "Aha" Moment
The mismatch animations. A sanded solid reactive on dry lanes hooks so violently it barely travels 30 feet before crossing into the gutter. A polished pearl on heavy oil slides the entire 60 feet without ever hooking. The user realizes that ball selection isn't preference -- it's NECESSITY. The wrong ball on the wrong condition doesn't just perform poorly; it's unusable.

---

### 10.4 Surface Adjustments

#### What the user sees on load
Same ball, shown at three different surface preparations side by side: 500 grit (rough), 2000 grit (balanced), and Polished (smooth). Each has its trajectory shown on a mini-lane below. The ball surface texture is visually different for each.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Grit | Slider | 500-5000 (+ Polish) | 2000 | Surface grit level |
| Show Before/After | Toggle | on/off | off | Shows the same ball at two different grits for comparison |
| Play | Button | -- | -- | Shows ball reaction |

#### SceneCues (in content order)
1. **"See it: 500 grit change transforms the ball"** -- Same ball at 2000 (smooth arc) vs 500 (early hook). The trajectory morphs dramatically. Params: `{ showBeforeAfter: true, gritBefore: 2000, gritAfter: 500 }`
2. **"See it: Polish extends the skid"** -- Same ball at 2000 vs Polish. The trajectory extends much further before hooking. Params: `{ showBeforeAfter: true, gritBefore: 2000, gritAfter: "Polish" }`

#### Key Animation
The before/after comparison shows the same ball (same color, same core) producing completely different trajectories based solely on surface grit. The surface texture visually morphs between rough and smooth as the grit slider moves.

#### The "Aha" Moment
Realizing this is the SAME BALL. Not a different ball, not a different layout -- just different sandpaper. A $0.50 piece of abralon pad changes the ball's trajectory by 10+ boards. Surface adjustment is the cheapest, fastest, most dramatic equipment change a bowler can make, and most recreational bowlers don't even know it exists.

---

## Chapter 11: Reading the Lane

---

### 11.1 Rule of 31

#### What the user sees on load
Overhead lane view with a pattern length input and automatic breakpoint calculation. The oil pattern is displayed at 40 feet (house shot default). Large text: "40 - 31 = Board 9." The breakpoint diamond sits on board 9.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Pattern Length (ft) | Slider | 32-48 | 40 | Oil pattern length |
| Show Calculation | Toggle | on/off | on | Shows the subtraction formula |
| Show All PBA Patterns | Toggle | on/off | off | Shows breakpoint boards for all PBA animal patterns simultaneously |

#### SceneCues (in content order)
1. **"See it: House shot (40ft) = board 9"** -- Standard calculation. Ball path targets board 9 at the breakpoint. Params: `{ patternLength: 40, showCalculation: true }`
2. **"See it: All PBA patterns at once"** -- Every PBA pattern's breakpoint appears as a diamond on the lane, labeled with the pattern name. Wolf at board 3, through Shark at board 17. Params: `{ showAllPBAPatterns: true }`

#### Key Animation
As the Pattern Length slider moves, the oil overlay on the lane extends or contracts in real time, and the breakpoint diamond slides along the lane width. The calculation text updates: "34 - 31 = 3... 38 - 31 = 7... 42 - 31 = 11..." The continuous motion creates a clear linear relationship.

#### The "Aha" Moment
The "All PBA Patterns" toggle. Every pattern's breakpoint appears at once, creating a diagonal line of diamonds from board 3 (Wolf, short) to board 17 (Shark, long). The visual shows that as patterns get longer, the breakpoint moves INSIDE. The entire spectrum of bowling strategy -- from gutter-hugging on short patterns to playing deep inside on long patterns -- is captured in a single image.

---

### 11.2 Watching Ball Reaction

#### What the user sees on load
Overhead lane view showing two overlaid ball paths: one in blue ("Shot 1 -- Fresh") and one in orange ("Shot 5 -- Transitioned"). Both launched from the same position. The fresh-oil path hooks later. The transitioned path hooks earlier.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Transition Level | Slider | Fresh-Moderate-Heavy | Fresh | How much the lane has changed |
| Show Ball Reaction Changes | Toggle | on/off | on | Labels what changed and why |
| Show Multiple Shots | Toggle | on/off | off | Shows 5 shots overlaid showing progressive change |

#### SceneCues (in content order)
1. **"See it: Fresh vs. transitioned"** -- Two paths from the same starting position. The transitioned path hooks 3-4 boards earlier. Params: `{ transitionLevel: "Heavy", showBallReactionChanges: true }`
2. **"See it: Progressive change over 5 shots"** -- Five paths from the same position, each hooking slightly earlier than the last. The lane is eroding. Params: `{ showMultipleShots: true }`

#### Key Animation
Five ball paths draw sequentially, each one hooking a little bit sooner. The first path (blue) hooks at 42 feet. The second (slightly warmer) at 40 feet. The third at 38 feet. By shot 5 (red), the ball is hooking at 34 feet. The visual drift makes transition undeniable -- the same shot produces a different result every time.

#### The "Aha" Moment
The 5-shot progressive overlay. Five identical deliveries, five different ball paths. Each one hooks earlier and more aggressively than the last. The user realizes: even if you throw the perfect shot, the lane changes YOUR ball's reaction. You can't just "find the line" and repeat it -- you must CONTINUOUSLY ADJUST because the target is moving.

---

### 11.3 Making Adjustments

#### What the user sees on load
Overhead lane view with the bowler's feet position and the ball path. The ball path is shown missing the pocket (too far right). The scene shows the adjustment needed: move feet and target.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Adjustment Type | Dropdown | Move Feet / Change Speed / Change Ball / Change Surface | Move Feet | Which adjustment to visualize |
| Move Direction | Dropdown | Left / Right | Left | Direction of foot movement |
| Move Amount (boards) | Slider | 1-6 | 2 | How many boards to move |
| Show Before/After | Toggle | on/off | on | Shows the original and adjusted ball paths |

#### SceneCues (in content order)
1. **"See it: Move feet 2, target 1 (the golden rule)"** -- Feet move 2 boards left, target moves 1 board left. The ball path shifts to find the pocket. Params: `{ adjustmentType: "Move Feet", moveDirection: "Left", moveAmount: 2, showBeforeAfter: true }`
2. **"See it: Slow down to hook earlier"** -- Speed drops 2 mph. The ball hooks earlier, finding the pocket from inside. Params: `{ adjustmentType: "Change Speed", speedDelta: -2, showBeforeAfter: true }`

#### Key Animation
The before (red, missing the pocket) and after (green, hitting the pocket) ball paths show simultaneously. The adjustment is visible: the feet markers shift on the approach, and/or the ball speed indicator changes, and the new path finds the pocket. The 2-and-1 rule is illustrated with measured board movements.

#### The "Aha" Moment
The "move in the direction of the miss" principle. The ball is missing right. The feet move LEFT (toward the miss direction). Counterintuitively, moving toward where you're missing fixes the problem because it changes the ANGLE. The user sees that bowling adjustments work opposite to instinct -- if you're missing right, you don't aim more left, you WALK more left and let the angle correct itself.

---

## Chapter 12: Two-Handed Bowling

---

### 12.1 The Two-Handed Revolution

#### What the user sees on load
Side-by-side view: a one-handed bowler figure and a two-handed bowler figure, both at the top of the backswing. The visual differences are immediately apparent: the two-hander has both hands on the ball, extreme forward spine tilt, and a more compact backswing. Statistics float above each: RPM, speed, and spine tilt angle.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Play Both | Button | -- | -- | Both figures deliver simultaneously |
| Speed | Slider | 0.25x-2x | 0.5x | Playback speed |
| Show Statistics | Toggle | on/off | on | Shows RPM, speed, spine tilt for each |

#### SceneCues (in content order)
1. **"See it: One-handed vs two-handed approach"** -- Both figures walk and deliver. The one-hander uses a pendulum swing. The two-hander carries the ball with both hands through a shorter, more explosive approach. Params: `{ autoPlay: true, speed: 0.5 }`
2. **"See it: The rev rate gap"** -- RPM counters after release: one-handed ~350 RPM, two-handed ~550 RPM. The difference is ~57% more revolutions. Params: `{ showStatistics: true }`

#### Key Animation
Both figures deliver simultaneously. The one-hander has a classic long pendulum swing. The two-hander has quick, shuffling footwork with a compact, explosive delivery. Post-release, both balls spin -- but the two-handed ball visibly spins much faster. RPM counters tick up to their respective values.

#### The "Aha" Moment
The RPM counter comparison. ~350 vs ~550 RPM -- the two-hander generates nearly 60% more revolutions. The user then sees the BALL PATHS on the lane: the two-handed ball hooks dramatically more, arriving at the pocket with a steeper entry angle. More revs = more hook = larger strike zone. This is why two-handed bowling went from novelty to PBA dominance in two decades.

---

### 12.2 Grip & Release

#### What the user sees on load
Close-up of two hands on the bowling ball, viewed from the side. The dominant hand has fingers in the ball (no thumb). The support hand cups the side of the ball. The ball is at the release point.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Animate Release | Button | -- | -- | Shows the support hand peeling away and the dominant hand ripping through |
| Speed | Slider | 0.1x-1x | 0.3x | Playback speed |
| Show Hand Comparison | Toggle | on/off | off | Shows one-handed grip alongside for comparison |

#### SceneCues (in content order)
1. **"See it: Two-handed release sequence"** -- Support hand peels away. Dominant hand fingers drive through the ball. No thumb to extract. The ball launches with maximum spin. Params: `{ autoPlay: true, speed: 0.2 }`
2. **"See it: No thumb = no extraction timing"** -- Comparison: one-handed release requires precise thumb-exit timing. Two-handed release has no thumb to manage. Params: `{ showHandComparison: true }`

#### Key Animation
Ultra-slow-motion release. The support hand peels away from the ball's side. The dominant hand, with fingers deep in the ball (no thumb), drives upward and through. The ball launches off the fingers with visible heavy rotation. The key visual: the fingers stay UNDER the ball's equator much longer than a one-handed release, creating more rotational energy.

#### The "Aha" Moment
The comparison between one-handed and two-handed thumb extraction. The one-hander must: (1) exit thumb, (2) transfer weight to fingers, (3) rotate wrist, (4) exit fingers. The two-hander skips steps 1 and 2 entirely. No thumb = no extraction = one less thing to go wrong = more time with fingers under the ball = more revolutions. The simplicity of the two-handed release IS its advantage.

---

### 12.3 Extra Rev Rate & Rotation

#### What the user sees on load
Two balls spinning side by side: left at 350 RPM (one-handed, blue), right at 550 RPM (two-handed, purple). Both have visible axis lines. The RPM difference is obvious from the spin speed.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| One-Hand RPM | Slider | 200-450 | 350 | Left ball spin speed |
| Two-Hand RPM | Slider | 400-650 | 550 | Right ball spin speed |
| Show Lane Paths | Toggle | on/off | off | Shows resulting ball paths on mini-lanes below each |

#### SceneCues (in content order)
1. **"See it: 350 vs 550 RPM"** -- Direct comparison of spin speeds. The 550 ball is visibly blurred while the 350 ball's features are still trackable. Params: `{ oneHandRPM: 350, twoHandRPM: 550 }`
2. **"See it: What extra revs do on the lane"** -- Lane paths appear: the two-handed ball hooks 8-10 more boards than the one-handed ball from the same starting position. Params: `{ showLanePaths: true }`

#### Key Animation
Both balls spin simultaneously. The two-handed ball is visibly faster. When lane paths are enabled, both balls launch from the same board, but the two-handed ball hooks dramatically wider, arriving at the pocket from a much steeper angle.

#### The "Aha" Moment
The lane path comparison from the same starting position. Both balls start at board 20 and target the same arrow. The one-handed ball hooks to board 10 at breakpoint and enters the pocket at ~4 degrees. The two-handed ball hooks to board 5 and enters at ~6 degrees (optimal). More revs don't just look different -- they produce a measurably better entry angle and wider strike zone.

---

### 12.4 Body Mechanics

#### What the user sees on load
Side view of two bowler figures at the release point. Left: one-handed (moderate forward tilt, ~40 degrees). Right: two-handed (extreme forward tilt, ~80 degrees). Protractor overlays show the spine angle on both. The difference in body position is dramatic.

#### Leva Controls
| Control | Type | Range | Default | What it controls |
|---------|------|-------|---------|-----------------|
| Show Spine Angle | Toggle | on/off | on | Protractor overlay on both figures |
| Show Hip Rotation | Toggle | on/off | off | Shows hip rotation difference (30-40 degrees more for two-handed) |
| Show Injury Risk Zones | Toggle | on/off | off | Highlights body areas at higher risk: lower back (two-hand), shoulder (one-hand) |
| Animate Approach | Button | -- | -- | Both figures walk through their full approach |

#### SceneCues (in content order)
1. **"See it: 40 degrees vs 80 degrees spine tilt"** -- Both figures frozen at release. The protractors show the dramatic difference. The two-hander is nearly horizontal. Params: `{ showSpineAngle: true }`
2. **"See it: Where the injuries differ"** -- One-handed figure: shoulder and wrist glow red (repetitive single-arm strain). Two-handed figure: lower back and hips glow red (torso rotation strain). Params: `{ showInjuryRiskZones: true }`

#### Key Animation
The full approach animation shows both styles from the side. The one-hander has a steady, upright walk with a long pendulum swing. The two-hander has quick shuffling steps, extreme forward lean, and an explosive hip-driven release. The contrast in body positions throughout the entire approach is stark.

#### The "Aha" Moment
The injury zone comparison. The one-hander's shoulder and wrist glow red -- decades of swinging a 15-pound ball single-handed causes wear on those joints. The two-hander's lower back and hips glow red -- extreme torso rotation and forward bend stress the lumbar spine. The user realizes there's a genuine tradeoff: two-handed bowling generates more power and may reduce arm strain, but it shifts the physical cost to the lower back. Neither style is "free" -- the body pays a price either way, just in different places.

---

## Asset Reuse Summary

| Asset | Used In Sections | Notes |
|-------|-----------------|-------|
| **Ball** | 2.1-2.6, 4.1-4.5, 5.1-5.6, 6.1-6.5, 7.1-7.6, 8.1-8.6, 9.2-9.4, 10.1-10.4, 11.1-11.3, 12.1-12.3 | ~40 sections |
| **Lane** | 1.1, 1.4, 2.4, 6.1-6.5, 7.1-7.6, 8.1-8.6, 9.2-9.4, 11.1-11.3 | ~22 sections |
| **Pins** | 1.2, 8.1-8.6, 9.1-9.4 | ~10 sections |
| **Figure** | 3.1-3.5, 4.1-4.5, 5.1, 5.5-5.6, 6.5, 12.1-12.4 | ~17 sections |
| **Scorecard** | 1.3, 8.6, 9.1 | 3 sections |
| **Oil Overlay** | 7.1-7.5, 11.1-11.2 | ~7 sections |

---

## Scene Complexity Tiers

### Tier 1: Static/Simple (build first)
- 1.2 Pins (hoverable pins)
- 1.4 Board Numbering (slider + highlights)
- 2.1 Coverstock Types (material swap)
- 2.2 Core Design (cutaway toggle)
- 5.2 Rev Rate (already built)
- 5.3 Axis Tilt (ball + axis line)
- 5.4 Axis Rotation (ball + direction arrows)

### Tier 2: Animated (build second)
- 1.1 The Lane (zone coloring)
- 2.3 RG & Differential (mass heatmap)
- 2.5 Surface Preparation (grit slider)
- 2.6 Weight & Drilling (marker positions)
- 3.1 Stance & Setup (figure posing)
- 5.1 Wrist Position (hand close-up)
- 5.6 Follow-Through (3 poses)
- 7.6 Lane Surfaces (split view)

### Tier 3: Full Animation (build third)
- 2.4 Ball Motion (3 phases on lane)
- 3.2-3.3 Approach Steps (walking figure)
- 3.4 Timing (dual timeline)
- 4.1-4.5 Swing sections (figure animation)
- 5.5 One vs Two-Handed (side-by-side figures)
- 6.1-6.5 Ball Motion Down Lane (full lane animation)
- 7.1-7.5 Lane Conditions (oil overlays + ball paths)

### Tier 4: Complex/Physics (build last)
- 1.3 Scoring (animated scorecard)
- 3.5 Drift (top-down multi-shot)
- 8.1-8.6 Strike sections (pin action, chain reactions)
- 9.1-9.4 Spare sections (angle geometry)
- 10.1-10.4 Equipment (multi-ball comparisons)
- 11.1-11.3 Reading the Lane (pattern calculations + reaction comparison)
- 12.1-12.4 Two-Handed (dual figure comparison)
