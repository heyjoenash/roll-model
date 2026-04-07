# Ball Physics and Equipment Science

> Research reference document for the Bowling Buddy video analysis project.
> Last updated: 2026-04-02

---

## 1. Coverstock Types and Their Behavior

The coverstock (outer shell) is the single most important factor in bowling ball performance, accounting for approximately 75% of a ball's reaction on the lane. ([National Bowling Academy](https://www.nationalbowlingacademy.com/post/a-guide-to-bowling-ball-cores-rg-differential-and-coverstock))

### 1.1 Historical Evolution

| Era | Material | Key Development |
|-----|----------|-----------------|
| Pre-1905 | Lignum vitae (hardwood) | Original bowling ball material |
| 1905 | Hard rubber | First non-wood bowling balls |
| 1959 | Polyester (plastic) | Dominated by the 1970s; smoother, more consistent |
| ~1980 | Polyurethane (urethane) | Introduced by AMF as the "Angle" ball; significantly more friction than plastic |
| Early 1990s | Reactive resin | Additives create microscopic oil-absorbing pores for "tacky" traction |
| Late 1990s | Particle (proactive) | Microscopic silica particles for extreme heavy-oil traction |

Sources: [Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball), [Bowlers Paradise](https://www.bowlersparadise.com/blogs/bowling-news/what-are-bowling-balls-made-of-materials-explained-expert-tips), [bowlingball.com](https://www.bowlingball.com/BowlVersity/bowling-ball-coverstock-classifications)

### 1.2 Coverstock Comparison Table

| Coverstock Type | Hook Potential | Oil Absorption | Best Lane Condition | Visual Appearance | Motion Shape |
|----------------|---------------|----------------|--------------------|--------------------|-------------|
| **Plastic/Polyester** | Very low | Minimal | Dry / spare shooting | Very smooth, high-gloss shine | Straight or very mild arc |
| **Urethane** | Low-medium | Very low (lowest of all) | Dry to light oil; sport patterns | Slightly duller than plastic; matte or semi-gloss | Smooth, controllable arc |
| **Reactive Solid** | High | High (most porous) | Medium to heavy oil | Matte/dull finish; single solid color tones | Rounded, continuous arc |
| **Reactive Pearl** | Medium-high | Moderate | Light to medium oil | Visible sparkle/shimmer from mica additives | Long skid, sharp angular backend |
| **Reactive Hybrid** | High | Moderate-high | Medium oil; versatile | Mix of matte and shimmer zones | Mid-lane read with angular backend |
| **Particle/Proactive** | Very high | Very high | Heavy oil | Textured, sometimes gritty feel | Very early, strong continuous hook |

Sources: [bowlingball.com - Coverstock Choices](https://www.bowlingball.com/BowlVersity/bowling-ball-coverstock-choices), [BowlersMart](https://www.bowlersmart.com/2021/05/10/selecting-the-right-bowling-ball-for-your-needs-a-guide-to-coverstocks/), [Motiv - Urethane vs MCP vs Resin](https://www.motivbowling.com/blog/urethane-vs-mcp-vs-resin.html)

### 1.3 Detailed Coverstock Profiles

**Plastic/Polyester**: Has the smoothest surface and generates the least friction. Ideal for beginners who want a properly fitted ball and for intermediate/advanced bowlers shooting spares due to its extremely predictable, straight trajectory. Very durable. ([bowlersadvantage.com](https://bowlersadvantage.com/products/bowling-balls/bowling-ball-basics/))

**Urethane**: Softer and rougher composition than plastic; creates more friction and less pin deflection. Has experienced a major resurgence on the PBA Tour, where the Hammer Purple Pearl Urethane became a standard weapon on sport patterns. USBC introduced new hardness requirements (78D minimum for slow oil-absorbing balls manufactured after Aug 1, 2022) specifically targeting urethane balls for tournament play. Hammer responded with the Black Pearl Urethane at the required 78D hardness. ([hammerbowling.com](https://hammerbowling.com/products/black-pearl-urethane), [USBC](https://bowl.com/news/usbc-announces-new-national-tournament-rules-regarding-slow-oil-absorbing-high-performance-ball-use))

**Reactive Resin (Solid)**: Contains the greatest number of microscopic pores among reactive types. Absorbs oil aggressively, creating early traction and a strong, smooth arcing motion. Best for medium to heavy oil conditions. The matte/dull factory finish enhances early friction. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/bowling-ball-coverstock-choices))

**Reactive Resin (Pearl)**: Includes mica additives that create a visible pearlescent shimmer. The mica reduces friction in the oil, allowing the ball to skid longer before reacting sharply at the backend. Best for lighter oil conditions or when lanes have transitioned (oil has broken down). ([bowlingball.com](https://www.bowlingball.com/BowlVersity/bowling-ball-coverstock-choices), [BowlersMart](https://www.bowlersmart.com/2023/07/14/comprehensive-guide-to-reactive-bowling-balls-for-new-bowlers/))

**Reactive Resin (Hybrid)**: Combines solid and pearl reactive chemistries. Provides the mid-lane traction of a solid with the backend angularity of a pearl. The most versatile reactive type. ([BowlersMart](https://www.bowlersmart.com/2023/07/14/comprehensive-guide-to-reactive-bowling-balls-for-new-bowlers/))

**Particle/Proactive**: Contains microscopic silica particles embedded in the coverstock surface, likened to "snow tires with chains." Designed to cut through heavy oil with maximum friction. Historically suffered from durability issues -- oil absorption caused premature performance loss ("ball death") within months. The hard silica particles also wore lane surfaces and resisted sanding adjustments. Largely discontinued but occasionally referenced in modern ball design. ([bowlingboards.com](http://www.bowlingboards.com/threads/10965-Particle-balls), [bowlingchat.net](https://forum.bowlingchat.net/viewtopic.php?t=74))

**MCP (Micro Cell Polymer)**: A newer technology from Motiv that sits between urethane and reactive resin. Absorbs oil at a fraction of the rate of reactive resin. Rolls straighter than reactive resin but is more responsive than urethane. Designed for modern high-viscosity oil conditions and wet/dry lane patterns. ([Motiv Bowling](https://www.motivbowling.com/blog/urethane-vs-mcp-vs-resin.html))

### 1.4 Visual Identification of Coverstock from Video

> **ML/CV NOTE**: The following visual cues could help a vision model classify coverstock type from video footage:

| Feature | What to Look For | Likely Coverstock |
|---------|-----------------|-------------------|
| High-gloss, mirror-like shine | Ball reflects overhead lights strongly | Plastic or polished pearl |
| Visible sparkle/shimmer in the surface | Tiny glittering particles visible under lane lighting | Pearl reactive (mica additives) |
| Dull/matte finish | No reflected highlights, uniform flat color | Solid reactive or sanded urethane |
| Mixed matte and shimmer zones | Parts of the ball sparkle while others are flat | Hybrid reactive |
| Straight trajectory, minimal hook | Ball travels in a near-straight line | Plastic (spare ball) |
| Smooth, continuous arc | Gradual, predictable curve | Urethane or solid reactive |
| Long skid then sharp angular break | Ball travels straight then snaps aggressively | Pearl reactive |
| Early, strong hooking motion | Ball begins curving within the first 30 feet | Sanded solid reactive or particle |

---

## 2. Core Designs

The weight block (core) inside the bowling ball determines its internal dynamics -- how it revs up, when it transitions, and the shape of its motion path.

### 2.1 Symmetric Cores

Symmetric cores have a uniform mass distribution around their primary axis. They produce a smoother, more predictable ball motion with a controlled, even arc. They are easier to drill consistently because the core's shape is the same from all angles around the pin axis. ([BowlersMart](https://www.bowlersmart.com/bowling-ball-cores/), [Storm - Symmetric vs Asymmetric](https://news.stormbowling.com/2017/04/06/symmetric-vs-asymmetric-cores/))

**Characteristics:**
- Predictable, smooth motion throughout all three phases
- Lower track flare compared to asymmetric counterparts at the same differential
- Easier for a driller to lay out consistently
- Ideal for bowlers who want control and repeatability

### 2.2 Asymmetric Cores

Asymmetric cores have an uneven mass distribution, creating a preferred spin axis (PSA). This causes the ball to rev up faster and make a sharper turn at the breakpoint. Asymmetric balls feature an additional specification: intermediate differential, which measures the degree of asymmetry. ([Storm - Symmetric vs Asymmetric](https://news.stormbowling.com/2017/04/06/symmetric-vs-asymmetric-cores/), [iambowling.com](https://iambowling.com/blog/decoding-bowling-ball-core-terms-differential-intermediate-differential-and-radius-of-gyration/))

**Characteristics:**
- Faster revving, earlier transition to roll phase
- Sharper, more angular breakpoint
- Higher track flare potential
- More responsive to layout adjustments
- Features a mass bias (MB) marker on the ball surface for drilling reference

### 2.3 Notable Core Designs by Manufacturer

| Manufacturer | Core Name | Type | Notable Ball(s) |
|-------------|-----------|------|-----------------|
| **Storm** | Velocity Core | Symmetric | Phaze line (Phaze II, Phaze AI) |
| **Storm** | Velocity A.I. Core | Symmetric | Phaze AI |
| **Storm** | Inverted Fe2 | Symmetric | Hy-Road |
| **Storm** | C3 Centripetal Control | Symmetric | IQ Tour |
| **Storm** | Solarion A.I. Core | (New tech) | Equinox Solid |
| **Brunswick** | Light Bulb | Symmetric | Rhino |
| **Brunswick** | Zenith Core | Asymmetric | Zenith (RG 2.498, Diff 0.045) |
| **Motiv** | Predator V2 | Asymmetric | Jackal EXJ |
| **Hammer** | Spheroid | Symmetric | Black Pearl Urethane |

Sources: [bowlingthismonth.com](https://www.bowlingthismonth.com/bowling-ball-review/storm-iq-tour-ai/), [BowlersMart - Phaze AI](https://www.bowlersmart.com/2024/09/27/unveiling-the-storm-phaze-ai-bowling-ball/), [bowwwl.com](https://www.bowwwl.com/bowling-ball-database/brunswick/cores/zenith), [BowlersMart - Jackal EXJ](https://www.bowlersmart.com/2025/04/07/motiv-jackal-exj-bowling-ball-review-analysis-guide/)

### 2.4 Core-Coverstock Relationship

The core defines the ball's internal energy storage and release characteristics, while the coverstock determines when and how that energy interacts with the lane. A common axiom: "RG and Diff set the framework. The coverstock paints the picture." A low-RG, high-differential core paired with a solid reactive coverstock produces the earliest, strongest reaction. A high-RG, low-differential core paired with a pearl coverstock produces the longest, smoothest reaction. ([efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls))

---

## 3. Radius of Gyration (RG)

### 3.1 Technical Definition

Radius of Gyration (RG) is the distance from the axis of rotation at which the total mass of a body might be concentrated without changing its moment of inertia. In practical terms, it measures how the mass is distributed inside the ball -- concentrated toward the center (low RG) or spread toward the shell (high RG). ([National Bowling Academy](https://www.nationalbowlingacademy.com/post/a-guide-to-bowling-ball-cores-rg-differential-and-coverstock))

### 3.2 USBC Legal Range

**Minimum RG: 2.460 inches | Maximum RG: 2.800 inches**

Source: [Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball), [USBC Equipment Specs Manual](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/ESManual.pdf)

### 3.3 RG Classification Ranges

| Classification | RG Range (inches) | Mass Distribution | Ball Behavior |
|---------------|-------------------|-------------------|---------------|
| **Low RG** | 2.460 - 2.500 | Mass concentrated near center | Revs up early; shorter skid phase; earlier hook |
| **Medium RG** | 2.510 - 2.540 | Balanced mass distribution | Versatile; moderate skid and hook timing |
| **High RG** | 2.550 - 2.800 | Mass distributed toward shell | Revs up late; longer skid phase; later hook, stores energy |

Sources: [efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls), [bowlingball.com](https://www.bowlingball.com/BowlVersity/bowling-ball-rg-and-differential-range-ratings-2)

### 3.4 How RG Affects the Skid-Hook-Roll Transition

- **Low RG balls** begin their transition from skid to hook earlier on the lane. They "read" the midlane friction sooner and begin rolling sooner. Best for slower speed bowlers, higher oil volumes, or when you need the ball to pick up early.
- **High RG balls** conserve energy through the front part of the lane, maintaining skid longer. They delay their hook onset and deliver more energy at the backend. Best for faster bowlers, drier conditions, or when you need length.
- **Medium RG balls** offer the most versatility and are commonly used as benchmark balls.

### 3.5 Practical Examples

| Ball | Manufacturer | RG (15 lb) | Classification |
|------|-------------|------------|----------------|
| Hammer Black Widow 3.0 | Hammer | 2.480 | Low |
| Brunswick Defender Hybrid | Brunswick | 2.473 | Low |
| Storm Hy-Road Pearl | Storm | 2.570 | High |
| Brunswick Zenith | Brunswick | 2.498 | Low-Medium |

Source: [efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls)

---

## 4. Differential of RG

### 4.1 Definition

Differential is the difference between the maximum and minimum Radius of Gyration values measured along the ball's three principal axes. It directly determines the ball's **flare potential** -- how much the ball's axis migrates during each revolution, creating new oil-contact rings on the surface. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/bowlingball-com-differential-of-rg-specifications))

**USBC Maximum Differential: 0.060 inches**

Source: [Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball)

### 4.2 Differential Classification Ranges

| Classification | Differential Range | Flare Potential | Motion Characteristics |
|---------------|-------------------|-----------------|----------------------|
| **Low** | 0.010 - 0.025 | Low | Minimal flare; smooth, stable motion; mild hook |
| **Medium** | 0.025 - 0.045 | Moderate | Moderate flare; balanced control and hook |
| **High** | 0.045 - 0.060 | High | Large track flare; aggressive hook; sharp backend |

Sources: [bowlingball.com - Differential Ratings](https://www.bowlingball.com/BowlVersity/bowling-ball-differential-ratings), [efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls)

### 4.3 Track Flare Explained

Track flare is the visible migration of oil rings on the ball surface. Each revolution, the ball contacts the lane on a slightly different track line, creating a series of parallel oil rings. The distance between the first and last oil ring is the "flare width," typically measured in inches (ranging from ~1 inch for low-differential balls to 6+ inches for high-differential balls). ([Tamer Bowling](https://tamerbowling.com/what-is-ball-flare/))

**Why flare matters:**
- Each new ring contacts fresh (non-oiled) coverstock to the lane, generating stronger traction
- Greater flare = more hook potential
- Flare rings cross at two points; the one nearest the fingers is called the "bowtie"
- Visible flare rings on a used ball can indicate its differential and drilling layout effectiveness

> **ML/CV NOTE**: Flare rings are visible as oil bands on the ball after a shot. In video, they appear as parallel dark rings circling the ball. The spacing of these rings correlates with differential -- wider spacing = higher differential, more aggressive ball.

### 4.4 Intermediate Differential (Asymmetric Only)

Intermediate differential is the difference between the Y-axis (high RG) and Z-axis (intermediate RG) values. It only applies to asymmetric cores and measures how "asymmetric" the core truly is. USBC allows intermediate differential in the range of 0.008" to 0.037". Higher intermediate differential creates a sharper, more defined breakpoint. ([iambowling.com](https://iambowling.com/blog/decoding-bowling-ball-core-terms-differential-intermediate-differential-and-radius-of-gyration/), [Wikipedia](https://en.wikipedia.org/wiki/Bowling_ball))

### 4.5 Practical Examples

| Ball | Manufacturer | RG | Differential | Int. Diff | Core Type |
|------|-------------|-----|-------------|-----------|-----------|
| Hammer Black Widow 3.0 | Hammer | 2.480 | 0.058 | -- | Asymmetric |
| Storm Hy-Road Pearl | Storm | 2.570 | 0.046 | -- | Symmetric |
| Brunswick Defender Hybrid | Brunswick | 2.473 | 0.054 | -- | Asymmetric |
| Brunswick Zenith | Brunswick | 2.498 | 0.045 | Yes | Asymmetric |

Source: [efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls), [bowwwl.com](https://www.bowwwl.com/bowling-ball-database/brunswick/cores/zenith)

### 4.6 RG + Differential Interaction Guide

| Combination | Result | Best Use Case |
|-------------|--------|---------------|
| Low RG + High Diff | Early, strong hook | Heavy oil, high-speed bowlers |
| Low RG + Low Diff | Early but controlled motion | Medium oil, control players |
| High RG + High Diff | Long skid, aggressive backend | Medium-light oil, rev-dominant bowlers |
| High RG + Low Diff | Long, smooth, gentle arc | Dry lanes, spare shooting with hook balls |

Source: [efx.co](https://efx.co/blogs/news/what-is-rg-in-bowling-rd-and-diff-in-bowling-balls)

---

## 5. Ball Motion Phases: Skid, Hook, Roll

All bowling ball motion follows three sequential phases as the ball travels the 60-foot lane distance from foul line to pins.

### 5.1 Phase 1: Skid (Foul Line to ~15-20 feet)

The ball slides on the oiled front portion of the lane with minimal friction. During this phase, the ball maintains its release speed and axis orientation. The heaviest concentration of oil is in this zone (the "heads"), which deliberately reduces friction to protect the lane surface and allow the ball to travel straight initially. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/the-three-phases-of-bowling-ball-motion), [stormbowling.com](https://www.stormbowling.com/bowling-ball-reactions-skid-hook-roll))

**Factors that extend the skid phase:**
- Higher ball speed
- Higher axis tilt (spin)
- Higher axis rotation
- Polished ball surface
- Pearl reactive coverstock
- High RG core
- Heavier oil pattern

**Factors that shorten the skid phase:**
- Lower ball speed
- Lower axis tilt
- Sanded/dull ball surface
- Solid reactive coverstock
- Low RG core
- Lighter oil conditions

### 5.2 Phase 2: Hook (~15-45 feet)

As the ball encounters the transition zone where oil thins out, friction increases. The ball begins losing forward speed while gaining rev rate. The stored energy in the rotating core starts to release, causing the ball to change direction. This is the most critical phase for determining the ball's entry angle into the pins. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/the-three-phases-of-bowling-ball-motion), [breakdownbowling.com](https://www.breakdownbowling.com/the-3-phases-of-ball-motion/))

**The breakpoint** is the point on the lane where the ball transitions from the hook phase to the roll phase -- the first visible point of direction change. It is the most critical targeting concept in bowling line play. ([National Bowling Academy](https://www.nationalbowlingacademy.com/post/next-level-lane-play-understanding-rule-of-31-and-ball-motion))

### 5.3 Phase 3: Roll (Last ~15 feet)

The ball achieves "full roll" -- its axis rotation has been fully consumed and it is rolling end-over-end toward the pins. The ball travels in a relatively straight line at its slowest speed. All axis rotation is gone; the ball has expended its hooking energy and is on its final trajectory toward the pocket. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/the-three-phases-of-bowling-ball-motion))

### 5.4 Speed, Rev Rate, and Phase Length

| Bowler Variable | Effect on Skid | Effect on Hook | Effect on Roll |
|----------------|----------------|----------------|----------------|
| High speed | Extended skid | Delayed hook onset | Compressed roll |
| High rev rate | Slightly extended skid | Earlier and stronger hook | Earlier full roll |
| High axis rotation (up to 90 deg) | Extended skid | Sharp angular hook | Late, compressed roll |
| High axis tilt | Extended skid | Smoother, weaker hook | Later roll |
| Low axis rotation (0 deg = end over end) | Minimal skid | No hook | Immediate roll |

Sources: [BowlersMart](https://www.bowlersmart.com/2021/03/22/the-basics-of-bowling-ball-motion-surface-speed-rev-rate-tilt-and-rotation/), [Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/)

**Typical PBA ball speed**: 16-18 mph at the pins. A variance of more than ~1.5 mph between shots produces noticeably different ball motion. ([Storm News](https://news.stormbowling.com/2020/12/03/bowling-ball-motion-the-basics/))

**Axis rotation ranges**:
- 0 degrees = end-over-end (no hook)
- 30 degrees = controllable, moderate hook
- 45 degrees = most versatile
- 90 degrees = maximum skid + sharpest backend (hardest to control)

Source: [BowlersMart](https://www.bowlersmart.com/2021/03/22/the-basics-of-bowling-ball-motion-surface-speed-rev-rate-tilt-and-rotation/)

> **ML/CV NOTE**: In video analysis, the three phases are distinguishable by the ball's trajectory curvature. Skid = straight line, Hook = visible lateral deflection beginning, Roll = straightened final path. The breakpoint (the inflection point) is the highest-value detection target for bowling analysis -- it reveals the bowler's targeting, the ball's characteristics, and the lane condition.

---

## 6. Surface Preparation

### 6.1 Grit Scale and Effects

Surface roughness is measured in grit (following abrasive pad standards). Lower grit = rougher surface = more friction. Higher grit = smoother surface = less friction.

| Grit Level | Surface Feel | Effect on Ball Motion | Typical Use Case |
|-----------|-------------|----------------------|-----------------|
| **500** | Very rough, deep sanding lines | Maximum early friction; earliest hook; shortest skid; least backend | Extremely heavy oil |
| **1000** | Rough, visible texture | Strong early friction; early hook; moderate backend | Heavy oil |
| **1500** | Medium texture | Balanced early read with moderate backend | Medium-heavy oil |
| **2000** | Smooth | Moderate length with increasing backend potential | Medium oil |
| **3000** | Very smooth | Good length; delayed hook; stronger backend | Medium-light oil |
| **4000** | Near-polished | Extended length; strong backend reaction | Light-medium oil |
| **5000** | Almost shiny | Maximum length; latest hook; biggest backend | Light oil |
| **Polish** | Glossy/shiny | Maximum skid; sharpest backend transition | Dry or light oil |

Sources: [Storm - Optimizing Surfaces](https://www.stormbowling.com/optimizing-bowling-ball-surfaces), [Creating the Difference](https://ctdbowling.com/blogs/news/an-understanding-of-sanding-and-bowling-balls)

### 6.2 Sanded vs. Polished Motion Shapes

**Sanded (matte/dull) balls:**
- Expend energy earlier on the lane
- Transition from skid to roll more gradually
- Produce a smoother, rounder hook shape
- Draw in oil (increased oil absorption from porous surface)
- Create a "controlled" ball motion

**Polished (shiny) balls:**
- Create a barrier that reduces oil absorption
- Maintain skid through the oil longer
- Transition from skid to roll more quickly
- Produce a sharper, more angular hook shape at the backend
- The shinier the ball, the faster the skid-to-roll transition speed, creating a more angular shape

Source: [Creating the Difference - Polish](https://ctdbowling.com/blogs/news/an-understanding-of-polish-and-bowling-balls), [Creating the Difference - Sanding](https://ctdbowling.com/blogs/news/an-understanding-of-sanding-and-bowling-balls)

### 6.3 Combination Finishes

Pro shops often apply multi-step surface preparations for specific reactions:

| Grit Combination | Resulting Reaction |
|------------------|--------------------|
| 500 then 2000 | Benchmark: enough surface for friction in medium oil, delays hook transition for strong entry angle |
| 500 then 4000 | Easy length through heads, subtle mid-lane reaction, enormous backend friction |
| 1000 then 3000 | Moderate early traction, good backend continuation |
| 2000+ with polish | Polishing at 2000 grit or higher is recommended for maximum effectiveness |

Source: [BowlingBoards.com](http://www.bowlingboards.com/threads/23379-Bowling-Ball-Surfacing-(grit-ratings)), [Maverick Bowling Forum](https://forum.maverickbowling.com/viewtopic.php?t=14323)

**Note**: Polishing a grit rougher than 1000 does not produce a smoother texture than the next smoothest unpolished grit. Polishing is most effective at 2000 grit and smoother. ([bowlingchat.net](https://forum.bowlingchat.net/viewtopic.php?t=1744))

### 6.4 Surface Degradation Over Games

Bowling ball surfaces change through use:
- **Oil absorption**: Reactive resin balls can absorb up to 3% of their weight in oil over time. Oil clogs microscopic pores, reducing friction and hook potential. ([bowlingaddicts.com](https://www.bowlingaddicts.com/understanding-bowling-ball-oil-absorption-maintenance-tips/))
- **Track wear**: The ball's contact path wears smoother than surrounding surface, reducing effectiveness.
- **Recommended maintenance**: Wipe ball with dry towel between every shot. Use USBC-approved cleaner every 3-5 games. ([stormbowling.com](https://www.stormbowling.com/essential-guide-to-bowling-ball-maintenance))
- **Oil extraction**: Recommended every 50-75 games using an oil extraction machine (Revivor, Rejuvenator, Detox) that heats the ball to a safe temperature. ([bowlersadvantage.com](https://bowlersadvantage.com/services/bowling-ball-maintenance-resurfacing/))
- **Full resurface**: Recommended every 30-60 games or once per season. Restores the factory finish and removes track wear. ([BowlersMart](https://www.bowlersmart.com/2024/07/17/when-is-it-time-to-resurface-your-bowling-ball/))

> **ML/CV NOTE**: A polished ball will produce visible reflected highlights under lane lighting, while a sanded ball will appear uniformly flat/dull. Over the course of a session, a ball that starts out hooking strongly and progressively straightens may be absorbing oil. These visual and behavioral changes could be tracked over time in video analysis.

---

## 7. Ball Weight

### 7.1 USBC Weight Regulations

- **Maximum weight**: 16.00 pounds (7.26 kg)
- **Minimum weight**: No minimum specified by USBC
- **Manufactured range**: 6 to 16 pounds
- **Static weight limits**: Maximum 3 ounces of side, top, bottom, finger, or thumb weight imbalance

Sources: [USBC Rules](https://bowl.com/rules/rules-updates), [Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball)

### 7.2 Weight Selection Guidelines

| Category | Recommended Weight | Rationale |
|----------|-------------------|-----------|
| Children (ages 6-14) | Approximate age in pounds (10 lbs for a 10-year-old) | Manageable weight for developing coordination |
| Adult beginners | 12-14 lbs | Control and accuracy over power |
| Intermediate adults | 14-15 lbs | Balance of carry and control |
| Advanced/competitive | 15-16 lbs | Maximum pin carry and deflection resistance |
| Senior bowlers (PBA50) | 15 lbs most common | Very few senior pros use 16 lbs |
| Post-injury recovery | 6-8 lbs, progress gradually | Rebuilding strength safely |

Source: [Bowling This Month - Ball Weight](https://www.bowlingthismonth.com/bowling-tips/ball-weight/)

### 7.3 Weight, Momentum, and Pin Carry

The physics principle **Force = Mass x Acceleration** governs pin carry:
- Heavier balls carry more momentum at a given speed, producing less deflection on pin contact and better pin carry
- Lighter balls thrown at significantly higher speed can generate comparable force
- Modern reactive resin and aggressive core technology has closed the gap between 14-lb and 16-lb performance significantly
- A 14-lb reactive resin ball today can hit harder than a 16-lb urethane ball from prior decades
- The key principle: "accuracy always comes first followed by action" -- select the heaviest weight you can throw accurately and repeatedly without physical strain

Sources: [Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/ball-weight/), [Bowling This Month - Weight and Wrist Braces](https://www.bowlingthismonth.com/bowling-tips/ball-weight-ball-speed-pin-carry-and-wrist-braces/)

### 7.4 Industry Trend: The Move to 15 Pounds

A growing number of professional bowlers, including many PBA Tour players, have moved from 16-lb to 15-lb equipment. The one-pound reduction allows for slightly higher ball speeds and reduced physical fatigue over long tournament blocks, while modern ball technology compensates for the reduced mass with stronger coverstocks and more dynamic cores. On the PBA50 Tour, 15 pounds is the predominant weight, with very few rolling 16 pounds. ([Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/ball-weight/))

---

## 8. Drilling Layouts

### 8.1 Key Markings on a Bowling Ball

Every drilled bowling ball has critical reference markers:

| Marking | Description | Visual Appearance |
|---------|-------------|-------------------|
| **Pin** | Marks the top of the core (low RG axis) | Colored dot (contrasting color to ball), 1-2 cm diameter |
| **CG (Center of Gravity)** | The ball's static balance point | Small punch mark or circle, within ~2 inches of the pin |
| **Mass Bias (MB) / PSA** | Marks the preferred spin axis on asymmetric balls only | Additional small mark or "MB" letters; third reference point |

Sources: [Maximum Target](https://maximumtarget.com/bowling/what-do-the-colored-dots-on-a-bowling-ball-mean/), [bowlingball.com](https://www.bowlingball.com/BowlVersity/understanding-the-pro-cg-bowling-ball), [Storm News - PSA](https://news.stormbowling.com/2017/06/11/psa-to-pap-distance/)

### 8.2 Positive Axis Point (PAP)

The PAP is the point on the ball surface perpendicular to the bowler's initial axis of rotation at release. It is unique to each bowler and determined by their release characteristics (axis tilt and axis rotation). The PAP is the reference point from which all layout measurements are taken. ([bowlingball.com](https://www.bowlingball.com/BowlVersity/the-importance-of-the-positive-axis-point))

PAP is found by observing the ball's oil track after a shot and measuring to the center of the track pattern.

### 8.3 Pin-to-PAP Distance

The distance from the ball's pin to the bowler's PAP is the primary layout variable affecting when the ball transitions:

| Pin-to-PAP Distance | Effect on Motion |
|---------------------|------------------|
| **Short (1-2 inches)** | Pin close to PAP; low RG axis near PAP; earlier hook; less flare; used for heavier oil |
| **Medium (3-4 inches)** | Maximum core instability at 3.375"; maximum flare; strongest overall reaction |
| **Long (5-6.75 inches)** | High RG axis near PAP; later hook; less flare; more length; used for drier conditions |

Source: [Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/pin-to-pap-distance-and-its-effect-on-bowling-ball-motion/), [National Bowling Academy](https://www.nationalbowlingacademy.com/post/how-does-your-positive-axis-point-and-pin-placement-affect-your-ball-motion)

### 8.4 Dual Angle Layout Technique

The Dual Angle Layout Technique (developed by MoRich) uses three measurements to define a drilling layout precisely:

**1. Drilling Angle** (angle from the bowler's PAP to the ball's pin):
- Determines how early the ball begins its transition
- Lower angles = later, more angular motion
- Higher angles = earlier, smoother motion

**2. Pin-to-PAP Distance**:
- Controls overall flare (see section 8.3)
- 3.375" to 5" is considered "strong" depending on rev rate

**3. VAL (Vertical Axis Line) Angle**:
- The angle between the pin-to-PAP line and the vertical axis line
- The most important factor in determining final ball motion
- 30-45 degrees = "pin up" layout (more length, stronger backend)
- 65-90+ degrees = "pin down" layout (earlier roll, smoother motion)
- Larger VAL angles raise the drilled ball's effective RG and lower its total differential

Sources: [BowlersMart - Dual Angle](https://www.bowlersmart.com/2020/03/19/dual-angle-bowling-ball-layouts-explained-with-mdm-coaching/), [BowlersMart - Dual Angle Part 2](https://www.bowlersmart.com/2022/01/28/dual-angle-bowling-ball-drilling-layouts-explained-by-mdm-coaching/), [buddiesproshop.com](https://www.buddiesproshop.com/content/DualAngle.pdf)

### 8.5 Common Layout Shorthand

| Layout | Description | Typical Effect |
|--------|-------------|----------------|
| **Pin Up** | Pin placed above the finger holes | More length, stronger backend snap |
| **Pin Down** | Pin placed below the finger holes | Earlier roll, smoother motion |
| **Pin Over Bridge** | Pin placed directly between finger holes | Maximum flare, balanced motion |
| **Pin In** | Pin close to PAP (short distance) | Early roll, controlled arc |
| **Pin Out** | Pin far from PAP (long distance) | Extended length, angular backend |

### 8.6 Balance Hole Rule Change

As of August 1, 2020, USBC banned balance holes (extra holes drilled to adjust static weight imbalance). All holes must now be used for gripping purposes on every delivery. Bowlers who do not use a thumb hole must mark their intended center of palm with a "+" mark. ([Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball), [USBC](https://bowl.com/rules/rules-updates))

---

## 9. Major Manufacturers and Ball Identification

### 9.1 Manufacturer Family Tree

The bowling ball industry is dominated by two major manufacturing groups:

**Storm Products, Inc. (Brigham City, Utah)**
- Storm (flagship brand)
- Roto Grip (acquired 1997)
- 900 Global (fully acquired 2020; previously invested in 2014)
- 3G Shoes

**Brunswick Bowling Products, LLC**
- Brunswick (flagship brand)
- DV8
- Radical
- Hammer (acquired via Ebonite International, 2019)
- Columbia 300 (acquired via Ebonite International, 2019)
- Track (acquired via Ebonite International, 2019)
- Ebonite (acquired 2019)

**Independent Manufacturers:**
- Motiv Bowling
- Visionary (smaller/specialty)
- Various regional/international brands

Sources: [Wikipedia - Storm Products](https://en.wikipedia.org/wiki/Storm_Products), [USBC - Brunswick Acquires Ebonite](https://bowl.com/news/brunswick-acquires-ebonite-international), [BowlersMart](https://www.bowlersmart.com/2019/11/15/breaking-brunswick-bowling-acquires-ebonite-international/), [iambowling.com](https://iambowling.com/blog/is-storm-bowling-and-roto-grip-the-same-unraveling-the-connection/)

### 9.2 Key Ball Lines by Manufacturer

| Manufacturer | Major Ball Lines | Characteristics |
|-------------|-----------------|-----------------|
| **Storm** | Phaze, Hy-Road, IQ Tour, Spectre, Equinox | Phaze = benchmark performance; Hy-Road = all-around; IQ Tour = benchmark touring ball |
| **Roto Grip** | Hyper, Idol, RST, UFO, Transformer | Hyper = strong asymmetric; Idol = benchmark line |
| **900 Global** | Reality, Zen, Wolverine | Mid-priced performance |
| **Brunswick** | Rhino (entry), Twist (entry), Zenith (high-perf), Quantum (high-perf) | Rhino = popular entry-level; Zenith = flagship asymmetric |
| **Hammer** | Black Widow, Purple/Black Pearl Urethane | Black Widow = flagship; Urethane line = PBA dominant |
| **Radical** | Conspiracy, Guru, Sneak Attack | Mid to high performance |
| **Motiv** | Venom, Jackal, Forge, Supra | Jackal = heavy oil; Venom Shock = benchmark; Supra = control |
| **Columbia 300** | Chaos, Power, White Dot (spare) | White Dot = iconic spare ball |
| **Track** | Proof, Alias | Mid to high performance |

Sources: [BowlersMart - Storm 2025](https://www.bowlersmart.com/2025/05/05/best-storm-bowling-balls-april-2025/), [BowlersMart - 2025 New Balls](https://www.bowlersmart.com/2025/01/15/11-new-bowling-balls-available-in-2025/), [motivbowling.com](https://www.motivbowling.com/products/balls/)

### 9.3 Physical Identification Markings

Every USBC-approved bowling ball must display:
1. **Manufacturer's name** (brand name)
2. **Product name** (model name)
3. **Serial number** -- typically stamped or engraved near the finger holes or at the base of the ball
4. **Weight** -- inscribed on the coverstock (e.g., "15" not "15 lbs")
5. **Logo/artwork** -- engraved or printed brand imagery

Serial number format varies by manufacturer but typically encodes: manufacturer code, year of manufacture, SKU, month (A=Jan, B=Feb, etc.), day, engraver ID, and production sequence number. ([bowlingforbeginners.com](https://bowlingforbeginners.com/bowling-ball-serial-number-lookup/), [bowwwl.com](https://www.bowwwl.com/bowling-ball-serial-number-lookup))

### 9.4 Ball Identification Databases

| Database | URL | Content |
|----------|-----|---------|
| bowwwl.com | bowwwl.com/bowling-ball-database | Hundreds of balls with RG, Diff, MB Diff, coverstock, core type, factory finish, release date |
| bowlingball.com | bowlingball.com/BowlVersity | Extensive spec sheets and reviews |
| ballreviews.com | ballreviews.com | RG and differential numbers by manufacturers |
| Bowling This Month | bowlingthismonth.com/ball-comparison | Ball comparison tool with specs |
| Motiv Ball Guide | motivbowling.com/ball-guide | Official Motiv specs and comparison tool |

Source: [bowwwl.com](https://www.bowwwl.com/bowling-ball-database), [ballreviews.com](https://www.ballreviews.com/miscellaneous/rg-and-differential-numbers-by-manufacturers/)

### 9.5 Visual Identification from Video: Feasibility Assessment

> **ML/CV NOTE**: Identifying a specific bowling ball model from video is feasible but challenging:

**What IS visually identifiable:**
- Color scheme / pattern (swirls, solid colors, multi-color combinations) -- each ball model has a unique colorway
- Surface finish (polished vs. matte) under lane lighting
- Pin dot location and color
- Logo and text engravings (if resolution is sufficient)
- Ball motion characteristics (trajectory shape indicates coverstock/core type)
- Flare ring patterns (visible on ball between shots)

**Challenges:**
- Bowling balls spin rapidly (300-500 RPM), blurring surface details
- Lane lighting creates reflections that obscure surface patterns
- Oil coating changes ball appearance during play
- Custom surface adjustments change factory appearance
- Similar colorways exist across different models and eras
- Engravings are small and difficult to read at typical camera distances

**Recommended approach:**
- Train a CNN on manufacturer product images to classify by color/pattern family
- Use ball motion trajectory analysis to classify performance characteristics (coverstock type, RG range, differential range) independent of visual appearance
- Combine visual classification (color) with motion classification (behavior) for best identification confidence
- Reference databases like bowwwl.com for matching spec profiles

Sources: [Roboflow - Ball Tracking](https://blog.roboflow.com/tracking-ball-sports-computer-vision/), [PyImageSearch](https://pyimagesearch.com/2015/09/14/ball-tracking-with-opencv/), [bowwwl.com](https://www.bowwwl.com/bowling-ball-database)

---

## 10. Ball Selection Strategy

### 10.1 Matching Ball to Oil Pattern

| Oil Condition | Volume (Kegel guideline) | Recommended Coverstock | Recommended Core | Recommended Surface |
|--------------|-------------------------|----------------------|-------------------|-------------------|
| **Heavy oil** | 25+ mL | Solid reactive or particle | Low RG, high differential | 500-1000 grit (sanded) |
| **Medium-heavy** | 21-25 mL | Solid or hybrid reactive | Low-medium RG, medium-high diff | 1000-2000 grit |
| **Medium** | 18-21 mL | Hybrid reactive | Medium RG, medium differential | 2000-3000 grit |
| **Light-medium** | Under 18 mL | Pearl reactive | Medium-high RG, medium differential | 3000-4000 grit or polished |
| **Dry/light** | Minimal | Urethane or plastic | High RG, low differential | Polished or factory |

Source: [bowlingaddicts.com](https://www.bowlingaddicts.com/best-bowling-balls-for-oil-patterns-top-recommendations/), [AMF](https://www.amf.com/blog/how-bowling-lane-conditions-affect-your-roll), [stormbowling.com](https://www.stormbowling.com/mastering-heavy-oil-bowling-lanes)

### 10.2 Arsenal Building: The 6-Ball Slot System

Storm's recommended arsenal framework organizes balls into six reaction categories:

| Slot | Reaction Type | Purpose | Typical Ball Characteristics |
|------|--------------|---------|------------------------------|
| **1** | Strong / Smooth | Heavy oil control | Solid reactive, low RG, high diff, sanded surface |
| **2** | Strong / Sharp | Angular power on oil | Hybrid or pearl reactive, low RG, high diff, polished |
| **3** | Medium / Smooth | **Benchmark** (starting ball) | Solid or hybrid, medium RG, medium diff |
| **4** | Medium / Sharp | Transition ball | Pearl reactive, medium RG, medium diff, polished |
| **5** | Weak / Smooth | Controlled length | Urethane or weak reactive, higher RG, lower diff |
| **6** | Weak / Sharp | Dry lane angle / Spare ball | Plastic spare ball OR weak pearl for dry-lane angle |

Sources: [stormbowling.com](https://www.stormbowling.com/2024-guide-build-a-winning-bowling-arsenal-today), [Motiv - Arsenal Building](https://www.motivbowling.com/blog/building-a-bowling-ball-arsenal.html), [USBC - How to Build an Effective Arsenal](https://bowl.com/how-to-build-an-effective-arsenal)

### 10.3 Minimum Arsenal by Skill Level

| Level | Balls Needed | Composition |
|-------|-------------|-------------|
| **Beginner / Casual** | 1-2 | 1 plastic/urethane spare ball + 1 reactive benchmark |
| **League bowler** | 3-4 | Spare ball + benchmark + 1 step-up (stronger) + 1 step-down (weaker) |
| **Tournament competitor** | 5-6 | Full 6-slot system |
| **Professional** | 6-8+ | Full system with multiple options per slot for pattern variety |

Source: [bowling.com](https://www.bowling.com/knowledge-hub/bowling-balls/how-to-build-a-bowling-ball-arsenal), [Tamer Bowling](https://tamerbowling.com/arsenal-building-101/)

### 10.4 Surface Adjustment vs. Ball Change

Before changing balls entirely, bowlers can adjust their current ball's surface:
- **Add surface (lower grit)**: Makes ball read earlier, good when lanes are oily
- **Remove surface (higher grit or polish)**: Makes ball skid longer, good when lanes are dry
- **A 500-grit change** in either direction produces a noticeable difference in ball motion
- Surface adjustment is the fastest and cheapest way to adapt to changing lane conditions during competition

Source: [National Bowling Academy](https://www.nationalbowlingacademy.com/video/ball-reaction-surface-adjustments-016738), [Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/bowling-ball-surface-management/)

### 10.5 Bowler Style Matching

| Bowler Type | Problem | Solution |
|------------|---------|----------|
| **Speed-dominant** (high speed, low revs) | Ball skids too much, doesn't hook enough | Lower RG, higher diff, solid coverstock, sanded surface |
| **Rev-dominant** (low speed, high revs) | Ball hooks too early, over-reacts | Higher RG, pearl coverstock, polished surface |
| **Matched** (speed and revs balanced) | Versatile | Benchmark hybrid coverstocks, medium RG |

Source: [Motiv - Arsenal Building](https://www.motivbowling.com/blog/building-a-bowling-ball-arsenal.html)

---

## Appendix A: USBC Ball Specifications Summary

| Specification | Value |
|--------------|-------|
| Maximum weight | 16.00 lbs (7.26 kg) |
| Minimum weight | None specified |
| Diameter | 8.500" - 8.595" (21.59 - 21.83 cm) |
| Circumference (13+ lbs) | 26.704" - 27.002" |
| RG range | 2.460" - 2.800" |
| Maximum differential | 0.060" |
| Intermediate differential | 0.008" - 0.037" |
| Maximum coefficient of friction | 0.320 (for 13+ lb balls) |
| Minimum surface hardness | 72 Durometer D (general); 78D for slow oil-absorbing coverstocks (effective Dec 31, 2025) |
| Required markings | Manufacturer name, product name, serial number |
| Maximum gripping holes | 5 (all must be used on every delivery) |
| Balance holes | Banned (since August 1, 2020) |
| Static weight imbalance | 3 oz maximum (side, top, bottom, finger, thumb) |

Sources: [USBC Equipment Specs Manual](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/ESManual.pdf), [Wikipedia - Bowling Ball](https://en.wikipedia.org/wiki/Bowling_ball), [bowlingball.com](https://www.bowlingball.com/BowlVersity/bowling-ball-specifications), [USBC Hardness Spec](https://bowl.com/news/usbc-issues-final-adjusted-bowling-ball-hardness-specification)

---

## Appendix B: Glossary of Key Terms

| Term | Definition |
|------|-----------|
| **Breakpoint** | The point on the lane where the ball transitions from hook phase to roll phase; the first visible direction change |
| **Bowtie** | The point where flare rings cross on the ball, nearest the fingers |
| **CG (Center of Gravity)** | The static balance point of the ball; marked on the surface |
| **Coverstock** | The outer shell material of the bowling ball |
| **Differential** | Difference between max and min RG values; determines flare potential |
| **Flare** | The migration of the ball's track as it rolls, creating multiple oil rings |
| **Intermediate Differential** | Difference between high and intermediate RG; measures core asymmetry |
| **Mass Bias (MB)** | Point on asymmetric balls marking the preferred spin axis; a.k.a. PSA |
| **PAP (Positive Axis Point)** | The point on the ball perpendicular to the bowler's initial rotation axis |
| **Pin** | The colored dot marking the top of the core (low RG axis) |
| **PSA (Preferred Spin Axis)** | The axis an asymmetric ball naturally wants to rotate around |
| **RG (Radius of Gyration)** | Measure of mass distribution from the rotation axis |
| **Track** | The oil ring(s) left on the ball from lane contact |
| **VAL (Vertical Axis Line)** | Reference line used in dual-angle layout system |

---

## Appendix C: Visual Identification Quick Reference for ML/CV

Summary of features detectable from bowling video for machine learning classification:

| Feature Category | Detection Method | What It Reveals |
|-----------------|-----------------|-----------------|
| Ball color/pattern | Image classification (CNN) | Manufacturer, specific model family |
| Surface finish (gloss vs. matte) | Specular highlight analysis | Coverstock type (plastic/pearl = shiny, solid reactive = matte) |
| Trajectory shape | Object tracking + curve fitting | Skid length, hook shape (smooth arc vs angular snap), roll phase |
| Breakpoint location | Trajectory inflection point detection | Ball strength, lane condition, targeting |
| Ball speed | Frame-to-frame displacement | Speed profile through phases |
| Rev rate | Rotation counting via surface features | Bowler RPM |
| Flare rings | Oil ring detection on ball between shots | Differential level, drilling layout effectiveness |
| Pin dot location | Colored dot detection | Core orientation relative to grip |
| Text/logo | OCR on paused/slow-motion frames | Manufacturer and model identification |
| Deflection at pins | Post-impact trajectory change | Ball weight, entry angle effectiveness |
