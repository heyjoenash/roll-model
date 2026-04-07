# Performance Metrics and Classification Variables for ML

> Bowling Buddy Reference Document -- Video Analysis & Machine Learning
> Last Updated: 2026-04-02 | Status: ACTIVE

---

## Table of Contents

1. [Master Variable Taxonomy](#1-master-variable-taxonomy)
2. [Ball Speed](#2-ball-speed)
3. [Rev Rate (RPM)](#3-rev-rate-rpm)
4. [Axis Tilt and Axis Rotation](#4-axis-tilt-and-axis-rotation)
5. [Loft Distance](#5-loft-distance)
6. [Breakpoint](#6-breakpoint)
7. [Board Position Tracking](#7-board-position-tracking)
8. [Entry Angle](#8-entry-angle)
9. [Ball Motion Phases](#9-ball-motion-phases)
10. [Professional Measurement Systems](#10-professional-measurement-systems)
11. [PBA Broadcast Metrics](#11-pba-broadcast-metrics)
12. [Classification Categories for ML](#12-classification-categories-for-ml)
13. [Defining "Good" vs "Bad" for ML Training](#13-defining-good-vs-bad-for-ml-training)
14. [Data Schema Design](#14-data-schema-design)
15. [Sources](#15-sources)

---

## 1. Master Variable Taxonomy

### 1.1 Master Variable Table

| # | Variable | Category | Unit | Typical Range | Professional Measurement | Video-Detectable | Notes |
|---|----------|----------|------|---------------|--------------------------|-------------------|-------|
| 1 | Ball Speed (launch) | Ball Motion | mph | 14--22 | Specto LIDAR, BOLTS cameras | Yes | Frame-count over known 60ft lane distance |
| 2 | Ball Speed (at pins) | Ball Motion | mph | 11--18 | Specto (entry speed) | Yes | Typically 3--5 mph slower than launch speed |
| 3 | Rev Rate | Ball Motion | RPM | 150--600+ | CATS/BOLTS sensors, Specto calc | Partial | Requires visible ball markings + slow-motion |
| 4 | Axis Tilt | Ball Motion | degrees | 0--90 (typical 5--25) | USBC motion capture, BOLTS | Partial | Requires ball logo/mark tracking |
| 5 | Axis Rotation | Ball Motion | degrees | 0--90 (typical 10--75) | USBC motion capture, BOLTS | Partial | Requires ball logo/mark tracking |
| 6 | Loft Distance | Ball Motion | feet | 0.5--6+ | DigiTrax, BowlersMap video | Yes | Foul line and lane dots as reference |
| 7 | Breakpoint Board | Ball Motion | board # | 5--20 | Specto, BOLTS | Yes | Board markings visible on lane |
| 8 | Breakpoint Distance | Ball Motion | feet | 35--50 | Specto, BOLTS | Partial | Requires calibrated overhead view |
| 9 | Entry Board | Ball Motion | board # | 15--20 (pocket: 16.5--17.5) | Specto (at 59.5 ft) | Yes | Pin deck reference points |
| 10 | Entry/Impact Angle | Ball Motion | degrees | 1--8 (optimal ~6) | Specto (57--59.5 ft calc) | Partial | Requires precise position tracking |
| 11 | Launch Angle | Ball Motion | degrees | -5 to +5 | Specto | Partial | 0 = straight, negative = toward gutter |
| 12 | Foul Line Board | Ball Motion | board # | 5--35 | Specto, BOLTS | Yes | Foul line dots as reference |
| 13 | Arrow Board (15ft) | Ball Motion | board # | 5--30 | Specto, BOLTS | Yes | Arrow markings at 15ft |
| 14 | Hook Phase Start | Ball Motion | feet/board | varies | Specto | Partial | Visible as direction change |
| 15 | Roll Phase Start | Ball Motion | feet/board | varies | Specto | Partial | Visible as straightening |
| 16 | Track Flare | Ball Motion | inches | 0--6+ | Oil ring inspection | No | Requires physical ball inspection |
| 17 | Total Hook (boards) | Ball Motion | boards | 0--25+ | BOLTS calculation | Yes | Delta between foul line board and entry board |
| 18 | Stance Board | Bowler Technique | board # | 15--35 | Video analysis | Yes | Approach dots as reference |
| 19 | Slide Board | Bowler Technique | board # | 10--35 | Video analysis | Yes | Foul line dots as reference |
| 20 | Lateral Drift | Bowler Technique | boards | 0--8 | Video analysis | Yes | Stance board minus slide board |
| 21 | Approach Steps | Bowler Technique | count | 4 or 5 | Visual observation | Yes | Directly observable |
| 22 | Backswing Height | Bowler Technique | relative | belt--above-shoulder | Pose estimation | Yes | Relative to bowler body |
| 23 | Pushaway Timing | Bowler Technique | step sync | early/matched/late | Frame-by-frame | Yes | Sync of ball push with first step |
| 24 | Release Height | Bowler Technique | inches | 0--12 above lane | High-speed video | Yes | Relative to lane surface |
| 25 | Wrist Position | Bowler Technique | category | cupped/flat/broken | High-speed video | Partial | Requires clear hand view |
| 26 | Grip Type | Bowler Technique | category | conventional/fingertip/semi | Observation | Partial | Finger depth in ball |
| 27 | Style Classification | Bowler Technique | category | stroker/tweener/cranker | Rev rate + observation | Yes | Combination of rev rate and form |
| 28 | One-Hand vs Two-Hand | Bowler Technique | boolean | 1H / 2H | Visual observation | Yes | Directly observable |
| 29 | Follow-Through Height | Bowler Technique | relative | waist--above-head | Pose estimation | Yes | Relative to bowler body |
| 30 | Balance (post-shot) | Bowler Technique | seconds held | 0--3+ sec | Video timing | Yes | Time balanced at foul line |
| 31 | Spine Tilt at Release | Bowler Technique | degrees | 5--30 | Pose estimation | Yes | Angle from vertical |
| 32 | Knee Bend at Release | Bowler Technique | degrees | 90--170 | Pose estimation | Yes | Slide leg bend angle |
| 33 | Ball Weight | Equipment | lbs | 6--16 | Specification | No | Must be user-entered |
| 34 | Coverstock Type | Equipment | category | plastic/urethane/solid/pearl/hybrid | Specification | No | Must be user-entered |
| 35 | Core Type | Equipment | category | symmetrical/asymmetrical | Specification | No | Must be user-entered |
| 36 | RG (Radius of Gyration) | Equipment | dimensionless | 2.46--2.80 | Manufacturer spec | No | Must be user-entered |
| 37 | Differential | Equipment | dimensionless | 0.000--0.060 | Manufacturer spec | No | Must be user-entered |
| 38 | Ball Surface Grit | Equipment | grit | 500--4000+ (polished) | Manufacturer spec | No | Must be user-entered |
| 39 | Oil Pattern Length | Lane/Environment | feet | 32--47 | Kegel machine readout | No | Must be user-entered or looked up |
| 40 | Oil Pattern Volume | Lane/Environment | mL | 18--30+ | Kegel machine readout | No | Must be user-entered |
| 41 | Oil Ratio (center:edge) | Lane/Environment | ratio | 3:1 to 10:1 | Kegel/pattern sheet | No | Must be user-entered |
| 42 | Lane Surface Material | Lane/Environment | category | wood/synthetic | Observation | Partial | Visual difference sometimes apparent |
| 43 | Lane Topography | Lane/Environment | thousandths inch | varies | Kegel LaneMapper | No | 744 measurements per lane |
| 44 | Lane Number | Lane/Environment | integer | 1--80+ | Observation/user | Yes | Sometimes visible in frame |
| 45 | Pin Count (first ball) | Outcome | integer | 0--10 | Visual / automatic scorer | Yes | Count remaining pins |
| 46 | Pin Count (second ball) | Outcome | integer | 0--10 | Visual / automatic scorer | Yes | Count remaining pins |
| 47 | Pins Left Standing | Outcome | pin set | e.g., {7,10} | Visual / automatic scorer | Yes | Identify by position |
| 48 | Strike (Y/N) | Outcome | boolean | true/false | Derived from pin count | Yes | All 10 on first ball |
| 49 | Spare (Y/N) | Outcome | boolean | true/false | Derived from pin count | Yes | Remaining cleared on second ball |
| 50 | Split (Y/N) | Outcome | boolean | true/false | Derived from pin config | Yes | Non-adjacent groups, headpin down |
| 51 | Frame Score | Outcome | integer | 0--30 | Scoring rules | Yes | With bonus calculations |
| 52 | Game Score | Outcome | integer | 0--300 | Scoring rules | Yes | Sum of 10 frames |

Sources for table:
- [Specto Data Points](https://www.spectobowling.com/data-points)
- [USBC Ball Motion Study](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/08ballmotionstudy.pdf)
- [BOLTS Introduction](https://bowl.com/introducing-b-o-l-t-s)
- [DigiTrax and BowlersMap](https://bowl.com/equipment-specifications/digitrax-and-bowlersmap)
- [Bowling Lane Specifications](https://www.bowlingball.com/BowlVersity/bowling-lane-specifications)
- [BowlingDL Pose Estimation Research](https://ieeexplore.ieee.org/document/10085434/)

---

## 2. Ball Speed

### 2.1 How It Is Measured Professionally

Ball speed is measured by multiple professional systems, each capturing speed at different points on the lane:

- **Specto (LIDAR)**: Measures "Launch Speed" -- the speed of the ball in the front part of the lane. The LIDAR sensor gathers approximately 120 readings per lane per shot. ([Specto Data Points](https://www.spectobowling.com/data-points))
- **BOLTS (cameras)**: Uses four cameras at 60 FPS tracking 80--120 data points per shot, capturing speed throughout the ball's travel. ([USBC BOLTS](https://bowl.com/introducing-b-o-l-t-s))
- **CATS (sonar/laser)**: The original system used on-lane sonar devices with laser-like beams to detect the ball as it passes. SuperCATS used 23 sensors placed roughly every 2 feet starting at 11 feet from the foul line. ([Sportsmatik - CATS](https://sportsmatik.com/sports-corner/sports-technology/computer-aided-tracking-system-cats))
- **House center radar**: Speed typically measured in the latter third of the lane (near pins), yielding a lower number than launch speed. ([BowlSmart Facebook](https://www.facebook.com/BowlSmart/posts/how-accurate-are-the-ball-speeds-shown-on-pba-telecasts-very-but-with-a-caveaton/2238933499769806/))

**Important caveat**: PBA telecasts display speed measured at the front of the lane, while most house-center speed displays measure near the pin deck. This discrepancy can account for 3--5 mph difference for the same shot. ([BowlSmart](https://www.facebook.com/BowlSmart/posts/how-accurate-are-the-ball-speeds-shown-on-pba-telecasts-very-but-with-a-caveaton/2238933499769806/))

### 2.2 Typical Ranges by Skill Level

| Skill Level | Launch Speed (mph) | Speed at Pins (mph) | Source |
|-------------|-------------------|---------------------|--------|
| Recreational/Casual | 12--16 | 9--13 | [BowlingBall.com](https://www.bowlingball.com/BowlVersity/ideal-bowling-ball-speed) |
| League Average | 15--19 | 12--16 | [Bowling World](https://bowlingworld.com/blogs/pro-tips/ball-speed-measuring-and-optimizing-your-bowling-ball-s-speed) |
| Competitive League | 16--20 | 13--17 | [BowlersMart](https://www.bowlersmart.com/2021/05/09/how-to-calculate-bowling-ball-speed-what-is-the-speed-most-pro-bowlers-are-successful-with/) |
| PBA Professional | 17--22 | 14--18 | [Bowling Buff](https://bowlingbuff.com/how-fast-do-pro-bowlers-bowl) |

### 2.3 Speed Deceleration (Release to Pins)

A bowling ball typically loses 3--5 mph from release to pin impact due to friction between the ball and the lane surface. An effective speed is approximately 16--17 mph at the pins, corresponding to ~20--21 mph at release. ([BowlingBall.com Speed Chart](https://www.bowlingball.com/BowlVersity/bowling-ball-speed-chart))

Factors affecting deceleration:
- **Oil volume**: Heavy oil = less friction = less speed loss (up to 2 mph difference between oily and dry). ([BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-ball-speed-chart))
- **Coverstock surface**: Solid/sanded coverstocks create more friction and slow down faster than polished pearl coverstocks. ([Bowling Zone](https://bowling.zone/bowling-ball-speeds/))
- **Ball weight**: Heavier balls lose less speed proportionally. ([Kegel Topography Study](https://www.kegel.net/topography-study))

### 2.4 Estimating Speed from Video

**Method**: Count the number of frames it takes for the ball to travel a known distance (the lane is 60 feet from foul line to head pin), then calculate:

```
Speed (ft/s) = Distance (ft) / Time (s)
Time (s) = Frame Count / Frame Rate (FPS)
Speed (mph) = Speed (ft/s) * 0.6818
```

**Practical approach**: Use a 15-foot segment (foul line to arrows) for more reliable measurement, then extrapolate. At 30 FPS, each frame represents 0.033 seconds. A ball traveling at 18 mph covers approximately 1.76 feet per frame at 30 FPS. ([Top End Sports](https://www.topendsports.com/biomechanics/video-analysis-speed.htm); [Maverick Bowling Wiki](https://wiki.maverickbowling.com/wiki/index.php/MeasureBallSpeed))

**Accuracy**: In general sports video speed estimation, systems achieve 90--96% accuracy compared to radar. Higher frame rates (60+ FPS) significantly improve accuracy. A 30 FPS camera introduces ~1.7% error per frame of uncertainty over a 15-foot segment. ([ResearchGate - Speed Estimation](https://www.researchgate.net/publication/300918264_Speed_Estimation_Using_Computer_Vision_Abstract_Only))

**Reference points on lane for calibration**:
- Foul line to arrows: 15 feet
- Foul line to lane dots (first set): 6--9 feet
- Foul line to head pin: 60 feet
- Total lane width: 42 inches (39 boards, each ~1.075 inches)

Sources: [Bowling Lane Specifications](https://www.bowlingball.com/BowlVersity/bowling-lane-specifications), [Dimensions.com](https://www.dimensions.com/element/bowling-lane)

---

## 3. Rev Rate (RPM)

### 3.1 Definition and Significance

Rev rate (revolutions per minute) measures how fast the bowling ball rotates on its axis. Higher rev rates generally produce more hook potential and more pin action on impact. Rev rate is one of the two most dominant factors (along with speed) affecting ball motion on the lanes. ([USBC - What's Your Rev Rate](https://bowl.com/what-s-your-rev-rate))

### 3.2 How It Is Measured Professionally

- **Specto**: Calculates RPM from LIDAR readings based on multiple factors. Specto notes that environmental factors can change the number dramatically, so RPM should be used as a reference point during normal conditions. ([Specto Data Points](https://www.spectobowling.com/data-points))
- **BOLTS/CATS**: Use on-lane sensors to detect ball rotation characteristics.
- **BowlersMap / DigiTrax**: Video analysis software capable of up to 1,000 FPS for measuring rev rate from ball markings. ([USBC DigiTrax](https://bowl.com/equipment-specifications/digitrax-and-bowlersmap))

### 3.3 Manual Measurement Method (Tape + Video)

1. Place a contrasting piece of tape on the ball (white tape on dark ball) in the center of the grip, smoothed to the right for right-handers.
2. Record a shot using slow-motion (120 FPS recommended).
3. In frame-by-frame playback, count the number of times the tape mark completes a full revolution over a set number of frames (typically 10 frames of video).
4. Calculate RPM: `RPM = (Number of Revs / Time in seconds) * 60`
5. For 30 FPS video: `revolutions per 10 frames * 15 = approximate RPM`

**Important**: 1/4 rotation error over 10 frames at 30 FPS equates to approximately 45 RPM error -- minor miscounts can produce large inaccuracies. Higher frame rates significantly reduce this error margin. ([BowlingChat Wiki - Measure Rev Rate](https://wiki.bowlingchat.net/wiki/index.php?title=Measure_Rev_Rate); [Maverick Wiki](https://wiki.maverickbowling.com/wiki/index.php/MeasureRevRate))

### 3.4 Typical Ranges by Style

| Style / Category | Rev Rate (RPM) | Speed Context | Source |
|-----------------|----------------|---------------|--------|
| Low rev (beginners, straight bowlers) | Under 250 | Any | [USBC Rev Rate](https://bowl.com/what-s-your-rev-rate) |
| Stroker | Under 300 | 14--17 mph | [Bowling.com](https://www.bowling.com/knowledge-hub/bowling-balls/bowler-types/all) |
| Average / Tweener | 300--370 | 15--19 mph | [BowlingView](https://www.bowlingview.com/stroker-cranker-and-tweener-in-bowling-styles/) |
| Above average | 350--450 | 16--20 mph | [MOTIV](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html) |
| Cranker (one-hand) | 400--550 | 16--20 mph | [Bowling.com](https://www.bowling.com/knowledge-hub/bowling-balls/bowler-types/all) |
| Elite two-handed | 450--600+ | 17--22 mph | [Maverick Forum](https://forum.maverickbowling.com/viewtopic.php?t=12408) |

Jesper Svensson (two-handed PBA pro) has an estimated rev rate in the "600 RPM group" (+/- 10%). ([Maverick Forum](https://forum.maverickbowling.com/viewtopic.php?t=12408))

### 3.5 Video-Based Rev Rate Estimation Challenges

- Ball markings may not always be visible (dark balls, poor lighting, oil covering marks).
- Camera angle matters: overhead or behind-the-bowler views capture different rotation planes.
- At 30 FPS, the ball completes approximately 1 full revolution every 4--12 frames (at 150--450 RPM range), making sub-revolution counting imprecise.
- 120 FPS slow-motion dramatically improves accuracy (4x more data points per revolution).
- Color/logo tracking via computer vision is feasible but requires training on diverse ball appearances.

---

## 4. Axis Tilt and Axis Rotation

### 4.1 Axis Tilt

**Definition**: The angle of the ball's rotation axis relative to the horizontal plane. It measures how much the axis is "tilted" upward. ([Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/))

| Axis Tilt | Description | Effect |
|-----------|-------------|--------|
| 0 degrees | Axis is perfectly horizontal; ball has full forward roll | Maximum friction with lane, earliest hook |
| 5--15 degrees | Low tilt | Early, strong roll phase; arcing ball motion |
| 15--25 degrees | Medium tilt (most common) | Balanced skid-to-hook transition |
| 25--40 degrees | High tilt | Extended skid, later/sharper hook |
| 90 degrees | Full "spinner" (axis points straight up like a top) | Ball spins like a gyroscope, minimal hook |

Typical competitive range: **5--25 degrees**. Tilt less than 11 degrees is considered low; tilt higher than 25 degrees is considered very high. ([BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-ball-axis-tilt-and-axis-of-rotation); [HowBowling.com](https://howbowling.com/what-is-axis-tilt-and-axis-rotation-in-bowling/))

### 4.2 Axis Rotation

**Definition**: The direction/orientation of the ball's rotation axis relative to the direction of travel, viewed from above (top-down perspective). It determines how much "side roll" the ball has. ([Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/))

| Axis Rotation | Description | Effect |
|---------------|-------------|--------|
| 0 degrees | End-over-end roll toward pins | Ball goes straight, minimal hook |
| 15--30 degrees | Low rotation | Gentle arc, early roll |
| 30--60 degrees | Medium rotation (most bowlers) | Moderate hook with good entry angle |
| 60--90 degrees | High rotation | Strong side roll, late sharp hook |
| 90 degrees | Pure side rotation | Maximum hook potential |

Most bowlers fall between **10 and 45 degrees** of axis rotation. ([BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-ball-axis-tilt-and-axis-of-rotation))

### 4.3 Video Detection Feasibility

Axis tilt and rotation can potentially be estimated from video by tracking:
- Ball logo/marking movement patterns frame-to-frame
- The orientation of visible oil rings (track flare) on the ball
- The "migration path" of a visible mark across frames

This requires:
- A clearly visible reference point on the ball surface
- Sufficient frame rate (60+ FPS minimum, 120+ preferred)
- Camera angle that captures the ball's forward-facing surface

**ML feasibility**: Partial. Achievable with good camera placement and visible ball markings, but challenging in typical bowling center lighting and camera positions.

---

## 5. Loft Distance

### 5.1 Definition

Loft distance is how far past the foul line the ball travels through the air before contacting the lane surface. ([Wikipedia - Lofting](https://en.wikipedia.org/wiki/Lofting_(bowling)))

### 5.2 Typical Ranges

| Loft Distance | Classification | Usage |
|--------------|----------------|-------|
| 6--12 inches | Short/controlled | Quick engagement for dry lanes |
| 1--2 feet | Normal | Standard delivery for most conditions |
| 2--4 feet | Extended | Intentional for heavy oil; delays hook |
| 5--6+ feet | Excessive | Typically unintentional; or extreme oil adjustment |

The best players vary loft from 6 inches to 5--6 feet depending on lane conditions. Crankers and high-rev players often loft more to prevent premature hooking. ([BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-lane-specifications); [BowlingQuest](http://bowlingquest.com/?p=10130))

### 5.3 Effect on Ball Motion

- Skips the first portion of the oil pattern, effectively shortening the pattern for the ball
- Delays the ball's engagement with the lane surface
- Preserves ball energy for a stronger backend reaction
- On dry lanes, prevents the ball from hooking too early

### 5.4 Video Detection

**Highly detectable from video.** The foul line is a clear visual reference. The ball's first contact with the lane creates a visible change in motion (slight bounce/skid initiation). Lane dots at 6--9 feet provide additional distance calibration. DigiTrax and BowlersMap specifically measure loft distance from video. ([USBC DigiTrax](https://bowl.com/equipment-specifications/digitrax-and-bowlersmap))

---

## 6. Breakpoint

### 6.1 Definition

The breakpoint is the point on the lane where the ball is at its furthest distance from the pocket before making its turn toward the head pin. It marks the transition from the hook phase to the roll phase. ([National Bowling Academy](https://www.nationalbowlingacademy.com/video/breakpoint-get-lined-up-021857))

### 6.2 Two Components

1. **Breakpoint Board**: Which board the ball is on at the breakpoint (e.g., board 8). Measured from the edge of the lane (gutter = board 0, center = board 20). ([Specto Data Points](https://www.spectobowling.com/data-points))
2. **Breakpoint Distance**: How far down the lane (in feet from foul line) the breakpoint occurs (e.g., 42 feet). ([Specto Data Points](https://www.spectobowling.com/data-points))

### 6.3 Rule of 31

A widely-used estimation method: subtract 31 from the oil pattern length to get the approximate breakpoint board number.

| Oil Pattern Length | Estimated Breakpoint Board | Category |
|-------------------|--------------------------|----------|
| 36 feet (short) | Board 5 | Near gutter |
| 39 feet (medium-short) | Board 8 | Outside |
| 42 feet (medium/house) | Board 11 | Middle-outside |
| 45 feet (long) | Board 14 | Middle |
| 47 feet (extra long) | Board 16 | Near pocket |

Sources: [Human Kinetics](https://us.humankinetics.com/blogs/excerpt/determining-the-breakpoint-using-the-rule-of-31), [Bowling Life EU](https://bowlinglife.eu/knowing-the-lanes-the-rule-of-31)

### 6.4 Video Detection

The breakpoint is visible in video as the point where the ball's lateral movement changes direction most sharply. Overhead or elevated camera angles provide the best view. Lane boards and arrows provide a reference grid for board identification.

**ML feasibility**: Yes -- ball trajectory tracking algorithms can identify the inflection point where lateral velocity changes sign.

---

## 7. Board Position Tracking

### 7.1 Lane Reference System

A bowling lane is 42 inches wide, consisting of **39 individual boards** (each approximately 1.075 inches wide). Board 1 is at the gutter edge on the bowler's ball-side; board 20 is the center. ([Bowling Lane Specs](https://www.bowlingball.com/BowlVersity/bowling-lane-specifications))

**Key reference markings**:
- **Approach dots (two sets)**: At 12 feet and 15 feet from foul line, on boards 5, 10, 15, 20, 25, 30, 35
- **Foul line dots**: On boards 3, 5, 8, 11, 14 and mirrors
- **Arrows**: At 15 feet from foul line, on boards 5, 10, 15, 20, 25, 30, 35 (7 arrows total, separated by 5 boards each)
- **Lane dots (range finders)**: At approximately 6--9 feet from foul line

Sources: [USBC Lane Dimensions](http://www.iowabowl.com/jcusbcba/tips/bowling_lane_dimensions.htm), [Dimensions.com](https://www.dimensions.com/element/bowling-lane)

### 7.2 Key Board Positions per Shot

A complete "line" description of a shot includes:

| Position | What It Measures | Reference Marking |
|----------|-----------------|-------------------|
| Stance board | Where bowler stands (feet) | Approach dots |
| Slide board | Where slide foot ends at foul line | Foul line dots |
| Target board (arrows) | Where ball crosses at 15 feet | Arrows |
| Breakpoint board | Furthest point from pocket | Lane boards |
| Entry board | Board at pin deck (59.5 feet) | Pin positions |

### 7.3 Video Detection

Board positions are among the **most video-detectable** variables because the lane provides its own calibration grid. The arrows (at 15 feet, every 5 boards) are large, clearly visible targets that can be used to establish a board-level coordinate system.

**ML feasibility**: High. Object detection can locate arrows and dots, then use homography transformation to map ball position to board numbers.

---

## 8. Entry Angle

### 8.1 Definition and Optimal Range

Entry angle is the angle at which the ball enters the pin pocket, measured between the ball's path and the lane boards. According to USBC research, the **optimum entry angle for a strike is approximately 6 degrees**, with the center of the ball at board 17.5 when contacting the pocket side of the head pin. ([BowlingBall.com](https://www.bowlingball.com/BowlVersity/bowling-ball-angle-of-entry); [BowlersMart](https://www.bowlersmart.com/2024/10/22/the-physics-behind-a-perfect-bowling-strike/))

A pocket strike typically occurs at **board 17--18 with an entry angle between 4 and 6 degrees**. Even a 1-degree increase in entry angle significantly impacts scoring potential. ([USBC - Adjusting Entry Angle](https://bowl.com/adjusting-entry-angle))

### 8.2 Specto Measurement

Specto calculates "Impact Angle" (renamed from "Entry Angle") as the ball angle measured between 57 and 59.5 feet down the lane. The PBA's "Power Score" metric incorporates this angle. ([Specto Tutorial](https://www.spectobowling.com/tutorialperformance))

### 8.3 Video Detection

Entry angle requires tracking the ball's position at two points near the pin deck and calculating the angle from the resulting trajectory vector. This is achievable with overhead or elevated side cameras but requires precise calibration.

**ML feasibility**: Partial. Requires accurate position data at two close points near the pin deck, which demands good resolution and calibration.

---

## 9. Ball Motion Phases

### 9.1 Three Phases of Ball Motion

Every bowling ball goes through three distinct phases as it travels down the lane:

| Phase | Lane Region | Description | Key Characteristics |
|-------|-------------|-------------|---------------------|
| **Skid** | 0--20 ft (oiled) | Ball slides with minimal friction | Fastest speed, most axis rotation, minimal lane grip |
| **Hook** | 15--45 ft (transition) | Ball grips lane and curves | Speed decreasing, ball changing direction, axis rotation converting to forward roll |
| **Roll** | 40--60 ft (dry backend) | Ball rolls end-over-end toward pins | Slowest speed, minimal axis rotation, straight-line path |

Sources: [Storm Bowling](https://www.stormbowling.com/bowling-ball-reactions-skid-hook-roll), [BowlingBall.com](https://www.bowlingball.com/BowlVersity/the-three-phases-of-bowling-ball-motion), [Breakdown Bowling](https://www.breakdownbowling.com/the-3-phases-of-ball-motion/)

### 9.2 Factors Affecting Phase Transitions

- **Oil pattern**: Longer patterns extend the skid phase; shorter patterns induce earlier hook. ([National Bowling Academy](https://www.nationalbowlingacademy.com/post/what-is-your-ball-motion-telling-you))
- **Ball surface**: Sanded/solid surfaces create more friction (earlier hook); polished/pearl surfaces create less friction (longer skid). ([Storm Bowling](https://www.stormbowling.com/coverstock-secrets-for-bowling-success))
- **Ball speed**: Faster speed extends skid phase.
- **Rev rate**: Higher revs create more friction potential, potentially earlier hook.
- **Axis tilt**: Higher tilt extends skid; lower tilt creates earlier hook engagement.

### 9.3 Video Detection

Phase transitions are visible as changes in ball trajectory curvature and speed. The skid-to-hook transition produces a visible change in lateral movement; the hook-to-roll transition shows the ball straightening out.

Specto tracks specific board positions and speeds at hook and roll phase initiation points. ([Specto Tutorial](https://www.spectobowling.com/tutorialperformance))

---

## 10. Professional Measurement Systems

### 10.1 C.A.T.S. (Computer Aided Tracking System)

| Attribute | Detail |
|-----------|--------|
| Developer | USBC (developed in the 1980s) |
| Technology | On-lane sonar devices with laser-like beams |
| Data points per shot | Limited to number of sensors placed |
| What it measures | Ball position, speed, spin, motion |
| Limitations | Few data points; limited resolution |
| Status | Replaced by BOLTS in ~2014 |

**Super CATS** (enhanced version): 23 sensors measuring position, velocity, and vertical angles down a 60-foot lane. Sensors placed approximately every 2 feet, starting at 11 feet from the foul line.

Source: [Sportsmatik](https://sportsmatik.com/sports-corner/sports-technology/computer-aided-tracking-system-cats), [USBC Ball Motion Study](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/08ballmotionstudy.pdf)

### 10.2 B.O.L.T.S. (Ball On Lane Tracking System)

| Attribute | Detail |
|-----------|--------|
| Developer | USBC (development started summer 2013) |
| Technology | 4 ceiling-mounted cameras |
| Frame rate | 60 FPS |
| Data points per shot | 80--120 |
| What it measures | Ball position, speed, path, trajectory throughout travel |
| Processing speed | Data displayed before ball returns to bowler |
| Advantages over CATS | Dramatically more data points, continuous tracking |

Source: [USBC BOLTS](https://bowl.com/introducing-b-o-l-t-s), [Sportsmatik](https://sportsmatik.com/sports-corner/sports-technologies/ball-on-lane-tracking-system-bolts)

### 10.3 Specto Bowling (LIDAR)

| Attribute | Detail |
|-----------|--------|
| Developer | Angular Velocity / Kegel partnership |
| Technology | High-resolution LIDAR sensor |
| Coverage | Up to 6 lanes per sensor |
| Raw readings | ~120 per lane per shot |
| Calculated data points | ~40 per shot (10 in standard app; up to 35 in coaches version) |
| Key measurements | Launch Speed, Launch Angle, Foul Line Position, Arrow Position, Breakpoint Board/Distance, Entry Board, Entry Speed, Impact Angle, RPM, Power Score, Accuracy Score |
| Limitations | Infrared sensor has trouble reading darker bowling balls |
| Deployment | PBA telecasts (Specto SideTrack), bowling centers worldwide |

Sources: [Specto Bowling](https://www.spectobowling.com/specto-bowling), [Specto Data Points](https://www.spectobowling.com/data-points), [Specto Tutorial](https://www.spectobowling.com/tutorialperformance), [Specto FAQ](https://www.spectobowling.com/frequently-asked-questions)

### 10.4 Kegel LaneMapper

| Attribute | Detail |
|-----------|--------|
| What it measures | Lane surface topography: crowns, depressions, crosswise tilts, lengthwise level |
| Accuracy | 1/1000 of an inch |
| Measurements per lane | 744 data points in ~12 minutes |
| Output | 3D visualization of lane surface; slope-per-board calculations |
| Significance | A board with 2/1000" slope affects ball path twice as much as 1/1000" slope |

Source: [Kegel Topography Study](https://www.kegel.net/topography-study), [Kegel Slope Graphs](https://www.kegel.net/white-papers-articles2/kegels-revolutionary-slope-graphs)

### 10.5 DigiTrax / BowlersMap

| Attribute | Detail |
|-----------|--------|
| Technology | High-speed video analysis (up to 1,000 FPS) |
| What it measures | Loft distance, laydown board, launch angle, breakpoint board/distance, entry angle, ball speed |
| Deployment | Coaching tool; requires dongle for software access |
| Significance | Proves that video-based measurement of these variables is viable at sufficient frame rate |

Source: [USBC DigiTrax](https://bowl.com/equipment-specifications/digitrax-and-bowlersmap)

---

## 11. PBA Broadcast Metrics

### 11.1 Specto SideTrack on FOX Sports

The PBA and FOX Sports use Specto SideTrack technology to display real-time ball tracking data during televised events. This system provides:

- **Ball path overlay**: Visual trail showing the ball's actual path down the lane
- **Launch Speed**: Measured at the front of the lane (typically appears higher than house-center readings)
- **RPM**: Calculated revolutions displayed alongside speed
- **Impact Angle**: Angle of entry into the pin pocket (previously called "Entry Angle")
- **Power Score**: A composite metric combining speed, revs, and entry angle

Source: [BowlingChat Forum](https://forum.bowlingchat.net/viewtopic.php?t=14262), [BowlSmart](https://www.facebook.com/BowlSmart/posts/how-accurate-are-the-ball-speeds-shown-on-pba-telecasts-very-but-with-a-caveaton/2238933499769806/)

### 11.2 How Specto Captures Data for Broadcast

The speed reading is "off the hand" and the rev rate is calculated via images captured by the device positioned between the two lanes. The device captures approximately 100 still images of the ball as it travels down the lane, from which rotation and position are derived. ([BowlingChat Forum](https://forum.bowlingchat.net/viewtopic.php?t=14262))

### 11.3 Relevance to Bowling Buddy

PBA broadcast footage represents a potential **training data source** for ML models. Key considerations:
- Broadcast video typically provides overhead or elevated side-angle views
- Graphics overlays contain labeled ground-truth data (speed, rev rate) that could be used for model validation
- Camera angles are consistent within a telecast but vary between events
- Resolution and frame rate of broadcast footage (typically 30 or 60 FPS) are lower than Specto's raw capture

---

## 12. Classification Categories for ML

### 12.1 Shot Outcome Classification

| Class | Definition | Detection Method |
|-------|-----------|-----------------|
| Strike | All 10 pins knocked down on first ball | Pin count = 10 on ball 1 |
| Spare | Remaining pins cleared on second ball | Pin count = 10 total across both balls |
| Open Frame | Pins remain standing after both balls | Total pin count < 10 |
| Split | Head pin down, 2+ non-adjacent pin groups remain | Pin configuration analysis |
| Washout | Head pin standing with non-adjacent groups | Pin configuration analysis (includes pin 1) |
| Gutter Ball | Ball enters gutter, 0 pins | Pin count = 0 |

**Pin leave encoding**: There are 1,023 possible combinations of pins left standing (2^10 - 1, excluding all-down). Common leaves can be classified by name:

| Leave Name | Pins Standing | Frequency Context |
|------------|--------------|-------------------|
| 10-pin | {10} | Most common single-pin spare (RH bowlers) |
| 7-pin | {7} | Most common single-pin spare (LH bowlers) |
| Baby split | {2,7} or {3,10} | Common, convertible split |
| Bucket | {2,4,5,8} or {3,5,6,9} | Common multi-pin cluster |
| 7-10 split | {7,10} | "Bedposts" -- near impossible to convert |
| Greek Church | {4,6,7,8,10} or {4,6,7,9,10} | Named for cathedral-like shape |
| Big Four | {4,6,7,10} | Corner pins only |
| Washout | {1,2,4,10} or {1,3,6,7} | Head pin still standing |

Sources: [Wikipedia - Splits](https://en.wikipedia.org/wiki/Split_(bowling)), [BowlingBall.com](https://www.bowlingball.com/BowlVersity/common-bowling-splits), [GoBowling](https://gobowling.com/blog/bowling-pin-formations-explained/)

**ML feasibility**: High. Pin detection from video is a well-scoped object detection problem. The pin deck is a fixed geometry with 10 known positions.

### 12.2 Technique Style Classification

| Style | Rev Rate | Speed | Backswing | Wrist | Hook Shape |
|-------|----------|-------|-----------|-------|------------|
| Stroker | <300 RPM | 14--17 mph | Low--medium | Flat/straight | Smooth arc |
| Power Stroker | 300--400 RPM | 16--19 mph | Medium | Cupped | Controlled strong arc |
| Tweener | 300--370 RPM | 15--19 mph | Medium--high | Varies | Moderate hook |
| Cranker | 400--600+ RPM | 16--20 mph | High | Cupped/hinged | Strong angular hook |

Additional classifications:
- **One-handed conventional grip**: Fingers inserted to second knuckle; lower rev potential
- **One-handed fingertip grip**: Fingers to first knuckle; higher rev potential (most competitive bowlers)
- **Two-handed**: No thumb in ball; highest rev potential; growing style

Sources: [Wikipedia - Bowling Form](https://en.wikipedia.org/wiki/Bowling_form), [Bowling.com](https://www.bowling.com/knowledge-hub/bowling-balls/bowler-types/all), [BowlingView](https://www.bowlingview.com/stroker-cranker-and-tweener-in-bowling-styles/)

**ML feasibility**: High for 1H vs 2H classification (pose estimation). Medium for stroker/tweener/cranker (requires rev rate estimation or detailed form analysis).

### 12.3 Bowling Phase Classification (Temporal Segmentation)

For a standard 4-step approach:

| Phase | Duration (approx) | Key Pose Elements | Video Cues |
|-------|-------------------|-------------------|------------|
| 1. Stance/Setup | 1--5 sec | Upright, ball held at waist--chest | Stationary, facing pins |
| 2. Pushaway (Step 1) | 0.3--0.5 sec | Ball pushed forward, ball-side foot moves | Ball and foot move together |
| 3. Downswing (Step 2) | 0.3--0.5 sec | Ball swinging down, second step | Ball descending past hip |
| 4. Backswing Peak (Step 3) | 0.3--0.5 sec | Ball at highest point behind bowler | Arm fully extended behind |
| 5. Forward Swing / Delivery (Step 4/Slide) | 0.3--0.5 sec | Ball swinging forward, slide foot moving | Arm approaching ankle |
| 6. Release Point | 1--3 frames | Ball leaves hand at ankle level | Ball separates from hand |
| 7. Follow-Through | 0.3--1 sec | Arm rises upward, body balanced | Arm extends upward |
| 8. Post-Shot Hold | 0--3+ sec | Balanced at foul line watching ball | Stationary at foul line |

Sources: [USBC - The Approach](https://bowl.com/welcome/the-approach-4840c7151c5dc3884afbeb8041beac5a), [Human Kinetics](https://us.humankinetics.com/blogs/excerpt/timing-on-the-approach), [BowlersMart](https://www.bowlersmart.com/2015/01/02/the-first-step-and-pushaway-ideal-bowling-approach-position-explained-john-gaines/)

**ML feasibility**: High. Temporal action segmentation is a well-studied problem. Pose estimation (MoveNet, MediaPipe with 33 pose points, OpenPose) can classify these phases. The BowlingDL research achieved 83% accuracy on 5-class pose classification using MoveNet + custom CNN. ([BowlingDL - IEEE](https://ieeexplore.ieee.org/document/10085434/))

### 12.4 Skill Level Classification

| Level | Average Score | Characteristics | Source |
|-------|--------------|-----------------|--------|
| Beginner | Under 100 | Learning basics, inconsistent form, straight ball | [EFX](https://efx.co/blogs/news/what-is-a-good-bowling-score-understanding-averages-skill-levels-and-age-comparisons) |
| Novice | 100--130 | Basic spare shooting, occasional strikes | [SportsSurge](https://sportssurge.alibaba.com/bowling/what-are-good-bowling-scores) |
| Intermediate | 130--170 | Consistent spare conversion, developing hook | [TheSportOfBowling](https://www.thesportofbowling.com/blog/whats-a-good-bowling-score/) |
| Advanced/League | 170--200 | Reliable hook, reads lanes, owns equipment | [TheSportOfBowling](https://www.thesportofbowling.com/blog/whats-a-good-bowling-score/) |
| Elite/Competitive | 200--220 | Tournament-level, adjusts to patterns | [EFX](https://efx.co/blogs/news/what-is-a-good-bowling-score-understanding-averages-skill-levels-and-age-comparisons) |
| Professional | 220+ | PBA/PWBA level | [EFX](https://efx.co/blogs/news/what-is-a-good-bowling-score-understanding-averages-skill-levels-and-age-comparisons) |

Context: Average adult casual bowler scores around 115. League bowlers average approximately 175. USBC Open Championships divisions: Regular (182+), Standard (161--181), Classified (160 and below). ([USBC Open Championships Rules](https://bowl.com/getmedia/357a4ec8-965e-4624-9705-a5eb3b83dc0d/2025oc-rules.pdf))

**ML feasibility**: Low for direct video classification (score is a cumulative outcome, not a single-shot visual feature). However, form quality indicators (consistency, balance, spare conversion rate) correlate with skill level and are video-detectable.

### 12.5 Ball Motion Shape Classification

| Motion Shape | Visual Description | Typical Bowler | Board Movement |
|-------------|-------------------|----------------|----------------|
| Straight | No lateral movement | Beginners, spare shooting | 0--3 boards |
| Slight Hook | Gentle curve at backend | Strokers on dry conditions | 3--8 boards |
| Medium Hook | Moderate arc | Tweeners, standard conditions | 8--15 boards |
| Strong Hook | Pronounced curve | Crankers, oily conditions | 15--20 boards |
| Extreme Hook | Dramatic angular motion | Power players, heavy oil | 20+ boards |

**ML feasibility**: High. Ball trajectory shape classification from tracked positions is straightforward. The ball path can be represented as a curve and classified by curvature magnitude and sharpness.

---

## 13. Defining "Good" vs "Bad" for ML Training

### 13.1 Process vs. Outcome

In bowling coaching, shot quality is evaluated on two dimensions:

1. **Outcome**: Did it strike? What was the pin count? (Result-focused)
2. **Process**: Was the execution good regardless of result? (Technique-focused)

A "good shot" that leaves a 10-pin is still a good shot if the process was sound. Conversely, a "bad shot" that strikes due to lucky pin deflection is still a bad shot from a process standpoint. Coaches emphasize that bowlers should focus on what they can control (process) rather than what they cannot fully control (outcome). ([Bowling This Month](https://www.bowlingthismonth.com/quick-tips/outcome-vs-process-orientation/))

### 13.2 Process Quality Indicators (Video-Detectable)

| Indicator | What "Good" Looks Like | How to Measure |
|-----------|----------------------|----------------|
| **Consistency** | Repeatable ball path shot-to-shot | Standard deviation of board positions across shots |
| **Balance at finish** | Holds position at foul line 1--2 sec | Post-shot stillness duration via pose estimation |
| **Timing** | Ball and feet arrive together | Ball at ankle when slide foot arrives at foul line |
| **Straight walk line** | Minimal lateral drift | Stance board vs. slide board delta consistency |
| **Smooth armswing** | Free, pendulum-like motion | Arm trajectory smoothness (jerk minimization) |
| **Follow-through** | Arm extends upward toward target | Follow-through height and direction via pose |
| **Slide foot position** | Toe within 6 inches of foul line | Distance from toe to foul line |
| **Spine tilt** | Consistent forward lean (<15 degrees) | Angle measurement from pose estimation |
| **Knee bend** | Adequate flex for leverage | Slide leg angle at release |
| **Ball speed consistency** | <0.5 mph variation shot-to-shot | Speed measurement standard deviation |
| **Target accuracy** | Ball crosses intended arrow | Deviation from target board at arrows |

Sources: [BowlersMart](https://www.bowlersmart.com/2017/06/27/better-balance-at-the-foul-line-john-gaines-coaching-corner-bowlersmart-com/), [National Bowling Academy](https://www.nationalbowlingacademy.com/post/technique-tempo-and-timing), [Bowling This Month](https://www.bowlingthismonth.com/bowling-tips/improving-your-stability-at-the-foul-line/)

### 13.3 The Five Components of Elite Bowling (WTBA)

The World Tenpin Bowling Association identified five measurable components:

1. **Versatility**: Ability to adjust to different lane conditions
2. **Accuracy**: Hitting intended targets consistently
3. **Power**: Effective combination of speed and rev rate
4. **Repeatability**: Consistency of physical execution
5. **Knowledge**: Understanding of lane play and equipment

Source: [Bowling This Month - Self Evaluation](https://www.bowlingthismonth.com/bowling-tips/a-bowlers-self-evaluation-checklist/)

### 13.4 Coaching Evaluation Criteria

From the USBC Level I Coaching program and the NFHS Coaching Guide, coaches evaluate:
- Weight transfer and balance throughout approach
- Eye positioning and target tracking
- Arm swing mechanics (pendulum vs. muscled)
- Ball release height and position relative to ankle
- Follow-through direction and height
- Spare shooting strategy and execution

Sources: [USBC Level I](https://images.bowl.com/bowl/media/legacy/internap/bowl/coaching/pdfs/Level%20IScript.pdf), [NFHS Coaching Guide](https://www.nfhs.org/media/1017605/hsbowling_coaching_guide2020.pdf)

### 13.5 ML Labeling Strategy

For training data, shots should be labeled on multiple dimensions:

```
Shot Quality Labels:
  outcome_label: strike | spare | open | split | gutter
  process_label: good_execution | acceptable | poor_execution
  consistency_label: consistent | inconsistent (relative to bowler's baseline)
  
Derived Metrics:
  speed_consistency: std_dev of last N shots
  target_accuracy: deviation from intended target
  balance_score: post-shot stability duration
  timing_score: sync of ball/feet at release
```

This multi-label approach allows the ML system to learn that a "good process with bad outcome" is more instructive than assuming all strikes are good shots.

---

## 14. Data Schema Design

### 14.1 Hierarchical Structure

```
Session
  ├── session_id (UUID)
  ├── date (ISO 8601)
  ├── location (string)
  ├── lane_number (int)
  ├── oil_pattern_name (string, nullable)
  ├── oil_pattern_length_ft (float, nullable)
  ├── oil_pattern_volume_ml (float, nullable)
  ├── oil_ratio (string, nullable, e.g., "10:1")
  ├── lane_surface (enum: wood | synthetic)
  │
  ├── Equipment[] (balls used in session)
  │     ├── ball_id (UUID)
  │     ├── name (string)
  │     ├── brand (string)
  │     ├── weight_lbs (float)
  │     ├── coverstock_type (enum: plastic | urethane | solid_reactive | pearl_reactive | hybrid_reactive)
  │     ├── core_type (enum: symmetrical | asymmetrical)
  │     ├── rg (float, nullable)
  │     ├── differential (float, nullable)
  │     ├── surface_grit (int, nullable)
  │     └── layout (string, nullable)
  │
  ├── Game[]
  │     ├── game_id (UUID)
  │     ├── game_number (int, 1-indexed within session)
  │     ├── total_score (int, 0-300)
  │     │
  │     └── Frame[]
  │           ├── frame_id (UUID)
  │           ├── frame_number (int, 1-10)
  │           ├── frame_score (int, 0-30)
  │           │
  │           └── Shot[]
  │                 ├── shot_id (UUID)
  │                 ├── ball_number (int, 1-3, 3 only in 10th frame)
  │                 ├── ball_used_id (FK -> ball_id)
  │                 ├── video_file_path (string)
  │                 ├── video_start_timestamp_ms (int)
  │                 ├── video_end_timestamp_ms (int)
  │                 │
  │                 ├── --- Ball Motion Data ---
  │                 ├── speed_launch_mph (float, nullable)
  │                 ├── speed_pins_mph (float, nullable)
  │                 ├── rev_rate_rpm (int, nullable)
  │                 ├── axis_tilt_deg (float, nullable)
  │                 ├── axis_rotation_deg (float, nullable)
  │                 ├── loft_distance_ft (float, nullable)
  │                 ├── foul_line_board (float, nullable)
  │                 ├── arrow_board (float, nullable)
  │                 ├── breakpoint_board (float, nullable)
  │                 ├── breakpoint_distance_ft (float, nullable)
  │                 ├── entry_board (float, nullable)
  │                 ├── entry_angle_deg (float, nullable)
  │                 ├── launch_angle_deg (float, nullable)
  │                 ├── total_hook_boards (float, nullable)
  │                 │
  │                 ├── --- Bowler Technique Data ---
  │                 ├── stance_board (float, nullable)
  │                 ├── slide_board (float, nullable)
  │                 ├── lateral_drift_boards (float, nullable)
  │                 ├── approach_steps (int, nullable, 4 or 5)
  │                 ├── delivery_style (enum: one_hand | two_hand, nullable)
  │                 ├── grip_type (enum: conventional | fingertip | semi_fingertip, nullable)
  │                 ├── wrist_position (enum: cupped | flat | broken | hinged, nullable)
  │                 ├── backswing_height (enum: low | medium | high, nullable)
  │                 ├── timing_assessment (enum: early | matched | late, nullable)
  │                 ├── balance_hold_sec (float, nullable)
  │                 │
  │                 ├── --- Pose Estimation Data (optional, from ML) ---
  │                 ├── pose_keypoints_json (JSON, nullable)
  │                 ├── approach_phase_timestamps (JSON, nullable)
  │                 │   e.g., {"stance": 0, "pushaway": 1200, "backswing": 1800,
  │                 │          "forward_swing": 2100, "release": 2400,
  │                 │          "follow_through": 2500, "post_shot": 2700}
  │                 ├── spine_tilt_at_release_deg (float, nullable)
  │                 ├── knee_bend_at_release_deg (float, nullable)
  │                 │
  │                 ├── --- Outcome Data ---
  │                 ├── pins_knocked_down (int, 0-10)
  │                 ├── pins_remaining (int[], e.g., [7, 10])
  │                 ├── is_strike (bool)
  │                 ├── is_spare (bool, only for ball_number >= 2)
  │                 ├── is_split (bool)
  │                 ├── is_gutter (bool)
  │                 ├── split_name (string, nullable, e.g., "7-10", "baby split")
  │                 │
  │                 ├── --- Ball Trajectory (detailed, optional) ---
  │                 ├── trajectory_points (JSON, nullable)
  │                 │   e.g., [{"distance_ft": 0, "board": 18.5, "speed_mph": 19.2},
  │                 │          {"distance_ft": 15, "board": 12.0, "speed_mph": 18.5},
  │                 │          {"distance_ft": 42, "board": 7.5, "speed_mph": 16.8},
  │                 │          {"distance_ft": 60, "board": 17.0, "speed_mph": 15.5}]
  │                 │
  │                 └── --- Classification Labels (for ML training) ---
  │                       ├── style_label (enum: stroker | power_stroker | tweener | cranker, nullable)
  │                       ├── motion_shape_label (enum: straight | slight_hook | medium_hook | strong_hook | extreme_hook, nullable)
  │                       ├── process_quality_label (enum: good | acceptable | poor, nullable)
  │                       └── notes (string, nullable)
```

### 14.2 Required vs. Optional Fields

**Required for every shot record** (minimum viable data):
- `shot_id`, `ball_number`, `video_file_path`, `video_start_timestamp_ms`, `video_end_timestamp_ms`
- `pins_knocked_down`, `is_strike`, `is_gutter`

**Populated by basic video analysis** (high confidence from video):
- `speed_launch_mph`, `loft_distance_ft`, `foul_line_board`, `arrow_board`
- `stance_board`, `slide_board`, `delivery_style`, `approach_steps`
- `pins_remaining`, `is_split`
- `motion_shape_label`, `backswing_height`

**Populated by advanced video analysis** (requires ML models or high-speed video):
- `rev_rate_rpm`, `axis_tilt_deg`, `axis_rotation_deg`
- `breakpoint_board`, `breakpoint_distance_ft`, `entry_angle_deg`
- `wrist_position`, `timing_assessment`, `pose_keypoints_json`
- `spine_tilt_at_release_deg`, `knee_bend_at_release_deg`
- `trajectory_points`, `approach_phase_timestamps`
- `style_label`, `process_quality_label`

**User-entered metadata** (not detectable from video):
- All equipment fields (ball weight, coverstock, RG, differential)
- All lane/environment fields (oil pattern, lane surface)
- `grip_type` (difficult to determine from standard video angles)

### 14.3 Data Relationships for ML

```
Bowler Profile (1) ──── (many) Sessions
Session (1) ──── (many) Games
Game (1) ──── (10) Frames
Frame (1) ──── (1-3) Shots

Cross-references:
  Shot.ball_used_id -> Equipment.ball_id
  Shot.pins_remaining -> Pin Configuration lookup table
  Session.oil_pattern_name -> Oil Pattern library
```

### 14.4 Feature Engineering Considerations

For ML models, raw shot data should be augmented with derived features:

| Derived Feature | Calculation | Use Case |
|----------------|-------------|----------|
| Speed-to-rev ratio | speed_mph / (rev_rate_rpm / 100) | Speed/rev dominance classification |
| Hook rate | total_hook_boards / (60 - breakpoint_distance_ft) | Hook aggressiveness per foot |
| Speed consistency | std_dev(speed_launch_mph) over last 10 shots | Form consistency metric |
| Board consistency | std_dev(arrow_board) over last 10 shots | Accuracy metric |
| Spare conversion rate | spares_converted / spare_attempts | Skill metric |
| Strike percentage | strikes / first_ball_attempts | Primary performance metric |
| Single-pin spare % | single_pin_spares_converted / single_pin_leaves | Fundamental skill metric |
| Drift consistency | std_dev(lateral_drift_boards) over last 10 shots | Physical consistency |

---

## 15. Sources

### Professional Measurement Systems
- [USBC BOLTS Introduction](https://bowl.com/introducing-b-o-l-t-s)
- [CATS - Sportsmatik](https://sportsmatik.com/sports-corner/sports-technology/computer-aided-tracking-system-cats)
- [BOLTS - Sportsmatik](https://sportsmatik.com/sports-corner/sports-technologies/ball-on-lane-tracking-system-bolts)
- [Specto Bowling Main](https://www.spectobowling.com/specto-bowling)
- [Specto Data Points](https://www.spectobowling.com/data-points)
- [Specto Performance Tutorial](https://www.spectobowling.com/tutorialperformance)
- [Specto FAQ](https://www.spectobowling.com/frequently-asked-questions)
- [USBC DigiTrax and BowlersMap](https://bowl.com/equipment-specifications/digitrax-and-bowlersmap)
- [Kegel Topography Study](https://www.kegel.net/topography-study)
- [Kegel Slope Graphs](https://www.kegel.net/white-papers-articles2/kegels-revolutionary-slope-graphs)
- [Kegel Oil Pattern KOSI Graphs](https://www.kegel.net/articles/oil-pattern-kosi-graphs)

### USBC Research and Specifications
- [USBC Ball Motion Study (PDF)](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/08ballmotionstudy.pdf)
- [USBC Ball Motion ASQ Report (PDF)](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/BallMotionASQ.pdf)
- [USBC Equipment Specifications Manual (PDF)](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/ESManual.pdf)
- [USBC Level I Coaching Script (PDF)](https://images.bowl.com/bowl/media/legacy/internap/bowl/coaching/pdfs/Level%20IScript.pdf)
- [USBC Lane Inspection Report 2017 (PDF)](https://images.bowl.com/bowl/media/legacy/internap/bowl/equipandspecs/pdfs/LaneInspections/LaneInspectionReport.pdf)
- [USBC - What's Your Rev Rate](https://bowl.com/what-s-your-rev-rate)
- [USBC - Reading the Lane](https://bowl.com/reading-the-lane)
- [USBC - Adjusting Entry Angle](https://bowl.com/adjusting-entry-angle)
- [USBC - The Approach](https://bowl.com/welcome/the-approach-4840c7151c5dc3884afbeb8041beac5a)
- [USBC - Understanding Oil Patterns](https://bowl.com/welcome/understanding-oil-patterns)
- [USBC Open Championships Rules 2025](https://bowl.com/getmedia/357a4ec8-965e-4624-9705-a5eb3b83dc0d/2025oc-rules.pdf)

### Ball Motion and Physics
- [BowlingBall.com - Three Phases of Ball Motion](https://www.bowlingball.com/BowlVersity/the-three-phases-of-bowling-ball-motion)
- [Storm Bowling - Skid Hook Roll](https://www.stormbowling.com/bowling-ball-reactions-skid-hook-roll)
- [Breakdown Bowling - 3 Phases](https://www.breakdownbowling.com/the-3-phases-of-ball-motion/)
- [BowlingBall.com - Entry Angle](https://www.bowlingball.com/BowlVersity/bowling-ball-angle-of-entry)
- [BowlersMart - Physics of Perfect Strike](https://www.bowlersmart.com/2024/10/22/the-physics-behind-a-perfect-bowling-strike/)
- [Wikipedia - Lofting](https://en.wikipedia.org/wiki/Lofting_(bowling))

### Speed and Rev Rate
- [BowlingBall.com - Ideal Ball Speed](https://www.bowlingball.com/BowlVersity/ideal-bowling-ball-speed)
- [BowlingBall.com - Speed Chart](https://www.bowlingball.com/BowlVersity/bowling-ball-speed-chart)
- [Bowling World - Ball Speed](https://bowlingworld.com/blogs/pro-tips/ball-speed-measuring-and-optimizing-your-bowling-ball-s-speed)
- [BowlersMart - Calculate Speed](https://www.bowlersmart.com/2021/05/09/how-to-calculate-bowling-ball-speed-what-is-the-speed-most-pro-bowlers-are-successful-with/)
- [Bowling Buff - Pro Speed](https://bowlingbuff.com/how-fast-do-pro-bowlers-bowl)
- [MOTIV - Rev Rate vs Ball Speed](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html)
- [BowlingChat Wiki - Measure Rev Rate](https://wiki.bowlingchat.net/wiki/index.php?title=Measure_Rev_Rate)
- [Maverick Wiki - Measure Rev Rate](https://wiki.maverickbowling.com/wiki/index.php/MeasureRevRate)
- [Maverick Wiki - Measure Ball Speed](https://wiki.maverickbowling.com/wiki/index.php/MeasureBallSpeed)

### Axis Tilt and Rotation
- [Bowling This Month - Axis Rotation and Tilt](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/)
- [BowlingBall.com - Axis Tilt and Rotation](https://www.bowlingball.com/BowlVersity/bowling-ball-axis-tilt-and-axis-of-rotation)
- [National Bowling Academy - Axis Defined](https://www.nationalbowlingacademy.com/post/axis-rotation-and-tilt-defined)
- [HowBowling.com - Axis Tilt and Rotation](https://howbowling.com/what-is-axis-tilt-and-axis-rotation-in-bowling/)
- [BowlersMart - Ball Motion Basics](https://www.bowlersmart.com/2021/03/22/the-basics-of-bowling-ball-motion-surface-speed-rev-rate-tilt-and-rotation/)

### Breakpoint and Lane Play
- [Human Kinetics - Rule of 31](https://us.humankinetics.com/blogs/excerpt/determining-the-breakpoint-using-the-rule-of-31)
- [National Bowling Academy - Breakpoint](https://www.nationalbowlingacademy.com/video/breakpoint-get-lined-up-021857)
- [Bowling Life EU - Rule of 31](https://bowlinglife.eu/knowing-the-lanes-the-rule-of-31)
- [National Bowling Academy - Understanding House Shot](https://www.nationalbowlingacademy.com/post/understanding-the-house-shot)

### Equipment
- [Storm Bowling - Coverstock](https://www.stormbowling.com/coverstock-secrets-for-bowling-success)
- [National Bowling Academy - Core/RG/Differential Guide](https://www.nationalbowlingacademy.com/post/a-guide-to-bowling-ball-cores-rg-differential-and-coverstock)
- [BowlersMart - RG and Differential Effects](https://www.bowlersmart.com/2021/08/20/the-effects-of-rg-differential-on-bowling-ball-reaction/)
- [Storm Bowling - RG Differential Symmetry](https://www.stormbowling.com/inside-the-bowling-ball-understanding-rg-differential-and-symmetry)
- [BowlingBall.com - Bowling Ball Specifications](https://www.bowlingball.com/BowlVersity/bowling-ball-specifications)
- [BowlersMart - Conventional vs Fingertip](https://www.bowlersmart.com/2020/03/19/conventional-grip-vs-finger-tip-grip-bowling-ball-drilling-by-mdm-coaching/)

### Technique and Coaching
- [Wikipedia - Bowling Form](https://en.wikipedia.org/wiki/Bowling_form)
- [Bowling.com - Bowler Types](https://www.bowling.com/knowledge-hub/bowling-balls/bowler-types/all)
- [BowlingView - Stroker Cranker Tweener](https://www.bowlingview.com/stroker-cranker-and-tweener-in-bowling-styles/)
- [BowlingBall.com - Wrist Positions](https://www.bowlingball.com/BowlVersity/five-bowling-wrist-positions)
- [BowlersMart - Balance at Foul Line](https://www.bowlersmart.com/2017/06/27/better-balance-at-the-foul-line-john-gaines-coaching-corner-bowlersmart-com/)
- [National Bowling Academy - Drift](https://www.nationalbowlingacademy.com/post/drift-on-approach)
- [Bowling This Month - Process vs Outcome](https://www.bowlingthismonth.com/quick-tips/outcome-vs-process-orientation/)
- [Bowling This Month - Self-Evaluation](https://www.bowlingthismonth.com/bowling-tips/a-bowlers-self-evaluation-checklist/)
- [NFHS Coaching Guide (PDF)](https://www.nfhs.org/media/1017605/hsbowling_coaching_guide2020.pdf)

### Lane Specifications
- [BowlingBall.com - Lane Specifications](https://www.bowlingball.com/BowlVersity/bowling-lane-specifications)
- [Dimensions.com - Bowling Lane](https://www.dimensions.com/element/bowling-lane)
- [Iowa Bowl - Lane Dimensions](http://www.iowabowl.com/jcusbcba/tips/bowling_lane_dimensions.htm)

### Pin Formations and Splits
- [Wikipedia - Split (bowling)](https://en.wikipedia.org/wiki/Split_(bowling))
- [BowlingBall.com - Common Splits](https://www.bowlingball.com/BowlVersity/common-bowling-splits)
- [GoBowling - Pin Formations](https://gobowling.com/blog/bowling-pin-formations-explained/)
- [BowlersMart - Pin Formations](https://www.bowlersmart.com/2020/09/29/how-to-identify-bowling-pin-formations/)

### Scoring and Rules
- [USBC - Keeping Score](https://bowl.com/keeping-score)
- [BowlersMart - Scoring Explained](https://www.bowlersmart.com/2023/07/25/bowling-scoring-explained-strikes-spares-frame-math/)

### Skill Levels
- [EFX - Good Bowling Score](https://efx.co/blogs/news/what-is-a-good-bowling-score-understanding-averages-skill-levels-and-age-comparisons)
- [TheSportOfBowling - Good Score](https://www.thesportofbowling.com/blog/whats-a-good-bowling-score/)
- [Stars and Strikes - Good Score](https://starsandstrikes.com/what-is-a-good-bowling-score-2/)

### ML and Computer Vision Research
- [BowlingDL: Deep Learning Pose Estimation - IEEE Xplore](https://ieeexplore.ieee.org/document/10085434/)
- [CopyStrike: Bowling Analysis Project - GitHub](https://github.com/HalmonLui/copystrike)
- [Top End Sports - Video Speed Calculator](https://www.topendsports.com/biomechanics/video-analysis-speed.htm)
- [Ultralytics - Ball Trajectory Prediction](https://www.ultralytics.com/blog/enhancing-ball-trajectory-prediction-using-vision-ai)
- [ResearchGate - Speed Estimation Computer Vision](https://www.researchgate.net/publication/300918264_Speed_Estimation_Using_Computer_Vision_Abstract_Only)

### PBA Broadcast
- [BowlingChat Forum - Specto on PBA](https://forum.bowlingchat.net/viewtopic.php?t=14262)
- [BowlSmart - Ball Speed on Telecasts](https://www.facebook.com/BowlSmart/posts/how-accurate-are-the-ball-speeds-shown-on-pba-telecasts-very-but-with-a-caveaton/2238933499769806/)
- [Specto Ranking Report](https://www.spectobowling.com/specto-ranking-report-dec-2019)
- [PBA Television](https://www.pba.com/watch/television)
