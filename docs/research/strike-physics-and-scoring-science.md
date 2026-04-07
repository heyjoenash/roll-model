# Strike Physics and Scoring Science

> Bowling Buddy Reference Document -- Comprehensive research on the physics of strikes, pin interactions, and scoring mechanics. Every claim is sourced from web research.

---

## 1. Pin Arrangement Geometry

### Pin Triangle Formation

Ten bowling pins are arranged in an equilateral triangle with the apex (head pin) pointing toward the bowler. The formation consists of four rows:

- **Row 1 (front):** Pin 1 (head pin)
- **Row 2:** Pins 2 (left) and 3 (right)
- **Row 3:** Pins 4 (left), 5 (center), 6 (right)
- **Row 4 (back):** Pins 7 (left), 8 (center-left), 9 (center-right), 10 (right)

Source: [Bowling Pin Setup: Dimensions, Spacing, and Why It Matters](https://www.thesportofbowling.com/blog/bowling-pin-setup/)

### ASCII Diagram of Pin Arrangement

```
          7   8   9   10       ← Row 4 (back)
            4   5   6          ← Row 3
              2   3            ← Row 2
                1              ← Row 1 (head pin, closest to bowler)

       ←  Ball travels this direction  →
              (from bowler)
```

Pin numbering viewed from the bowler's perspective:

```
          (7)  (8)  (9)  (10)
            (4)  (5)  (6)
              (2)  (3)
                (1)
                 ↑
            Ball arrives here
```

### Pin-to-Pin Spacing

- **Center-to-center distance:** 12 inches (30.48 cm) between all adjacent pins
- The 12-inch spacing forms a perfect equilateral triangle grid
- **Back row span:** 36 inches (3 feet) from center of pin 7 to center of pin 10
- The spacing was "optimized over decades of practical bowling experience before being formalized into regulation"

Source: [Bowling Pin Setup](https://www.thesportofbowling.com/blog/bowling-pin-setup/)

### Pin Specifications (USBC)

| Specification | Measurement |
|---|---|
| Height | 15 inches (380 mm), +/- 1/8 inch |
| Maximum diameter (belly) | 4.766 inches (121 mm), +/- 1/32 inch |
| Base diameter | 2.25 inches (57 mm) |
| Neck diameter (narrowest, ~10" above base) | ~1.8 inches |
| Weight range | 3 lbs 6 oz to 3 lbs 10 oz (1,530-1,700 g) |
| Center of gravity (from base) | ~5.78 inches (5 5/16") |
| Material | Rock maple wood core, plastic coating, glossy finish |
| Tipping angle | ~9-11 degrees from vertical |

Sources:
- [Bowling Pin - Wikipedia](https://en.wikipedia.org/wiki/Bowling_pin)
- [Bowling Pin Setup](https://www.thesportofbowling.com/blog/bowling-pin-setup/)

### Pin Deck Dimensions

| Specification | Measurement |
|---|---|
| Head pin distance from foul line | 60 feet (18.29 m), +/- 0.5 inch |
| Lane width | 41.25 inches (3 ft 5.25 in) |
| Head pin board position | Board 20 (center of lane) |
| Pin deck depth (front to back wall) | ~35 inches |
| Total playing surface (foul line to end of pin deck) | ~62 ft 10 3/16 in (19.16 m) |
| Pin spot diameter | 2.25 inches |

Sources:
- [Bowling Pin Setup](https://www.thesportofbowling.com/blog/bowling-pin-setup/)
- [Bowling Lane Dimensions - Beginner Bowling Tips](https://bowlingforbeginners.com/bowling-lane-dimensions/)

> **VIDEO ANALYSIS NOTE:** Pin positions are fixed and known. A calibrated camera can use the known 12-inch pin spacing and 36-inch back-row width as reference measurements for calculating ball position and entry angle at the pin deck.

---

## 2. Strike Pocket and Entry Angle

### The Pocket

The "pocket" is the gap between the head pin and the adjacent pin in the second row:

- **Right-handed bowlers:** Between the 1-pin and 3-pin (right side of head pin)
- **Left-handed bowlers:** Between the 1-pin and 2-pin (left side of head pin)

```
  Right-Hander's Pocket:          Left-Hander's Pocket:

       (2)  (3)                        (2)  (3)
         (1)                             (1)
          ↑                              ↑
    Ball hits HERE                 Ball hits HERE
    (between 1-3)                  (between 1-2)
```

Source: [BOWL.com - Striking 101](https://bowl.com/welcome/striking-101)

### Optimal Entry Angle: 6 Degrees

USBC Equipment Specifications and Certification research has determined that the optimum entry angle for a strike ball is **6 degrees**, with the perfect strike occurring when the **center of the ball is at the 17.5 board** when it contacts the pocket side of the head pin.

Key findings from USBC research:

- At 6 degrees entry angle, a ball hitting the head pin between approximately **5.0 and 7.6 cm from its center** yields a **greater than 95% strike probability**
- At 2-3 degrees (shallow angle), the successful impact zone is **cut roughly in half**
- "The pocket is bigger at a higher entry angle" -- the 90% strike zone is substantially wider at 6 degrees than at 2 or 4 degrees

Sources:
- [The perfect strike in tenpin bowling - Physics Today](https://physicstoday.aip.org/quick-study/the-perfect-strike-in-tenpin-bowling)
- [Entry Angle Part 1 - IBPSIA](https://ibpsia.com/entry-angle-part-1/)
- [Entry Angle Part 2 - IBPSIA](https://ibpsia.com/entry-angle-part-2/)

### Acceptable Entry Angle Range

| Entry Angle | Strike Probability | Typical Bowler Level |
|---|---|---|
| 1-2 degrees | Low | Straight ball / beginner |
| 3-4 degrees | Moderate | Average league bowler |
| 4-5 degrees | Good | Advanced league bowler |
| 5-6 degrees | Optimal | Elite / PBA professional |

Most bowlers achieve 3-4 degrees of entry angle. Moving from 4 to 5 degrees produces "a big jump" in scoring improvement. Only elite players consistently reach 6 degrees.

Source: [Entry Angle Part 1 - IBPSIA](https://ibpsia.com/entry-angle-part-1/)

### Entry Board Position

The USBC has published that a pocket strike occurs at **board 17 to 18** with an entry angle of 4 to 6 degrees for right-handed bowlers. Board 17.5 is the theoretical optimum.

Source: [Entry Angle Part 2 - IBPSIA](https://ibpsia.com/entry-angle-part-2/)

### How Entry Angle is Measured

Entry angle is the angle between the ball's direction of travel and a line parallel to the lane boards (gutter-to-gutter direction) at the moment of first pin contact. It can be calculated with:

```
Entry Angle = arctan((17.5 - board_at_breakpoint) / ((80 - pattern_length) * 12))
```

Where distances are in inches and the breakpoint board position and oil pattern length are known variables.

Source: [Entry Angle Part 2 - IBPSIA](https://ibpsia.com/entry-angle-part-2/)

### What Happens at Different Entry Angles

- **Too shallow (< 3 degrees):** Ball deflects too much after hitting the head pin, often failing to reach the 5-pin or carry the 10-pin (for right-handers). Results in "flat" 10-pin leaves.
- **Optimal (4-6 degrees):** Ball drives through the 1-3-5-9 path with enough energy to carry all pins.
- **Too steep (> 6 degrees):** Ball drives too hard through the head pin, creating excess energy that wraps the 6-pin around the 10-pin (ringing 10) or leaves the 4-pin/8-pin.

### Brooklyn Strikes

A Brooklyn (also called a "Jersey" in some regions) is when the ball crosses over to hit the opposite pocket -- a right-hander hitting the 1-2 pocket or a left-hander hitting the 1-3 pocket. Brooklyn strikes can still occur because pin-to-pin collisions can compensate, but the strike percentage is substantially lower than a properly-pocketed ball.

Source: [PBA Bowling Lingo](https://www.pba.com/about/bowling-lingo)

> **VIDEO ANALYSIS NOTE:** Entry angle can be calculated from video by tracking the ball's position at two points near the pin deck (e.g., at 55 feet and 60 feet from the foul line). The angle formed by the ball's trajectory relative to the lane's long axis gives the entry angle. Board position at impact is directly measurable from overhead or elevated camera views.

---

## 3. Ball-Pin Interaction Physics

### Ball Path Through the Pin Deck

On a perfect pocket strike, the ball directly contacts **only 4 of the 10 pins**. The remaining 6 pins are knocked down by pin-to-pin collisions (the "chain reaction").

**Right-hander ball path: 1 → 3 → 5 → 9**

```
  (7)  (8)  (9)  (10)
    (4)  (5)  (6)
      (2)  (3)
        (1)
         \
          \ Ball path
           \  (entering at ~6 degrees)
```

**Left-hander ball path: 1 → 2 → 5 → 8**

### Pin Chain Reactions (Right-Hander Strike)

The ball contacts 4 pins. The other 6 fall via these chain reactions:

| Chain | Sequence | Description |
|---|---|---|
| Ball path | 1 → 3 → 5 → 9 | Ball directly contacts these 4 pins |
| Green chain | 1-pin → 2-pin → 4-pin → 7-pin | Head pin flies left, knocks 2 into 4, 4 into 7 |
| Red chain | 3-pin → 6-pin → 10-pin | Ball drives 3 into 6, 6 carries the 10 |
| Blue chain | 5-pin → 8-pin | Ball drives through 5, which takes out 8 |
| Direct | 9-pin | Ball's last direct contact |

Source: [The perfect strike in tenpin bowling - Physics Today](https://physicstoday.aip.org/quick-study/the-perfect-strike-in-tenpin-bowling)

### Ball Deflection After Head Pin

When a ~15 lb bowling ball strikes a ~3.5 lb pin, the mass ratio is approximately 4.3:1. The ball retains most of its momentum but deflects laterally. The degree of deflection depends on:

- **Ball weight:** Heavier balls (16 lbs) deflect less than lighter balls (14 lbs)
- **Ball speed:** Faster balls deflect less (more momentum to maintain trajectory)
- **Entry angle:** Steeper angles help the ball drive through the pin deck rather than deflecting off to the side
- **Remaining ball energy:** A ball that has used most of its energy hooking will deflect more

Source: [Ball Weight - Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/ball-weight/)

### Collision Physics

Pin collisions in bowling are **inelastic** -- kinetic energy is partially converted to sound, heat, and deformation energy. Key principles:

- **Conservation of momentum:** The total momentum of the ball-pin system is conserved. A 15 lb ball at 17 mph carries substantially more momentum than a 3.5 lb pin can absorb, so the ball continues through the deck.
- **Energy transfer:** The ball transfers kinetic energy to pins on contact. The amount depends on speed, weight, and angle of impact.
- **Pin center of gravity:** Located ~5.78 inches from the base (about one-third up the pin height, roughly 1 inch above the widest diameter). Force applied above or below this point causes tilting/rotation.
- **Tipping threshold:** A pin must tilt approximately 9-11 degrees from vertical before gravity pulls it over.

Sources:
- [Striking Physics: The Science Behind Bowling - USC](https://illumin.usc.edu/striking-physics-the-science-behind-bowling/)
- [Physics of Bowling - Real World Physics](https://www.real-world-physics-problems.com/physics-of-bowling.html)

### Messenger Pins

A **messenger** is a pin that, after being struck by the ball or another pin, travels across the pin deck to knock down additional pins. The most common messengers:

- The **2-pin** flying left-to-right across the deck to clip the 10-pin
- The **4-pin** sliding across to take out the 10-pin
- The **3-pin** (for left-handers) carrying across to the 7-pin

Messengers are a critical part of strike carry. The USBC's 2023 string pin study found a **7.1% reduction in strike percentage** with string-set pins compared to free-fall pins, largely because string pins cannot fly freely across the deck as messengers.

Sources:
- [What Is A Messenger In Bowling - SportsLingo](https://www.sportslingo.com/sports-glossary/m/messenger-bowling/)
- [PBA String Pin Report 2024](https://www.pba.com/2024/november/executive-summary-2024-pba-string-pin-report)

### The Role of Ball Weight in Deflection

| Ball Weight | Deflection | Pin Carry | Trade-off |
|---|---|---|---|
| 16 lbs | Least deflection | Maximum carry | Harder to control, higher fatigue |
| 15 lbs | Slightly more deflection | Very good carry | Best balance for most bowlers |
| 14 lbs | Moderate deflection | Good carry | Better control, some carry loss |
| 12-13 lbs | Most deflection | Reduced carry | Suitable for lighter/younger bowlers |

Modern reactive resin coverstocks and dynamic core designs have narrowed the gap between 15 lb and 16 lb balls. Most PBA professionals now use 15 lb equipment.

Source: [Ball Weight - Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/ball-weight/)

> **VIDEO ANALYSIS NOTE:** Ball deflection after the head pin is clearly visible from a pin-deck camera. The degree of deflection indicates entry angle quality and remaining ball energy. Measuring how far the ball deviates from its initial path through the pins provides diagnostic data about the shot.

---

## 4. Speed and Rev Rate Interaction

### Optimal Ball Speed

| Measurement Point | Speed Range | Notes |
|---|---|---|
| At release | 18-21 mph | Speed off the bowler's hand |
| Mid-lane | 17-19 mph | After friction begins slowing the ball |
| At pin impact | 16-18 mph | Speed when contacting the head pin |

PBA professionals typically release the ball at 20-22 mph, with it reaching the pins at approximately 17-18 mph. The ball loses 2-4 mph through friction during its 60-foot travel.

Sources:
- [Ball Speed Versus Rev Rate - BowlingBall.com](https://www.bowlingball.com/BowlVersity/ball-speed-versus-rev-rate)
- [Ideal Bowling Ball Speed - BowlingBall.com](https://www.bowlingball.com/BowlVersity/ideal-bowling-ball-speed)

### How Speed Affects Pin Carry

- **Too slow (< 15 mph at pins):** Ball hooks too much, enters at too steep an angle, and/or lacks energy to drive through the pin deck. May leave flat corner pins.
- **Optimal (16-18 mph at pins):** Ball has enough momentum to drive through the 1-3-5-9 path while maintaining proper entry angle.
- **Too fast (> 19 mph at pins):** Ball skids through the oil pattern without hooking enough, enters the pocket at too shallow an angle, and deflects excessively. Leaves corner pins.

Source: [The Impact of Ball Speed on Pin Action - Richmond 40 Bowl](https://richmond40bowl.com/the-impact-of-ball-speed-on-pin-action/)

### Rev Rate Baselines

| Rev Rate (RPM) | Classification |
|---|---|
| < 200 | Low revs |
| 200-300 | Below average |
| 300-350 | Average |
| 350-450 | Above average |
| 450+ | High revs (many PBA pros) |

Average baseline: ~325 RPM. The normal range for league bowlers is 300-350 RPM.

Source: [Rev Rate Ball Speed - MOTIV Bowling](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html)

### Speed-to-Rev-Rate Matching

The interaction between ball speed and rev rate determines the ball's motion profile. Three categories of bowlers:

**Speed Dominant (speed > revs)**
- Ball speed exceeds 17 mph with RPM below 300
- Ball motion: Less hook, shallower entry angle
- The ball transitions from skid to hook to roll more slowly
- Equipment strategy: Use high-traction balls with aggressive coverstocks and large cores

**Matched/Balanced**
- Speed and revolutions correlate proportionally
- Guideline: for every 2 mph above average speed, add ~100 RPM above average
- Can use equipment "as advertised" for intended lane conditions
- Most versatile and adaptable

**Rev Dominant (revs > speed)**
- RPM overwhelms ball speed (common among PBA professionals)
- Ball motion: Strong early hook, risk of over-reaction
- Equipment strategy: Use cleaner, more angular balls for controllable motion

Source: [Rev Rate Ball Speed - MOTIV Bowling](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html)

### The Core Relationship

More revolutions = more hook potential = steeper entry angle capability. But this must be balanced against speed:

- Higher revs with matched speed → ball hooks at the right time, achieving 4-6 degree entry
- Higher revs with too much speed → ball never fully hooks, enters pocket at shallow angle
- Higher revs with too little speed → ball hooks too early, burns energy before the pins

Source: [Ball Speed Versus Rev Rate - BowlingBall.com](https://www.bowlingball.com/BowlVersity/ball-speed-versus-rev-rate)

> **VIDEO ANALYSIS NOTE:** Ball speed can be measured from video by tracking the ball's position over known distances (e.g., the arrows at 15 feet, the dots at various positions). Rev rate is harder to measure optically but could potentially be estimated from ball track rotation patterns or spin markers on the ball. Speed at both release and pin contact can be compared.

---

## 5. What Causes Common Pin Leaves

Understanding what pins remain standing reveals the physics of what went wrong. Below is a comprehensive table for right-handed bowlers (mirror for left-handers).

### Quick Reference: Pin Leaves and Their Causes

| Leave | Pins Standing | Cause | Physics |
|---|---|---|---|
| **Flat 10** | 10 | Ball lacks energy entering pocket | Ball deflects too much after hitting 1-3; the 6-pin lays down in the channel instead of carrying across to the 10-pin |
| **Ringing 10** | 10 | Ball has too much energy / too steep angle | 6-pin wraps around the top of the 10-pin instead of knocking it down; 6-pin contacts 10 but spins it rather than driving it back |
| **Solid 8** | 8 | Ball hit too high in the pocket | Ball entered too far left of center on the head pin; 5-pin fails to contact 8-pin properly |
| **Solid 9** | 9 | Slightly high hit, steep entry | Ball drove too hard through the pocket, 9-pin not contacted cleanly |
| **4-pin** | 4 | Light/weak pocket hit | Ball hit the pocket too lightly; insufficient energy or angle to carry the 2-pin into the 4-pin |
| **7-10 split** | 7, 10 | Dead-center head pin hit | Ball hit the 1-pin flush in the center; head pin flies straight back, no lateral action to reach corners |
| **Baby split (3-10)** | 3, 10 | Very light pocket hit | Ball barely caught the head pin; glanced off the 1-pin without driving into the 3-pin |
| **Baby split (2-7)** | 2, 7 | Very light Brooklyn hit | Ball crossed over but barely contacted the head pin on the left side |
| **Washout (1-2-4-10)** | 1, 2, 4, 10 | Missed the head pin entirely | Ball went to the right of the head pin; no head-pin contact means no chain reaction on the left side |
| **Bucket (2-4-5-8)** | 2, 4, 5, 8 | Very high pocket hit | Ball hit too much of the head pin; head pin flies straight back without proper lateral scatter |
| **Bucket (3-5-6-9)** | 3, 5, 6, 9 | Very high Brooklyn hit | Same as above but from the opposite side |
| **Greek Church (4-6-7-9-10)** | 4, 6, 7, 9, 10 | Severe miss / weak ball | Major pocket miss; ball failed to generate proper chain reactions on either side of the pin deck |
| **Big Four (4-6-7-10)** | 4, 6, 7, 10 | Weak hit, poor angle | Ball hit the pocket but deflected out without driving through; outer pins on both sides untouched |

Sources:
- [Common Bowling Splits - BowlingBall.com](https://www.bowlingball.com/BowlVersity/common-bowling-splits)
- [MDM Coaching: Why Am I Leaving 10 Pins - BowlersMart](https://www.bowlersmart.com/2020/03/19/mdm-coaching-why-am-i-leaving-10-pins/)
- [Do You Understand What The Pins Are Saying - Radical Bowling](https://radicalbowling.com/tech-docs/do-you-understand-what-the-pins-are-saying)
- [Split (bowling) - Wikipedia](https://en.wikipedia.org/wiki/Split_(bowling))

### Detailed Physics: The 10-Pin Problem

The 10-pin (7-pin for lefties) is the most commonly left single pin for competitive bowlers. There are two distinct types:

**Flat 10 (Weak 10):**
The ball enters the pocket with insufficient energy. After contacting the 1-3-5-9 path, the ball has lost enough energy that the 3-pin does not drive the 6-pin with enough force. The 6-pin "lays down in the channel" rather than flying across the deck to contact the 10-pin. Fix: Move slightly left to find more oil and conserve ball energy to the pocket.

**Ringing 10 (Solid 10):**
The ball enters with too much energy and/or too steep an entry angle. The ball drives into the 3-pin heavily (heavier than the 1-pin), causing the 6-pin to be hit at a different angle. The 6-pin contacts the 10-pin but wraps around it, causing the 10-pin to spin in place rather than being knocked backward. Fix: Reduce entry angle, move target slightly right, or use a less aggressive ball surface.

Sources:
- [Radical Bowling Tech Docs](https://radicalbowling.com/tech-docs/do-you-understand-what-the-pins-are-saying)
- [MDM Coaching - BowlersMart](https://www.bowlersmart.com/2020/03/19/mdm-coaching-why-am-i-leaving-10-pins/)

> **VIDEO ANALYSIS NOTE:** Identifying which pins remain standing after a shot is a primary function of video analysis. By classifying the leave pattern, the system can diagnose entry angle problems, speed issues, and ball energy concerns. The distinction between a flat 10 and a ringing 10 requires observing the 6-pin's behavior -- did it lay down short (flat) or did it wrap around the 10 (ringing)?

---

## 6. Perfect Game Analysis (300 Game)

### What 12 Consecutive Strikes Requires

A perfect game demands 12 strikes: one in each of frames 1-9, plus three in the 10th frame (due to bonus balls). This requires:

- **Speed consistency:** Within +/- 1 mph shot to shot. If shots vary between 16.6 and 18.4 mph, ball motion changes dramatically.
- **Rev rate consistency:** Minimal variation in RPM to produce the same hook shape
- **Target accuracy:** Board-level precision, consistently hitting within 1-2 boards of the target at the arrows (15 feet) and at the breakpoint (40-50 feet)
- **Repeatable release:** Identical hand position, axis rotation, and axis tilt on every shot
- **Lane reading:** Adjusting for oil breakdown as the game progresses while maintaining strike results

Sources:
- [Shot Repeatability - BOWL.com](https://bowl.com/welcome/shot-repeatability-957f4eeeaf626ddf7f503de3ad4fb450)
- [Ball Speed Consistency - BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-ball-speed-chart)

### PBA Pro Shot-to-Shot Variation

Professional bowlers distinguish themselves through shot repeatability. Ball tracking data from PBA telecasts shows:

- Pros maintain speed within approximately **+/- 0.5-1.0 mph** between shots
- Target accuracy is within **1-2 boards** at the arrows
- The foundation of shot repetition is swing plane and release consistency
- "Any weakness in shot repetition and accuracy will cause the bank account to get drained pretty quickly" for touring professionals

Source: [Shot Repetition and Accuracy - Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/shot-repetition-and-accuracy-part-1/)

### 300 Game Statistics

| Statistic | Value |
|---|---|
| Odds for a league bowler | ~1 in 11,500 games |
| Odds for a 200+ average bowler | ~1 in 460 games |
| USBC-certified 300 games per year | ~50,000+ annually |
| First televised 300 | Jack Biondolillo, April 1, 1967 |
| Televised PBA 300 games (through 2026) | 36 in title events |
| Total certified 900 series (3 consecutive 300s) | 43 by 42 bowlers (as of Feb 2026) |

The number of sanctioned 300 games has increased substantially since the 1990s due to reactive resin coverstocks, asymmetric ball cores, synthetic lane surfaces, and precision lane oiling machines.

Sources:
- [Perfect game (bowling) - Wikipedia](https://en.wikipedia.org/wiki/Perfect_game_(bowling))
- [How Many People Have Bowled a 300 - TenpinDoctors](https://www.tenpindoctors.com/Article/51/how-many-people-have-bowled-a-300-the-impact-of-perfect-games-on-bowling)

### House Pattern vs. Sport Pattern

The lane oil pattern dramatically affects 300 game frequency:

| Factor | House Pattern | Sport Pattern |
|---|---|---|
| Oil ratio (center-to-outside) | 8:1 or higher | 4:1 or lower |
| Pattern length | 38-42 feet typical | 32-53 feet |
| Margin of error | ~10 boards | 1-3 boards |
| Scoring impact | High averages, more 300s | 35-50 pin average drop |
| 300 game frequency | Common | Rare |

A league bowler averaging in the high 200s on a house pattern may lose 35-50 pins of average when bowling on PBA/sport patterns.

Sources:
- [House Shot vs PBA or Sport Shot - Tamer Bowling](https://tamerbowling.com/house-shot-vs-pba-or-sport-shot/)
- [Sport Bowling - Wikipedia](https://en.wikipedia.org/wiki/Sport_bowling)

---

## 7. Spare Shooting Strategy

### Why Spare Shooting Matters

Spare conversion rate predicts scoring average more accurately than strike percentage for most bowlers. A spare recovers approximately 10 pins from an open frame, plus the bonus from the next ball.

- A bowler converting 70% of spares typically averages 150-170
- A bowler converting 80%+ often averages 180-200
- Professional bowlers convert spares at 80-85% overall
- Recreational bowlers convert spares at 40-50%

Source: [What Is the Average Bowling Score - SportSurge](https://sportssurge.alibaba.com/bowling/what-is-the-average-bowling-score)

### Single-Pin Spare Conversion Rates

| Skill Level | Single-Pin Conversion Rate |
|---|---|
| PBA professional | ~93% (field average at PBA World Championships) |
| Top PBA pro (e.g., Malott) | ~98.8% |
| Advanced league bowler (200+ avg) | ~85-90% |
| Average league bowler | ~70-80% |
| Recreational bowler | ~50-60% |

Source: [Pro bowlers: Avg single pin spare conversion - BowlingBoards.com](http://www.bowlingboards.com/threads/18631-Pro-bowlers-Avg-single-pin-spare-conversion-percentage)

### The 3-6-9 Spare System

The most widely taught spare system. The bowler keeps the same target at the arrows but moves their starting position (feet) on the approach:

**For right-handed bowlers:**

| Pin to Spare | Foot Movement | Direction |
|---|---|---|
| 2-pin | 3 boards right | From strike position |
| 4-pin | 6 boards right | From strike position |
| 7-pin | 9 boards right | From strike position |
| 3-pin | 3 boards left | From strike position |
| 6-pin | 6 boards left | From strike position |
| 10-pin | 9 boards left | From strike position |

The key principle: the target on the lane stays the same; only the starting position changes. This creates different angles to reach different pins.

Source: [Bowling Spares as Easy as 3-6-9 - BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-spares-as-easy-as-3-6-9)

### Cross-Lane Spare Shooting

Many advanced bowlers prefer "cross-lane" spare shooting for corner pins:

- **10-pin (right-handers):** Stand far left on the approach, throw straight across the lane at the 10-pin
- **7-pin (right-handers):** Stand far right, throw straight across

This creates the largest target window because the ball crosses the lane diagonally, giving maximum margin for error.

### Plastic/Spare Ball for Corner Pins

Using a non-reactive (plastic or urethane) spare ball is standard practice for single-pin spares, especially corner pins:

- Plastic balls minimize hook, traveling straighter down the lane
- Reactive resin strike balls can hook unpredictably on spare shots, especially across dry boards
- The straighter path reduces variables and improves consistency
- PBA professionals almost universally carry a plastic spare ball

Source: [Master Spare Shots: Why a Plastic Ball is Essential - BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-3-6-9-spare-system)

> **VIDEO ANALYSIS NOTE:** Spare shooting trajectories are measurable from video. The system could track the bowler's starting position on the approach, the ball's path across the lane, and whether the spare was converted. Over time, this data reveals which spares a bowler struggles with and what adjustments would help.

---

## 8. Scoring System

### Traditional Scoring

Bowling uses 10 frames per game. Each frame allows up to 2 deliveries (rolls), except the 10th frame which can have up to 3.

**Symbols:**
- **X** = Strike (all 10 pins on first ball)
- **/** = Spare (remaining pins cleared on second ball)
- **-** = Miss/gutter (zero pins)
- **F** = Foul (foot crossed foul line, counts as zero)

### How Strikes Score

A strike earns **10 + the next two deliveries**:

```
Frame 1: Strike (X)
Frame 2: 7 pins, then spare (/)
Frame 3: 8 pins, then 1 pin

Frame 1 score: 10 + 7 + 3 = 20
Frame 2 score: 10 + 8 = 18
Frame 3 score: 8 + 1 = 9
Running total: 20 + 18 + 9 = 47
```

Three consecutive strikes ("turkey") in a frame: 10 + 10 + 10 = **30 points** for the first frame.

### How Spares Score

A spare earns **10 + the next one delivery**:

```
Frame 1: 6 pins, then spare (/)
Frame 2: 8 pins, then 1 pin

Frame 1 score: 10 + 8 = 18
Frame 2 score: 8 + 1 = 9
Running total: 18 + 9 = 27
```

### 10th Frame Special Rules

The 10th frame has unique rules to ensure full bonus scoring:

- If you roll a **strike** in the 10th: You get 2 bonus deliveries (total of 3 balls)
- If you roll a **spare** in the 10th: You get 1 bonus delivery (total of 3 balls)
- If you roll an **open frame**: No bonus balls (only 2 balls thrown)
- The 10th frame score is simply the total pins knocked down across all deliveries in that frame

### Maximum Score: 300

```
12 consecutive strikes = 300:

Frame:  1    2    3    4    5    6    7    8    9    10
Score: 30   60   90  120  150  180  210  240  270  300
        X    X    X    X    X    X    X    X    X   XXX
```

Each frame scores 30 (10 + 10 + 10), except the 10th which is simply 10 + 10 + 10 = 30 directly.

Source: [How Does Bowling Scoring Work - TheSportOfBowling.com](https://www.thesportofbowling.com/blog/how-does-bowling-scoring-work/)

### World Bowling (Current Frame) Scoring

An alternative scoring system used in some international events:

| Feature | Traditional | World Bowling |
|---|---|---|
| Strike value | 10 + next 2 balls | Fixed 30 points |
| Spare value | 10 + next 1 ball | 10 + first ball of completed frame |
| 10th frame | Up to 3 balls, with bonuses | Same format as frames 1-9 |
| Strikes for 300 | 12 | 10 |
| Score known immediately? | No (must wait for bonus balls) | Yes (each frame finalizes immediately) |

The World Bowling system was designed for television audiences -- scores update in real time without waiting for future deliveries. However, the PBA and most commercial bowling centers worldwide continue to use traditional scoring.

Sources:
- [Comparing World Bowling Scoring to Traditional - BowlersMart](https://www.bowlersmart.com/2023/11/08/comparing-the-world-bowling-scoring-method-to-the-traditional-bowling-scoring-method/)
- [New scoring system for World Bowling Tour - InsideTheGames](https://www.insidethegames.biz/articles/1034575/new-scoring-system-introduced-for-world-bowling-tour-finals-to-try-to-help-sports-olympic-ambitions)

### Average Scores by Skill Level

| Skill Level | Average Score Range |
|---|---|
| First-time / casual bowler | 50-100 |
| Recreational bowler | 100-130 |
| Regular recreational bowler | 130-170 |
| League bowler (national average) | ~150 |
| Competitive league bowler | 180-200 |
| Advanced/semi-pro | 200-215 |
| PBA professional | 215-230 |

Sources:
- [What Is the Average Bowling Score - SportSurge](https://sportssurge.alibaba.com/bowling/what-is-the-average-bowling-score)
- [USBC Records - BOWL.com](https://bowl.com/usbc-records)

---

## 9. The Physics Research

### Key Academic Studies

**"Using Physics Simulations to Find Targeting Strategies in Competitive Tenpin Bowling" (2022/2025)**
- Authors: Simon Ji, Shouzhuo Yang, Wilber Dominguez, Cacey Bester (Princeton, MIT, U of New Mexico, Loughborough, Swarthmore)
- Published: AIP Advances, Vol. 15, Issue 4 (April 2025)
- Method: Derived a system of five coupled differential equations using Euler equations for rigid body rotations to model bowling ball behavior
- Key finding: Some targeting strategies lead to higher strike rates due to "miss room" created by the inhomogeneous oil pattern. The largest contribution to ball motion comes from variable friction along the lane.
- [arXiv preprint](https://arxiv.org/abs/2210.06753)
- [AIP Advances publication](https://pubs.aip.org/aip/adv/article/15/4/045222/3344017/Using-physics-simulations-to-find-targeting)

**USBC 2018 Equipment Specifications Report**
- Used 37 bowlers with a full range of RPM rates
- Analyzed ball tracking data from professional tournaments
- Established the 6-degree entry angle and 17.5 board optimum
- Found that at 6 degrees, strike probability exceeds 95% when the head pin is hit between 5.0 and 7.6 cm from center

Source: [The perfect strike in tenpin bowling - Physics Today](https://physicstoday.aip.org/quick-study/the-perfect-strike-in-tenpin-bowling)

**"Exploring the impact of bowling ball properties and performance through the use of technology" (2024)**
- Authors: Azrena Zaireen Ahmad Zahudi, Juliana Usman, Noor Azuan Abu Osman
- Published: Proceedings of the Institution of Mechanical Engineers, Part P
- Focus: Analysis of bowling ball motion using technology
- [SAGE Journals](https://journals.sagepub.com/doi/abs/10.1177/17543371241260099)

### Computer Simulation Parameters

From the Real World Physics Problems simulation model:

| Parameter | Value |
|---|---|
| Ball mass | 7 kg (15.4 lbs) |
| Ball radius | 10.85 cm (4.27 in) |
| Initial linear velocity (V0) | 8 m/s (17.9 mph) |
| Initial angular velocity (omega0) | 30 rad/s (~286 RPM) |
| Min moment of inertia | 0.031 kg*m^2 |
| Max moment of inertia | 0.033 kg*m^2 |

**Friction coefficient scenarios and results:**

| Scenario | Friction (mu) | Sliding Distance | Hook Deflection | Impact Angle |
|---|---|---|---|---|
| High friction | 0.12 | 9 m (29.5 ft) | 68 cm (26.8 in) | 3.6 degrees |
| Medium friction | 0.08 | 13.7 m (44.9 ft) | 55 cm (21.7 in) | 3.3 degrees |
| Variable (realistic) | 0.04 then 0.20 | 15 m (49.2 ft) | 37 cm (14.6 in) | 3.3 degrees |

Key finding: Greater lane friction produces greater ball hook. The variable friction model (low friction on oiled front, high friction on dry backend) best approximates real-world lane conditions.

Source: [Physics of Bowling - Real World Physics Problems](https://www.real-world-physics-problems.com/physics-of-bowling.html)

### Ball Tracking Technology

**CATS (Computer-Aided Tracking System)**
- Developed in the 1980s by USBC
- Uses on-lane sonar devices with laser-like beams
- Measures ball speed, spin, and motion
- Limited by the number of sensors placed on the lane

**B.O.L.T.S. (Ball on Lane Tracking System)**
- Development began in 2013 as CATS replacement
- Tracks at 60 frames per second
- Gathers 80-120 data points per shot
- Shows ball path and data before the ball returns to bowler

**SPECTO**
- Modern commercial system used in PBA telecasts
- Real-time ball motion analysis
- Provides speed, rev rate, axis rotation, and trajectory data

Sources:
- [Computer Aided Tracking System - SportMatik](https://sportsmatik.com/sports-corner/sports-technology/computer-aided-tracking-system-cats)
- [Introducing B.O.L.T.S. - BOWL.com](https://bowl.com/introducing-b-o-l-t-s)
- [SPECTO Bowling](https://www.spectobowling.com/)

### Key Physics Principles Applied to Bowling

1. **Conservation of Momentum:** p = mv. A 15 lb ball at 17 mph carries ~107 kg*m/s of momentum. Each 3.5 lb pin absorbs only a fraction on collision.

2. **Kinetic Energy Transfer:** KE = 0.5 * m * v^2. The ball's kinetic energy is distributed among pins through inelastic collisions.

3. **Angular Momentum:** The ball's spin creates angular momentum that, combined with lane friction, produces the hook. The friction force acts off-center from the ball's center of mass, creating rotation.

4. **Moment of Inertia:** Determines how easily the ball spins. Combined with friction, it creates the angular momentum force that causes the ball to deviate from its initial path.

5. **Coefficient of Friction:** Bowling lanes have variable friction -- the oiled front two-thirds has low friction (mu ~0.04) while the dry back third has high friction (mu ~0.20 or more). This differential is what makes hook bowling possible.

Sources:
- [Striking Physics - USC Illumin](https://illumin.usc.edu/striking-physics-the-science-behind-bowling/)
- [Physics of Bowling - Real World Physics Problems](https://www.real-world-physics-problems.com/physics-of-bowling.html)

---

## Appendix A: Video Analysis Measurement Opportunities

Summary of what Bowling Buddy could detect and measure from video:

| Measurement | Method | Difficulty |
|---|---|---|
| Ball speed at various points | Track ball position over known distances between frames | Medium |
| Ball position at arrows (15 ft) | Detect ball crossing arrow markers | Medium |
| Ball position at breakpoint | Track trajectory inflection point | Medium |
| Entry angle at pins | Calculate from last 5-10 feet of ball path | Medium-Hard |
| Board position at pin contact | Measure lateral position relative to lane edges | Medium |
| Pin leave identification | Detect which pins remain standing | Medium |
| Ball deflection through pins | Track ball path after head pin contact | Hard |
| Flat 10 vs. ringing 10 | Observe 6-pin behavior (falls short vs. wraps) | Hard |
| Ball speed at release | Track ball in first few feet after foul line | Medium |
| Speed at pin impact | Track ball in last few feet before pins | Medium |
| Spare conversion tracking | Detect pins before and after second ball | Medium |
| Rev rate estimation | Track ball rotation markers or track pattern | Very Hard |
| Axis rotation/tilt | Requires clear view of ball track | Very Hard |
| Messenger pin identification | Track individual pin trajectories post-impact | Hard |

---

## Appendix B: Key Measurements Quick Reference

```
Lane: 60 ft foul line to head pin, 41.25 in wide (39 boards + 2 gutters)
Pins: 15 in tall, 4.766 in wide, 3 lbs 6-10 oz, 12 in apart center-to-center
Pocket: Board 17.5 for right-handers, between 1-3 pins
Entry angle: 6 degrees optimal, 4-6 degrees acceptable
Ball speed: 16-18 mph at pins, 18-22 mph at release
Rev rate: 300-350 RPM average, 450+ elite
Ball weight: 14-16 lbs (15 lbs most common among pros)
Pin CoG: ~5.78 inches from base
Pin tipping angle: ~9-11 degrees
Perfect game: 12 strikes = 300 points
300 game odds: ~1 in 11,500 (league), ~1 in 460 (200+ average)
```

---

*Document compiled April 2026 for the Bowling Buddy project. All claims sourced from web research.*
