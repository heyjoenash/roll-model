# Biomechanics and Form: Bowling Science Reference

> **Purpose:** Comprehensive reference for the Bowling Buddy video analysis system. This document defines the biomechanical fundamentals that the computer vision system must detect, measure, and evaluate.
>
> **Last Updated:** 2026-04-02

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
