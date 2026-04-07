# Lane Science and Oil Patterns

> Comprehensive reference for bowling lane physics, dimensions, oil pattern mechanics, and lane-reading heuristics. All measurements conform to USBC (United States Bowling Congress) specifications unless otherwise noted.

---

## 1. Lane Dimensions (USBC Specification)

### 1.1 Primary Measurements

| Dimension | Measurement | Metric |
|---|---|---|
| Foul line to head pin | 60 ft exactly | 18.29 m |
| Total playing surface (foul line to end of pin deck) | 62 ft 10 3/16 in | 19.16 m |
| Lane width (gutter tip to gutter tip) | 41.5 in (tolerance: 41-42 in) | 105.4 cm |
| Approach area minimum depth | 15 ft | 4.57 m |
| Overall length (approach + lane + service) | 86.5 ft | 26.36 m |
| Lane thickness | 2-2.5 in | 50.8-63.5 mm |

Sources: [Bowling Lane Layout - TheSportOfBowling.com](https://www.thesportofbowling.com/blog/bowling-lane-layout/), [USBC Bowling Lane Dimensions - BowlingForBeginners](https://bowlingforbeginners.com/bowling-lane-dimensions/), [Dimensions.com - Bowling Lane](https://www.dimensions.com/element/bowling-lane)

### 1.2 Board Specifications

The lane surface is composed of **39 individual boards**, each approximately **1.063 inches wide**, running the full 60-foot length. Board 20 is the exact center of the lane. Boards are numbered 1-39 from right to left for right-handed bowlers (and reversed for left-handers by convention).

Source: [BowlingForBeginners - Lane Dimensions](https://bowlingforbeginners.com/bowling-lane-dimensions/)

### 1.3 Gutter Specifications

| Dimension | Measurement |
|---|---|
| Gutter width | 9.25 in (23.5 cm) |
| Gutter depth | 1.875 in (47.6 mm) |
| Gutter length | Full 60 ft alongside lane |

Total width including gutters: approximately 60 in (1.52 m).

Source: [Dimensions.com - Bowling Lane](https://www.dimensions.com/element/bowling-lane)

### 1.4 Pin Deck Dimensions

| Dimension | Measurement |
|---|---|
| Pin deck depth beyond lane | 2 ft 10 3/16 in |
| Pin deck width | 40.75 in (103.5 cm) |
| Pin spot diameter | 2.25 in |
| Pin center-to-center spacing | 12 in (30.48 cm) |
| Triangle side length (7-pin to 10-pin) | 36 in (3 ft) |
| Head pin distance from tail plank | 34 3/16 in |

The 10 pins form an equilateral triangle with 4 rows (1-2-3-4 pins per row). The arrangement spans 36 inches on each side, measured center-to-center of corner pins.

Sources: [Dimensions.com - Ten-Pin Pin Deck](https://www.dimensions.com/element/ten-pin-pin-deck), [LiveAbout - Pin Rack Dimensions](https://www.liveabout.com/bowling-pin-rack-420521)

### 1.5 Foul Line

The foul line must be between 3/8 inch and 1 inch in width, extend at minimum across the full lane width, and be distinctly marked or embedded between the approach and the lane surface. It must use contrasting color for visibility.

Source: [BowlingForBeginners - Lane Dimensions](https://bowlingforbeginners.com/bowling-lane-dimensions/)

### 1.6 ASCII Lane Layout

```
                          62' 10 3/16"
    |<------ 60' 0" (foul line to head pin) ------>|<-2'10">|
    |                                               |  PIN   |
    |  HEADS    |    MIDLANE     |    BACKENDS      |  DECK  | PIT
    |  0-20 ft  |   20-40 ft    |    40-60 ft      |        |
    |===========|===============|==================|========|====>
    |           |               |                  | 1      |
    |           |               |                  | 2  3   |
    |           |               |                  | 4  5  6|
    |  <arrows> |               |                  |7 8 9 10|
    |  @ 15 ft  |               |                  |        |
    |===========|===============|==================|========|====>
    ^           ^               ^                  ^
    Foul Line   End of Heads    Pattern typically   Head pin
                                ends here (40 ft)
    
    <--- 15 ft --->
    APPROACH AREA
    (behind foul line)

    Lane width: 41.5 in (39 boards)
    Gutter width: 9.25 in (each side)
```

---

## 2. Lane Markings and Reference Points

### 2.1 Approach Dots

Two rows of dots are embedded in the approach area to help bowlers set their starting position:

| Row | Distance from Foul Line | Board Positions |
|---|---|---|
| Back dots | ~12 feet | Boards 3, 5, 8, 11, 14 (mirrored: 26, 29, 32, 35, 37) |
| Front dots | ~6-7 feet | Same board positions as back dots |

The center dot in each row aligns with board 20 (center arrow). These dots are for **foot positioning only** -- bowlers use them to align their stance before starting the approach.

Sources: [GoBowling.com - Approach Dots](https://gobowling.com/blog/guides-tips/understanding-bowling-lane-approach-dots-how-to-use-them-to-improve-your-game/), [TheSportOfBowling.com - Lane Layout](https://www.thesportofbowling.com/blog/bowling-lane-layout/)

### 2.2 Lane Arrows (Range Finders)

Seven V-shaped (inverted triangle) arrows are embedded **15 feet past the foul line**. They are the primary aiming reference for most bowlers -- targeting a mark 15 feet away is far more accurate than aiming at pins 60 feet away.

| Arrow # (R-to-L) | Board Number | Common Name |
|---|---|---|
| 1st arrow | Board 5 | First arrow (gutter side) |
| 2nd arrow | Board 10 | Second arrow (track area) |
| 3rd arrow | Board 15 | Third arrow |
| 4th arrow | Board 20 | Center arrow |
| 5th arrow | Board 25 | Third arrow (left side) |
| 6th arrow | Board 30 | Second arrow (left side) |
| 7th arrow | Board 35 | First arrow (left gutter side) |

Arrow dimensions: approximately 1.25 in x 6 in (31.6 x 152.4 mm).

Sources: [BowlersMart - How to Target](https://www.bowlersmart.com/2020/05/19/how-to-target-and-what-to-look-at-when-bowling/), [Dimensions.com - Bowling Lane](https://www.dimensions.com/element/bowling-lane)

### 2.3 Lane Dots (Range Finders at 7 Feet)

A row of 7 dots sits approximately **7 feet past the foul line**, positioned on the same boards as the arrows (5, 10, 15, 20, 25, 30, 35). These serve as secondary targeting aids, helping bowlers draw a mental line from their position through the dot and arrow toward the target.

Source: [TheSportOfBowling.com - Lane Layout](https://www.thesportofbowling.com/blog/bowling-lane-layout/)

### 2.4 Board Numbering Convention

```
RIGHT-HANDED BOWLER PERSPECTIVE (standard):
Gutter  1  2  3  4  5  ...  10  ...  15  ...  20  ...  25  ...  30  ...  35  ...  39  Gutter
        ^              ^               ^          ^          ^               ^
        |          1st arrow      3rd arrow    CENTER    5th arrow      7th arrow
        Board 1                               (20)

LEFT-HANDED BOWLERS mirror this: their "1 board" is board 39 for right-handers.
```

Source: [BowlersMart - Arrows and Dots](https://www.bowlersmart.com/2025/04/21/what-are-the-arrows-and-dots-on-the-bowling-lane-for/)

### 2.5 How Bowlers Use These Markings

1. **Stance setup**: Use approach dots to position feet consistently
2. **During delivery**: Focus on arrows (primary target) -- NOT the pins
3. **Mental line**: Draw a line from feet position through the arrow to the intended breakpoint
4. **Fine adjustments**: Target specific boards between arrows for precision (each board is ~1 inch of lateral movement)

Source: [BowlersMart - How to Target](https://www.bowlersmart.com/2020/05/19/how-to-target-and-what-to-look-at-when-bowling/)

---

## 3. Oil Pattern Mechanics

### 3.1 Why Lanes Are Oiled

Lane oil (conditioner) serves two critical functions:
1. **Surface protection**: Without oil, modern reactive resin bowling balls would create friction burns, sparking, and rapid surface degradation. The oil creates a protective barrier between the ball and the lane surface.
2. **Ball motion control**: Oil controls how much a ball hooks (curves). More oil means less friction, which means more skid and less hook. Less oil means more friction and earlier/stronger hook.

Source: [BOWL.com - Understanding Oil Patterns](https://bowl.com/welcome/understanding-oil-patterns)

### 3.2 How Oil Is Applied

Modern lane machines (primarily Kegel and Brunswick brands) function similarly to laser printers:

1. The center mechanic **programs a specific pattern** into the machine
2. The machine travels from the foul line toward the pins (**forward pass**)
3. The machine returns toward the foul line (**reverse pass**)
4. An **oil head** moves back and forth across the lane, depositing precise amounts of oil
5. A **fluid metering pump** (similar to hospital IV devices) controls exact oil volume

**Key programming parameters:**
- **Start/Stop boards**: Which boards receive oil (e.g., "2 to 2" means boards 2 through 38)
- **Loads**: Number of times the machine applies oil in a specific zone (more loads = more oil)
- **Speed**: Machine velocity in inches per second (slower = more oil per unit area)
- **Oil per board**: Measured in microliters (uL), typically 40-50 uL per board

Sources: [Bowling This Month - How to Read a Program Sheet](https://www.bowlingthismonth.com/bowling-tips/how-to-read-a-program-sheet-part-1/), [BOWL.com - Understanding Oil Patterns](https://bowl.com/welcome/understanding-oil-patterns)

### 3.3 Forward Oil vs. Reverse Oil

| Pass | Direction | Purpose |
|---|---|---|
| Forward oil | Foul line toward pins | Creates the pattern shape; controls breakpoint location; typically applies more oil and covers more boards |
| Reverse oil (buff) | Pins back toward foul line | Controls oil volume in the front part of the lane (heads); more reverse oil relative to forward = longer-lasting pattern with smaller transitions |
| Buff zone | Beyond where oil is sprayed | After the machine stops spraying, the brush continues rolling, "buffing" residual oil forward slightly |

The **reverse brush drop** is the distance at which the machine starts applying reverse oil. It is always shorter than or equal to the pattern distance.

**Total oil calculation**: Boards crossed x pump setting (uL/board) = total volume.
Example: 222 boards x 50 uL/board = 11,100 uL = 11.10 mL.

Sources: [Bowling This Month - Program Sheet](https://www.bowlingthismonth.com/bowling-tips/how-to-read-a-program-sheet-part-1/), [BowlersMart - Oil Patterns](https://www.bowlersmart.com/2020/04/05/reading-bowling-oil-patterns-lane-graphs-understanding-terms-other-factors/), [Maverick Bowling Forum - Forward vs Reverse Oil](https://forum.maverickbowling.com/viewtopic.php?t=13103)

### 3.4 How Oil Creates Friction Differential

Oil is **not spread evenly** across the lane. The machine applies different amounts of oil to different zones:

- **Center boards** (around board 20): Heaviest oil concentration
- **Track area** (boards 8-12): Medium oil
- **Outside boards** (boards 1-7): Lightest oil (or dry)
- **Heads** (first 15-20 feet): More oil (machine runs slower)
- **End of pattern**: Less oil (machine speeds up)

This creates a **friction differential**: balls thrown over the oily center skid longer, while balls rolling over the dry outside boards encounter more friction and hook sooner and harder. This is why a ball can appear to "turn the corner" -- it transitions from an oily zone to a dry zone.

Source: [BOWL.com - Understanding Oil Patterns](https://bowl.com/welcome/understanding-oil-patterns)

### 3.5 Oil Volume Measurement

Oil is measured in **milliliters (mL)** for total volume, and **microliters (uL)** per board. Typical values:

| Condition | Total Volume |
|---|---|
| Light volume pattern | 18-22 mL |
| Medium volume pattern | 22-28 mL |
| Heavy volume pattern | 28-35+ mL |
| Typical house shot | 22-24 mL |

Source: [National Bowling Academy - Oil Distance and Volume](https://www.nationalbowlingacademy.com/video/how-oil-distance-volume-impact-lane-play-025375)

---

## 4. House Shot Patterns

### 4.1 Defining Characteristics

A "house shot" (also called THS - Typical House Shot) is the standard oil pattern applied at most bowling centers for recreational and league play.

| Parameter | Typical Value |
|---|---|
| Pattern length | 39-41 feet (~40 ft average) |
| Oil ratio (center to outside) | 8:1 to 10:1 (some up to 12:1) |
| Total oil volume | 22-24 mL |
| Breakpoint board | 8-10 board |

Sources: [Bowling This Month - What Makes a House Shot Typical](https://www.bowlingthismonth.com/bowling-tips/what-makes-a-house-shot-typical/), [National Bowling Academy - Understanding the House Shot](https://www.nationalbowlingacademy.com/post/understanding-the-house-shot), [Nick The Bowling Coach - House Shot](https://nickthebowlingcoach.com/how-to-read-a-house-shot-oil-pattern/)

### 4.2 The "Wall" Effect

The defining feature of a house shot is the dramatic oil ratio -- approximately **10:1** from center to outside. This means there is roughly 10 times more oil in the middle of the lane (between the 2nd arrows, boards 10-30) compared to the outside boards (boards 1-7).

This creates "walls" of friction on the outside:
- **Miss outside** (toward the gutter): The ball hits dry boards, hooks hard back toward the pocket -- still a strike
- **Miss inside** (toward center): The ball skids on heavy oil, holds its line, still reaches the pocket
- **Result**: Built-in "miss room" of several boards in either direction

```
HOUSE SHOT OIL DISTRIBUTION (cross-section at ~20 feet):

Oil Volume
    |
 __|____________________________________________
|  |  :     :                          :     :  |
|  | .:     :.                        .:     :. |
|  |..:.....:..........................:.....:..|
|  |  :     :         HEAVY OIL       :     :  |
|  |  : DRY :     (center, boards     : DRY :  |
|  |  :     :       10-30)            :     :  |
|__|__:_____:__________________________:_____:__|
   1  5    10          20             30  35  39
                   Board Number

   <-- Gutter                        Gutter -->
```

Source: [National Bowling Academy - Understanding the House Shot](https://www.nationalbowlingacademy.com/post/understanding-the-house-shot)

### 4.3 Variation Between Centers

House shots vary between bowling centers due to:
- Different lane machines (Kegel vs. Brunswick)
- Different lane surfaces (wood vs. synthetic types)
- Mechanic preferences and skill level
- Climate/environmental conditions
- Volume of play

A house shot at one center may play very differently from another, even if both are technically "house patterns." The USBC does not regulate house shots -- only sport and challenge conditions have ratio requirements.

Source: [Bowling This Month - What Makes a House Shot Typical](https://www.bowlingthismonth.com/bowling-tips/what-makes-a-house-shot-typical/)

---

## 5. PBA Animal Oil Patterns

The PBA maintains a library of named oil patterns used in professional competition. Each presents unique challenges based on length, volume, and ratio. Pattern specifications are updated periodically; values below reflect 2024 versions unless noted.

**Important note**: "Pattern volume may be adjusted as needed, at the discretion of the lane maintenance professional on site" due to the variety of lane surfaces encountered at different bowling centers (per PBA official policy).

### 5.1 Complete Pattern Catalog

| Pattern | Length | Total Vol. | Fwd Oil | Rev Oil | Ratio | Oil/Board | Scoring Pace |
|---|---|---|---|---|---|---|---|
| Wolf | 34 ft | 29.8 mL | 16.2 mL | 13.6 mL | ~2.5:1 | 50 uL | Medium-High |
| Cheetah | 35 ft | 33.55 mL | 19.65 mL | 13.9 mL | 2.00:1 | 50 uL | High (highest) |
| Viper | 37 ft | 32.4 mL | 17.7 mL | 14.7 mL | ~2.5:1 | 50 uL | Medium |
| Bat | 37 ft | varies | varies | varies | varies | 50 uL | Medium |
| Chameleon | 39 ft | 35.05 mL | 21.5 mL | 13.55 mL | ~2.8:1 | 50 uL | Low-Medium |
| Bear | 41 ft | 33.1 mL | 18.2 mL | 14.9 mL | ~1:1 (flat) | 50 uL | Low |
| Scorpion | 42 ft | 35.05 mL | 21.5 mL | 13.55 mL | ~2.5:1 | 50 uL | Low-Medium |
| Dragon | 45 ft | 29.5 mL | 15.8 mL | 13.7 mL | ~2.8:1 | 50 uL | Low |
| Badger | 47 ft | 28.7 mL | 16.6 mL | 12.1 mL | 3.19:1 | 50 uL | Low |
| Shark | 48 ft | 29.2 mL | 16.7 mL | 12.5 mL | ~3:1 | 50 uL | Medium |

Sources: [PBA Oil Patterns](https://www.pba.com/player-resources/oil-patterns), [PBA Cheetah 35 (2025)](https://www.pba.com/sites/pba/files/2024-12/PBA%20CHEETAH%2035%20(2025)%20(1).pdf), [2024 PBA Cheetah](https://bvsspijkenisse.nl/wp-content/uploads/2025/05/2024-PBA-Cheetah.pdf), [2024 PBA Dragon 45](https://www.pba.com/sites/pba/files/2024-08/2024%20PBA%20DRAGON%2045.pdf), [2024 PBA Badger](https://bowlingbayern.de/wp-content/uploads/2026/02/2024-PBA-Badger.pdf), [2024 PBA Scorpion 42](https://www.morganhillbowl.com/wp-content/uploads/2024/09/2024-PBA-SCORPION-42_Kegel.pdf), [2024 PBA Shark](https://www.vissparboulingu.lv/wp-content/uploads/2025/04/2024-PBA-Shark-vK9H.pdf), [2024 PBA Wolf 34](https://www.morganhillbowl.com/wp-content/uploads/2024/09/2024-PBA-WOLF-34_Kegel.pdf), [2024 PBA Viper 37](https://www.morganhillbowl.com/wp-content/uploads/2024/09/2024-PBA-VIPER-37_Kegel.pdf)

### 5.2 Individual Pattern Details

#### Wolf (34 ft) -- Shortest Pattern
- **Key characteristic**: Extremely short pattern; oil ends very early, creating massive backend reaction
- **Strategy**: Play near the gutter, use straighter angles. Must be very precise at the breakpoint. Consider less aggressive ball surfaces to control backend motion.
- **Rule of 31 breakpoint**: 34 - 31 = board 3 (very close to gutter)
- **Challenge**: Controlling the backend; small miss room with extreme hook potential on the dry backend

Source: [BallReviews - Wolf Pattern](https://www.ballreviews.com/miscellaneous/ball-choice-and-strategy-for-wolf-oil-pattern/)

#### Cheetah (35 ft) -- Highest Scoring
- **Key characteristic**: Short pattern with outside boards dry; highest scoring condition on PBA Tour
- **Strategy**: Play near the gutter with direct angles. Outside part of the lane is completely dry, so accuracy is critical. Straighter players may have an advantage.
- **Rule of 31 breakpoint**: 35 - 31 = board 4
- **Challenge**: Very little oil on the outside; no room for error toward the gutter

Source: [PBA Cheetah PDF](https://www.pba.com/sites/pba/files/2024-12/PBA%20CHEETAH%2035%20(2025)%20(1).pdf)

#### Viper (37 ft)
- **Key characteristic**: Wider oil distribution across the lane surface, allowing a larger variety of angles
- **Strategy**: Multiple angles can work; bowlers can play both inside and outside lines effectively. Medium-length pattern rewards versatility.
- **Rule of 31 breakpoint**: 37 - 31 = board 6

Source: [Daily Double - PBA Oil Patterns](https://mydailydouble.blogspot.com/2024/01/pba-oil-patterns.html)

#### Chameleon (39 ft) -- "Christmas Tree" Layered
- **Key characteristic**: Layered oil distribution creating a distinctive shape; uses multiple load zones creating a "Christmas tree" profile when viewed on a graph
- **Strategy**: Read the lanes carefully as the layered oil creates subtle transitions across the lane. Ball speed control is critical.
- **Rule of 31 breakpoint**: 39 - 31 = board 8

Sources: [Wikipedia - Chameleon Oil Pattern](https://en.wikipedia.org/wiki/Chameleon_oil_pattern), [2024 PBA Chameleon 39](https://www.ligbtour.com/files/112582/2024%20PBA%20CHAMELEON%2039_Kegel.pdf)

#### Bear (41 ft) -- Flattest Ratio
- **Key characteristic**: Near-flat 1:1 side-to-side oil ratio. Considered one of the most difficult PBA patterns because there is virtually no friction differential between inside and outside boards.
- **Total volume**: 29.85 mL (fwd: 18.1 mL, rev: 11.75 mL)
- **Strategy**: Target second arrow area; maintain consistent speed and release. Rule of 31 breakpoint = board 10. Use urethane or controllable reactive equipment.
- **Challenge**: No "wall" to redirect errant shots; every miss goes exactly where you miss

Sources: [BowlingForBeginners - Bear Pattern](https://bowlingforbeginners.com/pba-bear-pattern/), [Midwest Bowling - PBA Bear](https://www.midwestbowling.com/oil-pattern-library/pba-bear)

#### Scorpion (42 ft)
- **Key characteristic**: Heavy oil volume demands a more direct line to the pocket; similar concept to Chameleon but without the layered structure
- **Strategy**: Play straighter lines with less angle. The heavier volume holds the ball straighter, reducing hook. Higher speed may help control skid length.
- **Rule of 31 breakpoint**: 42 - 31 = board 11
- **Scoring pace**: Low to medium

Source: [PBA Oil Pattern Difficulty Ratings](https://www.ballreviews.com/miscellaneous/pba-oil-pattern-difficulty-ratings/)

#### Dragon (45 ft)
- **Key characteristic**: Long pattern providing a high level of difficulty; ball must travel 45 feet before encountering significant friction
- **Total volume**: 25.6-29.5 mL depending on version
- **Strategy**: Rule of 31 breakpoint = board 14. Play deeper inside the lane and use speed to push the ball through the heavy front-end oil. Ball selection favoring strong backends is important.
- **Challenge**: Extremely long oil means minimal hook; must generate angle from deep inside

Sources: [BowlingForBeginners - Dragon Pattern](https://bowlingforbeginners.com/dragon-oil-pattern/), [2024 PBA Dragon 45](https://www.pba.com/sites/pba/files/2024-08/2024%20PBA%20DRAGON%2045.pdf)

#### Shark (48 ft) -- Heavy Outside Oil
- **Key characteristic**: Oil applied most densely at the center AND on the outside boards. Unlike most patterns, the outside is NOT dry -- this removes the gutter-side friction that normally helps hook the ball back.
- **Strategy**: Must play the centerline of the lane; outside lines are not viable due to heavy outside oil preventing hook. Rule of 31 breakpoint = board 17.
- **Scoring pace**: Medium (despite length, the restricted play area simplifies decision-making for some pros)

Sources: [Daily Double - PBA Oil Patterns](https://mydailydouble.blogspot.com/2024/01/pba-oil-patterns.html), [2024 PBA Shark](https://www.vissparboulingu.lv/wp-content/uploads/2025/04/2024-PBA-Shark-vK9H.pdf)

#### Badger (47 ft) -- Longest Standard Pattern
- **Key characteristic**: Longest pattern in the PBA animal library at 47 feet (historically 52 feet in older versions). The greatly increased length and higher volume place a premium on shot repeatability.
- **Strategy**: Must play very deep inside lines. Breakpoint = board 16 (47-31) or board 21 (52-31 for older version). Equipment with strong backend reaction is essential to create angle through the long oil.
- **Challenge**: Extreme distance means the ball has minimal room to hook; precision and power are both required

Sources: [PBA Badger - Midwest Bowling](https://www.midwestbowling.com/oil-pattern-library/pba-badger), [2024 PBA Badger](https://bowlingbayern.de/wp-content/uploads/2026/02/2024-PBA-Badger.pdf)

### 5.3 Pattern Length vs. Difficulty Visualization

```
PATTERN LENGTH SPECTRUM (feet):

SHORT <<<---------------------------------------->>> LONG
  32    35    37    39    41    42    45    47    48
  |     |     |     |     |     |     |     |     |
 Wolf Cheetah Viper Cham. Bear Scorp Dragon Badger Shark

  Play near gutter <----> Play deep inside the lane
  More hook potential <----> Less hook potential
  Higher scoring <----------> Lower scoring (generally)
```

---

## 6. Sport Shot Requirements

### 6.1 USBC Lane Condition Classifications

USBC classifies lane conditions into three tiers based on oil ratio:

| Classification | Oil Ratio | Difficulty | Description |
|---|---|---|---|
| Standard (House) | 8:1 or higher | Easiest | Maximum miss room; heavy center, dry outside |
| Challenge | 4:1 to 8:1 | Intermediate | Moderate miss room; between house and sport |
| Sport | 4:1 or lower | Hardest | Minimal miss room; oil distributed more evenly |

The **ratio** is calculated as: average oil volume on boards L18-R18 (inside) divided by average oil volume on boards R3-R7 and L3-L7 (outside).

Sources: [BOWL.com - Sport Bowling Information](https://bowl.com/sport-bowling/information), [BOWL.com - Sport Bowling Rules](https://bowl.com/sport-bowling/rules-and-procedures), [BOWL.com - Pattern Calculations](https://bowl.com/sport-bowling/pattern-calculations)

### 6.2 Why Sport Shots Are Harder

On a house shot (10:1 ratio), the dramatic friction differential between center and outside creates built-in correction. On a sport shot (3:1 or lower):

- Missing outside does NOT automatically hook back -- the outside boards have nearly as much oil as the inside
- Missing inside does NOT hold its line -- there is insufficient extra oil to prevent over-hooking
- Every miss directly translates to a miss at the pins
- Bowlers must hit their target within 1-2 boards consistently

Source: [Tamer Bowling - House Shot vs PBA/Sport](https://tamerbowling.com/house-shot-vs-pba-or-sport-shot/)

### 6.3 Scoring Differential

Bowlers typically average **20-40 pins lower** on sport conditions compared to house conditions. USBC maintains official conversion charts for averaging:

- A **180 average** on sport conditions is roughly equivalent to a **220 average** on house conditions
- A **190 average** on sport conditions is considered more impressive than 200 on a house shot
- USBC provides specific conversion charts for Sport, Challenge, and Standard designations

Sources: [BOWL.com - Average Conversion Chart](https://bowl.com/sport-bowling/average-conversion-chart), [Tamer Bowling - House vs Sport](https://tamerbowling.com/house-shot-vs-pba-or-sport-shot/)

---

## 7. Lane Transition

### 7.1 What Causes Transition

Lane transition is the progressive change in a lane's frictional characteristics caused by repeated ball traversals. It consists of two simultaneous processes:

**Oil Breakdown** -- Oil being removed from the lane surface:
- Modern reactive resin balls with sanded, high-flaring coverstocks **absorb and erase oil** with every revolution
- High-flare balls break patterns from **back-to-front** (the end of the pattern deteriorates first)
- Creates dry spots where oil previously existed, causing earlier and stronger ball reaction in those zones

**Oil Carrydown** -- Oil being pushed further down the lane:
- The ball picks up oil in the oiled zone and deposits it beyond the pattern's end
- Creates an extended "slick" zone past where the pattern was designed to end
- Reduces the ball's ability to hook at the breakpoint
- Low-flaring balls (polyester, urethane) create more carrydown than high-flare reactive balls

Sources: [BowlersMart - Oil Carry Down and Break Down](https://www.bowlersmart.com/2024/11/18/mastering-bowling-lane-oil-carry-down-and-break-down/), [Kegel - Breakdown and Carrydown Then and Now](https://www.kegel.net/white-papers-articles2/breakdown-and-carrydown-then-and-now), [BowlingBall.com - Oil Breakdown](https://www.bowlingball.com/BowlVersity/what-is-bowling-lane-oil-break-down)

### 7.2 Timeline of Transition

| Phase | Approx. Timeframe | What Happens |
|---|---|---|
| Fresh oil | Games 1-2 | Pattern plays as designed; heaviest oil, most hold |
| Early transition | ~15 frames (~1.5 games) | First noticeable changes; track area begins drying |
| Mid-session | Games 3-4 | Significant breakdown in track area; carrydown builds |
| Late session | Games 5+ | Dramatic changes; original pattern barely recognizable |
| End of block | 6-8+ games | Oil volume in heads drops to ~50% of original; extensive carrydown |

Starting pattern may have ~80 units of oil in the front area; after a 15-game league session, approximately 40 units may remain in the heads (a 50% reduction).

Sources: [Kegel - Breakdown and Carrydown](https://www.kegel.net/white-papers-articles2/breakdown-and-carrydown-then-and-now), [Bowling Addicts - Lane Transition Points](https://www.bowlingaddicts.com/how-to-read-bowling-lane-transition-points/)

### 7.3 The Track Area

The "track area" is the zone where most bowling balls travel -- typically around **boards 8-12** on either side of the lane on a house shot. This area experiences the fastest breakdown because:
- The highest concentration of ball traffic crosses these boards
- Each ball removes oil from the surface
- The zone dries out progressively, creating earlier hook for subsequent shots

Source: [BowlingBall.com - Oil Carry Down](https://www.bowlingball.com/BowlVersity/what-is-bowling-lane-oil-carrydown)

### 7.4 Reading Transition

Signs that lanes are transitioning:
1. **Ball hooks earlier** than previous shots (oil breakdown in heads/midlane)
2. **Ball hooks less at the breakpoint** (carrydown extending past pattern end)
3. **Ball over-hooks** when you move inside (finding fresh oil but hitting dry backend)
4. **Same shot, different result** (the most obvious indicator)

### 7.5 Adjustments for Transition

| Adjustment Type | When to Use | Effect |
|---|---|---|
| Move feet left (for RH) | Track area drying | Find fresh oil on inside boards |
| Increase ball speed | Moderate breakdown | Push ball further before it hooks |
| Decrease ball speed | Heavy carrydown | Allow ball to read friction sooner |
| Change to weaker ball | Track area very dry | Reduce over-reaction on dry boards |
| Change to stronger ball | Heavy carrydown at breakpoint | Increase hook through carrydown |
| Change ball surface | Various | Sanded = earlier roll; polished = more length |

Sources: [National Bowling Academy - Adjust as Lanes Transition](https://www.nationalbowlingacademy.com/post/how-bowlers-can-adjust-as-lanes-transition), [BOWL.com - Making In-Game Adjustments](https://bowl.com/welcome/making-in-game-adjustments-8c6f1af3abe01df729e6970093e720cf)

### 7.6 Factors Affecting Transition Speed

- **Ball type**: Aggressive reactive resin with sanded surfaces causes fastest breakdown; polyester/plastic causes least
- **Number of bowlers**: More bowlers on a pair = faster transition
- **Oil volume**: Higher-volume patterns last longer before significant transition
- **Rev rate**: High-rev bowlers break down oil faster
- **Lane surface**: Wood absorbs oil faster than synthetic, accelerating breakdown

Source: [Kegel - Breakdown and Carrydown](https://www.kegel.net/white-papers-articles2/breakdown-and-carrydown-then-and-now)

---

## 8. Pattern-Reading Heuristics

### 8.1 The Rule of 31

The most widely used pattern-reading formula in bowling:

```
Breakpoint Board = Pattern Length - 31
```

This estimates the **board number where the ball should exit the oil pattern** and begin hooking.

| Pattern Length | Calculation | Exit Board |
|---|---|---|
| 35 ft (Cheetah) | 35 - 31 | Board 4 |
| 37 ft (Viper) | 37 - 31 | Board 6 |
| 39 ft (Chameleon) | 39 - 31 | Board 8 |
| 40 ft (House shot) | 40 - 31 | Board 9 |
| 41 ft (Bear) | 41 - 31 | Board 10 |
| 42 ft (Scorpion) | 42 - 31 | Board 11 |
| 45 ft (Dragon) | 45 - 31 | Board 14 |
| 47 ft (Badger) | 47 - 31 | Board 16 |
| 48 ft (Shark) | 48 - 31 | Board 17 |

**Important distinction**: The Rule of 31 identifies the **exit point** (where the ball leaves the oil), not the **breakpoint** (where the ball makes its strongest directional change). The actual breakpoint often appears 2-4 boards inside the exit point.

**Limitations**:
- More accurate on sport patterns than house shots (house shots have built-in correction that obscures the breakpoint)
- Less accurate on very short (<33 ft) or very long (>48 ft) patterns
- Affected by lane surface type, oil type, and ball characteristics

Sources: [Human Kinetics - Rule of 31](https://us.humankinetics.com/blogs/excerpt/determining-the-breakpoint-using-the-rule-of-31), [National Bowling Academy - Rule of 31](https://www.nationalbowlingacademy.com/post/next-level-lane-play-understanding-rule-of-31-and-ball-motion), [Beginner Bowling Tips - Rule of 31](https://beginnerbowlingtips.com/lane-conditions-oil-pattern-length-and-the-rule-of-31), [Nick The Bowling Coach - Exit Point vs Breakpoint](https://nickthebowlingcoach.com/bowling-rule-of-31-exit-point-vs-breakpoint-and-why-it-matters/)

### 8.2 The 2-and-1 Adjustment Rule

For making **angular adjustments** on flat patterns:

```
For every 2 boards you move your feet, move your target 1 board in the same direction.
```

This changes the **angle** at which the ball enters the breakpoint while maintaining a similar overall ball path shape.

**Corrected ratios** (per Bowling This Month analysis):
- Moving feet 1 board = approximately **1.5 boards** of movement at the pins (not the commonly cited 3 boards)
- Moving target 1 board = approximately **2.5 boards** of movement at the pins (not the commonly cited 4 boards)

Sources: [Bowling This Month - Target Line Adjustments](https://www.bowlingthismonth.com/bowling-tips/the-fundamentals-of-target-line-adjustments/), [BOWL.com - Making In-Game Adjustments](https://bowl.com/welcome/making-in-game-adjustments-8c6f1af3abe01df729e6970093e720cf)

### 8.3 Reading Ball Reaction to Determine Pattern Shape

| Ball Behavior | What It Indicates |
|---|---|
| Ball hooks early and aggressively | Dry heads / short pattern / oil broken down |
| Ball skids long then hooks sharply | Long pattern with clean backend |
| Ball never hooks | Excessive oil length or carrydown past breakpoint |
| Ball hooks then straightens out | Carrydown beyond the pattern end |
| Different reaction left vs. right | Uneven oil distribution or pair-play imbalance |
| Ball over-hooks on outside line | Track area dried out; move inside for fresh oil |

Source: [BOWL.com - Reading The Lane](https://bowl.com/reading-the-lane)

---

## 9. Lane Surface Types

### 9.1 Traditional Wood Lanes

Wood lanes use two types of lumber in specific zones:

| Zone | Wood Type | Characteristics |
|---|---|---|
| Approach | Hard Rock Maple | Dense, resistant to foot traffic and slides |
| Heads (first ~12 ft) | Hard Rock Maple | Dense grain resists ball impact damage |
| Mid-lane (~12-56 ft) | Pine | Softer, absorbs energy, reduces ball bounce |
| Pin deck | Hard Rock Maple | Withstands pin and ball impacts |

**Friction characteristics**: Maple has consistent friction values around **0.15-0.18**. Wood surfaces have the highest friction of any lane type. Wood is softer than synthetic, so it absorbs oil faster, causing balls to hook sooner. Over time, wood develops visible "track areas" where repeated ball traffic wears grooves into the pine surface.

Sources: [Bowling This Month - Lane Surface Types](https://www.bowlingthismonth.com/quick-tips/understanding-lane-surface-types/), [RepurposedMaterials - Pine and Maple FAQ](https://www.repurposedmaterialsinc.com/blog/faq-pine-and-maple-wood-in-bowling-alley-lanes/), [Flying Bowling - Synthetic vs Wood](https://www.flyingbowling.com/blog/synthetic-vs-wood-bowling-lanes.html)

### 9.2 Synthetic Lane Types

| Surface Type | Manufacturer | Friction Level | Key Characteristics |
|---|---|---|---|
| HPL (High-Pressure Laminate) | AMF | Higher | Softer than ProAnvilane; more friction, more backend; shot changes faster |
| ProAnvilane | Brunswick (older) | Lower | Harder surface; less friction; ball hooks later |
| ProLane | Brunswick (newer) | Lowest | Very low friction; favors stronger coverstocks |
| Guardian / Lane Shield | Various | Highest (synthetic) | Film overlay on wood; lots of friction; early backends |

**Friction coefficients**: Synthetic overlays measure **0.12-0.16** compared to maple wood's 0.15-0.18.

**Key differences from wood**:
- Synthetic surfaces do not absorb oil -- oil sits on top of the surface longer
- Ball reaction tends to be more angular (skid-snap) on synthetic vs. smoother arc on wood
- Transitions happen differently: wood dries from the surface absorbing oil; synthetic dries from ball removal only
- Brunswick synthetic lanes produce later hook than AMF synthetic lanes

Sources: [Bowling This Month - Lane Surface Types](https://www.bowlingthismonth.com/quick-tips/understanding-lane-surface-types/), [Flying Bowling - Synthetic Bowling Lanes Guide](https://www.flyingbowling.com/blog/synthetic-bowling-lanes-guide.html), [Flying Bowling - Synthetic vs Wood](https://www.flyingbowling.com/blog/synthetic-vs-wood-bowling-lanes.html)

### 9.3 Surface Impact on Ball Motion

```
BALL MOTION BY SURFACE TYPE:

        Wood Lane              Synthetic Lane
        
  |    ___....----->       |         ___...---->
  |   /                    |        |
  |  /                     |        |
  | /                      |       /
  |/                       |      /
  *  (release)             *  (release)
  
  Smooth, arcing motion    Skid-snap: longer skid,
  Earlier roll phase       then sharp hook at end
```

---

## 10. Environmental Factors

### 10.1 Temperature Effects

| Temperature | Effect on Oil | Effect on Ball | Effect on Lane |
|---|---|---|---|
| Cooler | Oil thickens, stays concentrated; bonds better to lane surface | Coverstock hardens, reduces grip | Pattern plays more true to design |
| Warmer | Oil thins, spreads more easily | Coverstock softens, increases grip | Oil migrates; pattern less precise |

The temperature of the lane surface when oil is applied is critically important. Cooler lane surfaces allow oil to bond properly without heat-induced migration, producing patterns truer to their intended design.

Sources: [Richmond 40 Bowl - Humidity and Temperature](https://richmond40bowl.com/the-role-of-humidity-and-temperature-in-bowling-conditions/), [BowlingBall.com - Temperature and Environmental Factors](https://www.bowlingball.com/BowlVersity/master-bowling-challenges-temperature-lane-conditions-and-environmental-factors-explained)

### 10.2 Humidity Effects

| Humidity Level | Effect |
|---|---|
| High (>60%) | Oil breaks down faster; lanes feel stickier; ball hooks earlier; moisture mixes with oil creating inconsistency |
| Optimal (40-50%) | Best conditions; oil performs as designed |
| Low (<40%) | Faster oil evaporation; drier conditions develop quicker; ball skids further before hooking |

Recommended facility humidity: **40-50% relative humidity year-round**.

Sources: [Richmond 40 Bowl - Humidity and Temperature](https://richmond40bowl.com/the-role-of-humidity-and-temperature-in-bowling-conditions/), [BowlingBall.com - Environmental Factors](https://www.bowlingball.com/BowlVersity/master-bowling-challenges-temperature-lane-conditions-and-environmental-factors-explained)

### 10.3 Air Circulation

Poor ventilation leads to uneven evaporation of lane conditioner. Areas near HVAC vents, doors, or windows may experience different evaporation rates, creating inconsistencies that differ from lane to lane within the same center.

Source: [Richmond 40 Bowl - Humidity and Temperature](https://richmond40bowl.com/the-role-of-humidity-and-temperature-in-bowling-conditions/)

### 10.4 Transition Rate Factors

| Factor | Faster Transition | Slower Transition |
|---|---|---|
| Ball type | Aggressive reactive resin, sanded | Polyester, plastic, polished |
| Bowler count | More bowlers per pair | Fewer bowlers |
| Rev rate | High rev bowlers | Low rev bowlers |
| Oil volume | Light volume pattern | Heavy volume pattern |
| Lane surface | Wood (absorbs oil) | Synthetic (oil sits on top) |
| Humidity | High humidity | Low/moderate humidity |

On a typical house pattern with 4 bowlers per pair, expect the first significant transition after approximately **15 frames (~1.5 to 2 games)**. By the end of a 3-game league session, skilled bowlers will have made one or more alignment adjustments or ball changes.

Sources: [BowlingBall.com - Lane Transition](https://www.bowlingball.com/BowlVersity/mastering-lane-transition-how-to-handle-the-cliff-on-easier-bowling-patterns), [AMF - Lane Conditions Guide](https://www.amf.com/blog/how-bowling-lane-conditions-affect-your-roll)

### 10.5 Left Lane vs. Right Lane Differences

In pair play (standard bowling uses paired lanes), left and right lanes often develop differently:
- Bowlers alternate shots between lanes, but the timing of oil removal differs
- One lane may be used for strike attempts (heavier traffic on the track area) while the other gets more spare attempts (traffic on different boards)
- Environmental factors (proximity to walls, doors, HVAC) may affect one lane more than the other
- Observant bowlers track their ball reaction on each lane separately and make lane-specific adjustments

Source: [Bowling Addicts - Lane Transition](https://www.bowlingaddicts.com/how-to-read-bowling-lane-transition-points/)

---

## 11. Video Analysis Implications

### 11.1 What Can Be Determined from Video

| Observable | How to Detect | Confidence |
|---|---|---|
| Ball path / trajectory | Track ball position frame-by-frame across known lane markings | High |
| Approximate breakpoint board | Observe where ball changes direction relative to arrows/boards | High |
| Lane arrows as reference points | Visible at 15 ft; known positions on boards 5,10,15,20,25,30,35 | High |
| Approximate ball speed | Distance traveled per frame using lane markings as reference | Medium-High |
| Oil pattern length (approximate) | Observe where ball transitions from skid to hook phase | Medium |
| Lane transition occurring | Compare same bowler's ball path across multiple frames/games | Medium |
| Skid distance | Observe ball rotation onset relative to lane markings | Medium |
| Gutter proximity | Relative position to visible gutter edges | High |
| Entry angle at pins | Ball trajectory in final 15 feet relative to pin positions | Medium-High |

### 11.2 What Requires Metadata (Not Determinable from Video Alone)

| Data Point | Why It Needs Metadata |
|---|---|
| Exact oil pattern name/specs | Oil is invisible; cannot be seen on video |
| Oil volume / ratio | Requires lane machine program sheet |
| Forward vs. reverse oil distribution | Not visible |
| Lane surface type | May be partially visible (wood grain vs. synthetic graphics) but not definitive |
| Temperature / humidity | Environmental sensors required |
| Ball surface preparation | Cannot be determined from standard video angles |
| Exact ball speed (mph) | Requires calibrated distance/time measurement or speed display |

### 11.3 Using Lane Markings for Video Calibration

The arrows at 15 feet from the foul line, spaced exactly 5 boards apart, provide an excellent calibration grid for video analysis:
- Known distance: 15 feet from foul line
- Known spacing: 5 boards (approximately 5.3 inches) between arrows
- Known total width: 35 boards (board 5 to board 35) = approximately 37.2 inches between outer arrows
- These fixed reference points allow computing ball position, speed, and trajectory from overhead or side camera angles

---

## Summary of Key Numbers for Quick Reference

```
LANE:       60 ft long, 41.5 in wide, 39 boards
APPROACH:   15 ft minimum
PIN DECK:   2 ft 10 3/16 in deep, pins 12 in apart
GUTTERS:    9.25 in wide, 1.875 in deep
ARROWS:     7 arrows at 15 ft, on boards 5/10/15/20/25/30/35
DOTS:       7 dots at ~7 ft past foul line (same boards as arrows)
APPR DOTS:  At ~12 ft and ~6-7 ft behind foul line

HOUSE SHOT: ~40 ft, 22-24 mL, 10:1 ratio
SPORT SHOT: Varies, any volume, 4:1 or lower ratio
PBA RANGE:  32 ft (Wolf) to 48 ft (Shark)

RULE OF 31: Pattern length - 31 = approximate exit board
2-AND-1:    Move feet 2 boards, target 1 board (same direction)
```
