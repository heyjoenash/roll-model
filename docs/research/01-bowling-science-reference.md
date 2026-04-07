# Bowling Science & Biomechanics — Complete Reference

> **Status:** REFERENCE | Created: 2026-04-02
> **Project:** Bowling Buddy — Video Analysis Tool for Bowling Improvement
> **Purpose:** Comprehensive domain knowledge covering every measurable dimension of bowling — mechanics, biomechanics, equipment science, lane conditions, strike physics, and performance metrics. This is the foundation document that informs what the vision system needs to detect, classify, and analyze.
> **Sections:** 5 | **Total Variables Cataloged:** 52 | **Sources:** 300+

---

## Quick Reference: Variables Cheat Sheet

The following table summarizes every measurable variable in a bowling shot, whether it can be detected from video, and its typical range. This is the "what to build" checklist for Bowling Buddy.

| # | Variable | Category | Unit | Range | From Video? |
|---|----------|----------|------|-------|-------------|
| 1 | Ball Speed (launch) | Ball Motion | mph | 14–22 | **Yes** — frame count over 60ft |
| 2 | Ball Speed (at pins) | Ball Motion | mph | 11–18 | **Yes** — frame count |
| 3 | Rev Rate | Ball Motion | RPM | 150–600+ | **Partial** — needs ball markings |
| 4 | Axis Tilt | Ball Motion | degrees | 5–25 typical | **Partial** — needs ball mark tracking |
| 5 | Axis Rotation | Ball Motion | degrees | 10–75 typical | **Partial** — needs ball mark tracking |
| 6 | Loft Distance | Ball Motion | feet | 0.5–6+ | **Yes** — foul line reference |
| 7 | Breakpoint Board | Ball Motion | board # | 5–20 | **Yes** — lane markings |
| 8 | Entry Board | Ball Motion | board # | 15–20 | **Yes** — pin deck reference |
| 9 | Entry Angle | Ball Motion | degrees | 1–8 (optimal ~6) | **Partial** — precise tracking needed |
| 10 | Total Hook | Ball Motion | boards | 0–25+ | **Yes** — foul line to entry delta |
| 11 | Stance Board | Technique | board # | 15–35 | **Yes** — approach dots |
| 12 | Slide Board | Technique | board # | 10–35 | **Yes** — foul line dots |
| 13 | Lateral Drift | Technique | boards | 0–8 | **Yes** — stance minus slide |
| 14 | Approach Steps | Technique | count | 4 or 5 | **Yes** — directly observable |
| 15 | Backswing Height | Technique | relative | belt–above shoulder | **Yes** — pose estimation |
| 16 | Pushaway Timing | Technique | sync | early/matched/late | **Yes** — frame-by-frame |
| 17 | Wrist Position | Technique | category | cupped/flat/broken | **Partial** — clear hand view needed |
| 18 | One-Hand vs Two-Hand | Technique | boolean | 1H / 2H | **Yes** — directly observable |
| 19 | Style Classification | Technique | category | stroker/tweener/cranker | **Yes** — rev rate + form |
| 20 | Follow-Through Height | Technique | relative | waist–above head | **Yes** — pose estimation |
| 21 | Spine Tilt at Release | Technique | degrees | 5–30 | **Yes** — pose estimation |
| 22 | Knee Bend at Release | Technique | degrees | 90–170 | **Yes** — pose estimation |
| 23 | Balance (post-shot) | Technique | seconds | 0–3+ | **Yes** — video timing |
| 24 | Ball Weight | Equipment | lbs | 6–16 | **No** — user input |
| 25 | Coverstock Type | Equipment | category | plastic/urethane/reactive | **No** — user input |
| 26 | RG | Equipment | dimensionless | 2.46–2.80 | **No** — user input |
| 27 | Differential | Equipment | dimensionless | 0.000–0.060 | **No** — user input |
| 28 | Surface Grit | Equipment | grit | 500–4000+ | **No** — user input |
| 29 | Oil Pattern Length | Lane | feet | 32–52 | **No** — user input / lookup |
| 30 | Oil Ratio | Lane | ratio | 3:1–10:1 | **No** — user input |
| 31 | Pin Count (1st ball) | Outcome | integer | 0–10 | **Yes** — count pins |
| 32 | Strike | Outcome | boolean | Y/N | **Yes** — all 10 first ball |
| 33 | Spare | Outcome | boolean | Y/N | **Yes** — remaining cleared |
| 34 | Pins Left | Outcome | pin set | e.g. {7,10} | **Yes** — identify by position |

**Summary:** 23 of 34 key variables are fully or partially detectable from video. Equipment and lane variables require user input or external data.

---

## Table of Contents

### Part 1: Biomechanics & Form
1. Two-Handed vs One-Handed Technique
2. Approach Footwork
3. Arm Swing Mechanics
4. Release Mechanics
5. Follow-Through Patterns
6. Body Positioning & Balance
7. Common Faults and Their Visual Signatures
8. Elite vs Amateur Form Comparison

### Part 2: Ball Physics & Equipment Science
1. Coverstock Types and Their Behavior
2. Core Designs
3. Radius of Gyration (RG)
4. Differential
5. Ball Motion Phases: Skid → Hook → Roll
6. Surface Preparation
7. Ball Weight
8. Drilling Layouts
9. Manufacturers and Ball Identification
10. Ball Selection Strategy

### Part 3: Lane Science & Oil Patterns
1. Lane Dimensions (USBC Specification)
2. Lane Markings and Reference Points
3. Oil Pattern Mechanics
4. House Shot Patterns
5. PBA Animal Oil Patterns (Complete Catalog)
6. Sport Shot Requirements
7. Lane Transition
8. Pattern-Reading Heuristics
9. Lane Surface Types
10. Environmental Factors

### Part 4: Strike Physics & Scoring Science
1. Pin Arrangement Geometry
2. Strike Pocket and Entry Angle
3. Ball-Pin Interaction Physics
4. Speed and Rev Rate Interaction
5. Common Pin Leaves and Their Causes
6. Perfect Game Analysis (300 Game)
7. Spare Shooting Strategy
8. Scoring System
9. Physics Research

### Part 5: Performance Metrics & ML Classification
1. Master Variable Taxonomy
2. Ball Speed
3. Rev Rate (RPM)
4. Axis Tilt and Axis Rotation
5. Loft Distance
6. Breakpoint
7. Board Position Tracking
8. Entry Angle
9. Ball Motion Phases
10. Professional Measurement Systems
11. PBA Broadcast Metrics
12. Classification Categories for ML
13. Defining "Good" vs "Bad" for ML Training
14. Data Schema Design

---
---

# Part 1: Biomechanics & Form

---

## Table of Contents

1. [Two-Handed vs One-Handed Technique](#1-two-handed-vs-one-handed-technique)
2. [Approach Footwork](#2-approach-footwork)
3. [Arm Swing Mechanics](#3-arm-swing-mechanics)
4. [Release Mechanics](#4-release-mechanics)
5. [Follow-Through Patterns](#5-follow-through-patterns)
6. [Body Positioning & Balance](#6-body-positioning--balance)
7. [Common Faults and Their Visual Signatures](#7-common-faults-and-their-visual-signatures)
8. [Elite vs Amateur Form Comparison](#8-elite-vs-amateur-form-comparison)

---

## 1. Two-Handed vs One-Handed Technique

### 1.1 One-Handed Technique (Traditional)

The traditional one-handed delivery uses a pendulum-type swing where the ball is held in the dominant hand with the thumb inserted fully into the thumb hole and two fingers (middle and ring) inserted to varying depths depending on grip type. The non-bowling hand supports the ball during the stance and early pushaway, then releases it to act as a balance arm. ([BOWL.com - Developing Your Release](https://bowl.com/developing-your-release))

**Key mechanical characteristics:**
- The swing is driven primarily by gravity after the pushaway, creating a pendulum arc from pushaway through backswing and forward swing. ([BowlingBall.com - Gravity Bowling Swing](https://www.bowlingball.com/BowlVersity/gravity-bowling-swing))
- The thumb exits the ball first, followed by a wrist rotation, then the fingers exit their holes -- all occurring in less than one second. ([BOWL.com - Developing Your Release](https://bowl.com/developing-your-release))
- Spine tilt is moderate; the goal is to create just enough lateral tilt for the arm and ball to pass by the body. ([Bowling This Month - Developing Lateral Spine Tilt](https://www.bowlingthismonth.com/quick-tips/developing-lateral-spine-tilt/))

**Grip types used with one-handed delivery:**

| Grip Type | Finger Insertion | Span | Rev Potential | Typical User |
|-----------|-----------------|------|---------------|--------------|
| Conventional | To 2nd knuckle | Shorter | Low | Beginners |
| Semi-Fingertip | Between 1st and 2nd knuckle | Medium | Medium | Intermediate |
| Fingertip | To 1st knuckle only | Longest | Highest | Advanced/Pro |

The fingertip grip increases the distance between thumb and fingers, creating a brief extra time difference between thumb and finger release, which allows the fingers to impart more lift and revolutions. Nearly all professionals use the full fingertip grip. ([BowlersMart - Conventional vs Fingertip Grip](https://www.bowlersmart.com/2020/03/19/conventional-grip-vs-finger-tip-grip-bowling-ball-drilling-by-mdm-coaching/)) ([Richmond 40 Bowl - Bowling Grips](https://richmond40bowl.com/bowling-grips-3-different-grips-and-how-they-can-affect-your-game/))

### 1.2 Two-Handed Technique

Two-handed bowlers keep both hands on the ball throughout the approach and swing, removing the non-dominant hand only just before the release point. Most two-handed bowlers do not insert their thumb into the ball. ([FloBowling - Two-Handed Bowling](https://www.flobowling.com/articles/6219473-two-handed-bowling-evolution-of-the-sport-or-unfair-advantage))

**Key mechanical characteristics:**
- Two-handers actively avoid a pendulum-type swing. The swing mechanics are fundamentally opposite from the one-handed game. ([Bowling This Month - Two-Handed Technique Part 1](https://www.bowlingthismonth.com/bowling-tips/bowling-3-0-two-handed-technique-part-1/))
- The ball is carried at chest height with both hands throughout the approach. The second hand is used primarily for body positioning -- once the ball reaches the release point, the second hand is no longer near the ball. ([FloBowling - The Myth of Two-Handed Bowling](https://www.flobowling.com/articles/6818469-the-myth-of-two-handed-bowling))
- Two-handed bowlers must bend forward significantly more than one-handers, with forward spine tilt reaching 45-60 degrees during approach for early pioneers (Belmonte, Palermaa) and up to 90 degrees at release. Modern two-handers achieve 55-75 degrees during approach, with Jesper Svensson reaching up to 110 degrees of forward flexion. ([Bowling This Month - Two-Handed Technique Part 3](https://www.bowlingthismonth.com/bowling-tips/bowling-3-0-two-handed-bowling-part-3/))
- Hip rotation is significantly greater -- two-handers rotate their torsos 30-40 degrees more per shot than one-handers. ([BowlersMart - Two-Handed Bowling Guide](https://www.bowlersmart.com/2021/05/04/a-two-handed-bowling-guide-a-comprehensive-in-depth-look-at-the-two-hand-revolution/))
- Footwork uses a quicker tempo, typically with a 5-step or 6-step approach, with short, fast power steps. ([BowlingBall.com - Two-Handed Bowling Footwork](https://www.bowlingball.com/BowlVersity/twohanded-bowling-footwork))

### 1.3 Rev Rate Comparison

| Style | Typical Rev Rate Range | Notes |
|-------|----------------------|-------|
| One-Handed Stroker | < 300 RPM | Smooth, accuracy-focused delivery |
| One-Handed Tweener | 300-370 RPM | Blend of power and finesse |
| One-Handed Cranker | 400+ RPM | Power-focused, cupped wrist |
| Two-Handed | 400-600+ RPM | Up to ~17% more rotation than elite one-handers |
| PBA Average | ~420 RPM | Across all styles |
| Recreational Average | ~325 RPM | One-handed, house conditions |

Sources: ([Wikipedia - Bowling Form](https://en.wikipedia.org/wiki/Bowling_form)) ([MOTIV Bowling - Rev Rate Ball Speed](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html)) ([BowlingBall.com - Two-Handed Bowling Revolutions](https://www.bowlingball.com/BowlVersity/two-handed-bowling-revolutions))

Two-handed bowlers can achieve higher rev rates because: (1) the no-thumb grip allows a stronger wrist position, (2) the fingers remain under the equator of the ball longer, creating more rotational energy, and (3) the quick footwork tempo generates momentum that transfers into revolutions. ([BowlingBall.com - Two-Handed Bowling Revolutions](https://www.bowlingball.com/BowlVersity/two-handed-bowling-revolutions))

### 1.4 Injury Profile Comparison

| Body Area | One-Handed Risk | Two-Handed Risk |
|-----------|----------------|-----------------|
| Shoulder/Elbow | Higher -- repetitive strain from single-arm pendulum swing | Lower -- load distributed across two arms |
| Wrist/Fingers | Higher -- calluses, arthritis risk from 3-finger force | Lower -- weight spread over two full hands, larger surface area |
| Lower Back/Spine | Lower | Higher -- 30-40 degrees more torso rotation per shot, more lumbar torque |
| Hips/Legs | Lower | Higher -- explosive forward drive, deeper forward bend |

Source: ([National Bowling Academy - Two-Handed Advantages/Disadvantages](https://www.nationalbowlingacademy.com/video/two-handed-bowling-advantages-disadvantages-025341)) ([Kegel Training Center - Two-Handed Delivery Analysis](https://www.kegeltrainingcenter.com/ktc-magazine/2014/6/7/two-handed-delivery-analyzing-a-new-technique))

### 1.5 Prominent Two-Handed Bowlers

- **Jason Belmonte** (Australia): Popularized the style; first-generation two-hander. Multiple PBA Player of the Year awards. Simplified his delivery over time by decreasing rev rate, ball speed, and approach speed, and eliminated a "kangaroo hop." ([Wikipedia - Jason Belmonte](https://en.wikipedia.org/wiki/Jason_Belmonte))
- **Jesper Svensson** (Sweden): Left-handed two-hander. 14 PBA Tour titles including 2 majors (2016 and 2025 Tournament of Champions). Known for extreme forward spine tilt. ([Wikipedia - Jesper Svensson](https://en.wikipedia.org/wiki/Jesper_Svensson_(bowler)))
- **Anthony Simonsen** (USA): Right-handed two-hander. Youngest player in history to win a PBA major (USBC Masters at age 19 in 2016). ([Wikipedia - Anthony Simonsen](https://en.wikipedia.org/wiki/Anthony_Simonsen))
- At the USBC Junior Gold Championship, 21% of competitors used the two-handed approach, rising to 25% among U12 bowlers, demonstrating the style's growing adoption among youth. ([Wikipedia - Bowling Form](https://en.wikipedia.org/wiki/Bowling_form))

### 1.6 Visual Signatures for Camera Detection

**VISUALLY DETECTABLE indicators that distinguish two-handed from one-handed:**

| Feature | One-Handed | Two-Handed |
|---------|------------|------------|
| Second hand on ball | Removed at pushaway (step 1-2) | Stays on ball until just before release |
| Forward spine tilt | 30-55 degrees at release | 60-110 degrees at release |
| Hip rotation | Minimal | 30-40 degrees more rotation |
| Ball carry height in approach | Waist to chest | Chest height, both arms engaged |
| Backswing appearance | Single arm pendulum arc | Abbreviated, both arms pull ball back |
| Footwork tempo | Moderate, steady | Quicker, shuffling power steps |
| Lateral spine tilt | Moderate | More pronounced; head outside hip |

---

## 2. Approach Footwork

### 2.1 Four-Step Approach

The four-step approach is the foundational delivery taught to most bowlers. For a right-handed bowler, the sequence is: right foot, left foot, right foot, left foot (slide). The ball positions are summarized as "out, down, back, and through." ([BowlingBall.com - Bowling Timing for Four Step](https://www.bowlingball.com/BowlVersity/bowling-timing-for-the-four-step-approach))

| Step # | Foot (RH) | Ball Position | Arm Action | Timing Checkpoint |
|--------|-----------|---------------|------------|-------------------|
| 1 | Right | Pushaway | Ball moves forward and slightly down | Ball and foot move simultaneously |
| 2 | Left | Downswing | Ball drops to ball-side leg height | Balance arm extends for stability |
| 3 | Right | Backswing | Ball at peak of backswing | Ball at top as step completes |
| 4 | Left (slide) | Forward swing / Release | Ball swings forward and releases at ankle | Slide foot stops, ball at bottom of arc |

Source: ([BowlingBall.com - Approach and Timing](https://www.bowlingball.com/BowlVersity/Approach-And-Timing)) ([Bowling Path - Bowling Approach](https://bowlingpath.com/bowling-approach/))

The pace of steps should be uniform in length, with a smooth walking motion and a slight heel-to-toe action leading into the slide step. ([BowlingBall.com - Learning the Four Step Approach](https://www.bowlingball.com/BowlVersity/learning-the-bowling-four-step-approach))

### 2.2 Five-Step Approach

The five-step approach adds a short "trigger step" before the four-step sequence. This first step is approximately half a foot length, acting purely as a momentum starter. ([BowlingBall.com - Five Steps vs Four Steps](https://www.bowlingball.com/BowlVersity/bowling-five-steps-vs-four-steps))

| Step # | Foot (RH) | Purpose | Ball Position |
|--------|-----------|---------|---------------|
| 1 | Left | Trigger / momentum starter | Ball begins to move with the step |
| 2 | Right | Pushaway | Ball extends forward |
| 3 | Left | Downswing | Ball drops alongside body |
| 4 | Right | Backswing | Ball at peak |
| 5 | Left (slide) | Forward swing / Release | Ball releases at ankle |

Key differences from the 4-step: In the four-step approach, the pushaway begins before the first step. In the five-step approach, the ball starts moving with the first step, and the pushaway occurs on the second step. The trigger step builds more forward momentum, contributing to higher ball speed and rev rate. ([BowlersMart - 4-Step vs 5-Step](https://www.bowlersmart.com/2024/01/26/the-four-step-bowling-approach-versus-the-five-step-bowling-approach/)) ([Nick the Bowling Coach - 4 vs 5 Step Guide](https://nickthebowlingcoach.com/mastering-your-bowling-approach-4-step-vs-5-step-guide/))

### 2.3 Timing: Footwork-Armswing Synchronization

"Good timing" means the footwork and arm swing are sequenced together and their tempo matches, producing consistency from delivery to delivery. ([BowlingBall.com - Approach and Timing](https://www.bowlingball.com/BowlVersity/Approach-And-Timing))

The USBC has modernized timing terminology: ([BowlingDigital - USBC New Way to Measure Timing](https://www.bowlingdigital.com/bowl/node/4344))

| Traditional Term | USBC Modern Term | Definition | Visual Indicator |
|-----------------|------------------|------------|------------------|
| Early timing | Roller timing | Ball arrives at foul line before the body is ready | Shoulders close before release; hand wraps around ball side; loss of balance. Bowler's ball is forward of the slide foot ankle. |
| Matched timing | Neutral timing | Upper and lower body complete their respective motions simultaneously | Smooth, balanced release at the ankle; body arrives slightly before ball (like a batter stepping before swinging). |
| Late timing | Leverage timing | Body reaches the foul line before ball catches up | Shoulders open excessively; bowler yanks/pulls ball to catch up; chicken-wing finish. Ball still behind body when slide stops. |

Source: ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it)) ([National Bowling Academy - Timing and Release](https://www.nationalbowlingacademy.com/video/timing-release-early-good-late-025367))

**Frame-by-frame visual indicators for timing analysis:**
- At the completion of step 3 (in a 4-step approach), the ball should be at the top of the backswing. If the ball is still rising, timing is late. If the ball has already begun the downswing, timing is early. ([BowlingBall.com - Late Bowling Timing](https://www.bowlingball.com/BowlVersity/late-bowling-timing))
- At the slide step, the ball should reach the bottom of its arc at the bowler's slide foot ankle. If it passes the ankle before the slide stops, timing is early. If the slide has stopped and the ball hasn't arrived, timing is late. ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it))

### 2.4 Slide Mechanics

The final step is a slide rather than a plant. The sliding foot glides across the approach surface, dissipating forward and rotational forces gradually rather than abruptly, reducing stress on ankle, knee, and lower back. ([Quora - Why Bowlers Slide](https://www.quora.com/Why-do-bowlers-slide-their-back-feet-at-the-end-of-a-throw))

**Key slide parameters (visually detectable):**
- **Direction:** The slide should be in line with the previous step, heading toward the target.
- **Length:** Professional bowlers often slide multiple feet due to high momentum. Recreational bowlers should slide at least a few inches.
- **Deceleration:** Smooth deceleration keeps upper-body alignment stable through release.

### 2.5 Starting Position

Bowlers use the approach dots (positioned at board 5, 10, 15, 20, 25, 30, 35) to set their starting stance. The center dot aligns with board 20. A right-handed bowler places the big toe of the left foot behind the chosen dot. To find starting distance, walk to the foul line, turn around, take 4.5 steps back, and turn to face the pins. ([GoBowling - Understanding Approach Dots](https://gobowling.com/blog/guides-tips/understanding-bowling-lane-approach-dots-how-to-use-them-to-improve-your-game/)) ([BowlersMart - Where to Stand](https://www.bowlersmart.com/2020/05/19/where-to-stand-on-the-approach-when-bowling-for-beginners/))

### 2.6 Drift (Lateral Movement)

Drift is lateral movement during the approach -- the bowler finishes on a different board than where they started. ([National Bowling Academy - Drift on Approach](https://www.nationalbowlingacademy.com/post/drift-on-approach))

**Intentional vs. unintentional drift:**
- If a bowler consistently starts on board 20 and slides on board 24, eight out of ten times, this is consistent lateral movement, not drifting. Many PBA pros drift left early in the approach, but their last two steps (power step and slide) head back toward the target. ([National Bowling Academy - Fix Drift](https://www.nationalbowlingacademy.com/video/fix-drift-approach-017711))
- True drifting is inconsistent -- the bowler ends on different boards each time. Causes include unequal step lengths between left and right feet, body rotation during approach, or following the arm swing instead of walking straight. ([HappyBowlers - Footwork Synchronization](https://www.happybowlers.com/bowling-tips-increase-bowling-accuracy-with-footwork-synchronization/))

**VISUALLY DETECTABLE:** Compare starting board position (via dots) to finishing slide board position across multiple shots. Inconsistent lateral offset indicates problematic drift.

---

## 3. Arm Swing Mechanics

### 3.1 Pushaway

The pushaway is the launching pad for the entire swing, serving as the trigger for a pendulum motion. ([Bowling This Month - Get Your Game's Foundation Rolling](https://www.bowlingthismonth.com/bowling-tips/get-your-games-foundation-rolling/))

**Direction and height:**
- The ball moves out and slightly down -- the upper arm extends away from the body while the biceps relaxes to allow the ball to swing down in an arcing motion. ([BowlersMart - First Step and Pushaway](https://www.bowlersmart.com/2015/01/02/the-first-step-and-pushaway-ideal-bowling-approach-position-explained-john-gaines/))
- There should be no lateral motion in the pushaway. If pushed to the right of the foot, the ball will wrap behind the body in the backswing. ([BowlersMart - First Step and Pushaway](https://www.bowlersmart.com/2015/01/02/the-first-step-and-pushaway-ideal-bowling-approach-position-explained-john-gaines/))
- Ball starting height affects timing: high stance (above waist) lengthens swing time for slow-tempo bowlers; low stance (thigh-to-waist) shortens swing time for fast-tempo bowlers. Standard position is between chest high and waist high. ([National Bowling Academy - Push Away and Timing](https://www.nationalbowlingacademy.com/video/push-away-bowling-timing-016747))

**Timing:** In a 4-step approach, the pushaway begins simultaneously with the first step. In a 5-step approach, it begins with the second step. The ball should be slightly forward of the throwing-side leg as the first (or second) step completes. ([Human Kinetics - Timing on the Approach](https://us.humankinetics.com/blogs/excerpt/timing-on-the-approach))

### 3.2 Downswing

After the pushaway reaches its furthest point, all muscles in the bowling arm should be disengaged, allowing the ball's weight to transfer to the shoulder joint and descend on its own weight. ([Bowl4Fun - Teaching Old Dogs](http://www.bowl4fun.com/ron/tip33.htm))

The ball should reach the ball-side leg at the completion of step 2 (in a 4-step approach). The opposite (balance) arm goes out to the side during this phase. ([BowlingBall.com - Approach and Timing](https://www.bowlingball.com/BowlVersity/Approach-And-Timing))

### 3.3 Backswing

**Height:** Backswing height varies significantly among professionals, ranging from below the shoulder to above the head. Most elite bowlers today have a swing approximately one ball to one-and-a-half balls above parallel to the floor. The forward spine tilt reaches approximately 47 degrees at the top of the backswing. ([BowlingChat - How High Should Your Backswing Be](https://forum.bowlingchat.net/viewtopic.php?t=1601)) ([Bowling This Month - Backswings and Fast Feet](https://www.bowlingthismonth.com/bowling-tips/backswings-and-fast-feet/))

**Plane and alignment:** The ball should travel straight back from the pushaway direction. From behind, swing plane is an indicator of direction (should be straight). From the side, swing plane describes the shape of the arc. The straighter an armswing is, the more likely it is to be effective, efficient, and versatile. There is no single perfect swing plane -- it varies by body type, height, and flexibility. ([Bowling This Month - Improving Your Swing Plane](https://www.bowlingthismonth.com/bowling-tips/improving-your-swing-plane/))

**Gravity at the top:** The ball must hesitate for a split second at the top of the backswing and not be forced into the downswing. A gravity swing is void (or nearly void) of tension and arm control during the backswing cycle. ([BowlingBall.com - Gravity Bowling Swing](https://www.bowlingball.com/BowlVersity/gravity-bowling-swing))

### 3.4 Forward Swing

The forward swing follows the backswing as the ball descends. The ball-side leg moves behind the bowler (becoming the trail leg) with the foot rolling on its side. The slot is the path the ball takes past the body on the way to the release point. ([BowlingBall.com - Approach and Timing](https://www.bowlingball.com/BowlVersity/Approach-And-Timing))

### 3.5 Free Armswing vs. Guided/Muscled Armswing

| Characteristic | Free Armswing | Guided/Muscled Armswing |
|---------------|---------------|------------------------|
| Force source | Gravity and inertia | Bowler's muscles |
| Consistency | High -- gravity is constant | Low -- muscle force is variable |
| Tension | Minimal shoulder/arm tension | Significant tension throughout |
| Speed control | Controlled by backswing height | Forced by arm acceleration |
| Teachability | Teachable to all sizes/strengths | Requires specific strength |
| Result | Repeatable, smooth arc | Inconsistent, jerky motion |

Source: ([HappyBowlers - Free Arm Swing](https://www.happybowlers.com/bowling-tips-why-you-should-free-your-arm-swing-when-bowling/)) ([BowlingBall.com - Gravity Bowling Swing](https://www.bowlingball.com/BowlVersity/gravity-bowling-swing))

### 3.6 Swing Plane Types

| Swing Plane | Description | Ball Start Position | Result |
|------------|-------------|--------------------|----|
| Straight | Ball travels straight back and straight forward | Under chin, waist high | Most consistent, versatile |
| Inside-out | Ball starts close to body, swings out behind, returns inside | Inside the body line | Can create more axis rotation |
| Outside-in | Ball wraps behind the body in backswing | Too far right of body center | Ball pulls left; inconsistent targeting |

Starting the ball too far right causes wrapping behind the back. Starting too far left pushes the ball outside the head in backswing, causing pulls. Ideal starting position is under the chin, just above waist high. ([National Bowling Academy - Stance, Ball Start, and Arm Swing](https://www.nationalbowlingacademy.com/post/stance-ball-start-and-arm-swing))

Most elite professionals have a downswing that moves into the body from the top of the swing (a slight inside-out pattern). ([Bowling This Month - Analyzing PBA Top 10](https://www.bowlingthismonth.com/bowling-tips/analyzing-the-pbas-top-10-players/))

### 3.7 Common Arm Swing Faults

- **Late pushaway:** Ball starts moving after the first step, causing late timing and muscled corrections. Fix: initiate pushaway simultaneously with (or slightly before) the first step. ([National Bowling Academy - Push Away and Timing](https://www.nationalbowlingacademy.com/video/push-away-bowling-timing-016747))
- **Wrapping the ball:** Ball goes behind the back during backswing due to pushaway directed too far right. Fix: crossover step during ball start or exaggerate the opposite swing direction in drills. ([National Bowling Academy - Common Approach Problems](https://www.nationalbowlingacademy.com/post/3-common-problems-bowlings-approach))
- **Chicken wing:** Covered in detail in Section 7 below.

**VISUALLY DETECTABLE:** From a behind-the-bowler camera angle, the swing plane can be tracked by following the ball position relative to the spine/head throughout the swing arc. Lateral deviation from a straight line indicates a swing plane issue.

---

## 4. Release Mechanics

### 4.1 Wrist Positions

| Wrist Position | Appearance | Effect on Release | Rev Rate Impact |
|---------------|------------|-------------------|-----------------|
| Cupped | Wrist bent upward (back of hand toward forearm) | Thumb exits quickly; weight falls onto fingers for crisp rotation | Highest -- strong lift |
| Straight/Firm | Wrist flat, neutral alignment | Medium hook, moderate revolutions, arching trajectory | Medium |
| Broken/Collapsed | Wrist angled downward | Thumb exits after fingers; long skid, delayed break point | Lowest -- weakest release |

Source: ([BowlingBall.com - Cupped vs Broken Wrist](https://www.bowlingball.com/BowlVersity/cupped-vs-broken-wrist-bowling-hand-positions)) ([BOWL.com - Developing Your Release](https://bowl.com/developing-your-release))

A common fault: bowlers set up with a cupped wrist but collapse it during the downswing, arriving at the release zone in a broken position. ([BowlingBall.com - Cupped vs Broken Wrist](https://www.bowlingball.com/BowlVersity/cupped-vs-broken-wrist-bowling-hand-positions))

### 4.2 Finger Rotation at Release

The release sequence: (1) Thumb exits, (2) wrist rotates, (3) fingers exit their holes. This entire process occurs in less than one second. ([BOWL.com - Developing Your Release](https://bowl.com/developing-your-release))

The ideal finger position at release is at the 4 and 5 o'clock positions (for a right-hander) on an imaginary clock face on the back of the ball. This generates the counterclockwise rotation needed for a strike-oriented hook. ([Bowling.com - Hand Positions](https://www.bowling.com/bowling-blog/bowling-news/hand-positions/))

Slightly breaking back the wrist tilts the ball weight onto the fingers just before the forearm rotation applies leverage force. The further the fingers are under the equator of the ball, the longer they remain in the ball, creating more revolutions. ([BowlingBall.com - Two-Handed Bowling Revolutions](https://www.bowlingball.com/BowlVersity/two-handed-bowling-revolutions))

### 4.3 Thumb Exit Timing

The thumb must exit the ball first. In a proper release, the thumb hole is slightly looser than the finger holes, allowing the thumb to slip out cleanly under the ball's weight. This transfers the ball's weight onto the two remaining fingers, which then lift and rotate to generate spin. ([BOWL.com - Developing Your Release](https://bowl.com/developing-your-release))

In a broken wrist position, this sequence reverses -- the thumb exits after the fingers, which is the weakest possible release, producing minimal revolutions. ([BowlingBall.com - Cupped vs Broken Wrist](https://www.bowlingball.com/BowlVersity/cupped-vs-broken-wrist-bowling-hand-positions))

### 4.4 Two-Handed Release Mechanics

Two-handed bowlers typically do not use a thumb hole. The non-dominant hand supports the ball through the approach and swing, acting as the "thumb." The non-dominant hand is removed just before the release point, leaving the dominant hand to impart rotation via the fingers. ([National Bowling Academy - Two-Handed Advantages/Disadvantages](https://www.nationalbowlingacademy.com/video/two-handed-bowling-advantages-disadvantages-025341))

Because there is no thumb to extract, two-handers achieve lofting more effectively by simply delaying when they release, without managing thumb extraction timing. This also allows a more consistent feel at release since there are no thumb-swelling or weather-related sizing changes. ([National Bowling Academy - Two-Handed Advantages/Disadvantages](https://www.nationalbowlingacademy.com/video/two-handed-bowling-advantages-disadvantages-025341))

### 4.5 Loft

Loft is the distance the ball travels in the air past the foul line before contacting the lane surface.

| Loft Range | Classification | Typical Use |
|-----------|---------------|-------------|
| 0-6 inches | Minimal | Quick engagement, heavy oil |
| 6-18 inches | Standard | Normal lane conditions |
| 2-4 feet | Extended | Pushing ball down lane, dry heads |
| 5-6+ feet | Extreme | Very specific pattern adjustments |
| 3+ feet (uncontrolled) | Fault | Late timing, improper grip fit |

Source: ([Grokipedia - Lofting](https://grokipedia.com/page/lofting_bowling)) ([Beginner Bowling Tips - Common Mistakes](https://beginnerbowlingtips.com/5-most-common-bowling-mistakes-and-how-to-fix-them))

Excessive unintentional loft is typically caused by late release timing, an improperly fitted ball, or overgripping/squeezing at release. ([Beginner Bowling Tips - Common Mistakes](https://beginnerbowlingtips.com/5-most-common-bowling-mistakes-and-how-to-fix-them))

### 4.6 Release Point Relative to Slide Foot

The ball is released as it passes the ankle of the slide foot. The slide foot arrives at the foul line precisely as the ball reaches the bottom of the swing arc -- this convergence point is the release point. ([Bowling Path - Bowling Approach](https://bowlingpath.com/bowling-approach/))

For maximum leverage, the bowling ball needs to be as close to the slide foot's ankle as possible. When the ball swings close to the sliding foot ankle, the bowling-side shoulder, arm, and ball are directly under the head, producing maximum accuracy and leverage. ([National Bowling Academy - Leverage and Release](https://www.nationalbowlingacademy.com/post/leverage-and-the-bowling-release))

### 4.7 Axis Rotation and Axis Tilt

| Parameter | Definition | Range | Effect |
|-----------|-----------|-------|--------|
| Axis Rotation | Side rotation angle of the ball | 0-90 degrees | 0 = end-over-end roll; 90 = maximum side roll/hook potential |
| Axis Tilt | Angle of the ball's rotational axis relative to lane surface | 0-90 degrees | 0 = rolling like a car wheel; 90 = spinning like a top (helicopter/spinner) |

Source: ([Storm Bowling - Axis Tilt Explained](https://www.stormbowling.com/axis-tilt-bowling-explained)) ([Bowling This Month - Axis Rotation and Tilt](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/))

Elite bowlers aim to command at least three release variations: end-over-end (~0 degrees rotation), medium rotation (35-65 degrees), and maximum rotation (~90 degrees). ([Bowling This Month - Axis Rotation and Tilt](https://www.bowlingthismonth.com/bowling-tips/an-introduction-to-axis-rotation-and-axis-tilt/))

**VISUALLY DETECTABLE:** The ball's track (the oil ring on the ball) and the initial roll direction relative to the lane can be observed from a side or behind camera. Axis tilt manifests as the ball appearing to "spin" rather than "roll." The hand position at and immediately after release indicates the amount of rotation applied.

---

## 5. Follow-Through Patterns

### 5.1 Hand Position After Release

| Follow-Through Type | Hand Position | What It Indicates | Ball Motion Produced |
|--------------------|---------------|-------------------|---------------------|
| Handshake / Suitcase | Thumb up, palm facing target side | Standard hook release | Medium to strong hook with arcing trajectory |
| Palm-up | Palm facing ceiling | Straight ball or end-over-end roll | Minimal hook, good for spares |
| Helicopter / Spinner | Palm facing down or inward with extreme rotation | Top-spin release | High axis tilt (~90 degrees), spinning ball |

Source: ([Bowling.com - Hand Positions](https://www.bowling.com/bowling-blog/bowling-news/hand-positions/)) ([National Bowling Academy - Beginner's Guide to Release](https://www.nationalbowlingacademy.com/post/a-beginners-guide-to-bowling-release))

The "handshake" position -- finishing with the hand as if you're shaking someone's hand -- is the most commonly taught follow-through for hook bowling. The fingers should be at the 4-5 o'clock position (right-hander) relative to the ball at release. ([Bowling.com - Hand Positions](https://www.bowling.com/bowling-blog/bowling-news/hand-positions/))

### 5.2 Direction of Follow-Through

The follow-through should extend toward the target, with the hand continuing the path of the ball. If the follow-through moves across the body (to the left for a right-hander), it typically indicates the bowler pulled the shot or the shoulders closed prematurely. ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it))

### 5.3 What Follow-Through Reveals

The follow-through is a diagnostic tool -- it is the natural continuation of the release, and therefore reflects what happened at the release point:
- A follow-through that veers left (right-hander) suggests early timing or pulled shots.
- A follow-through that opens to the right suggests late timing or pushing the ball.
- A high follow-through with fingers ending above the head suggests a strong, full release with good lift.
- A low, truncated follow-through suggests a muscled or "dumped" release.

### 5.4 Elite vs. Amateur Follow-Through

Elite bowlers hold their follow-through position with the hand reaching toward the ceiling and maintain the finish position until the ball exits the pin deck. This "posting" of the shot is a hallmark of professional consistency. Amateur bowlers often drop their arm immediately after release or pull it across the body. ([BOWL.com - Stick the Landing](https://bowl.com/stick-the-landing))

**VISUALLY DETECTABLE:** Follow-through direction and height relative to the head/shoulder can be tracked by the vision system. The hand's final resting position (handshake vs. palm-up vs. across body) indicates release type and quality.

---

## 6. Body Positioning & Balance

### 6.1 Spine Tilt at Release

Two types of spine tilt are relevant:

**Forward (sagittal) spine tilt:**
- One-handers: 30-55 degrees at release. The chin should be right over the top of the knee, if not slightly behind it. ([BowlersMart - Slide and Finish Position](https://www.bowlersmart.com/2015/01/27/the-finish-position-the-ideal-bowling-approach-position-explained/))
- Two-handers: 60-110 degrees at release. Modern two-handers achieve 55-75 degrees during approach, reaching approximately 90 degrees at release. ([Bowling This Month - Two-Handed Part 3](https://www.bowlingthismonth.com/bowling-tips/bowling-3-0-two-handed-bowling-part-3/))

**Lateral spine tilt:**
- Creates space for the arm and ball to pass the body. The amount needed varies by body type: wide shoulders/narrow hips need less; narrow shoulders/wider hips need more. Any gap between the body and armswing implies excessive lateral spine tilt. ([Bowling This Month - Developing Lateral Spine Tilt](https://www.bowlingthismonth.com/quick-tips/developing-lateral-spine-tilt/))
- Higher backswings require less variation in forward spine tilt. ([Bowling This Month - Developing Lateral Spine Tilt](https://www.bowlingthismonth.com/quick-tips/developing-lateral-spine-tilt/))

Increasing trunk side bend (dropping the shoulder) leads to a freer swing, increased ball motion, and improved balance. Space creation is the most important element in maximizing biomechanical efficiency. ([Bowling This Month - Drop Your Damn Shoulder](https://www.bowlingthismonth.com/bowling-tips/drop-your-damn-shoulder/))

### 6.2 Hip Rotation

- **One-handers:** Minimal hip rotation; shoulders and hips stay relatively square to the foul line through delivery.
- **Two-handers:** Significant hip rotation, with torsos rotating 30-40 degrees more per shot. Two-handers explode forward with their hips, driving posture up into the slide position, which creates more energy transfer to the ball. ([BowlersMart - Two-Handed Guide](https://www.bowlersmart.com/2021/05/04/a-two-handed-bowling-guide-a-comprehensive-in-depth-look-at-the-two-hand-revolution/)) ([Bowling This Month - Body Position](https://www.bowlingthismonth.com/bowling-tips/bowling-2-0-body-position/))

### 6.3 Knee Bend at Slide

The recommended knee bend at the foul line is approximately 45 degrees. Both Fred Borden and John Jowdy (legendary coaches) agree that 45 degrees is the maximum anyone would need. However, excessive knee bend is counterproductive -- higher center of gravity enables higher approach speed. ([BowlersMart - Slide and Finish Position](https://www.bowlersmart.com/2015/01/27/the-finish-position-the-ideal-bowling-approach-position-explained/)) ([Bowling This Month - Body Position](https://www.bowlingthismonth.com/bowling-tips/bowling-2-0-body-position/))

### 6.4 Balance Arm (Non-Bowling Arm)

The non-bowling arm is critical for stability and accuracy:
- Should be fully extended away from the upper body, held about waist level.
- Hand pointed toward the adjacent approach, slightly ahead of the non-bowling shoulder.
- **Thumb down** on the balance arm hand keeps shoulders open longer, allowing a natural swing flow.
- **Thumb up** causes shoulders to close, creating pulled shots and inconsistency.

Source: ([BowlersMart - MDM Coaching Balance Arm](https://www.bowlersmart.com/2020/03/19/mdm-coaching-balance-arm/)) ([BowlingBall.com - Using Your Non-Bowling Arm](https://www.bowlingball.com/BowlVersity/using-your-non-bowling-arm))

Common mistake: Grabbing the leg and holding it during approach breaks down leverage and power. ([BowlingBall.com - How to Use Your Bowling Balance Arm](https://www.bowlingball.com/BowlVersity/how-to-use-your-bowling-balance-arm))

### 6.5 Head Position

The head should remain as stable as possible throughout the approach -- it is the one body part expected to stay still amid all the moving parts. Head movement is typically a symptom of another problem (drift, balance issues). If you lead sideways with your head, the body follows, affecting balance and swing alignment. ([BowlingPulse - Head Over Bowling Ball](https://bowlingpulse.com/blog/head-over-bowling-ball-guide/))

At release, the head should be directly over the bowling ball and slide foot, with eyes focused on the target. ([BowlingPulse - Head Over Bowling Ball](https://bowlingpulse.com/blog/head-over-bowling-ball-guide/))

### 6.6 Center of Gravity Throughout the Approach

The higher the center of gravity, the higher the potential approach speed. This is why excessive knee bend is counterproductive in the stance and early approach. ([Bowling This Month - Body Position](https://www.bowlingthismonth.com/bowling-tips/bowling-2-0-body-position/))

When the trunk follows the ball into the swing (due to a rounded hinge swing start), the center of gravity moves forward, leading to quicker footwork and a more pronounced power step. ([Bowling This Month - At the Core](https://www.bowlingthismonth.com/bowling-tips/at-the-core-of-fast-improvements-and-higher-level-performance/))

### 6.7 Trail Leg and Post-Shot Balance

**Trail leg positioning:**
- Should sweep past the non-ball-side leg, staying low to the floor.
- Acts as a "kickstand" -- if the trail leg is in the air, balance is compromised.
- Toes should face the wall (laces down on the lane surface). When the toe leads, hips and lower body engage, providing leverage. If the heel faces the wall instead, inconsistency results.
- There should be a slight gap between the trail leg and the sliding foot.

Source: ([National Bowling Academy - Sliding and Trail Leg](https://www.nationalbowlingacademy.com/post/sliding-and-the-trail-leg)) ([National Bowling Academy - Trail Leg Heel and Toe](https://www.nationalbowlingacademy.com/video/trail-leg-heel-toe-positioning-025354))

**Posting the shot:**
- Elite bowlers hold their balanced finish position until the ball exits the pin deck.
- Knee continuation: after the slide foot stops, the knee continues to flex forward, with the rest of the body following in line until the shot is fully posted.
- Balance at the foul line indicates a repeatable, controlled delivery. Falling off the shot (losing balance left or right) indicates a fundamental issue.

Source: ([BOWL.com - Stick the Landing](https://bowl.com/stick-the-landing)) ([National Bowling Academy - Perfecting Finish Position](https://www.nationalbowlingacademy.com/video/perfecting-finish-position-017140/))

**VISUALLY DETECTABLE:** Trail leg position (airborne vs. on ground, toe orientation), knee bend angle of slide leg, balance arm extension, head position relative to slide foot, and whether the bowler holds their finish or falls off can all be detected from a side or rear camera angle.

---

## 7. Common Faults and Their Visual Signatures

### 7.1 Early Timing

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Ball arrives at the foul line before the body. The ball is forward of the slide foot ankle when the slide begins. Shoulders close before release. |
| **What it causes** | Misses to the left (RH bowler). Hand wraps around the ball. Loss of leverage and balance. Poor projection. |
| **How to fix** | Soften the pushaway. Let the feet gain a half-beat before the ball falls into the swing. Slow the initial ball movement. |
| **Camera detection** | Ball position ahead of ankle at slide; closed shoulders at release point. |

Source: ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it))

### 7.2 Late Timing

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Body reaches the foul line while the ball is still behind. Slide foot has stopped but ball hasn't reached bottom of arc. Shoulders too open at delivery. |
| **What it causes** | Bowler yanks/pulls ball to catch up. Lofting. Chicken-wing finish. Misses right without correction. |
| **How to fix** | Start the ball sooner. Quicken the pushaway. Match footwork tempo to swing tempo. |
| **Camera detection** | Ball behind ankle when slide stops; excessive shoulder opening; abrupt pull-through motion. |

Source: ([BowlingBall.com - Late Timing](https://www.bowlingball.com/BowlVersity/late-timing)) ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it))

### 7.3 Muscled Swing

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Visible arm tension throughout swing. Jerky motion rather than smooth arc. Ball accelerated by muscles rather than gravity. Inconsistent ball speed shot-to-shot. |
| **What it causes** | Inconsistent targeting. Fatigue. Shoulder strain. Unpredictable ball speed. |
| **How to fix** | Practice free armswing drills. Focus on relaxing the shoulder and letting gravity control the swing. Reduce ball weight if necessary. |
| **Camera detection** | Non-smooth swing arc (angular motion rather than pendulum). Elbow flexion during swing. Visible forearm/upper arm tension. |

Source: ([HappyBowlers - Free Arm Swing](https://www.happybowlers.com/bowling-tips-why-you-should-free-your-arm-swing-when-bowling/)) ([Bowling This Month - Tips for Free Armswing](https://www.bowlingthismonth.com/quick-tips/tips-for-a-free-armswing/))

### 7.4 Dropping the Shoulder

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Bowling-side shoulder drops significantly lower than non-bowling shoulder. Excessive lateral spine tilt. |
| **What it causes** | Counterintuitively, moderate shoulder drop is beneficial (creates space). Excessive drop, however, causes balance issues, loss of leverage, and difficulty completing the swing through the foul line. |
| **How to fix** | Focus on maintaining a consistent spine angle. Reduce drop to the minimum needed for the ball to clear the body. |
| **Camera detection** | Shoulder height differential at release. Comparison of shoulder line angle to horizontal from front/rear camera. |

Source: ([Bowling This Month - Drop Your Damn Shoulder](https://www.bowlingthismonth.com/bowling-tips/drop-your-damn-shoulder/)) ([Bowl4Fun - Dropping the Shoulder](http://www.bowl4fun.com/ron/tip40.htm))

### 7.5 Chicken Wing (Elbow Out)

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | V-shaped arm during forward swing and follow-through. Elbow positioned outside the wrist and hand. Elbow veers away from a straight forward swing path. |
| **What it causes** | Loss of leverage (arm/hand no longer under shoulder at maximum leverage point). Reduced accuracy and consistency. Decreased ball speed. Inconsistent rev rate. |
| **How to fix** | Develop confidence in gravity-driven swing. Maintain elbow close to body before release. Practice letting the ball fall from the backswing without muscling the downswing. |
| **Camera detection** | Elbow position relative to wrist from behind camera -- elbow should be directly above or inside the wrist, not outside it. V-shape arm formation during forward swing. |

Source: ([Bowling This Month - Chicken Winging](https://www.bowlingthismonth.com/bowling-tips/chicken-winging/)) ([HappyBowlers - Eliminate Chicken Wing](https://www.happybowlers.com/bowling-tips-how-to-eliminate-chicken-wing-habit-once-and-for-all/))

### 7.6 Topping the Ball

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Fingers positioned above the ball's equator at release. Hand rotates over the top of the ball rather than staying behind and under it. |
| **What it causes** | Ball spins (axis tilt) rather than rolls with forward momentum. Weak pin carry. Unpredictable ball motion. |
| **How to fix** | Stay behind the ball with fingers below center. Ensure thumb releases first. Rotate through the ball, not around it. Practice with wrist restrictors if needed. |
| **Camera detection** | Hand/finger position relative to ball center at release point. Fingers should be at 4-5 o'clock (RH), not 12 o'clock. |

Source: ([BowlingChat - Over-turning or Topping](https://forum.bowlingchat.net/viewtopic.php?t=2062))

### 7.7 Excessive Lofting

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Ball hits the lane surface 3+ feet past the foul line. Ball launched upward rather than rolled onto the lane. Loud impact sound. |
| **What it causes** | Loss of ball control. Ball skids too far, reducing hook potential. Potential lane damage. Inconsistent ball reaction. |
| **How to fix** | Correct late timing. Check ball fit (thumb hole may be too tight). Relax grip -- don't squeeze. Release the thumb when the slide foot reaches the foul line. |
| **Camera detection** | Ball trajectory angle at release (should be nearly horizontal, not upward). Landing distance from foul line. |

Source: ([Beginner Bowling Tips - Common Mistakes](https://beginnerbowlingtips.com/5-most-common-bowling-mistakes-and-how-to-fix-them)) ([BowlingBall.com - Control Loft](https://www.bowlingball.com/BowlVersity/how-to-control-bowling-ball-loft-for-better-scores))

### 7.8 Drifting Off Line

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Bowler's slide foot finishes on a different board each shot (inconsistently). Body moves laterally during approach. |
| **What it causes** | Inconsistent targeting. Different release angles shot to shot. Inability to repeat shots. |
| **How to fix** | Equalize step lengths between left and right feet. Eliminate body rotation during approach. Walk toward target, not toward arm swing direction. Tape line drill on approach. |
| **Camera detection** | Track slide foot board position across multiple shots. Calculate standard deviation of finishing position. Compare to starting position. |

Source: ([National Bowling Academy - Drift on Approach](https://www.nationalbowlingacademy.com/post/drift-on-approach)) ([National Bowling Academy - Fix Drift](https://www.nationalbowlingacademy.com/video/fix-drift-approach-017711))

### 7.9 Opening the Shoulders

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Bowling shoulder rotates away from the target during delivery. Shoulders face to the right (for RH bowler) rather than square to the target at release. |
| **What it causes** | Ball pushed out to the right. Loss of accuracy. Compensatory pulling motion. Often associated with late timing. |
| **How to fix** | Correct late timing (primary cause). Use balance arm properly (thumb down, extended). Focus on keeping shoulders square through release. |
| **Camera detection** | Shoulder line angle relative to foul line at release. Compare shoulder orientation to target line. |

Source: ([BOWL.com - How Flawed Timing Impacts Accuracy](https://bowl.com/news/how-flawed-timing-impacts-accuracy-and-what-to-do-about-it))

### 7.10 Not Finishing the Release (Dumping the Ball)

| Attribute | Detail |
|-----------|--------|
| **What it looks like** | Follow-through is short or absent. Hand drops immediately after release. Ball "dumped" onto lane without lift or rotation. No upward hand motion after release. |
| **What it causes** | Low rev rate. Flat ball reaction. Poor pin carry. Weak entry angle. |
| **How to fix** | Follow through toward the ceiling/target. Keep the hand in the release position. Extend arm fully after release. Hold the finish. |
| **Camera detection** | Follow-through hand height relative to head/shoulder. Arm extension distance after release. Duration of held finish position. |

---

## 8. Elite vs Amateur Form Comparison

### 8.1 Key Biomechanical Differences

| Metric | Elite (PBA) | Recreational/Amateur |
|--------|-------------|---------------------|
| Rev Rate | 400-600+ RPM | 200-350 RPM |
| Ball Speed | 16-19 mph at pins | 14-17 mph at pins |
| Shot Repeatability | Ball lands within 1-2 board variance | 3-5+ board variance |
| Backswing Height | Shoulder to above-head level | Waist to shoulder level |
| Knee Bend at Slide | ~45 degrees, consistent | Variable, often too much or too little |
| Spine Tilt at Release | Consistent, appropriate for body type | Variable, often insufficient |
| Follow-Through | Held until ball exits pin deck | Dropped immediately |
| Balance at Finish | Posted and stable | Falling off left/right |
| Swing Plane | Straight or slight inside-out | Wrapping, outside-in, variable |

Source: ([Bowling This Month - Bowl Like a Pro Part 2](https://www.bowlingthismonth.com/bowling-tips/bowl-like-a-pro-part-2/)) ([Bowling This Month - Analyzing PBA Top 10](https://www.bowlingthismonth.com/bowling-tips/analyzing-the-pbas-top-10-players/))

### 8.2 Consistency Markers

What separates PBA pros is not necessarily superior mechanics on any single shot, but the ability to repeat shots. Professional bowlers have incredibly good shot repeatability. The foundation of shot repetition is technique, particularly swing plane and release consistency. ([Bowling This Month - Bowl Like a Pro Part 2](https://www.bowlingthismonth.com/bowling-tips/bowl-like-a-pro-part-2/)) ([BOWL.com - Shot Repeatability](https://bowl.com/welcome/shot-repeatability-957f4eeeaf626ddf7f503de3ad4fb450))

Key consistency markers a vision system should track:
- **Board variance at release** (where the ball lands on the lane, shot-to-shot)
- **Slide foot position** (should be on the same board +/- 1 each shot)
- **Backswing height** (should be within ~2 inches shot-to-shot)
- **Ball speed** (elite bowlers vary by < 0.5 mph shot-to-shot)
- **Follow-through position** (hand finishes in the same position each time)
- **Timing** (relationship between slide foot stop and ball position should be identical)

### 8.3 Six Biomechanical Analysis Points (PBA Top 10 Framework)

Analysis of the PBA's top 10 players identified six key biomechanical analysis points that coaches should evaluate: ([Bowling This Month - Analyzing PBA Top 10](https://www.bowlingthismonth.com/bowling-tips/analyzing-the-pbas-top-10-players/))

1. **Early upper body space creation** -- How the upper body creates room for the swing early in the approach
2. **Space at the top of the swing** -- Gap between body and ball at peak backswing
3. **Shoulder abduction at the top of the swing** -- Bowling shoulder angle at backswing peak
4. **Ball-side shoulder movement in the downswing** -- How the shoulder tracks during the forward swing
5. **Torso position at release** -- Forward and lateral tilt of the trunk at the moment of release
6. **Release to follow-through direction** -- Path of the hand from release point through follow-through

Among the PBA's top 10, there is notable diversity: four two-handers, two lefties, and only one bowler with a rev rate at or below 400 RPM. ([Bowling This Month - Analyzing PBA Top 10](https://www.bowlingthismonth.com/bowling-tips/analyzing-the-pbas-top-10-players/))

### 8.4 Rev Dominance vs Speed Dominance

Bowlers are classified into five categories based on the relationship between their rev rate and ball speed: ([MOTIV Bowling - Rev Dominance](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html))

| Category | Description | PBA Prevalence |
|----------|-------------|----------------|
| Rev dominates speed | RPM overwhelms ball speed; more hook than speed can control | Common among elite |
| Rev slightly dominates speed | Slight rev advantage | Most common on PBA Tour |
| Rev and speed match | Proportionally balanced | Baseline |
| Speed slightly dominates rev | Slight speed advantage | Less common on Tour |
| Speed dominates rev | Ball speed overwhelms RPM; less hook potential | Rare at elite level |

**The balancing rule:** As ball speed changes, rev rate should change by approximately 50 RPM per 1 mph to remain balanced. Example: 21 mph with 500 RPM = balanced. 15 mph with 275 RPM = balanced. ([MOTIV Bowling - Rev Dominance](https://www.motivbowling.com/blog/am-i-rev-or-speed-dominant.html))

The modern game favors rev-dominant bowlers. PBA Tournament of Champions finalists typically have an ROS (Rev Rate Optimization Score) between 24 and 27. ([Bowling This Month - Recognizing and Producing the Matching Up Process](https://www.bowlingthismonth.com/bowling-tips/recognizing-and-producing-the-matching-up-process/))

### 8.5 What Coaches Look For

Key metrics that bowling coaches evaluate, which the vision system should measure:

1. **Timing checkpoints** -- Ball position relative to each step of the approach
2. **Swing plane consistency** -- Shot-to-shot repeatability of swing direction and shape
3. **Release hand position** -- Finger position on the ball at release (clock face position)
4. **Slide foot board position** -- Where the bowler finishes, tracked over multiple shots
5. **Balance at the foul line** -- Ability to hold the finish position
6. **Spine tilt angles** -- Both forward and lateral, at key moments (setup, backswing peak, release)
7. **Trail leg position** -- On the ground vs. airborne, toe orientation
8. **Follow-through direction and height** -- Hand path after release
9. **Knee bend angle** -- At setup and at release
10. **Ball speed and rev rate** -- And the ratio between them

---

## Appendix: Computer Vision Detection Priority Matrix

Based on the research above, the following body keypoints and movements are prioritized for the Bowling Buddy vision system:

### Critical (Must Detect)

| Keypoint/Movement | Why | Camera Angle |
|-------------------|-----|-------------|
| Slide foot position at foul line | Board accuracy, drift detection | Behind or above |
| Ball position through swing arc | Timing analysis, swing plane | Side |
| Wrist angle at release | Cupped/straight/broken classification | Side or behind |
| Hand position after release | Follow-through type identification | Behind |
| Knee bend angle at slide | Balance and power assessment | Side |
| Shoulder line at release | Open/closed/square detection | Behind |
| Second hand on/off ball | Two-handed vs one-handed classification | Side or behind |

### Important (Should Detect)

| Keypoint/Movement | Why | Camera Angle |
|-------------------|-----|-------------|
| Forward spine tilt angle | Body position assessment | Side |
| Lateral spine tilt | Space creation analysis | Behind |
| Backswing height | Power potential, timing | Side |
| Trail leg position | Balance assessment | Side or behind |
| Balance arm extension | Stability analysis | Behind |
| Head stability | Overall technique quality | Side or behind |
| Step count and timing | 4-step vs 5-step identification | Side |
| Elbow position in swing | Chicken wing detection | Behind |

### Supplementary (Nice to Detect)

| Keypoint/Movement | Why | Camera Angle |
|-------------------|-----|-------------|
| Hip rotation angle | Two-handed power analysis | Behind |
| Foot position at each step | Drift tracking, step length | Above |
| Ball loft distance | Release quality | Side |
| Post-shot balance duration | Consistency indicator | Any |
| Ball speed at release | Speed/rev matching | Side |
| Finger position on ball at release | Rotation type classification | Behind (close) |


---
---

# Part 2: Ball Physics & Equipment Science


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


---
---

# Part 3: Lane Science & Oil Patterns


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


---
---

# Part 4: Strike Physics & Scoring Science


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


---
---

# Part 5: Performance Metrics & ML Classification


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
