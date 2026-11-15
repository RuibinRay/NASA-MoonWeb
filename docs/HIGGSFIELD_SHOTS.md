# Higgsfield shot list

Every cinematic still and clip on the site was made with Higgsfield from the prompts below, through its API. The site shows each one with a visible "SI-generated" mark.

## How the films are made to join

Each film stage on the site is one continuous shot built from several five-second clips. To make the clips join without a cut:

1. **Keyframes.** A row of stills is made first with the Higgsfield image model (`marketing-studio/image/sunburst`, 16:9). The opening's four new keyframes are 4K; the others are 2K. `ship_ref` was made first and given to every other spacecraft still as a reference, and every REGO still was given the game's own picture of REGO, so the ship and the robot are the same in every shot.
2. **Clips between keyframes.** Each clip is made with image-to-video and is given **both its first frame and its last frame**: the last frame of one clip is the first frame of the next. The last clip of each stage has only a first frame.
3. **Two takes of every clip** were made: one with `bytedance/seedance-2.0/image-to-video` at 4K, one with `bytedance/seedance-2.5/image-to-video` at 1080p. The 4K take is used for eleven clips. `final2` uses the 1080p take, because in its 4K take REGO's dark visor turned white.
4. **For the site** each chosen take is encoded to 1080p (and 720p for phones) with a keyframe every four frames, so scrolling can step it backwards and forwards. The 4K originals are not in the repository: a 4K film that follows the scroll would be several hundred megabytes and would stutter.

Shared direction for the joined clips: One continuous unbroken shot: a single smooth, steady cinematic camera move from the first frame to the last frame. Physically believable motion. No cuts, no fades, no flashes, no text, no logos. Keep the spacecraft and the robot exactly as they appear in the first and last frames.

## The clips

| Clip | Where it is used | From keyframe | To keyframe | Take used | Files |
|---|---|---|---|---|---|
| `open1` | Opening 1 of 5: out of the dark, up to the engines | `o0` | `o1` | Seedance 2.0, 4K | `assets/video/open1.mp4`, `open1_s.mp4`, `open1.jpg` |
| `open2` | Opening 2 of 5: past the engines and along the hull | `o1` | `o2` | Seedance 2.0, 4K | `assets/video/open2.mp4`, `open2_s.mp4`, `open2.jpg` |
| `open3` | Opening 3 of 5: forward to the cockpit window | `o2` | `o3` | Seedance 2.0, 4K | `assets/video/open3.mp4`, `open3_s.mp4`, `open3.jpg` |
| `open4` | Opening 4 of 5: through the glass into the cockpit | `o3` | `rego_cockpit` | Seedance 2.0, 4K | `assets/video/open4.mp4`, `open4_s.mp4`, `open4.jpg` |
| `open5` | Opening 5 of 5: REGO waves | `rego_cockpit` | none | Seedance 2.0, 4K | `assets/video/open5.mp4`, `open5_s.mp4`, `open5.jpg` |
| `moon1` | Moon 1 of 2: down from the fly-over to the broken solar panel | `moon_flyover` | `rego_moon` | Seedance 2.0, 4K | `assets/video/moon1.mp4`, `moon1_s.mp4`, `moon1.jpg` |
| `moon2` | Moon 2 of 2: REGO and the panel | `rego_moon` | none | Seedance 2.0, 4K | `assets/video/moon2.mp4`, `moon2_s.mp4`, `moon2.jpg` |
| `mars1` | Mars 1 of 3: from deep space down to the landing | `mars_travel` | `mars_landing` | Seedance 2.0, 4K | `assets/video/mars1.mp4`, `mars1_s.mp4`, `mars1.jpg` |
| `mars2` | Mars 2 of 3: touchdown, and round to the ramp | `mars_landing` | `rego_mars` | Seedance 2.0, 4K | `assets/video/mars2.mp4`, `mars2_s.mp4`, `mars2.jpg` |
| `mars3` | Mars 3 of 3: REGO rolls onto Mars | `rego_mars` | none | Seedance 2.0, 4K | `assets/video/mars3.mp4`, `mars3_s.mp4`, `mars3.jpg` |
| `final1` | Ending 1 of 2: pull back through the observation window | `final_wide` | `rego_farewell` | Seedance 2.0, 4K | `assets/video/final1.mp4`, `final1_s.mp4`, `final1.jpg` |
| `final2` | Ending 2 of 2: REGO waves goodbye | `rego_farewell` | none | Seedance 2.5, 1080p | `assets/video/final2.mp4`, `final2_s.mp4`, `final2.jpg` |

Two more clips loop on their own and are not part of a joined shot: `earth_arrival` (Earth arrival) and `moon_impact` (Moon, scene A), both Seedance 2.5 at 720p.

## Clip prompts

### open1

The camera flies steadily forward through dark space toward the distant spacecraft, closing in from behind until its four engine bells fill the lower right of the frame; the engine glow brightens from faint to bright blue-white as more stars fade in.

### open2

The four engines flare. The camera slides forward past the engine bells and along the left flank of the spacecraft, close to the hull, the long solar wing passing on the left, the cockpit canopy coming into view ahead at the nose while the Earth grows beyond it.

### open3

The camera keeps gliding forward along the hull to the nose of the spacecraft and eases in toward the glass cockpit canopy, where warm light glows and a small robot can be seen inside, in profile, looking out at the worlds ahead.

### open4

The camera slips smoothly through the side of the glass canopy into the cockpit and arcs a quarter turn to settle behind the two pilot seats looking forward, as the small robot turns on its treads to face the camera; through the wide canopy window behind it are the Earth, the Moon and Mars, and a pale cyan holographic star map floats above the console.

### open5

The small robot looks at the camera, its cyan eyes blink once, and it raises one short arm and waves; the holographic star map beside it brightens and slowly turns. The camera holds almost still, with only a very slow push in.

### moon1

The camera flies low and fast over the cratered lunar surface, leaves the spacecraft behind, and descends in one long smooth glide toward the white station at the rim of the wide dark pit, sinking to ground level and settling beside a cracked, fallen solar panel where a small robot is looking up at it. No sound, no smoke, no fire.

### moon2

The small robot rolls a little closer to the broken solar panel on its treads, leaving marks in the dust, points one short arm at the crack, then turns its head to look at the camera. Amber warning lights pulse on the station behind. No sound, no smoke, no fire.

### mars1

The camera pushes forward past the coasting spacecraft toward Mars, which swells until its rust-red surface fills the frame; the camera sinks through thin butterscotch haze and comes out low over a rocky rust-brown plain, where a squat white landing craft is descending on bright engine flames toward a small outpost.

### mars2

The landing craft touches down in a billowing ring of tan dust. The camera glides down and around to the foot of its ramp as the dust drifts away, where a small robot stands on the Martian soil looking out toward the outpost.

### mars3

The small robot rolls forward off the ramp onto the Martian soil, its treads raising a little dust, stops, and turns its head slowly from the outpost to the camera while thin dust blows past.

### final1

The camera pulls slowly and steadily straight backward. The frame of a large observation window slides into view around the scene, revealing that the Earth, the Moon and far-off Mars are being watched from inside a dark, quiet cabin, where a small robot stands at the window with its back to the camera, its chest lamp throwing a soft warm glow on the window frame.

### final2

The small robot turns round from the window to face the camera, its cyan eyes curve into a happy shape, and it lifts one short arm and waves goodbye while the Earth turns slowly behind it.

### earth_arrival (loop)

The spacecraft glides slowly forward along its orbit while the clouds and ocean of the Earth turn gently underneath and the thin blue line of the atmosphere glows on the horizon.

### moon_impact (loop)

**Starts from:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/ev2_meteor.jpg

A meteoroid strikes the lunar surface near the station: a silent bright flash, a spray of grey dust and rocks thrown outward in straight lines with no air to slow them, and amber emergency lights begin to pulse on the station. No sound, no fire, no smoke: there is no air on the Moon.

## Keyframe prompts

Shared style for spacecraft stills: Grounded space-agency engineering realism with the restrained production design of a prestige science-fiction film. Photorealistic cinematic film still, anamorphic lens, natural film colour grade, deep blacks, ultra detailed, sharp focus. No people, no text, no letters, no numbers, no labels, no user interface, no logos, no flags, no insignia, no watermark.

Shared style for REGO's stills: The robot is REGO, exactly as in the first reference image: a small friendly helper robot about knee high, with a white rounded body with one orange band, two dark tank treads, a wide rounded white head with orange ear discs and one dark glass visor showing two big glowing cyan oval eyes, a thin antenna with a small amber light, a round warm headlamp on its chest and two short white arms with dark hands. Shown as a real physical robot. Grounded space-agency engineering realism with the restrained production design of a prestige science-fiction film. Photorealistic cinematic film still, anamorphic lens, natural film colour grade, ultra detailed. No people, no text, no letters, no numbers, no labels, no logos, no flags, no insignia, no watermark.

### ship_ref

A long-range crew spacecraft floating in deep space, seen in three-quarter view from the front left, filling most of the frame. White and light-grey hull with visible panel seams and a few rust-orange accent stripes; a rounded cockpit with a dark wraparound glass canopy at the nose; a cylindrical mid body; two long dark-blue rectangular solar wings, one on each side; two smaller white radiator fins; a cluster of four engine bells at the rear glowing soft blue. Hard sunlight from the upper left, deep black sky with small sharp stars.

### o0 (4K)

The same spacecraft as in the reference image, very small and far away in the exact middle of the frame, seen from directly behind, in an almost completely black field of deep space with only a few faint stars. Its four rear engine bells give a faint soft blue glow. Far ahead of it, tiny, a small blue Earth. Very dark, quiet, mysterious, a great deal of empty black space around it.

**Reference pictures:** `ship_ref`

### o1 (4K)

The same spacecraft as in the reference image seen from close behind and slightly to the left: its cluster of four engine bells, arranged in a square, large in the lower right of the frame and glowing bright blue-white; the white hull with rust-orange accent stripes stretches away toward the nose; the long dark-blue left solar wing reaches out to the left. Far ahead past the nose, a small blue Earth. Hard sunlight from the upper left, deep black sky with small sharp stars.

**Reference pictures:** `ship_ref`

### o2 (4K)

The same spacecraft as in the reference image seen from alongside its left flank, the camera close to the cylindrical mid body and looking forward along the hull toward the nose: white panels with visible seams and rust-orange accent stripes sliding past, the long dark-blue left solar wing in the left foreground, the rounded cockpit with its dark wraparound glass canopy ahead at the nose with a warm light inside. Beyond the nose, the blue Earth, larger now, with a tiny grey Moon beside it. Hard sunlight from the upper left, deep black sky with small sharp stars.

**Reference pictures:** `ship_ref`

### o3 (4K)

Close on the cockpit at the nose of the same spacecraft as in the first reference image, seen from just outside its left side. Through the dark wraparound glass canopy, lit by warm cabin light, the small robot from the second reference image (white rounded body with one orange band, dark tank treads, a wide white head with orange ear discs and a dark glass visor showing two big glowing cyan oval eyes, a thin antenna with a small amber light) stands on the deck between two empty pilot seats, seen in profile, looking forward out of the window. The cabin inside matches the third reference image. Beyond the nose of the spacecraft, the blue Earth, a small grey Moon and a tiny rust-red Mars. Soft reflections of stars on the glass. Hard sunlight from the upper left, deep black sky.

**Reference pictures:** `ship_ref`, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg, `rego_cockpit`

### rego_cockpit

REGO inside the cockpit of a spacecraft, standing on the deck between two empty pilot seats, turned three-quarters toward the camera. Behind it a wide curved canopy window shows deep space with a small blue Earth, a tiny grey Moon and a tiny rust-red Mars. Beside REGO a pale cyan holographic star map floats above a console. Soft cool light from the window, warm light from its chest lamp.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg

### moon_flyover

The same spacecraft as in the reference image flying low over the grey surface of the Moon toward the horizon, seen from behind and above. Large craters, scattered boulders and long black shadows from a low Sun; in the distance a wide dark pit in a flat lava plain with a small white station and a field of solar panels at its rim, tiny warm lights glowing. Pure black sky with no stars near the bright ground, a small blue Earth low over the horizon.

**Reference pictures:** `ship_ref`

### rego_moon

REGO on the grey surface of the Moon beside a solar panel that has been knocked over and cracked, looking up at it. Behind, a white lunar station at the rim of a wide dark pit, as in the second reference image, with small amber warning lights. Hard low sunlight, long black shadows, pure black sky, a small blue Earth above the horizon. Tread marks in the dust.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/title2.jpg

### mars_travel

The same spacecraft as in the reference image seen from behind on the left side of the frame, coasting through deep space toward Mars, which is a small rust-red disc with faint darker markings and a white polar cap far ahead on the right. Engines dim. Deep black sky with sharp stars.

**Reference pictures:** `ship_ref`

### mars_landing

A squat white landing craft with four legs descending on bright engine flames toward a rust-brown rocky Martian plain, kicking up a ring of tan dust beneath it. In the middle distance a small outpost of white habitat modules with a low dome, a pink-glowing greenhouse tunnel and a field of solar panels, as in the second reference image. A butterscotch-tan hazy sky with a small pale Sun; a tall wall of dust from an approaching storm on the horizon.

**Reference pictures:** `ship_ref`, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/mars/mr_base.jpg

### rego_mars

REGO on a rust-brown rocky Martian plain at the foot of a lander's ramp, looking out toward a small outpost of white habitat modules with a low dome and a field of solar panels, as in the second reference image. A butterscotch-tan hazy sky with a small pale Sun, fine dust drifting low over the ground, a wall of dust from a distant storm on the horizon.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/mars/mr_base.jpg

### final_wide

The same spacecraft as in the reference image, small in the lower left, flying away from the camera into deep space. Ahead of it, in one wide view: the large blue Earth on the right partly in shadow, the small grey Moon near it, and far away to the left a tiny rust-red point that is Mars. A soft glow from the Sun just out of frame. Quiet, vast, hopeful.

**Reference pictures:** `ship_ref`

### rego_farewell

REGO seen from behind and slightly to one side, standing at a large observation window of a spacecraft, looking out at the big blue Earth, the small grey Moon and a tiny rust-red Mars far away. Its chest lamp throws a soft warm glow on the window frame; the cabin is dark and quiet.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg

### earth_arrival

The same spacecraft as in the reference image in low orbit above the Earth, small in the upper third of the frame, with the curved blue horizon of the Earth filling the lower half: white cloud bands over deep blue ocean and a thin glowing line of atmosphere against black space. Sunlight glints on its solar wings.

**Reference pictures:** `ship_ref`

## Making them again

```bash
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots.json art
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots_rego.json art
HF_KEY="<key id>:<key secret>" node tools/hf_chain.mjs tools/takes.json art/takes
node tools/takes_enc.mjs art/takes assets/video open1=k4 open2=k4 open3=k4 open4=k4 open5=k4 moon1=k4 moon2=k4 mars1=k4 mars2=k4 mars3=k4 final1=k4 final2=hd
```

The key is read from the environment and is never written to a file. `art/` holds the full-size originals and is not committed. `tools/takes_enc.mjs` needs FFmpeg.
